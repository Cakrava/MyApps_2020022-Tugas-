import { StyleSheet, Text, View , Image, ScrollView, TouchableOpacity} from 'react-native'
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';


export default function HomeScreen() {
    const [isFilled, setIsFilled] = useState(false);

  const toggleLove = () => {
    setIsFilled(!isFilled);
  };

  return (
    <View style={{backgroundColor :'white'}}>
    <View style={{backgroundColor :'white', padding : 13,flexDirection : 'row', alignItems :'center', justifyContent:'space-between'}}>
       <Image
          source={require('../Src/chochiku.png')} // Ganti dengan URL gambar rprofil Kalian
          style={{width : '30%', height : 30,marginLeft : 10}}
          />
      <View style={{flexDirection :'row'}}>
      <Icon style={{marginRight : 20}} name="mail-outline" size={25}></Icon>
      <Icon name="alert-circle-outline" size={25}></Icon>
    </View>
    </View>
    
    <ScrollView style={{padding : 10}}>
     
     <View style={{ backgroundColor : '#fff', padding : 10, borderRadius : 5}}>
    

 <ScrollView horizontal={true} 
          showsHorizontalScrollIndicator={false}>
            
        <View style={{flexDirection : 'row' , justifyContent :'space-around'}}>
          <View style={{justifyContent :'center', alignItems :'center'}}>
            <Image
          source={require('../learn-component/Image/callista.png')} // Ganti dengan URL gambar profil Kalian
          style={{width : 70, height : 70, borderRadius : 50, marginLeft : 15, marginRight : 15}}
          />
            <Image
          source={require('../Src/plus.png')} // Ganti dengan URL gambar profil Kalian
          style={{backgroundColor:'white',width : 15, height : 15, borderRadius : 50,marginTop : -20, marginLeft : 70, marginRight : 15, tintColor : 'grey', borderWidth : 2, borderColor : 'white'}}
          />
          <Text style={{marginTop :5}}>Anda</Text>
          </View>
        
          <View style={{justifyContent :'center', alignItems :'center'}}>
          <Image
          source={require('../learn-component/Image/frieren.jpg')} // Ganti dengan URL gambar profil Kalian
          style={{width : 70, height : 70, borderRadius : 50,borderColor : 'green',borderWidth : 2, marginLeft : 15, marginRight : 15}}
          />
          <Text>Frieren</Text>
          </View>
           <View style={{justifyContent :'center', alignItems :'center'}}>
         <Image
          source={require('../learn-component/Image/fern.jpg')} // Ganti dengan URL gambar profil Kalian
          style={{width : 70, height : 70, borderRadius : 50,borderColor : 'green',borderWidth : 2, marginLeft : 15, marginRight : 15}}
          /><Text>FernAjah</Text>
          </View>
         <View style={{justifyContent :'center', alignItems :'center'}}>
          <Image
          source={require('../learn-component/Image/1064544.jpg')} // Ganti dengan URL gambar profil Kalian
          style={{width : 70, height : 70, borderRadius : 50, marginLeft : 15, marginRight : 15}}
          /><Text>Jean_Hehe</Text>
          </View>
           <View style={{justifyContent :'center', alignItems :'center'}}>
        <Image
          source={require('../learn-component/Image/ganyu.jpeg')} // Ganti dengan URL gambar profil Kalian
          style={{width : 70, height : 70, borderRadius : 50,borderColor : 'green',borderWidth : 2, marginLeft : 15, marginRight : 15}}
          /><Text>Ganyu si..</Text>
          </View>
           <View style={{justifyContent :'center', alignItems :'center'}}>
        
          <Image
          source={require('../learn-component/Image/1105631.jpg')} // Ganti dengan URL gambar profil Kalian
          style={{width : 70, height : 70, borderRadius : 50,borderColor : 'green',borderWidth : 2, marginLeft : 15, marginRight : 15}}
          /><Text>SiGedek</Text>
          </View>
       
        
        </View>
        
        </ScrollView>
       
          </View>
          
         
        <View  style ={{borderColor : 'gray', marginTop : 10, borderWidth: 0.2, backgroundColor : '#fff', borderRadius : 5, padding : 10 }}>
       <View style ={{flexDirection : 'row'}}>
          <Image
          source={require('../learn-component/Image/fern.jpg')} // Ganti dengan URL gambar profil Kalian
          style={{width : 30, height : 30, borderRadius : 30}}
        />
        <Text style={{fontSize : 15, marginLeft: 10, marginTop: 5}}>FernAjah</Text>
        </View> 
         <View style ={{flexDirection : 'row'}}>
        
        <Text style={{fontSize : 15, marginLeft: 10, marginTop: 5}}>Jika Anda memiliki impian, jangan hanya berpikir tentang itu. Jadikan impian itu sebagai tujuan, dan buat rencana untuk mencapainya. Aksi adalah kunci kesuksesan! 🌟🎯 #Impian #Kesuksesan</Text>
        </View>
     
       <View style ={{flexDirection : 'row', justifyContent : 'space-around', marginTop : 15}}>
           <TouchableOpacity onPress={toggleLove}>
      <Icon
        name={isFilled ? 'heart' : 'heart-outline'} // Menggunakan ikon 'heart' atau 'heart-outline' berdasarkan isFilled
        size={20}
        color={isFilled ? 'red' : 'black'} // Mengubah warna ikon berdasarkan isFilled
      />
    </TouchableOpacity>
           <Image
          source={require('../learn-component/Image/komen.png')} // Ganti dengan URL gambar profil Kalian
          style={{width : 20, height : 20}}
        />
           <Image
          source={require('../learn-component/Image/post.png')} // Ganti dengan URL gambar profil Kalian
          style={{width : 20, height : 20}}
        />
           <Image
          source={require('../learn-component/Image/share.png')} // Ganti dengan URL gambar profil Kalian
          style={{width : 20, height : 20}}
        />
        </View> 
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5 }}>
   <Text style={{color :'gray'}}>400k</Text>
   <Text style={{color :'gray'}}>200k</Text>
   <Text style={{color :'gray'}}>140k</Text>
   <Text style={{color :'gray'}}>15k</Text>
