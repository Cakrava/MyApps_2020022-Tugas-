import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View, RefreshControl, Image, TouchableOpacity, Modal, Button, ScrollView, Animated } from 'react-native';
import dataKontak from '../Flatlist/dataKontak.json';
import ProfilScreen from './ProfilScreen';
import { Icon } from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ChatScreen from './ChatScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { NavigationContainer } from '@react-navigation/native';
const Stack = createNativeStackNavigator();
export default function AddScreen() {
  return (
    <NavigationContainer independent>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen name="AddScreen" component={List}  options={{
             headerShown: false, // Menyembunyikan header pada layar ini
             
          }} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{
             headerShown: false, // Menyembunyikan header pada layar ini
             
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );}

 function List({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(dataKontak);
  const [selectedItem, setSelectedItem] = useState(null); // State untuk item yang dipilih
  const [isModalVisible, setIsModalVisible] = useState(false); // State untuk menampilkan/sembunyikan modal
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      const newData = [
        { id: 1, img: '../learn-component/Image/', username: '@Ayam', nama: 'Ayam Goreng', waktu: '13.30' },
        // Add more data as needed
      ];
      setData(newData);
      setRefreshing(false);
    }, 1000);
  }, [data]);
  
const handleItemPress = (item) => {
  navigation.navigate('ChatScreen', {
    contactName: item.nama,
    contactImg: item.img,
    contactUsername: item.username,
  });
};

  return (
  <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{backgroundColor :'white', padding : 13,flexDirection : 'row', alignItems :'center', justifyContent:'space-between'}}>
      <Text style={{fontSize : 20, fontWeight :'bold'}}>Pesan</Text>
      <View style={{flexDirection:'row', alignItems:'center'}}>
      <TouchableOpacity style={{marginRight:20}}>
         <Image
          source={require('../Src/kamera.png')} // Ganti dengan URL gambar profil Kalian
          style={{width : 30, height : 30}}
          />
      </TouchableOpacity>
      <TouchableOpacity>
         <Image
          source={require('../Src/edit.png')} // Ganti dengan URL gambar profil Kalian
          style={{width : 20, height : 20}}
          />
      </TouchableOpacity>
     </View>
     </View>



