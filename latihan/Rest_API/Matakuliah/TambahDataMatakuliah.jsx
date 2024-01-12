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
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {apiMatakuliah} from '../API';
import {SafeAreaView} from 'react-native-safe-area-context';

const TambahDataMatakuliah = () => {
  const [kode_2020022, setKode] = useState('');
  const [nama, setNama] = useState('');
  const [sks, setSks] = useState('');

  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const navigation = useNavigation();
  const [validationErrors, setValidationErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [mataKuliahOptions, setMataKuliahOptions] = useState([]);

  const submitForm = async () => {
    console.log(`Kodenya adalah : ${kode_2020022}`);
    console.log(`namanya adalah : ${nama}`);
    setIsSaving(true);
    setValidationErrors({});
    const formData = {
      kode_2020022,
      nama_2020022: nama,
      sks_2020022: sks,
    };

    try {
      const response = await fetch(`${apiMatakuliah}`, {
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
        Alert.alert('Success', 'Data sks berhasil ditambahkan', [
          {
            text: 'Ok',
            onPress: () =>
              navigation.navigate('DataMatakuliah', {dataAdded: true}),
          },
        ]);
      }
    } catch (error) {
      setIsSaving(false);
      Alert.alert('Error', error.toString());
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Input
          placeholder="Masukkan Nim"
          value={kode_2020022}
          onChangeText={text => {
            setKode(text);

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
            validationErrors.kode_2020022 === 'Jumlah pas' && styles.greenInput,
          ]}
          inputStyle={styles.inputText}
          leftIcon={<Icon name="finger-print" size={15} color="grey" />}
          errorMessage={validationErrors.kode_2020022}
        />

        <Input
          placeholder="Matakuliah"
          value={nama}
          onChangeText={setNama}
          placeholderTextColor="#888"
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          leftIcon={<Icon name="book-outline" size={15} color="grey" />}
          errorMessage={validationErrors.nama_2020022}
        />
        <Input
          placeholder="SKS"
          value={sks}
          onChangeText={setSks}
          placeholderTextColor="#888"
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          leftIcon={<Icon name="leaf-outline" size={15} color="grey" />}
          errorMessage={validationErrors.sks_2020022}
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
    backgroundColor: '#03C988',
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

export default TambahDataMatakuliah;
