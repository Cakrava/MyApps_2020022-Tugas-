import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import React from 'react';
import dataKontak from './DataContact.json';

export default function ListContact({navigation}) {
  const images = {
    avatar1: require('./image/foto.jpg'),
    avatar2: require('./img/avatar2.png'),
    avatar3: require('./img/avatar3.png'),
    avatar4: require('./img/avatar4.png'),
    avatar5: require('./img/avatar5.png'),
    avatar6: require('./img/avatar6.png'),
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>List Data Contact</Text>
      <FlatList
        data={dataKontak}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Image
              source={images[item.img.split('.')[0]]}
              style={styles.circle}
            />
            <View style={styles.textContainer}>
              <Text style={styles.number}>{item.nohp}</Text>
              <Text style={styles.name}>{item.nama}</Text>
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1EFEF',
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    elevation: 3,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'transparent',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  number: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 14,
  },
});
