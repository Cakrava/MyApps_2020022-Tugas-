import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Animated,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Swipeable} from 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailMatakuliah from './DetailMatakuliah';
import {apiMatakuliah} from '../../Rest_API/API';
import {apiJmlSKS} from '../API';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function DataMatakuliah() {
  const [total2, setTotal2] = useState(0);
  const [total1, setTotal1] = useState(0);
  const [total3, setTotal3] = useState(0);
  const [total4, setTotal4] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [lastpage, setlastPage] = useState(0);

  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const [titleCari, setTitleCari] = useState('');
  let prevOpenedRow;
  const [row, setRow] = useState({});
  const [totalPerempuan, setTotalPerempuan] = useState(0);
  const [totalLakiLaki, setTotalLakiLaki] = useState(0);

  const [originalData, setOriginalData] = useState([]);
  const [dataMatakuliah, setDataMatakuliah] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [iconRotation] = useState(new Animated.Value(0));
  const [icon] = useState(new Animated.Value(50));
  const [inputValue, setInputValue] = useState('');
  const [tombolTambah] = useState(new Animated.Value(120));
  const [tombolCari] = useState(new Animated.Value(120));
  const [inputCari] = useState(new Animated.Value(100));
  const [pop, setPop] = useState(false);

  // const handleClearInput = () => {
  //   setInputValue('');
  //   setFilteredData(originalData);
  // };

  const togelCari = () => {
    setPop(!pop);

    Animated.timing(inputCari, {
      toValue: pop ? 100 : 27,
      duration: 200,
      useNativeDriver: true,
    }).start();

    setPop(!pop);

    const toValue = pop ? 0 : 300;

    Animated.parallel([
      Animated.timing(tombolTambah, {
        toValue: toValue === 0 ? 180 : 120,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(tombolCari, {
        toValue: toValue === 0 ? 230 : 120,
        duration: 200,
        useNativeDriver: true,
      }),

      Animated.timing(iconRotation, {
        toValue: pop ? 0 : 90,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(icon, {
        toValue: pop ? 50 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const tutupformcari = () => {
    setPop(!pop);

    Animated.timing(inputCari, {
      toValue: pop ? 100 : 100,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const togglePop = () => {
    setPop(!pop);

    const toValue = pop ? 0 : 300;

    Animated.parallel([
      Animated.timing(tombolTambah, {
        toValue: toValue === 0 ? 180 : 120,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(tombolCari, {
        toValue: toValue === 0 ? 230 : 120,
        duration: 200,
        useNativeDriver: true,
      }),

      Animated.timing(iconRotation, {
        toValue: pop ? 0 : 90,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(icon, {
        toValue: pop ? 50 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const iconStyle = {
    transform: [
      {
        rotate: iconRotation.interpolate({
          inputRange: [0, 90],
          outputRange: ['0deg', '90deg'],
        }),
      },
    ],
  };

  const fetchDataMatakuliah = async (pageNumber = 1, searchQuery = search) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${apiMatakuliah}/?page=${pageNumber}&search=${searchQuery}`,
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      setOriginalData(json.data);
      setPage(pageNumber);
      setlastPage(json.meta.last_page);

      setDataMatakuliah(
        pageNumber === 1 ? json.data : [...dataMatakuliah, ...json.data],
      );
    } catch (error) {
      setError(`Gagal Mengambil Data: ${error}`);
    } finally {
      setLoading(false);
      if (pageNumber === 1) setRefreshing(false);
    }
  };
  useEffect(() => {
    fetchDataMatakuliah();
    // fetchDataFromApi();
    const unsubscribe = navigation.addListener('focus', () => {
      // Dipanggil setiap kali layar mendapat fokus
      if (route.params?.dataAdded) {
        fetchDataMatakuliah();
      }
    });

    return unsubscribe;
  }, [navigation, route.params?.dataAdded]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const response = await fetch(`${apiJmlSKS}`); // Ganti dengan URL API yang sesuai
        const data = await response.json();

        if (data.success) {
          setTotal1(data.data.total1);
          setTotal2(data.data.total2);
          setTotal3(data.data.total3);
          setTotal4(data.data.total4);
        } else {
          console.error('Gagal mengambil data gender dari API');
        }
      } catch (error) {
        console.error('Terjadi kesalahan:', error);
      }
    };

    fetchDataFromApi();
  }, []);

  const handleSearch = () => {
    setIsSearching(false);
    fetchDataMatakuliah(1, '');
  };

  const clearSearch = () => {
    setIsSearching(false);
    fetchDataMatakuliah(1, '');
    setSearch('');
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchDataMatakuliah(1, search).finally(() => setRefreshing(false));
  };

  const renderItemMatakuliah = ({item, index}) => {
    const closeRow = index => {
      if (prevOpenedRow && prevOpenedRow !== row[index]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = row[index];
    };

    const renderRightActions = () => {
      const handleDelete = kode_2020022 => {
        Alert.alert(
          'Konfirmasi',
          'Anda akan menghapus data ini?',
          [
            {
              text: 'Tidak',
              style: 'cancel',
            },
            {
              text: 'Ya',
              onPress: async () => {
                try {
                  // Lakukan penghapusan data mahasiswa dengan permintaan DELETE ke API
                  const response = await fetch(
                    `${apiMatakuliah}/${kode_2020022}`,
                    {
                      method: 'DELETE',
                    },
                  );

                  if (response.status === 200) {
                    // Data mahasiswa berhasil dihapus
                    Alert.alert('', 'Data mahasiswa berhasil dihapus!', [
                      {
                        onPress: async () => {
                          // Reset data setelah penghapusan berhasil
                          await fetchDataMatakuliah();
                          await fetchDataFromApi();
                          // Jangan lupa set state dataDeleted menjadi true
                          setDataDeleted(true);
                        },
                        text: 'Ok',
                      },
                    ]);
                  } else {
                    // Gagal menghapus data
                    console.log('Gagal menghapus data');
                    // Handle kesalahan jika penghapusan gagal
                  }
                } catch (error) {
                  console.error('Terjadi kesalahan:', error);
                }
              },
            },
          ],
          {cancelable: true},
        );
      };
      return (
        <View
          style={{
            marginBottom: 10,

            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            backgroundColor: '#dedede',
            width: 200,
            height: 90,
            marginLeft: -130,
          }}>
          <TouchableOpacity
            onPress={() => handleDelete(item.kode_2020022)}
            style={{
              backgroundColor: 'tomato',
              alignItems: 'flex-end',
              justifyContent: 'center',
              width: 'auto',
              height: 45,
              borderTopRightRadius: 10,
            }}>
            <Icon
              name="trash-outline"
              size={20}
              style={{color: 'white', marginRight: 25}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => editmatakuliah(item)}
            style={{
              backgroundColor: '#03C988',
              alignItems: 'flex-end',
              justifyContent: 'center',
              width: 'auto',
              height: 45,
              borderBottomRightRadius: 10,
            }}>
            <Icon
              name="create-outline"
              size={20}
              style={{color: 'white', marginRight: 25}}
            />
          </TouchableOpacity>
        </View>
      );
    };

    const bukadetail = item => {
      navigation.navigate('Detail', {
        kode_2020022: item.kode_2020022,
      });
    };
    const editmatakuliah = item => {
      navigation.navigate('EditMatakuliah', {
        kode_2020022: item.kode_2020022,
      });
    };
    return (
      <Swipeable
        renderRightActions={renderRightActions}
        friction={2}
        rightThreshold={40}
        overshootRight={false}
        onSwipeableOpen={() => closeRow(index)}
        ref={ref => (row[index] = ref)}
        rightOpenValue={-20}>
        <View style={styles.item}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: 300,
                  }}>
                  <View>
                    <Text style={styles.title}>{item.nama_2020022}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Icon name="key-outline" style={{}}></Icon>
                      <Text style={styles.idCode}> {item.kode_2020022}</Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity onPress={() => bukadetail(item)}>
                  <Icon name="eye-outline" size={20}></Icon>
                </TouchableOpacity>
              </View>

              <View style={{flexDirection: 'row', marginTop: 0}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: 250,
                  }}></View>
                <View
                  style={{
                    padding: 5,
                    backgroundColor: '#03C988',
                    borderBottomLeftRadius: 50,
                    borderTopLeftRadius: 50,
                    width: 91,
                  }}>
                  <Text style={{color: 'white', marginLeft: 10}}>
                    {item.sks_2020022} SKS
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Swipeable>
    );
  };

  const TambahData = item => {
    navigation.navigate('Tambah');
    // togelTambah();
  };
  return (
    <ImageBackground source={require('../Src/latar.jpg')} style={{flex: 1}}>
      <GestureHandlerRootView>
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

        <View style={{marginLeft: 10, marginRight: 10}}>
          {search ? (
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 5,
                  borderRadius: 50,
                  marginRight: 5, // Add margin to separate from the next view
                }}>
                <Text style={{fontSize: 18, color: '#03C988'}}>
                  Pencarian: {search}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 5,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={clearSearch}>
                  <Icon
                    name="close-outline"
                    size={18}
                    style={{color: 'red', marginLeft: 2.5, marginRight: 2.5}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          {/* Adjust the position of the loading indicator */}

          {error && <Text style={styles.title}>{error}</Text>}
          <FlatList
            style={{marginTop: 10, marginBottom: 10, height: 600}}
            initialNumToRender={1}
            data={dataMatakuliah}
            renderItem={renderItemMatakuliah}
            keyExtractor={item => item.kode_2020022}
            extraData={loading || error}
            onEndReached={() => {
              if (!loading && page < lastpage) {
                fetchDataMatakuliah(page + 1);
              }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() =>
              !loading || page === 1 ? null : (
                <ActivityIndicator size="large" color="#860A35" />
              )
            }
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={{flexGrow: 1}}
          />
        </View>
      </GestureHandlerRootView>
      <Animated.View
        style={[styles.subButton, {transform: [{translateY: tombolTambah}]}]}>
        <TouchableOpacity onPress={TambahData}>
          <Icon name="add" size={25} color="#FFFF" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={[styles.subButton, {transform: [{translateY: tombolCari}]}]}>
        <TouchableOpacity onPress={togelCari}>
          <Icon name="search" size={25} color="#FFFF" />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        style={[styles.TextInput, {transform: [{translateY: inputCari}]}]}>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            placeholder="Cari"
            style={{
              height: 40,
              width: '100%',
              paddingLeft: 10,
              backgroundColor: 'white',
              borderRadius: 100,
              width: 300,
            }}
            value={search}
            onChangeText={text => {
              setSearch(text);
              fetchDataMatakuliah(1, text);
            }}
          />

          <TouchableOpacity onPress={tutupformcari}>
            <Icon
              name="close-circle-outline"
              style={{color: 'white', fontSize: 40}}></Icon>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <TouchableOpacity
        style={styles.circle}
        onPress={togglePop}
        activeOpacity={1}>
        <Animated.View style={iconStyle}>
          <Icon name="menu" size={25} color="#FFFF" />
        </Animated.View>
      </TouchableOpacity>
      {loading && page === 1 && (
        <ActivityIndicator size="large" color="white" style={styles.loading} />
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    marginRight: 10,
    width: 50,
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
    height: 30,
    width: 30,
    borderWidth: 1,
    borderColor: '#03C988',
  },
  iconDetail: {
    borderRadius: 50,
    marginLeft: -20,
    marginRight: 10,
    height: 30,
    width: 30,
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
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
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
  idCode: {
    color: 'gray',
    fontSize: 12,
  },

  rightActions: {
    marginBottom: 10,
    borderColor: '#dedede',
    borderWidth: 1,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#dedede',
    paddingLeft: -100,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  actionButton: {
    marginRight: 10,
    marginLeft: -200,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 200,
    paddingHorizontal: 20,
    height: '100%',
  },
  circle: {
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#03C988',
    width: 60,
    height: 60,
    position: 'absolute',
    top: 125,
    right: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#03C988',
    width: 60,
    height: 60,
    position: 'absolute',
    top: 125,
    right: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subButton: {
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#03C988',
    width: 40,
    height: 40,
    position: 'absolute',
    top: 20,
    right: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextInput: {
    borderWidth: 0.5,
    borderColor: '#03C988',
    backgroundColor: '#03C988',
    position: 'absolute',
    bottom: 20,
    right: 0,
    width: '100%',
    height: 60,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
