import React from 'react';
import {Animated, Image, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MhNav from './Mahasiswa/MhNav';
import DsnNav from './Dosen/DsnNav';
import MtkNav from './Matakuliah/MtkNav';

import DataMatakuliah from './Matakuliah/DataMatakuliah';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Mahasiswa') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'Matakuliah') {
              iconName = focused ? 'book' : 'book-outline'; // Menambahkan ikon "Video"
            } else if (route.name === 'Dosen') {
              iconName = focused ? 'person' : 'person-outline'; // Menambahkan ikon "Video"
            }

            if (iconName) {
              return <Icon name={iconName} size={size} color={color} />;
            } else {
              return null; // atau tindakan lain sesuai kebutuhan Anda jika iconName adalah undefined
            }
          },

          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen
          name="Mahasiswa"
          component={MhNav}
          options={{
            headerShown: false, // Menyembunyikan header pada layar ini
            tabBarActiveTintColor: '#39A7FF',
          }}
        />

        <Tab.Screen
          name="Dosen"
          component={DsnNav}
          options={{
            headerShown: false,
            tabBarActiveTintColor: 'tomato',
          }}
        />
        <Tab.Screen
          name="Matakuliah"
          component={MtkNav}
          options={{
            headerShown: false,
            tabBarActiveTintColor: '#03C988',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
