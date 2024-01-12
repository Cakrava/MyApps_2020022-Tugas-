import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Alert,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Input, Button} from 'react-native-elements';
import {apiUrl} from '../config';
import {useNavigation} from '@react-navigation/native';
import {apiDosen} from '../API';

export default function FormEdit({route}) {
  const {nik_2020022} = route.params;

  const [matakuliah, setMatakuliah] = useState('');
  const [dosen, setDosen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [namaLengkap, setNamaLengkap] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('L');
  const [tempatLahir, setTempatLahir] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState(new Date());
  const [alamat_2020022, setAlamat] = useState('');
  const [noTelp, setNoTelp] = useState('');
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const [mataKuliahOptions, setMataKuliahOptions] = useState([]);
  const navigation = useNavigation();
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || tanggalLahir;
    setTanggalLahir(currentDate);
    setDatePickerVisible(Platform.OS === 'ios');
  };

  const formatDate = date => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };
  useEffect(() => {
    const fetchDataMatakuliah = async () => {
      try {
        const responseMatakuliah = await fetch(
          'http://192.168.137.1:8000/api/matakuliah2020022',
        );
        const responseDataMatakuliah = await responseMatakuliah.json();

        if (
          responseDataMatakuliah &&
          responseDataMatakuliah.data &&
          Array.isArray(responseDataMatakuliah.data)
        ) {
          const options = responseDataMatakuliah.data.map(
            item => item.nama_2020022,
          );
          setMataKuliahOptions(options);
        } else {
          console.error(
            'Invalid data structure received from API:',
            responseDataMatakuliah,
          );
        }
      } catch (error) {
        console.error('Error fetching matakuliah data:', error);
      }
    };

    const fetchDataDosen = async () => {
      try {
        console.log(`${nik_2020022}`);
        const responseDosen = await fetch(`${apiDosen}/${nik_2020022}`);
        const jsonDosen = await responseDosen.json();
        setNamaLengkap(jsonDosen.nama_lengkap_2020022);
        setMatakuliah(jsonDosen.matakuliah_2020022);
        setJenisKelamin(jsonDosen.jenis_kelamin_2020022);
        setTempatLahir(jsonDosen.tempat_lahir_2020022);
        setTanggalLahir(new Date(jsonDosen.tanggal_lahir_2020022));
        setAlamat(jsonDosen.alamat_2020022);
        setNoTelp(jsonDosen.nohp_2020022);
      } catch (error) {
        setError('Tidak dapat memuat data');
      } finally {
        setLoading(false);
      }
    };

    fetchDataMatakuliah();
    fetchDataDosen();
  }, [nik_2020022]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  const submitForm = async () => {
    setIsSaving(true);
    setValidationErrors({});

    const formData = {
      alamat_2020022,
      nama_lengkap_2020022: namaLengkap,
      matakuliah_2020022: matakuliah,
      jenis_kelamin_2020022: jenisKelamin,
      tempat_lahir_2020022: tempatLahir,
      tanggal_lahir_2020022: tanggalLahir.toISOString().split('T')[0], // Format to YYYY-MM-DD
      nohp_2020022: noTelp,
      _method: 'PUT',
    };

    try {
      const response = await fetch(`${apiDosen}/${nik_2020022}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();

        // Handle validation errors
        if (response.status === 422) {
          let errors = {};
          Object.keys(data.errors).forEach(key => {
            errors[key] = data.errors[key][0]; // Ambil hanya pesan pertama untuk setiap field
          });
          setValidationErrors(errors);
        } else {
          setValidationErrors({});
          throw new Error(
            data.message || 'Terjadi kesalahan saat meng-update data.',
          );
        }
      }

      setIsSaving(false);

      // Jika tidak ada error, maka tampilkan pesan sukses
      Alert.alert('Success', 'Data dosen ini berhasil di-Update', [
        {
          text: 'Ok',
          onPress: () =>
            navigation.navigate('Detail', {nik_2020022: nik_2020022}),
        },
      ]);
    } catch (error) {
      // Handle failure
      setIsSaving(false);
      Alert.alert('Error', error.toString());
    }
  };

  return (
    <ScrollView>
      <Input
        placeholder="Masukkan Nim"
        disabled={true}
        value={nik_2020022}
        onChangeText={text => {
          setNim(text);

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
          {marginTop: 10},
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
      <View style={styles.pickerContainer}>
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
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            // height: 40,
            // width: 40,
            marginLeft: 10,
            marginRight: 10,
            // backgroundColor: 'tomato',
            borderRadius: 10,
          }}>
          <Icon name="calendar-outline" size={20} color="grey" />
        </View>
        <TextInput
          style={{fontSize: 18}}
          value={formatDate(tanggalLahir)}
          readOnly
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
        value={alamat_2020022}
        onChangeText={setAlamat}
        placeholderTextColor="#888"
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        leftIcon={<Icon name="location-outline" size={15} color="grey" />}
        errorMessage={validationErrors.alamat_2020022}
      />
      <Input
        placeholder="Nomor Telepon"
        value={noTelp}
        onChangeText={setNoTelp}
        placeholderTextColor="#888"
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        leftIcon={<Icon name="call-outline" size={15} color="grey" />}
        errorMessage={validationErrors.nohp_2020022}
        keyboardType="number-pad"
      />
      <TouchableOpacity
        onPress={submitForm}
        loading={isSaving}
        style={styles.submitButton}>
        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
          Perbarui
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginHorizontal: 5,
    marginVertical: 5,
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
    // marginBottom: -10,
  },
  DateInput: {
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
  },
  inputText: {
    color: '#000',
  },
  pickerContainer: {
    marginBottom: 15,
    borderWidth: 0.5,
    borderRadius: 10,

    marginHorizontal: 10,
    borderColor: '#ccc',
    backgroundColor: '#fff',
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
    marginRight: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dateContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateDisplay: {
    fontSize: 16,
    marginTop: 10,
  },
});
