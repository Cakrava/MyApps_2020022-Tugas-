import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Favorit from './detail/Favorit';
import Tag from './detail/Tag';

import Icon from 'react-native-vector-icons/Ionicons';
import Album from './detail/Album';

const Tab = createMaterialTopTabNavigator();

const ProfilScreen = () => {
  return (
        <NavigationContainer independent={true} >
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
      <View style={{flexDirection : 'row'}}>

        <Image
          source={require('../learn-component/Image/callista.png')} // Ganti dengan URL gambar profil Kalian
          style={styles.profileImage}
          />
         
          <View style={{justifyContent :'space-around'}}>

           <View style={styles.infoContainer}>
        <View style={styles.infoSection}>
          <Text style={styles.infoValue}>120</Text>
          <Text style={styles.infoTitle}>Postingan</Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.infoValue}>300</Text>
          <Text style={styles.infoTitle}>Pengikut</Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.infoValue}>150</Text>
          <Text style={styles.infoTitle}>Mengikuti</Text>
        </View>
      </View>
      </View>


          </View>
         
        <Text style={styles.name}>Callista</Text>
        <Text style={{marginLeft:18}}>Art Commission, Contact me if you want to order</Text>
       
       <View style={{flexDirection : 'row', justifyContent : 'space-around', marginTop : 10}}>
        <TouchableOpacity style={styles.tombol}>
        <Text style={styles.nametag}>Edit profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tombol}>
        <Text style={styles.nametag}>Bagikan profile</Text>
        </TouchableOpacity >
        <TouchableOpacity style={styles.tombolakun}>
          <Image
        source={require('../Src/orang.png')}
        style={{width : 20,height : 20}}
      />
        </TouchableOpacity >
       </View>

         <View style={{flexDirection : 'row' ,marginTop : 20}}>
        
        <TouchableOpacity style={{justifyContent :'center', alignItems :'center'}}>
            <Image
          source={require('../learn-component/Image/callista.png')} // Ganti dengan URL gambar profil Kalian
          style={{width : 70, height : 70, borderRadius : 50, marginLeft : 15, marginRight : 15,borderColor : 'grey',borderWidth : 2}}
          />
          <Text style={{marginTop : 10}}>Commission</Text>
          </TouchableOpacity>
        
        <TouchableOpacity style={{justifyContent :'center', alignItems :'center'}}>
                    <Image
          source={require('../learn-component/Image/frieren.jpg')} // Ganti dengan URL gambar profil Kalian
          style={{width : 70, height : 70, borderRadius : 50,borderColor : 'grey',borderWidth : 2, marginLeft : 15, marginRight : 15}}
          />
          <Text style={{marginTop : 10}}>Ultah</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{justifyContent :'center', alignItems :'center'}}>
          
                  <Icon name='add' size={70} style={{width : 70, height : 70, borderRadius : 50,borderColor : 'grey',borderWidth : 2, marginLeft : 15, marginRight : 15}}
         ></Icon>
          <Text style={{marginTop : 10}}>Baru</Text>
         </TouchableOpacity>
         
          </View>
      </View>
     



      
     
    </ScrollView>
 
      <Tab.Navigator
        screenOptions={({ route }) => ({

          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Album') {
              iconName = focused ? 'apps' : 'apps-outline';
            } else if (route.name === 'Favorit') {
              iconName = focused ? 'sparkles' : 'sparkles-outline';

            } else if (route.name === 'Tag') {
              iconName = focused ? 'bookmark' : 'bookmark-outline';
            }

            if (iconName) {
              return <Icon name={iconName} size={20} color={color} />;
            } else {
              return null; // atau tindakan lain sesuai kebutuhan Anda jika iconName adalah undefined
            }
          },
          tabBarActiveTintColor: 'purple',
          tabBarInactiveTintColor: 'gray',
        })}
     style={{marginTop : -120}}
     >
        <Tab.Screen
          name="Album"
          component={Album}
          options={{
            tabBarShowLabel : false
            
          }}
        />
        <Tab.Screen
          name="Favorit"
          component={Favorit}
          options={{
            tabBarShowLabel : false
            
           
          }}
        />
         <Tab.Screen
          name="Tag"
          component={Tag}
          options={{
             tabBarShowLabel : false
            
          
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
      
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

  },
   galeri: {
    width: 120,
    height: 120,
    borderRadius: 10,
    borderWidth : 5,
    borderColor : '#fff'

  },
  headerContainer: {
    padding : 10,
    backgroundColor :'#fff',
  

  },
  profileImage: {
    marginTop : -20,
    width: 100,
    height: 100,
    borderRadius: 60,
    borderWidth : 10,

    borderColor : '#fff'

  },
  tombol :{
    backgroundColor : '#dedede',
    width : 150,
    height : 30,
    // marginLeft : 20,
    justifyContent : 'center',
    alignItems : 'center',
    borderRadius: 10,
  },
  tombolakun :{
    backgroundColor : '#dedede',
    width : 50,
    height : 30,
    justifyContent : 'center',
    alignItems : 'center',
    borderRadius: 10,
  },
    
  name: {
    marginLeft : 18,
    fontSize: 15,
    fontWeight: 'bold',
    marginTop : 10,
  },
  bio: {
    marginTop :5,
    fontSize: 16,
    color: '#333',
  },
  infoContainer: {
    marginLeft : 15,
    justifyContent : 'space-around',
    flexDirection : 'row',
    paddingVertical: 10,
    backgroundColor : '#fff',


  },
  infoSection: {

    alignItems: 'center',
  },
  infoTitle: {
    marginLeft : 20,
    color : 'gray',
    fontSize: 16,
   
  },
  infoValue: {
     fontWeight: 'bold',
    fontSize: 18,
    marginLeft : 20,
    

  },
});

export default ProfilScreen;
