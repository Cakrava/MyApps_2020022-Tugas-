import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Alert,
  View,
  Text,
  Platform,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {apiUrl} from '../config';
import {useNavigation} from '@react-navigation/native';
import {apiMahasiswa} from '../API';

const FormTambah = () => {
  const [nim_2020022, setNim] = useState('');
  const [namaLengkap, setNamaLengkap] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('L');
  const [tempatLahir, setTempatLahir] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState(new Date());
  const [alamat, setAlamat] = useState('');
  const [nohp, setNoTelp] = useState('');
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const navigation = useNavigation();
  const [validationErrors, setValidationErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const submitForm = async () => {
    setIsSaving(true);
    setValidationErrors({});
    const formData = {
      nim_2020022: nim_2020022,
      nama_lengkap_2020022: namaLengkap,
      jenis_kelamin_2020022: jenisKelamin,
      tempat_lahir_2020022: tempatLahir,
      tanggal_lahir_2020022: tanggalLahir.toISOString().split('T')[0],
      alamat_2020022: alamat,
      nohp_2020022: nohp,
    };

    try {
      const response = await fetch(`${apiMahasiswa}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setIsSaving(false);

        if (response.status === 422) {
          let errors = {};
          Object.keys(data.errors).forEach(key => {
            errors[key] = data.errors[key][0];
          });
          setValidationErrors(errors);
        } else {
          throw new Error(
            data.message || 'Terjadi kesalahan saat menyimpan data.',
          );
        }
      } else {
        setIsSaving(false);
        Alert.alert('Success', 'Data mahasiswa berhasil ditambahkan', [
          {
            text: 'Ok',
            onPress: () =>
              navigation.navigate('DataMahasiswa', {dataAdded: true}),
          },
        ]);
      }
    } catch (error) {
      setIsSaving(false);
      Alert.alert('Error', error.toString());
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || tanggalLahir;
    setTanggalLahir(currentDate);
  };

  const formatDate = date => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Input
        placeholder="NIM"
        value={nim_2020022}
        onChangeText={setNim}
        placeholderTextColor="#888"
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        leftIcon={<Icon name="user-circle" size={24} color="black" />}
        // errorMessage={validationErrors.nim_2020022}
      />
      <Input
        placeholder="Nama Lengkap"
        value={namaLengkap}
        onChangeText={setNamaLengkap}
        placeholderTextColor="#888"
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        leftIcon={<Icon name="user" size={24} color="black" />}
        // errorMessage={validationErrors.nama_lengkap_2020022}
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={jenisKelamin}
          onValueChange={(itemValue, itemIndex) => setJenisKelamin(itemValue)}
          style={styles.picker}>
          <Picker.Item label="Laki-laki" value="L" />
          <Picker.Item label="Perempuan" value="P" />
        </Picker>
      </View>
      <Input
        placeholder="Tempat Lahir"
        value={tempatLahir}
        onChangeText={setTempatLahir}
        placeholderTextColor="#888"
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        leftIcon={<Icon name="home" size={24} color="black" />}
        // errorMessage={validationErrors.tempat_lahir_2020022}
      />
      <View style={styles.dateContainer}>
        <Button
          title="Pilih Tanggal Lahir"
          onPress={showDatePicker}
          icon={<Icon name="calendar" size={15} color="white" />}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <Text style={styles.dateDisplay}>
          Tanggal Lahir: {formatDate(tanggalLahir)}
        </Text>
      </View>
      <Input
        placeholder="Alamat"
        value={alamat}
        onChangeText={setAlamat}
        placeholderTextColor="#888"
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        // errorMessage={validationErrors.alamat_2020022}
      />
      <Input
        placeholder="Nomor Telepon"
        value={nohp}
        onChangeText={setNoTelp}
        placeholderTextColor="#888"
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        // errorMessage={validationErrors.nohp_2020022}
        keyboardType="number-pad"
      />
      <Button
        title="Simpan Data"
        // onPress={submitForm}
        buttonStyle={styles.submitButton}
        titleStyle={styles.submitTitle}
        loading={isSaving}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  inputContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    paddingLeft: 10,
  },
  inputText: {
    color: '#000',
  },
  pickerContainer: {
    marginBottom: 20,
    borderWidth: 1,
    marginHorizontal: 10,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 10,
  },
  submitTitle: {
    color: '#fff',
  },
  dateContainer: {
    marginBottom: 20,
    marginHorizontal: 10,
  },
  dateDisplay: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default FormTambah;
