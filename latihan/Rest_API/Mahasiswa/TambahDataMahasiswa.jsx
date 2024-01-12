import React, {useState} from 'react';
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
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {apiMahasiswa} from '../API';
import {set} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';

const TambahDataMahasiswa = () => {
  const [nim_2020022, setNim] = useState('');
  const [namaLengkap, setNamaLengkap] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('L');
  const [tempatLahir, setTempatLahir] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState(new Date());
  const [alamat, setAlamat] = useState('');
  const [nohp, setNohp] = useState('');
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const navigation = useNavigation();
  const [validationErrors, setValidationErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const submitForm = async () => {
    setIsSaving(true);
    setValidationErrors({});
    const formData = {
      nim_2020022,
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
    setDatePickerVisible(Platform.OS === 'ios');
    setTanggalLahir(currentDate);
  };

  const formatDate = date => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        padding: 10,
        paddingTop: 10,
        height: '100%',
      }}>
      <ScrollView>
        <Input
          placeholder="Masukkan Nim"
          value={nim_2020022}
          onChangeText={text => {
            setNim(text);

            // Validasi panjang Nim saat pengubahan teks
            if (text.length < 7) {
              setValidationErrors({
                nim_2020022: `Kurang ${7 - text.length} karakter`,
              });
            } else if (text.length > 7) {
              setValidationErrors({
                nim_2020022: `Lebih ${text.length - 7} karakter`,
              });
            } else {
              setValidationErrors({
                nim_2020022: 'Jumlah pas',
              });
            }
          }}
          placeholderTextColor="#888"
          inputContainerStyle={[
            styles.inputContainer,
            validationErrors.nim_2020022 === 'Jumlah pas' && styles.greenInput,
          ]}
          inputStyle={styles.inputText}
          leftIcon={<Icon name="finger-print" size={15} color="grey" />}
          errorMessage={validationErrors.nim_2020022}
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
              // backgroundColor: '#39A7FF',
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
          loading={isSaving}
          style={styles.submitButton}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
            Simpan
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

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
    backgroundColor: '#39A7FF',
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

export default TambahDataMahasiswa;
