import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
  Alert,
  Image,
} from 'react-native';

export default function LatMaskPassword() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const handleDataSubmission = () => {
    // Menampilkan data pada konsol (gantilah ini dengan tindakan sesungguhnya)
    console.log('Nama:', name);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: '#E5B9FF' }}>
      <View style={{ flex: 1, justifyContent: 'center', padding: 16, backgroundColor: 'white', borderRadius: 20, marginTop: 200, marginBottom: 200, marginLeft : 20, marginRight : 20 }}>
        <View style={styles.container}>
          <Image
            source={require('./Image/callista.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.judul}>
          <Text style={{ fontSize: 20, color: 'purple' }}>Callista</Text>
        </View>
        <Text>Username:</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Masukkan Username"
          style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 16, padding: 8, borderRadius: 20 }}
        />
        <Text>Email:</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Masukkan alamat email Anda"
          style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 16, padding: 8, borderRadius: 20 }}
        />
        <Text>Password:</Text>
        <View
          style={{
            flexDirection: 'row',
            borderWidth: 1,
            borderRadius: 20,
            borderColor: 'gray',
            marginBottom: 16,
          }}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Masukkan password Anda"
            secureTextEntry={!isPasswordVisible}
            style={{ flex: 1, padding: 8 }}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisibility((prevVisibility) => !prevVisibility)}
            style={{ padding: 8 }}>
            <Text>{isPasswordVisible ? 'Sembunyikan' : 'Tampilkan'}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Pesan', `Username: ${name}\nEmail: ${email}\nPassword: ${password}`);
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

       
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 20, // Mengatur tombol menjadi rounded
    justifyContent: 'center', // Mengatur teks berada di tengah
    alignItems: 'center', // Jika ingin mengatur teks vertikal di tengah
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  judul: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    margin: 10,
  },
});
