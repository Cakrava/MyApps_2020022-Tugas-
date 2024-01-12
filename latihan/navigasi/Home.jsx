import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SoalLat1 from '../learn-component/SoalLat1';
import SoalFlatlist from '../Flatlist/SoalFlatlist';
import SoalHooks from '../practic_hooks/SoalHooks';


function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
   
        <View style ={styles.box}>
              <Image
            source={require('../learn-component/Image/callista.png')}
            style={styles.image}
          />
             <Text style={styles.text}>Ini Adalah Halaman Home</Text>

      <View style={{flexDirection : 'row'}}>
        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Component')}
      >
      
        <Text style={styles.buttonText}>Component</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Hooks')}
      >
        <Text style={styles.buttonText}>Hooks</Text>
      </TouchableOpacity>
      </View>

      <View style={{flexDirection : 'row'}}>
        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Flatlist')}
      >
      
        <Text style={styles.buttonText}>Flatlist</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Navigation')}
      >
        <Text style={styles.buttonText}>Navigation</Text>
      </TouchableOpacity>
      </View>


         </View>
    </View>
  );
}






function ThirdScreen({navigation}) {
  return (
    
     <View style={styles.container}>
   
        <View style ={styles.box}>
              <Image
            source={require('../learn-component/Image/fern.jpg')}
            style={styles.image}
          />
             <Text style={styles.text}>Fern </Text>
     
     
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>▷</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Component" component={SoalLat1} />
        <Stack.Screen name="Hooks" component={SoalHooks} />
        <Stack.Screen name="Flatlist" component={SoalFlatlist} />
        <Stack.Screen name="Navigation" component={ThirdScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    s: 
  {
    padding :20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor :'purple',
    borderRadius : 20
    
  },
  box: {
    justifyContent :'center',
    alignItems :'center',
 backgroundColor: 'white',
    padding: 10,
    paddingLeft: 20,
    marginVertical: 5,
    marginHorizontal: 16,
    borderRadius: 20,
    borderWidth: 0.5, // Atur ketebalan border sesuai keinginan
    borderColor: '#C0C0C0', // Warna abu muda (contoh warna abu muda)
    
},

  container: 
  {

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {

    color :'purple',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    margin : 10,
    justifyContent :'center',
    backgroundColor: 'purple',
    borderRadius: 10,
    elevation: 5,
    width: 100,
    height: 40,
  },
  buttonText: {
    fontSize :15 ,
    color: 'white',
    textAlign: 'center',
  },
    image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    margin: 10,
  },
});
