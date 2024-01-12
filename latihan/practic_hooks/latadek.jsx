import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react';
import {Picker} from '@react-native-picker/picker';


export default function latadek() {
    const [nilai1, setNilai1] = useState ('');
    const [nilai2, setNilai2] = useState ('');
    const [bentuk, setBentuk] = useState ('');
    const [hasil, setHasil] = useState ('');
    const [operasi, setOperasi] = useState ('');
   


  return (
    <View >
       <TextInput
          value={nilai1}
          onChangeText={setNilai1}
          placeholder='Masukkan Nilai Panjang'
          style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 16, padding: 8, borderRadius: 20 }}
        />
           <TextInput
          value={nilai1}
          onChangeText={setNilai1}
          placeholder='Masukkan Nilai Lebar'
          style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 16, padding: 8, borderRadius: 20 }}
        />
        
    </View>
   
  )
}

const styles = StyleSheet.create({})