</View>
    </View>

    <View  style ={{borderColor : 'gray', marginTop : 10, borderWidth: 0.2, backgroundColor : '#fff', borderRadius : 5, padding : 10 }}>
       <View style ={{flexDirection : 'row'}}>
          <Image
          source={require('../Src/shope_logo.png')} // Ganti dengan URL gambar profil Kalian
          style={{width : 30, height : 30, borderRadius : 30}}
        />
        <Text style={{fontSize : 15, marginLeft: 10, marginTop: 5}}>Shope ID</Text>
        </View> 
         <View style ={{flexDirection : 'row'}}>
        
        <Text style={{fontSize : 15, marginLeft: 10, marginTop: 5}}>Hai Shopee-fellas! Siap-siap untuk serbu promo hebat #Shopee88 pada tanggal 8 Agustus nanti. Diskon gila-gilaan dan kesempatan untuk menang hadiah menarik akan menanti kamu! 🎉🛍️ #ShopeePromo</Text>
        </View>
      <View style={{justifyContent : 'center', marginTop : 10,}}>
         <Image
          source={require('../Src/shope_promo.jpg')} // Ganti dengan URL gambar profil Kalian
          style={{width : '100%', height : 200, borderRadius: 10,justifyContent : 'center'}}
        />
         
      </View>
       <View style ={{flexDirection : 'row', justifyContent : 'space-around', marginTop : 15}}>
           <TouchableOpacity onPress={toggleLove}>
      <Icon
        name={isFilled ? 'heart' : 'heart-outline'} // Menggunakan ikon 'heart' atau 'heart-outline' berdasarkan isFilled
        size={20}
        color={isFilled ? 'red' : 'black'} // Mengubah warna ikon berdasarkan isFilled
      />
    </TouchableOpacity>
           <Image
          source={require('../learn-component/Image/komen.png')} // Ganti dengan URL gambar profil Kalian
          style={{width : 20, height : 20}}
        />
           <Image
          source={require('../learn-component/Image/post.png')} // Ganti dengan URL gambar profil Kalian
          style={{width : 20, height : 20}}
        />
           <Image
          source={require('../learn-component/Image/share.png')} // Ganti dengan URL gambar profil Kalian
          style={{width : 20, height : 20}}
        />
        </View> 
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5 }}>
   <Text style={{color :'gray'}}>400k</Text>
   <Text style={{color :'gray'}}>200k</Text>
   <Text style={{color :'gray'}}>140k</Text>
   <Text style={{color :'gray'}}>15k</Text>
