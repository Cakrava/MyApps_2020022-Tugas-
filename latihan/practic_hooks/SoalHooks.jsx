import { StyleSheet, Text, View,Button, TouchableOpacity, TextInput,Image } from 'react-native'
import React, { useState } from 'react';
import {Picker} from '@react-native-picker/picker';

export default function SoalHooks() {
      const [nilai1, setNilai1] = useState('');
      const [nilai2, setNilai2] = useState('');
      const [operasi, serOperation] = useState('');
      const [bentuk, setBentuk] = useState('');
      const [hasil, setHasil] = useState('');
      const [plc1, setPlc1] = useState('');
      const [plc2, setPlc2] = useState('');
      const [jdl, judul] = useState('');
const isSegitiga = bentuk === 'sgt';
const isPersegi = bentuk === 'psg';
// operasi perhitungan

 const updatePlaceholders = () => {
    if (isPersegi) {
        setPlc1('Masukkan Panjang Alas');
        setPlc2('Masukkan Tinggi');
        judul('Segitiga')
    } else if (isSegitiga) {
        setPlc1('Masukkan Panjang');
        setPlc2('Masukkan Lebar');
        judul('Persegi Panjang')
    }
  };
 const calculate = () => {
    let n1 = parseFloat(nilai1);
    let n2 = parseFloat(nilai2);
    let res = 0;

    if(isPersegi){
    switch (operasi) {
      case 'keliling':
        res = 2 * (n1 + n2); // Mengubah rumus menjadi keliling persegi panjang
       
        break;
        
      case 'luas':
        res = n1 * n2;
       
        break;

          
      default:
     
    }
        setHasil(res.toString());
     
}
else if(isSegitiga){
    res =0.5*(n1*n2)
        setHasil(res.toString());
         
}
  };
 
  return (


   
         <View style={{ flex: 1, justifyContent: 'center', padding: 16, backgroundColor: 'white', borderRadius: 20, marginTop: 200, marginBottom: 200, marginLeft : 20, marginRight : 20 }}>
   <Picker
  selectedValue={bentuk}
  onValueChange={(itemValue) => {
    setBentuk(itemValue);
    updatePlaceholders(); // Memanggil fungsi updatePlaceholders saat bentuk berubah
  }}
>
        <Picker.Item label="=Pilih Bentuk=" value="pilih" /> 
        <Picker.Item label="Segitiga" value="sgt" /> 
        <Picker.Item label="Persegi Panjang" value="psg" /> 
     
      </Picker>
      <View style ={{justifyContent :'center', alignItems :'center',marginBottom:10}}>
     <Text style ={{color : 'purple',fontSize :20}} >{jdl}</Text>
</View>
 <TextInput
          value={nilai1}
          onChangeText={setNilai1}
          placeholder={plc1}
          style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 16, padding: 8, borderRadius: 20 }}
        />
        
        <TextInput
          value={nilai2}
          onChangeText={setNilai2}
          placeholder={plc2}
          style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 16, padding: 8, borderRadius: 20 }}
        />
        <Picker 
        selectedValue={operasi} 
        onValueChange={itemValue => serOperation(itemValue)}
        enabled={!isSegitiga}> 
        <Picker.Item label="=Pilih=" value="pilih" /> 
        <Picker.Item label="Luas Persegi" value="luas" /> 
        <Picker.Item label="Keliling Persegi" value="keliling" /> 
     
      </Picker>


         <TouchableOpacity
          onPress={() => { 
            calculate ();
          }}
          style={styles.mode}>
          <Text style={styles.modetext}>Calculate</Text>
        </TouchableOpacity>
           <Text>Hasil dari perhitungan adalah :</Text>
           <View style={{justifyContent : 'center', alignItems :'center'}}>
           <Text style ={{color : 'purple',fontSize :50}} >{hasil}</Text>
           </View>
    </View>


  )
        }

const styles = StyleSheet.create({
view :{
   justifyContent: 'center', // Mengatur teks berada di tengah
    alignItems : 'center'
},
mode :{
      backgroundColor: 'purple',
    padding: 10,
    borderRadius: 20, // Mengatur tombol menjadi rounded
    justifyContent: 'center', // Mengatur teks berada di tengah
    alignItems: 'center', // Jika ingin mengatur teks vertikal di tengah
 
},
modetext :{
    fontSize: 20,
    color: 'white',
},
input :{
     
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
  }

})