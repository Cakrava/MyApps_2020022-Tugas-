import { StyleSheet, Text, View, Image} from 'react-native'
import React from 'react'

export default function Favorit() {
  return (
    <View style={{backgroundColor : 'white'}}>
      

      <View style={{flexDirection : 'row',backgroundColor : 'white', marginLeft : 15, marginRight : 15, justifyContent : 'space-around'}}>
         <Image
          source={require('./Image/fern.jpg')} // Ganti dengan URL gambar profil Kalian
          style={styles.galeri}
        />
          <Image
          source={require('./Image/frieren.jpg')} // Ganti dengan URL gambar profil Kalian
          style={styles.galeri}
        />
          <Image
          source={require('./Image/ganyu.jpeg')} // Ganti dengan URL gambar profil Kalian
          style={styles.galeri}
        />
      </View>
       <View style={{flexDirection : 'row', marginLeft : 15, backgroundColor : 'white',marginRight : 15, justifyContent : 'space-around'}}>
         <Image
          source={require('./Image/1064544.jpg')} // Ganti dengan URL gambar profil Kalian
          style={styles.galeri}
        />
          <Image
          source={require('./Image/1105631.jpg')} // Ganti dengan URL gambar profil Kalian
          style={styles.galeri}
        />
          <Image
          source={require('./Image/1109233.jpg')} // Ganti dengan URL gambar profil Kalian
          style={styles.galeri}
        />
      </View>
       
      

    </View>
  )
}




const styles = StyleSheet.create({
 galeri: {
    width: 120,
    height: 120,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: '#fff',
    margin: 5,
  },
})