<View name="header" style={{padding:10,backgroundColor :'white'}}>
    <View style={{backgroundColor : '#dedede', borderRadius : 20, paddingBottom : 0,paddingRight : 5,paddingLeft : 5,paddingTop : -5}}>
      <View style={{flexDirection:'row', jusalignItems :'center'}}>
         <Image
          source={require('../Src/cari.png')} // Ganti dengan URL gambar profil Kalian
          style={{width : 30, height : 30, tintColor : 'grey', marginTop:5}}
          />
      <TextInput
          placeholder='Cari'
           style={{ height : 40, width : 200,}}
        />
        
          </View>
    </View>
    
 <ScrollView horizontal={true} 
          showsHorizontalScrollIndicator={false}
          style={{marginTop:10}}>
            
        <View style={{flexDirection : 'row' , justifyContent :'space-around'}}>
          <View style={{justifyContent :'center', alignItems :'center'}}>
          <Image
          source={require('../learn-component/Image/frieren.jpg')} // Ganti dengan URL gambar profil Kalian
          style={{width : 70, height : 70, borderRadius : 50, marginLeft : 15, marginRight : 15}}
          />
           <Image
          source={require('../Src/titik.png')} // Ganti dengan URL gambar profil Kalian
          style={{width : 15, height : 15, borderRadius : 50,marginTop : -20, marginLeft : 70, marginRight : 15, tintColor : 'green', borderWidth : 2, borderColor : 'white'}}
          />
          <Text style={{marginTop : 5}}>Frieren</Text>
          </View>
           <View style={{justifyContent :'center', alignItems :'center'}}>
         <Image
          source={require('../learn-component/Image/fern.jpg')} // Ganti dengan URL gambar profil Kalian
          style={{width : 70, height : 70, borderRadius : 50, marginLeft : 15, marginRight : 15}}
          />
           <Image
          source={require('../Src/titik.png')} // Ganti dengan URL gambar profil Kalian
          style={{width : 15, height : 15, borderRadius : 50,marginTop : -20, marginLeft : 70, marginRight : 15, tintColor : 'green', borderWidth : 2, borderColor : 'white'}}
          />
          <Text style={{marginTop : 5}}>FernAjah</Text>
          </View>
         <View style={{justifyContent :'center', alignItems :'center'}}>
          <Image
          source={require('../learn-component/Image/1064544.jpg')} // Ganti dengan URL gambar profil Kalian
          style={{width : 70, height : 70, borderRadius : 50, marginLeft : 15, marginRight : 15}}
          />
           <Image
          source={require('../Src/titik.png')} // Ganti dengan URL gambar profil Kalian
          style={{width : 15, height : 15, borderRadius : 50,marginTop : -20, marginLeft : 70, marginRight : 15, tintColor : 'green', borderWidth : 2, borderColor : 'white'}}
          />
          <Text style={{marginTop : 5}}>Jean_Hehe</Text>
          </View>
           <View style={{justifyContent :'center', alignItems :'center'}}>
        <Image
          source={require('../learn-component/Image/ganyu.jpeg')} // Ganti dengan URL gambar profil Kalian
          style={{width : 70, height : 70, borderRadius : 50, marginLeft : 15, marginRight : 15}}
          />
           <Image
          source={require('../Src/titik.png')} // Ganti dengan URL gambar profil Kalian
          style={{width : 15, height : 15, borderRadius : 50,marginTop : -20, marginLeft : 70, marginRight : 15, tintColor : 'green', borderWidth : 2, borderColor : 'white'}}
          />
          <Text style={{marginTop : 5}}>Ganyu si..</Text>
          </View>
           <View style={{justifyContent :'center', alignItems :'center'}}>
        
          <Image
          source={require('../learn-component/Image/1105631.jpg')} // Ganti dengan URL gambar profil Kalian
          style={{width : 70, height : 70, borderRadius : 50,marginLeft : 15, marginRight : 15}}
          />
           <Image
          source={require('../Src/titik.png')} // Ganti dengan URL gambar profil Kalian
          style={{width : 15, height : 15, borderRadius : 50,marginTop : -20, marginLeft : 70, marginRight : 15, tintColor : 'green', borderWidth : 2, borderColor : 'white'}}
          />
          <Text style={{marginTop : 5}}>SiGedek</Text>
          </View>
       
        
        </View>
        
        </ScrollView>

</View>

      <FlatList
        data={data}
        renderItem={({ item }) => (
           <TouchableOpacity onPress={() => handleItemPress(item)}>
            <View style={styles.item}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: item.img }} style={styles.image} />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View>
                    <Text style={styles.title}>{item.nama}</Text>
                    <Text style={styles.titleNama}>{item.username}</Text>
                  </View>
                  <Text style={{ fontSize: 15, color: 'grey', marginLeft: 0 }}>{item.waktu}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />

      
    </GestureHandlerRootView>
   
    
  );
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: '#f7f7f7',

  },
  headerContainer: {

    alignItems: 'center',
    paddingVertical :20,
    backgroundColor :'#fff',
    borderBottomColor : '#dedede',
    borderBottomWidth : 1,

  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth : 10,
    marginTop : 20,
    borderColor : '#fff'

  },
    galeri: {
    width: 120,
    height: 120,
    borderRadius: 10,
    borderWidth : 5,
    borderColor : '#fff'

  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop : 20,
  },
  bio: {
    marginTop :5,
    fontSize: 16,
    color: '#333',
  },
  infoContainer: {
    justifyContent : 'space-around',
    flexDirection : 'row',
    paddingVertical: 10,
    backgroundColor : '#fff',


  },
  infoSection: {

    alignItems: 'center',
  },
  infoTitle: {
    color : 'gray',
    fontSize: 16,
   
  },
  infoValue: {
     fontWeight: 'bold',
    fontSize: 18,
    

  },
  item: {
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingRight: 10,

    borderWidth: 0.5,
    borderColor: '#C0C0C0',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  titleNama: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'gray',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    margin: 10,
  },
});