</View>
    </View>


    <View  style ={{borderColor : 'gray', marginTop : 10, borderWidth: 0.2, backgroundColor : '#fff', borderRadius : 5, padding : 10 }}>
       <View style ={{flexDirection : 'row'}}>
          <Image
          source={require('../learn-component/Image/callista.png')} // Ganti dengan URL gambar profil Kalian
          style={{width : 30, height : 30, borderRadius : 30}}
        />
        <Text style={{fontSize : 15, marginLeft: 10, marginTop: 5}}>Callista</Text>
        </View> 
         <View style ={{flexDirection : 'row'}}>
        
        <Text style={{fontSize : 15, marginLeft: 10, marginTop: 5}}>Aku baru aja upload, banyak kesibukan ngurusin skripsi kuliah, pusing mikir judul, akhirnya dapet mood dikit buat nge Art😁🎉</Text>
        </View>
      <View style={{justifyContent : 'center', marginTop : 10,}}>
         <Image
          source={require('../learn-component/Image/1064544.jpg')} // Ganti dengan URL gambar profil Kalian
          style={{width : 350, height : 400, borderRadius: 10,justifyContent : 'center'}}
        />
         
      </View>
       <View style ={{flexDirection : 'row', justifyContent : 'space-around', marginTop : 15}}>
           <TouchableOpacity onPress={toggleLove}>
      <Icon
        name={isFilled ? 'heart' : 'heart-outline'} // Menggunakan ikon 'heart' atau 'heart-outline' berdasarkan isFilled
        size={20}
        color={isFilled ? 'red' : 'black'} // Mengubah warna ikon berdasarkan isFilled
      />
    </TouchableOpacity>
           <Image
          source={require('../learn-component/Image/komen.png')} // Ganti dengan URL gambar profil Kalian
          style={{width : 20, height : 20}}
        />
           <Image
          source={require('../learn-component/Image/post.png')} // Ganti dengan URL gambar profil Kalian
          style={{width : 20, height : 20}}
        />
           <Image
          source={require('../learn-component/Image/share.png')} // Ganti dengan URL gambar profil Kalian
          style={{width : 20, height : 20}}
        />
        </View> 
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5 }}>
   <Text style={{color :'gray'}}>400k</Text>
   <Text style={{color :'gray'}}>200k</Text>
   <Text style={{color :'gray'}}>140k</Text>
   <Text style={{color :'gray'}}>15k</Text>
</View>
    </View>
    <View  style ={{borderColor : 'gray', marginTop : 10, borderWidth: 0.2, backgroundColor : '#fff', borderRadius : 5, padding : 10 }}>
       <View style ={{flexDirection : 'row'}}>
          <Image
          source={require('../Src/tsel_logo.jpg')} // Ganti dengan URL gambar profil Kalian
          style={{width : 30, height : 30, borderRadius : 30}}
        />
        <Text style={{fontSize : 15, marginLeft: 10, marginTop: 5}}>Telkomsel</Text>
        </View> 
         <View style ={{flexDirection : 'row'}}>
        
        <Text style={{fontSize : 15, marginLeft: 10, marginTop: 5}}>📢 Super Deal Alert! 📢 Dapatkan 25GB kuota data dengan hanya Rp100ribu! Kesempatan istimewa ini tidak boleh dilewatkan. Segera aktifkan paketmu dan nikmati akses internet super cepat tanpa khawatir habis kuota. 😄 #SuperDeal #InternetMurah #Hemat</Text>
        </View>
      <View style={{justifyContent : 'center', marginTop : 10,}}>
         <Image
          source={require('../Src/tsel_promo.jpeg')} // Ganti dengan URL gambar profil Kalian
          style={{width : '100%', height : 200, borderRadius: 10,justifyContent : 'center'}}
        />
         
      </View>
       <View style ={{flexDirection : 'row', justifyContent : 'space-around', marginTop : 15}}>
           <TouchableOpacity onPress={toggleLove}>
      <Icon
        name={isFilled ? 'heart' : 'heart-outline'} // Menggunakan ikon 'heart' atau 'heart-outline' berdasarkan isFilled
        size={20}
        color={isFilled ? 'red' : 'black'} // Mengubah warna ikon berdasarkan isFilled
      />
    </TouchableOpacity>
           <Image
          source={require('../learn-component/Image/komen.png')} // Ganti dengan URL gambar profil Kalian
          style={{width : 20, height : 20}}
        />
           <Image
          source={require('../learn-component/Image/post.png')} // Ganti dengan URL gambar profil Kalian
          style={{width : 20, height : 20}}
        />
           <Image
          source={require('../learn-component/Image/share.png')} // Ganti dengan URL gambar profil Kalian
          style={{width : 20, height : 20}}
        />
        </View> 
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5 }}>
   <Text style={{color :'gray'}}>400k</Text>
   <Text style={{color :'gray'}}>200k</Text>
   <Text style={{color :'gray'}}>140k</Text>
   <Text style={{color :'gray'}}>15k</Text>
