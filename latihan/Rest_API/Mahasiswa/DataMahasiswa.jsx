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
import AsyncStorage from '@react-native-async-storage/async-storage';
import avatarLaki from '../Src/laki.jpg';
import avatarPerempuan from '../Src/perempuan.jpg';
import Icon from 'react-native-vector-icons/Ionicons';
import {apiImage, apiJmlMahasiswa, apiMahasiswa} from '../API';
import {Swipeable} from 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Avatar} from 'react-native-elements';

export default function DataMahasiswa() {
  const navigation = useNavigation();
  const route = useRoute();
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [lastpage, setlastPage] = useState(0);
  const [dataDeleted, setDataDeleted] = useState(false);
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const [titleCari, setTitleCari] = useState('');
  let prevOpenedRow;
  const [row, setRow] = useState({});
  const [totalPerempuan, setTotalPerempuan] = useState(0);
  const [totalLakiLaki, setTotalLakiLaki] = useState(0);

  const [originalData, setOriginalData] = useState([]);
  const [dataMahasiswa, setDataMahasiswa] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastPage, setLastPage] = useState(0);

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

  const togelTambah = () => {
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

  const togelCari = () => {
    setPop(!pop);

    Animated.timing(inputCari, {
      toValue: pop ? 100 : 27,
      duration: 200,
      useNativeDriver: true,
    }).start();

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
  const fetchDataMahasiswa = async (pageNumber = 1, searchQuery = search) => {
    setLoading(true);
    setError('');

    try {
      let token = await AsyncStorage.getItem('userToken');
      const response = await fetch(
        `${apiMahasiswa}/?page=${pageNumber}&search=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      setOriginalData(json.data);
      setPage(pageNumber);
      setlastPage(json.meta.last_page);

      setDataMahasiswa(
        pageNumber === 1 ? json.data : [...dataMahasiswa, ...json.data],
      );
    } catch (error) {
      setError(`Gagal Mengambil Data: ${error}`);
    } finally {
      setLoading(false);
      if (pageNumber === 1) setRefreshing(false);
    }
  };
  const fetchDataFromApi = async () => {
    try {
      let token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${apiJmlMahasiswa}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); // Ganti dengan URL API yang sesuai
      const data = await response.json();

      if (data.success) {
        setTotalPerempuan(data.data.perempuan);
        setTotalLakiLaki(data.data.laki_laki);
      } else {
        console.error('Gagal mengambil data gender dari API');
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  let token;
  useEffect(() => {
    const initializeData = async () => {
      let token = await AsyncStorage.getItem('userToken');
      if (!token) {
        navigation.navigate('Login');
      } else {
        await fetchDataMahasiswa();
        await fetchDataFromApi();
      }
    };

    initializeData();
    const unsubscribe = navigation.addListener('focus', () => {
      if (route.params?.dataAdded && !dataDeleted) {
        initializeData();
        setDataDeleted(false);
      }
    });

    return unsubscribe;
  }, [navigation, route.params?.dataAdded]);

  const checkToken = async () => {
    let token = await AsyncStorage.getItem('userToken');
    if (!token) {
      navigation.navigate('Login'); //Ganti login dengan nama route halaman login anda
    } else {
      fetchDataMahasiswa(); //lanjutkan dengan memuat data jika token ada
    }
  };
  const handleSearch = () => {
    setIsSearching(false);
    fetchDataMahasiswa(1, '');
  };

  const clearSearch = () => {
    setIsSearching(false);
    fetchDataMahasiswa(1, '');
    setSearch('');
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchDataFromApi();
    fetchDataMahasiswa(1, search).finally(() => setRefreshing(false));
  };

  const TambahData = item => {
    navigation.navigate('Tambah');
    // togelTambah();
  };

  const renderItemMahasiswa = ({item, index}) => {
    const closeRow = index => {
      if (prevOpenedRow && prevOpenedRow !== row[index]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = row[index];
    };

    const renderRightActions = () => {
      const handleDelete = nim_2020022 => {
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
                  let token = await AsyncStorage.getItem('userToken');
                  // Lakukan penghapusan data mahasiswa dengan permintaan DELETE ke API
                  const response = await fetch(
                    `${apiMahasiswa}/${nim_2020022}`,
                    {
                      method: 'DELETE',
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    },
                  );

                  if (response.status === 200) {
                    // Data mahasiswa berhasil dihapus
                    Alert.alert('', 'Data mahasiswa berhasil dihapus!', [
                      {
                        onPress: async () => {
                          // Reset data setelah penghapusan berhasil
                          await fetchDataMahasiswa();
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
            height: 113,
            marginLeft: -130,
          }}>
          <TouchableOpacity
            onPress={() => handleDelete(item.nim_2020022)}
            style={{
              backgroundColor: 'tomato',
              alignItems: 'flex-end',
              justifyContent: 'center',
              width: 'auto',
              height: 56,
              borderTopRightRadius: 10,
            }}>
            <Icon
              name="trash-outline"
              size={20}
              style={{color: 'white', marginRight: 25}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => editmahasiswa(item)}
            style={{
              backgroundColor: '#03C988',
              alignItems: 'flex-end',
              justifyContent: 'center',
              width: 'auto',
              height: 56,
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
        nim_2020022: item.nim_2020022,
        foto_2020022: item.foto_2020022,
      });
    };
    const editmahasiswa = item => {
      navigation.navigate('EditMahasiswa', {
        nim_2020022: item.nim_2020022,
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
                  <View
                    style={[
                      styles.foto,
                      {justifyContent: 'center', alignItems: 'center'},
                    ]}>
                    <Avatar
                      size={25}
                      rounded
                      source={
                        item.foto_2020022
                          ? {uri: `${apiImage}${item.foto_2020022}`}
                          : item.jenis_kelamin_2020022 === 'L'
                          ? avatarLaki
                          : item.jenis_kelamin_2020022 === 'P'
                          ? avatarPerempuan
                          : avatarLaki
                      }
                    />
                  </View>
                  <View>
                    <Text style={styles.title}>
                      {item.nama_lengkap_2020022}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Icon name="finger-print-outline" style={{}}></Icon>
                      <Text style={styles.idCode}> {item.nim_2020022}</Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity onPress={() => bukadetail(item)}>
                  <Icon name="eye-outline" size={20}></Icon>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  marginBottom: -5,
                }}>
                <Icon
                  name="location-outline"
                  size={15}
                  style={{marginLeft: -15}}
                />
                <Text style={{fontSize: 12, marginLeft: 15}}>
                  {item.alamat_2020022.length <= 20
                    ? item.alamat_2020022
                    : `${item.alamat_2020022.slice(0, 20)}...`}
                </Text>
              </View>

              <View style={{flexDirection: 'row', marginTop: 0}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: 250,
                  }}>
                  <Icon
                    name="call-outline"
                    size={13}
                    style={{marginLeft: -12}}
                  />
                  <Text style={{fontSize: 12, marginLeft: 15}}>
                    {item.nohp_2020022}
                  </Text>
                </View>
                <View
                  style={{
                    padding: 5,
                    backgroundColor: '#39A7FF',
                    borderBottomLeftRadius: 50,
                    borderTopLeftRadius: 50,
                    width: 91,
                  }}>
                  <Text style={{color: 'white', marginLeft: 10}}>
                    {item.jenis_kelamin_2020022 === 'L'
                      ? 'Laki-laki'
                      : 'Perempuan'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Swipeable>
    );
  };

  const tampildata = () => {};
  return (
    <ImageBackground source={require('../Src/latar.jpg')} style={{flex: 1}}>
      <GestureHandlerRootView>
        <View style={styles.bar}>
          <Text style={styles.judul}>Mahasiswa</Text>
          <Text style={styles.note}>
            Data mahasiswa kampus STMIK-AMIK Jayanusa
          </Text>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.infoContainer}>
              <Text style={styles.textInfo}>{totalPerempuan}</Text>
              <Text>Perempuan</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.textInfo}>{totalLakiLaki}</Text>
              <Text>Laki-laki</Text>
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
                <Text style={{fontSize: 18, color: '#39A7FF'}}>
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
            data={dataMahasiswa}
            renderItem={renderItemMahasiswa}
            keyExtractor={item => item.nim_2020022}
            extraData={loading || error}
            onEndReached={() => {
              if (!loading && page < lastpage) {
                fetchDataMahasiswa(page + 1);
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
              fetchDataMahasiswa(1, text);
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
    width: 100,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    borderTopRightRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    backgroundColor: '#39A7FF',
    padding: 20,
    borderBottomRightRadius: 50,
  },
  textInfo: {
    color: '#39A7FF',
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
    borderColor: '#39A7FF',
  },
  iconDetail: {
    borderRadius: 50,
    marginLeft: -20,
    marginRight: 10,
    height: 30,
    width: 30,
    borderWidth: 1,
    borderColor: '#39A7FF',
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
    backgroundColor: '#39A7FF',
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
    backgroundColor: '#39A7FF',
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
    backgroundColor: '#39A7FF',
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
    backgroundColor: '#39A7FF',
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
    borderColor: '#39A7FF',
    backgroundColor: '#39A7FF',
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
