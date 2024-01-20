import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Alert,
  View,
  Text,
  Platform,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {apiDosen, apiMatakuliah} from '../API';
import {SafeAreaView} from 'react-native-safe-area-context';

const TambahDataDosen = () => {
  const [nik_2020022, setNik] = useState('');
  const [namaLengkap, setNamaLengkap] = useState('');
  const [matakuliah, setMatakuliah] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('L');
  const [tempatLahir, setTempatLahir] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState(new Date());
  const [alamat, setAlamat] = useState('');
  const [nohp, setNohp] = useState('');
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const navigation = useNavigation();
  const [validationErrors, setValidationErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [mataKuliahOptions, setMataKuliahOptions] = useState([]);

  useEffect(() => {
    // Fungsi untuk mendapatkan data dari API
    const fetchData = async () => {
      let token = await AsyncStorage.getItem('userToken');
      try {
        const response = await fetch(`${apiMatakuliah}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const responseData = await response.json();

        // Memastikan bahwa properti "data" ada dan merupakan array
        if (
          responseData &&
          responseData.data &&
          Array.isArray(responseData.data)
        ) {
          // Mengambil nilai "nama_2020022" dari data API
          const options = responseData.data.map(item => item.nama_2020022);
          setMataKuliahOptions(options);
        } else {
          console.error(
            'Invalid data structure received from API:',
            responseData,
          );
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // useEffect akan dijalankan hanya saat komponen pertama kali dimount

  const submitForm = async () => {
    setIsSaving(true);
    setValidationErrors({});
    const formData = {
      nik_2020022,
      nama_lengkap_2020022: namaLengkap,
      matakuliah_2020022: matakuliah,
      jenis_kelamin_2020022: jenisKelamin,
      tempat_lahir_2020022: tempatLahir,
      tanggal_lahir_2020022: tanggalLahir.toISOString().split('T')[0],
      alamat_2020022: alamat,
      nohp_2020022: nohp,
    };

    try {
      let token = await AsyncStorage.getItem('userToken');
      console.log(token);
      const response = await fetch(`${apiDosen}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',

          Authorization: `Bearer ${token}`,
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
        Alert.alert('Success', 'Data dosen berhasil ditambahkan', [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('DataDosen', {dataAdded: true}),
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
    setDatePickerVisible(Platform.OS === 'ios');
    setTanggalLahir(currentDate);
  };

  const formatDate = date => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Input
          placeholder="Masukkan Nim"
          value={nik_2020022}
          onChangeText={text => {
            setNik(text);

            // Validasi panjang Nim saat pengubahan teks
            if (text.length < 7) {
              setValidationErrors({
                nik_2020022: `Kurang ${7 - text.length} karakter`,
              });
            } else if (text.length > 7) {
              setValidationErrors({
                nik_2020022: `Lebih ${text.length - 7} karakter`,
              });
            } else {
              setValidationErrors({
                nik_2020022: 'Jumlah pas',
              });
            }
          }}
          placeholderTextColor="#888"
          inputContainerStyle={[
            styles.inputContainer,
            validationErrors.nik_2020022 === 'Jumlah pas' && styles.greenInput,
          ]}
          inputStyle={styles.inputText}
          leftIcon={<Icon name="finger-print" size={15} color="grey" />}
          errorMessage={validationErrors.nik_2020022}
        />

        <Input
          placeholder="Nama Lengkap"
          value={namaLengkap}
          onChangeText={setNamaLengkap}
          placeholderTextColor="#888"
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          leftIcon={<Icon name="person-outline" size={15} color="grey" />}
          errorMessage={validationErrors.nama_lengkap_2020022}
        />
        <View
          style={[styles.pickerContainer, {marginBottom: 20, marginTop: -10}]}>
          <Picker
            selectedValue={matakuliah}
            onValueChange={(itemValue, itemIndex) => setMatakuliah(itemValue)}
            style={styles.picker}
            itemStyle={{color: 'black', fontSize: 16}}>
            {/* Menampilkan pilihan dari data API */}
            {mataKuliahOptions.map((option, index) => (
              <Picker.Item key={index} label={option} value={option} />
            ))}
          </Picker>
        </View>
        <View style={[styles.pickerContainer, {marginBottom: 20}]}>
          <Picker
            selectedValue={jenisKelamin}
            onValueChange={(itemValue, itemIndex) => setJenisKelamin(itemValue)}
            style={styles.picker}
            itemStyle={{color: 'black', fontSize: 16}}>
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
          leftIcon={<Icon name="home-outline" size={15} color="grey" />}
          errorMessage={validationErrors.tempat_lahir_2020022}
        />

        <TouchableOpacity
          onPress={() => setDatePickerVisible(true)}
          style={styles.DateInput}>
          <View style={styles.dateIcon}>
            <Icon name="calendar-outline" size={20} color="grey" />
          </View>
          <TextInput
            style={styles.dateInputText}
            value={formatDate(tanggalLahir)}
            editable={false}
          />

          {datePickerVisible && (
            <DateTimePicker
              value={tanggalLahir}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
        </TouchableOpacity>

        <Input
          placeholder="Alamat"
          value={alamat}
          onChangeText={setAlamat}
          placeholderTextColor="#888"
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          leftIcon={<Icon name="location-outline" size={15} color="grey" />}
          errorMessage={validationErrors.alamat_2020022}
        />
        <Input
          placeholder="Nomor Telepon"
          value={nohp}
          onChangeText={setNohp}
          placeholderTextColor="#888"
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          leftIcon={<Icon name="call-outline" size={15} color="grey" />}
          errorMessage={validationErrors.nohp_2020022}
          keyboardType="number-pad"
        />
        <TouchableOpacity
          onPress={submitForm}
          disabled={isSaving}
          style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Simpan</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    paddingTop: 10,
  },
  contentContainer: {
    paddingBottom: 10,
  },
  inputContainer: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    paddingLeft: 10,
    marginBottom: 10,
  },
  DateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  dateIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  dateInputText: {
    fontSize: 18,
  },
  inputText: {
    color: '#000',
  },
  pickerContainer: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginBottom: 10,
    marginHorizontal: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    color: 'black',
  },
  submitButton: {
    backgroundColor: 'tomato',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TambahDataDosen;