</View>
    </View>

    <View style={{ borderColor: 'gray',marginTop : 10, borderWidth: 0.2, backgroundColor: '#fff', borderRadius: 10, padding: 10 }}>
  <View style={{ flexDirection: 'row' }}>
    <Image
      source={require('../learn-component/Image/callista.png')}
      style={{ width: 30, height: 30, borderRadius: 30 }}
    />
    <Text style={{ fontSize: 20, marginLeft: 10, marginTop: 5 }}>Callista</Text>
  </View>
  <View style={{ flexDirection: 'row' }}>
    <Text style={{ fontSize: 15, marginLeft: 10, marginTop: 5 }}>Sedang menikmati sore yang indah di luar! 🌞</Text>
  </View>
  <View style={{ justifyContent: 'center', marginTop: 5 }}>
    <Image
      source={require('../learn-component/Image/fern.jpg')}
      style={{ width: 350, height: 400, borderRadius: 10, justifyContent: 'center' }}
    />
  </View>
   
  <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>
    <TouchableOpacity onPress={toggleLove}>
      <Icon
        name={isFilled ? 'heart' : 'heart-outline'} // Menggunakan ikon 'heart' atau 'heart-outline' berdasarkan isFilled
        size={20}
        color={isFilled ? 'red' : 'black'} // Mengubah warna ikon berdasarkan isFilled
      />
    </TouchableOpacity>
    <Image
      source={require('../learn-component/Image/komen.png')}
      style={{ width: 20, height: 20 }}
    />
    <Image
      source={require('../learn-component/Image/post.png')}
      style={{ width: 20, height: 20 }}
    />
    <Image
      source={require('../learn-component/Image/share.png')}
      style={{ width: 20, height: 20 }}
    />
  </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5 }}>
   <Text style={{color :'gray'}}>400k</Text>
   <Text style={{color :'gray'}}>200k</Text>
   <Text style={{color :'gray'}}>140k</Text>
   <Text style={{color :'gray'}}>15k</Text>
</View>
</View>



  <View  style ={{borderColor : 'gray', marginTop : 10, borderWidth: 0.2, backgroundColor : '#fff', borderRadius : 5, padding : 10 }}>
       <View style ={{flexDirection : 'row'}}>
          <Image
          source={require('../learn-component/Image/ganyu.jpeg')} // Ganti dengan URL gambar profil Kalian
          style={{width : 30, height : 30, borderRadius : 30}}
        />
        <Text style={{fontSize : 15, marginLeft: 10, marginTop: 5}}>Ganyu si kambing gunung</Text>
        </View> 
         <View style ={{flexDirection : 'row'}}>
        
        <Text style={{fontSize : 15, marginLeft: 10, marginTop: 5}}>Jangan pernah ragu untuk mencoba hal baru. Itu adalah cara untuk tumbuh dan berkembang. Siapa tahu, Anda mungkin menemukan sesuatu yang luar biasa! 🚀✨          #CobaHalBaru #Tumbuh</Text>
        </View>
     
       <View style ={{flexDirection : 'row', justifyContent : 'space-around', marginTop : 15}}>
           <TouchableOpacity onPress={toggleLove}>
      <Icon
        name={isFilled ? 'heart' : 'heart-outline'} // Menggunakan ikon 'heart' atau 'heart-outline' berdasarkan isFilled
        size={20}
        color={isFilled ? 'red' : 'black'} // Mengubah warna ikon berdasarkan isFilled
      />
    </TouchableOpacity>
           <Image
          source={require('../learn-component/Image/komen.png')} // Ganti dengan URL gambar profil Kalian
          style={{width : 20, height : 20}}
        />
           <Image
          source={require('../learn-component/Image/post.png')} // Ganti dengan URL gambar profil Kalian
          style={{width : 20, height : 20}}
        />
           <Image
          source={require('../learn-component/Image/share.png')} // Ganti dengan URL gambar profil Kalian
          style={{width : 20, height : 20}}
        />
        </View> 
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5 }}>
   <Text style={{color :'gray'}}>400k</Text>
   <Text style={{color :'gray'}}>200k</Text>
   <Text style={{color :'gray'}}>140k</Text>
   <Text style={{color :'gray'}}>15k</Text>
