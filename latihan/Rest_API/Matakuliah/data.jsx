import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {apiMatakuliah} from '../API';

export default function DataMatakuliah() {
  const [total2, setTotal2] = useState(0);
  const [total1, setTotal1] = useState(0);
  const [total3, setTotal3] = useState(0);
  const [total4, setTotal4] = useState(0);

  const [dataMatakuliah, setDataMatakuliah] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDataMatakuliah = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(apiMatakuliah);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      setDataMatakuliah(json.data);
    } catch (error) {
      setError(`Gagal mengambil data! : ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataMatakuliah();
  }, [dataMatakuliah]); // Menambahkan dataMatakuliah sebagai dependensi

  useEffect(() => {
    // Hitung total perempuan dan laki-laki setiap kali dataMatakuliah berubah
    let count2 = 0;
    let count1 = 0;
    let count3 = 0;
    let count4 = 0;

    dataMatakuliah.forEach(item => {
      if (item.sks_2020022 === '1') {
        count1++;
      } else if (item.sks_2020022 === '2') {
        count2++;
      } else if (item.sks_2020022 === '3') {
        count3++;
      } else if (item.sks_2020022 === '4') {
        count4++;
      }
    });

    setTotal1(count1);
    setTotal2(count2);
    setTotal3(count3);
    setTotal4(count4);
  }, [dataMatakuliah]);

  const renderItemMatakuliah = ({item}) => {
    return (
      <View style={styles.item}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={
              item.sks_2020022 === 'L'
                ? require('../Src/laki.jpg')
                : require('../Src/buku.jpg')
            }
            style={styles.foto}
          />
          <View style={{width: 250}}>
            <Text style={styles.title}>{item.nama_2020022}</Text>
            <Text style={styles.alamat}>
              Kode : MKL-{item.kode_2020022} - {item.sks_2020022} SKS
            </Text>
          </View>
          <Icon name="chevron-forward-outline" size={20} />
        </View>
      </View>
    );
  };

  return (
    <ImageBackground source={require('../Src/latar.jpg')} style={{flex: 1}}>
      <View style={styles.bar}>
        <Text style={styles.judul}>Matakuliah</Text>
        <Text style={styles.note}>Data matakuliah STMIK-AMIK Jayanusa</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.infoContainer}>
            <Text style={styles.textInfo}>{total1}</Text>
            <Text>1 SKS</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.textInfo}>{total2}</Text>
            <Text>2 SKS</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.textInfo}>{total3}</Text>
            <Text>3 SKS</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.textInfo}>{total4}</Text>
            <Text>4 SKS</Text>
          </View>
        </View>
      </View>
      <View style={styles.AddButton}>
        <TouchableOpacity>
          <Icon name="add" size={50} color={'white'} />
        </TouchableOpacity>
      </View>
      <View style={{marginLeft: 10, marginRight: 10}}>
        <FlatList
          style={{marginTop: 0}}
          data={dataMatakuliah}
          renderItem={renderItemMatakuliah}
          keyExtractor={item => item.kode_2020022.toString()}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    marginRight: 10,
    width: 60,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    borderTopRightRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    backgroundColor: '#03C988',
    padding: 20,
    borderBottomRightRadius: 50,
  },
  textInfo: {
    color: '#03C988',
    fontSize: 30,
    fontWeight: 'bold',
  },
  judul: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  foto: {
    borderRadius: 50,
    marginLeft: -20,
    marginRight: 10,
    height: 50,
    width: 50,
    borderWidth: 1,
    borderColor: '#03C988',
  },
  note: {
    color: 'white',
    fontSize: 15,
    marginBottom: 10,
  },
  AddButton: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#03C988',
    marginLeft: 310,
    marginRight: 20,
    borderRadius: 100,
    marginTop: -32,
    borderColor: 'white',
    borderWidth: 2,
  },
  item: {
    marginBottom: 10,
    borderColor: '#dedede',
    borderWidth: 1,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: 'white',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 15,
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  title: {
    fontSize: 18,
  },
  alamat: {
    color: '#03C988',
    fontSize: 12,
  },
});
