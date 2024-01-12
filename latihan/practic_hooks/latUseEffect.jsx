import {StyleSheet, Text, View} from 'react-native'; 
import React, {useState, useEffect} from 'react'; 
 
export default function LatUseEffect() { 
  const [message, setMessage] = useState(''); 
 
  useEffect(() => { 
    setMessage('Selamat datang di aplikasi kami!'); 
    return () => { 
      // Bersihkan resource jika perlu, seperti event listeners atau timers. 
    }; 
  }, []); // Array kosong berarti useEffect hanya dijalankan sekali setelah render pertama. 
 
  return ( 
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
      <Text>{message}</Text> 
    </View> 
  ); 
} 
 
const styles = StyleSheet.create({});