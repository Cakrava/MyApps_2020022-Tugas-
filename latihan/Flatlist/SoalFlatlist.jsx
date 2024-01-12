import {FlatList, StyleSheet, Text, View, RefreshControl, Image} from 'react-native';
import React, {useState} from 'react';
import dataKontak from './dataKontak.json';


export default function SoalFlatlist() {
    
const [refreshing, setRefreshing] = useState(false); // State untuk Refresh
const [data, setData] = useState(dataKontak); // State untuk data
const onRefresh = React.useCallback(() => {
setRefreshing(true);
// Simulasi fetch data baru
setTimeout(() => {
const newData = [...data, {id : 1,img : './img/avatar1.png',nomor: '200311', nama: 'Ayam Goreng', waktu : '13.30'}];
setData(newData);
setRefreshing(false);
}, 1000);
}, [data]);


    
  return (
  <View
style={{
flex: 1,
justifyContent: 'center',

}}><View style ={{justifyContent :'center', alignItems:'center', backgroundColor :'purple', marginBottom :10, padding: 10, flexDirection :'row'}}>

    <Text style={{color : 'white', fontSize :20}}>Daftar Kontak</Text>
       <Image
          source={{  }}
          style={{}}
        />

</View>
<FlatList
  data={data}
  renderItem={({item}) => (
    <View style={styles.item}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{ uri: item.img }}
          style={styles.image}
        />

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
          <Text style={styles.title}>{item.nama}</Text>
      <Text style={styles.titleNama}>{item.nomor}</Text>
</View> 
          
          <Text style={{ fontSize: 15, color: 'grey', marginLeft: 10 }}>{item.waktu}</Text>
        </View>
      </View>

    </View>
  )}
  keyExtractor={(item, index) => index.toString()}
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }
/>

</View>
);
}

  
const styles = StyleSheet.create({
item: {
 backgroundColor: 'white',
    padding: 10,
    paddingLeft: 20,
    marginVertical: 5,
    marginHorizontal: 16,
    borderRadius: 1,
    borderWidth: 0.5, // Atur ketebalan border sesuai keinginan
    borderColor: '#C0C0C0', // Warna abu muda (contoh warna abu muda)
    
},
title: {
fontSize: 20,
fontWeight: 'bold',
color: 'black',
},
titleNama: {
fontSize: 15,
fontWeight: 'bold',
color: '#C2D9FF',
},
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    margin: 10,
  },
})