</View>
    </View>

<View style={{ borderColor: 'gray',marginTop : 10, borderWidth: 0.2, backgroundColor: '#fff', borderRadius: 10, padding: 10 }}>
  <View style={{ flexDirection: 'row' }}>
    <Image
      source={require('../learn-component/Image/callista.png')}
      style={{ width: 30, height: 30, borderRadius: 30 }}
    />
    <Text style={{ fontSize: 20, marginLeft: 10, marginTop: 5 }}>Callista</Text>
  </View>
  <View style={{ flexDirection: 'row' }}>
    <Text style={{ fontSize: 15, marginLeft: 10, marginTop: 5 }}>Hari ini cuacanya cerah banget! 🌞</Text>
  </View>
  <View style={{ justifyContent: 'center', marginTop: 5 }}>
    <Image
      source={require('../learn-component/Image/frieren.jpg')}
      style={{ width: 350, height: 400, borderRadius: 10, justifyContent: 'center' }}
    />
  </View>
  <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>
    <TouchableOpacity onPress={toggleLove}>
      <Icon
        name={isFilled ? 'heart' : 'heart-outline'} // Menggunakan ikon 'heart' atau 'heart-outline' berdasarkan isFilled
        size={20}
        color={isFilled ? 'red' : 'black'} // Mengubah warna ikon berdasarkan isFilled
      />
    </TouchableOpacity>
    <Image
      source={require('../learn-component/Image/komen.png')}
      style={{ width: 20, height: 20 }}
    />
    <Image
      source={require('../learn-component/Image/post.png')}
      style={{ width: 20, height: 20 }}
    />
    <Image
      source={require('../learn-component/Image/share.png')}
      style={{ width: 20, height: 20 }}
    />
  </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5 }}>
   <Text style={{color :'gray'}}>400k</Text>
   <Text style={{color :'gray'}}>200k</Text>
   <Text style={{color :'gray'}}>140k</Text>
   <Text style={{color :'gray'}}>15k</Text>
</View>
</View>
<View style={{ borderColor: 'gray',marginTop : 10, marginBottom : 15, borderWidth: 0.2, backgroundColor: '#fff', borderRadius: 10, padding: 10 }}>
  <View style={{ flexDirection: 'row' }}>
    <Image
      source={require('../learn-component/Image/callista.png')}
      style={{ width: 30, height: 30, borderRadius: 30 }}
    />
    <Text style={{ fontSize: 20, marginLeft: 10, marginTop: 5 }}>Callista</Text>
  </View>
  <View style={{ flexDirection: 'row' }}>
    <Text style={{ fontSize: 15, marginLeft: 10, marginTop: 5 }}>Momen indah bersama teman-teman! 🥳📸</Text>
  </View>
  <View style={{ justifyContent: 'center', marginTop: 5 }}>
    <Image
      source={require('../learn-component/Image/ganyu.jpeg')}
      style={{ width: 350, height: 400, borderRadius: 10, justifyContent: 'center' }}
    />
  </View>
  <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>
    <TouchableOpacity onPress={toggleLove}>
      <Icon
        name={isFilled ? 'heart' : 'heart-outline'} // Menggunakan ikon 'heart' atau 'heart-outline' berdasarkan isFilled
        size={20}
        color={isFilled ? 'red' : 'black'} // Mengubah warna ikon berdasarkan isFilled
      />
    </TouchableOpacity>
    <Image
      source={require('../learn-component/Image/komen.png')}
      style={{ width: 20, height: 20 }}
    />
    <Image
      source={require('../learn-component/Image/post.png')}
      style={{ width: 20, height: 20 }}
    />
    <Image
      source={require('../learn-component/Image/share.png')}
      style={{ width: 20, height: 20 }}
    />
  </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5 }}>
   <Text style={{color :'gray'}}>400k</Text>
   <Text style={{color :'gray'}}>200k</Text>
   <Text style={{color :'gray'}}>140k</Text>
   <Text style={{color :'gray'}}>15k</Text>
</View>
</View>

    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({})