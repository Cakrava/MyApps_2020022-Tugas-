import React from 'react';
import { Animated, Image, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfilScreen from './ProfilScreen';
import HomeScreen from './HomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import VideoScreen from './VideoScreen';
import AddScreen from './AddScreen';
import MessageScreen from './MessageScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppNavigator from './AppNavigator';

const Tab = createBottomTabNavigator();

export default function Lat1() {
  return (
    <NavigationContainer>
      <Tab.Navigator
       screenOptions={({ route }) => ({

          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Profil') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Video') {
              iconName = focused ? 'videocam' : 'videocam-outline'; // Menambahkan ikon "Video"
            } else if (route.name === 'Add') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';

            } else if (route.name === 'Message') {
              iconName = focused ? 'chatbox' : 'chatbox-outline';
            }

            if (iconName) {
              return <Icon name={iconName} size={size} color={color} />;
            } else {
              return null; // atau tindakan lain sesuai kebutuhan Anda jika iconName adalah undefined
            }
          },
          tabBarActiveTintColor: 'purple',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{
             headerShown: false, // Menyembunyikan header pada layar ini
             
          }} />
        <Tab.Screen name="Video" component={VideoScreen}  options={{
             headerShown: false, // Menyembunyikan header pada layar ini
             
          }}/>
          
   
        <Tab.Screen name="Add" component={AddScreen} options={{
           headerShown : false
          }}/>
        <Tab.Screen name="Message" component={MessageScreen} options={{
           title : 'Pesan',
          }}/>
        <Tab.Screen name="Profil" component={ProfilScreen} options={{
            
             title : '@ini_callista',tabBarLabel :'Profil'
   
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
