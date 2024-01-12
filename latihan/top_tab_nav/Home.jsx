import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

function Home({}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image
        source={{
          uri: 'https://d1j87w3j7cc3a6.cloudfront.net/newsroom/media/web/image/brandbook-logo-thumbnail-5.jpg',
        }}
        style={{width: 200, height: 100}}
      />
      <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>
        GOJEK
      </Text>
    </View>
  );
}
function SecondScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>
        Aduh Aplikasi nya Baru di bikin :(
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: 'black',
          borderRadius: 10,
          elevation: 5,
          width: 100,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}
        onPress={() => navigation.navigate('Home')}>
        <Text style={{color: 'white'}}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({});
