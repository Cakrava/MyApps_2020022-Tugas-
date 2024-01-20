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
import {apiMatakuliah} from '../API';

import AsyncStorage from '@react-native-async-storage/async-storage';
export default function FormEdit({route}) {
  const {kode_2020022} = route.params;
  const [matakuliah, setMatakuliah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [namaMatakuliah, setNamaMatakuliah] = useState('');
  const [sks_2020022, setSks] = useState('');

  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let token = await AsyncStorage.getItem('userToken');
        console.log(`${kode_2020022}`);
        const response = await fetch(`${apiMatakuliah}/${kode_2020022}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await response.json();
        setNamaMatakuliah(json.nama_2020022);
        setSks(json.sks_2020022);
      } catch (error) {
        setError('Tidak dapat memuat data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [kode_2020022]);

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
      sks_2020022,
      nama_2020022: namaMatakuliah,
      _method: 'PUT',
    };

    try {
      let token = await AsyncStorage.getItem('userToken');
      console.log(kode_2020022);
      const response = await fetch(`${apiMatakuliah}/${kode_2020022}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
      Alert.alert('Success', 'Data matakuliah ini berhasil di-Update', [
        {
          text: 'Ok',
          onPress: () =>
            navigation.navigate('Detail', {kode_2020022: kode_2020022}),
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
        placeholder="Masukkan Kode"
        disabled={true}
        value={kode_2020022}
        onChangeText={text => {
          setSks(text);

          // Validasi panjang Nim saat pengubahan teks
          if (text.length < 7) {
            setValidationErrors({
              kode_2020022: `Kurang ${7 - text.length} karakter`,
            });
          } else if (text.length > 7) {
            setValidationErrors({
              kode_2020022: `Lebih ${text.length - 7} karakter`,
            });
          } else {
            setValidationErrors({
              kode_2020022: 'Jumlah pas',
            });
          }
        }}
        placeholderTextColor="#888"
        inputContainerStyle={[
          styles.inputContainer,
          {marginTop: 10},
          validationErrors.kode_2020022 === 'Jumlah pas' && styles.greenInput,
        ]}
        inputStyle={styles.inputText}
        leftIcon={<Icon name="finger-print" size={15} color="grey" />}
        errorMessage={validationErrors.kode_2020022}
      />

      <Input
        placeholder="Nama Matakuliah"
        value={namaMatakuliah}
        onChangeText={setNamaMatakuliah}
        placeholderTextColor="#888"
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        leftIcon={<Icon name="person-outline" size={15} color="grey" />}
        errorMessage={validationErrors.nama_2020022}
      />
      <Input
        placeholder="Sks"
        value={sks_2020022}
        onChangeText={setSks}
        placeholderTextColor="#888"
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        leftIcon={<Icon name="location-outline" size={15} color="grey" />}
        errorMessage={validationErrors.sks_2020022}
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
    backgroundColor: '#03C988',
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
