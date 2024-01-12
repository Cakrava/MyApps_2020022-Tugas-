import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import ListContact from './ListContact';
import ProfilScreen from '../Tab_bottom/ProfilScreen';
import HomeScreen from '../Tab_bottom/HomeScreen';
const Tab = createMaterialTopTabNavigator();
export default function Lat2() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {fontSize: 12},
          tabBarStyle: {backgroundColor: 'powderblue'},
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Beranda',
          }}
        />
        <Tab.Screen
          name="ListContact"
          component={ProfilScreen}
          options={{
            title: 'Data Kontak',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({});
