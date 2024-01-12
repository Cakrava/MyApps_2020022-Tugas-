import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import TrendingScreen from './VideoScreen/TrendingScreen';
import TagarScreen from './VideoScreen/TagarScreen';
import FollowingScreen from './VideoScreen/FollowingScreen';

const Tab = createMaterialTopTabNavigator();
export default function Lat2() {
  return (
    <NavigationContainer independent>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {fontSize: 12},
          tabBarStyle: {backgroundColor: 'white'}, // Mengubah latar belakang menjadi putih
        }}>
        <Tab.Screen
          name="Trending"
          component={TrendingScreen}
          options={{
            title: 'Trending',  
          }}
        />
        <Tab.Screen
          name="Tagar"
          component={TagarScreen}
          options={{
            title: 'Hashtag',
          }}
        />
         <Tab.Screen
          name="Following"
          component={FollowingScreen}
          options={{
            title: 'Mengikuti',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({});
