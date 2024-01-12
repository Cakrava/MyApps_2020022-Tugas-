import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import screens
import LoginScreen from './Login';
import Index from './Index';
import NavMahasiswa from './Mahasiswa/NavMahasiswa';

const Stack = createNativeStackNavigator();

const App = () => {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    // Periksa token saat aplikasi dimuat
    const checkTokenUser = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      setUserToken(userToken);
    };
    checkTokenUser();
  }, []);

  const handleSetUserToken = token => {
    setUserToken(token);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken == null ? (
          <Stack.Screen name="Login" options={{headerShown: false}}>
            {props => (
              <LoginScreen {...props} setUserToken={handleSetUserToken} />
            )}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen
              name="Index"
              component={Index}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Mahasiswa"
              component={NavMahasiswa}
              options={{headerShown: false}}
            />
            {/* Silahkan kalian tambahkan juga untuk Nav Dosen dan Matakuliah Dibawah nya */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
