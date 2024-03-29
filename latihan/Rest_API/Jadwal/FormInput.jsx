import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {Button, Input} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import ModalDataDosen from './ModalDataDosen';
import ModalDataMatakuliah from './ModalDataMatakuliah';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useNavigation} from '@react-navigation/native';
import {apiImage} from '../API';
export default function FormInput() {
  const navigation = useNavigation();
  const [modalDosenVisible, setModalDosenVisible] = useState(false);
  const [modalMatakuliahVisible, setModalMatakuliahVisible] = useState(false);
  const [kodejadwal, setKodeJadwal] = useState('');
  const [ruangan, setRuangan] = useState('');
  const [selectedDosen, setSelectedDosen] = useState({nidn: '', nama: ''});
  const [selectedMatakuliah, setSelectedMatakuliah] = useState({
    kode: '',
    nama: '',
  });
  const [jamMulai, setJamMulai] = useState(new Date());
  const [jamAkhir, setJamAkhir] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [currentPicker, setCurrentPicker] = useState('start');
  const [pilihHari, setPilihHari] = useState('Senin');
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const onDosenSelected = (nidn, nama) => {
    setSelectedDosen({nidn, nama});
    setModalDosenVisible(false); // Menutup modal setelah pemilihan
  };
  const onMatakuliahSelected = (kode, nama) => {
    setSelectedMatakuliah({kode, nama});
    setModalMatakuliahVisible(false); // Menutup modal setelah pemilihan
  };
  const onChangeTime = (event, selectedTime) => {
    setShowPicker(Platform.OS === 'ios'); // Untuk iOS, tetap tampilkan picker
    const currentTime = selectedTime || new Date();
    if (currentPicker === 'start') {
      setJamMulai(currentTime);
    } else {
      setJamAkhir(currentTime);
    }
  };
  const formatTime = date => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes}`;
  };
  const modalSearchDosen = () => {
    setModalDosenVisible(true); // Buka hanya modal dosen
  };
  const modalSearchMatakuliah = () => {
    setModalMatakuliahVisible(true); // Buka hanya modal matakuliah
  };
  const submitJadwal = async () => {
    setLoading(true);
    setValidationErrors({});
    const dataToSend = {
      kodejadwal: kodejadwal, // Ambil dari state atau Input component
      dosennidn: selectedDosen.nidn,
      kodemtk: selectedMatakuliah.kode,
      ruangan: ruangan, // Ambil dari state atau Input component
      jammulai: formatTime(jamMulai),
      jamakhir: formatTime(jamAkhir),
      hari: pilihHari,
    };
    let token = await AsyncStorage.getItem('userToken');
    fetch(`${apiImage}/api/jadwal`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataToSend),
    })
      .then(async response => {
        const data = await response.json();
        if (!response.ok) {
          setLoading(false);
          // Jika ada kesalahan validasi, akan masuk ke sini
          if (response.status === 422) {
            // Handle validation errors
            let errors = {};
            Object.keys(data.errors).forEach(key => {
              errors[key] = data.errors[key][0]; // Ambil hanya pesan pertama untuk setiap
              field;
            });
            setValidationErrors(errors);
          } else {
            throw new Error(
              data.message || 'Terjadi kesalahan saat menyimpan data.',
            );
          }
          return;
        }
        setLoading(false);
        Alert.alert(
          'Berhasil',
          `Data Jadwal berhasil disimpan, Silahkan buat tampil data sendiri ya...hihihi`,
          [
            {
              text: 'Ok',
              onPress: () => {
                setKodeJadwal('');
                setRuangan('');
                setSelectedDosen({nidn: '', nama: ''});
                setSelectedMatakuliah({kode: '', nama: ''});
                setJamMulai(new Date());
                setJamAkhir(new Date());
                setShowPicker(false);
                setPilihHari('Senin');
                setValidationErrors({});
                navigation.navigate('FormInput');
              },
            },
          ],
        );
      })
      .catch(error => {
        // Handle failure
        console.log(`Gagal Simpan Data : ${error}`);
      });
  };
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      style={styles.container}>
      <Input
        value={kodejadwal}
        onChangeText={setKodeJadwal}
        label="Kode Jadwal"
        labelStyle={styles.labelInput}
        placeholder="Input Kode Jadwal..."
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        errorMessage={validationErrors.kodejadwal}
      />
      <View style={styles.inputRow}>
        <View style={{flex: 4, marginRight: 10}}>
          <Input
            label="NIDN Dosen"
            labelStyle={styles.labelInput}
            placeholder="Cari Dosen..."
            disabled={true}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
            value={`${selectedDosen.nidn} - ${selectedDosen.nama}`}
            errorMessage={validationErrors.dosennidn}
          />
        </View>
        <View style={{flex: 1}}>
          <Button
            title="Cari"
            containerStyle={styles.buttonContainer}
            buttonStyle={{
              height: 50,
              backgroundColor: '#65B741',
              borderRadius: 10,
            }}
            onPress={modalSearchDosen}
          />
          <ModalDataDosen
            isVisible={modalDosenVisible}
            onClose={() => setModalDosenVisible(false)}
            onDosenSelected={onDosenSelected} // Memberikan callback ke ModalDataDosen
          />
        </View>
      </View>
      <View style={styles.inputRow}>
        <View style={{flex: 4, marginRight: 10}}>
          <Input
            label="Kode Matakuliah"
            labelStyle={styles.labelInput}
            placeholder="Cari Matakuliah..."
            disabled={true}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
            value={`${selectedMatakuliah.kode} - ${selectedMatakuliah.nama}`}
            errorMessage={validationErrors.kodemtk}
          />
        </View>
        <View style={{flex: 1}}>
          <Button
            title="Cari"
            containerStyle={styles.buttonContainer}
            buttonStyle={{
              height: 50,
              backgroundColor: '#492e87',
              borderRadius: 10,
            }}
            onPress={modalSearchMatakuliah}
          />
          <ModalDataMatakuliah
            isVisible={modalMatakuliahVisible}
            onClose={() => setModalMatakuliahVisible(false)}
            onMatakuliahSelected={onMatakuliahSelected} // Memberikan callback ke
            ModalDataDosen
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          setShowPicker(true);
          setCurrentPicker('start');
        }}>
        <Input
          label="Jam Mulai"
          labelStyle={styles.labelInput}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          placeholder="Pilih Jam Mulai"
          editable={false}
          value={jamMulai.toLocaleTimeString().substring(0, 5)}
          errorMessage={validationErrors.jammulai}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setShowPicker(true);
          setCurrentPicker('end');
        }}>
        <Input
          label="Jam Akhir"
          labelStyle={styles.labelInput}
          placeholder="Pilih Jam Akhir"
          editable={false}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          value={jamAkhir.toLocaleTimeString().substring(0, 5)}
          errorMessage={validationErrors.jamakhir}
        />
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={currentPicker === 'start' ? jamMulai : jamAkhir}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChangeTime}
        />
      )}
      <Text style={styles.labelInputHari}>Pilih Hari</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={pilihHari}
          onValueChange={(itemValue, itemIndex) => setPilihHari(itemValue)}
          style={styles.picker}>
          <Picker.Item label="Senin" value="Senin" />
          <Picker.Item label="Selasa" value="Selasa" />
          <Picker.Item label="Rabu" value="Rabu" />
          <Picker.Item label="Kamis" value="Kamis" />
          <Picker.Item label="Jumat" value="Jumat" />
          <Picker.Item label="Sabtu" value="Sabtu" />
        </Picker>
      </View>
      <Input
        value={ruangan}
        onChangeText={setRuangan}
        label="Ruangan"
        labelStyle={styles.labelInput}
        placeholder="Input Ruangan..."
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        errorMessage={validationErrors.ruangan}
      />
      <Button
        title={loading ? 'Tunggu...' : 'Simpan Data'}
        disabled={loading}
        onPress={submitJadwal}
        buttonStyle={{marginHorizontal: 10}}
      />
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    marginBottom: 5,
  },
  labelInput: {
    color: '#7071e8',
    borderBottomColor: '#7071e8',
    marginBottom: 2,
    fontWeight: 'bold',
  },
  labelInputHari: {
    color: '#7071e8',
    borderBottomColor: '#7071e8',
    marginBottom: 2,
    fontWeight: 'bold',
    paddingLeft: 10,
    fontSize: 16,
  },
  inputContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    paddingLeft: 10,
    elevation: 3,
  },
  inputText: {
    color: '#000',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    marginRight: 10,
    marginTop: 25,
  },
  pickerContainer: {
    marginHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    elevation: 3,
    marginBottom: 20,
  },
  picker: {
    color: 'black',
    fontWeight: 'bold',
  },
});
