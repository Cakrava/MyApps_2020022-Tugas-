// 01 halaman DetailMatakuliah.js atau komponen yang sesuai
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import {apiMatakuliah} from '../API';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailMatakuliah = ({route}) => {
  const {kode_2020022} = route.params; // Mengambil NIM yang diteruskan sebagai parameter
  const navigation = useNavigation();
  const [matakuliah, setMatakuliah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const fetchData = async () => {
        try {
          let token = await AsyncStorage.getItem('userToken');
          const response = await fetch(`${apiMatakuliah}/${kode_2020022}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const json = await response.json();
          setMatakuliah(json);
        } catch (error) {
          setError('Tidak dapat memuat data');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    });
    return unsubscribe;
  }, [navigation, kode_2020022]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }
  const editmatakuliah = () => {
    console.log('adad');
    navigation.navigate('EditMatakuliah', {
      kode_2020022: matakuliah.kode_2020022,
    });
  };

  return (
    <View style={styles.container}>
      {matakuliah && (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.subHeader}>
              <View style={styles.headerAkhir}>
                <Text style={styles.title}> Matakuliah</Text>
                <Text style={styles.subTitle}>
                  IT powers digital transformation globally
                </Text>
              </View>
            </View>
          </View>
          <Image
            source={
              matakuliah.jenis_kelamin_2020022 === 'L'
                ? require('../Src/frieren.jpg')
                : require('../Src/1105631.jpg')
            }
            style={styles.foto}
          />
          <View style={{width: '100%', marginTop: 20}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.detail, {width: 120}]}>Kode</Text>
              <Text style={styles.detail}>: {matakuliah.kode_2020022}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.detail, {width: 120}]}>Nama Matakuliah</Text>
              <Text style={styles.detail}>: {matakuliah.nama_2020022}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.detail, {width: 120}]}>Jumlah SKS</Text>
              <Text style={styles.detail}>: {matakuliah.sks_2020022}</Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              width: 240,
              height: 1,
              marginTop: 50,
            }}></View>
          <Text style={[styles.detail, {fontSize: 15}]}>
            Tahun Ajaran 2023/2034
          </Text>
        </View>
      )}
      <TouchableOpacity style={styles.fab} onPress={() => editmatakuliah()}>
        <Icon name="create-outline" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#03C988',
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,

    bottom: 20,
    backgroundColor: '#03C988',
    borderRadius: 30,
    elevation: 8,
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
  },
  header: {
    backgroundColor: 'white',
    width: 500,
    height: 500,
    borderRadius: 1000,
    marginTop: -300,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 200,
  },
  subHeader: {
    backgroundColor: '#03C988',
    width: 500,
    height: 500,
    borderRadius: 1000,
    marginTop: -30,
    alignItems: 'center',
    marginLeft: 20,
    justifyContent: 'center',
  },
  headerAkhir: {
    backgroundColor: 'white',
    width: 500,
    height: 500,
    borderRadius: 1000,
    marginTop: -30,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: -5,
    marginLeft: 20,
    color: '#03C988',
  },
  subTitle: {
    fontSize: 15,
    // fontWeight: 'bold',
    marginBottom: 100,
    marginLeft: 50,
    color: '#03C988',
  },
  detail: {
    fontSize: 15,
    color: 'white',
    margin: 5,
  },
  foto: {
    borderRadius: 100,
    alignItems: 'center',
    marginTop: -100,
    height: 150,
    width: 150,
    borderWidth: 5,
    borderColor: 'white',
  },
});

export default DetailMatakuliah;
