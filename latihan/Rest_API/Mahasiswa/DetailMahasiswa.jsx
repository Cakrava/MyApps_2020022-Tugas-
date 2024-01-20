import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import {apiMahasiswa, apiImage} from '../API';
import avatarLaki from '../Src/laki.jpg';
import avatarPerempuan from '../Src/perempuan.jpg';
import {useNavigation} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
const DetailMahasiswa = ({route}) => {
  const {nim_2020022, foto_2020022} = route.params;
  const navigation = useNavigation();
  const [mahasiswa, setMahasiswa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [Pic, setPic] = useState(null);
  const [uriImage, setUriImage] = useState();
  const [typeImage, setTypeImage] = useState();
  const [fileNameImage, setFileNameImage] = useState();
  const [isUploadButtonDisable, setIsUploadButtonDisable] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);
  const [pop, setPop] = useState(false);
  const [gantiFoto] = useState(new Animated.Value(200));

  const options = {
    title: 'Select Image',
    mediaType: 'photo',
    includeBase64: false,
    maxWidth: 500,
    maxHeight: 500,
  };

  const setToastMsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  const searchImage = async () => {
    setIsUploadButtonDisable(true);
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        setToastMsg('Canceled Selection Image');
      } else if (response.errorCode === 'permission') {
        setToastMsg('Not Permission');
      } else if (response.errorCode === 'others') {
        setToastMsg(response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        if (response.assets[0].fileSize > 5000000) {
          Alert.alert('Maximum File 5MB', 'Please choose another', [
            {text: 'OK'},
          ]);
        } else {
          setPic(response.assets[0].uri);
          setUriImage(response.assets[0].uri);
          setTypeImage(response.assets[0].type);
          setFileNameImage(response.assets[0].fileName);
          setIsUploadButtonDisable(false);
        }
      }
    });
  };

  const takePicture = async () => {
    setIsUploadButtonDisable(true);
    launchCamera(options, response => {
      if (response.didCancel) {
        setToastMsg('Canceled Selection Image');
      } else if (response.errorCode === 'permission') {
        setToastMsg('Not Permission');
      } else if (response.errorCode === 'others') {
        setToastMsg(response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        if (response.assets[0].fileSize <= 4194304) {
          setPic(response.assets[0].uri);
          setUriImage(response.assets[0].uri);
          setTypeImage(response.assets[0].type);
          setFileNameImage(response.assets[0].fileName);
          setIsUploadButtonDisable(false);
        } else {
          Alert.alert('Maximum File 4MB', 'Please choose another', [
            {text: 'OK'},
          ]);
        }
      }
    });
  };

  const doRemovePicture = () => {
    setPic(foto_2020022 ? `${apiImage}${foto_2020022}` : '');
    setIsUploadButtonDisable(true);
  };

  const doUploadImage = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('foto_2020022', {
      uri: uriImage,
      type: typeImage,
      name: fileNameImage,
    });

    try {
      let token = await AsyncStorage.getItem('userToken');
      let response = await fetch(`${apiMahasiswa}/uploadImage/${nim_2020022}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      let responseJson = await response.json();
      setToastMsg(responseJson.message);
      fetchData();
      setIsUploadButtonDisable(true);
      closeOverlay();
    } catch (error) {
      // setToastMsg('Uploading...');
      doUploadImage();
    } finally {
      setLoading(false);
    }
  };
  const togalGantiFoto = () => {
    setPop(!pop);
    setShowOverlay(!showOverlay);

    Animated.timing(gantiFoto, {
      toValue: pop ? 200 : 30,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const closeOverlay = () => {
    if (showOverlay) {
      togalGantiFoto();
    }
  };

  const fetchData = async () => {
    try {
      let token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${apiMahasiswa}/${nim_2020022}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
      setMahasiswa(json);
      setPic(
        `${apiImage}${json.foto_2020022}?timestamp=${new Date().getTime()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      setError('Tidak dapat memuat data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const unsubscribe = navigation.addListener('focus', fetchData);
    return unsubscribe;
  }, [navigation, nim_2020022]);

  useEffect(() => {
    // Perbarui nilai Pic sesuai dengan foto_2020022
    if (foto_2020022) {
      setPic(`${apiImage}${foto_2020022}`);
    } else {
      // Jika foto_2020022 tidak ada, set Pic ke nilai default (misalnya null atau URL gambar default)
      setPic(null); // Ganti null dengan nilai default yang sesuai
    }
  }, [foto_2020022]);

  if (loading) {
    // return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const editmahasiswa = () => {
    navigation.navigate('EditMahasiswa', {
      nim_2020022: mahasiswa.nim_2020022,
    });
  };

  const goToPageFormUpload = () => {
    navigation.navigate('FormUpload', {
      nim_2020022: nim_2020022,
      foto_2020022: mahasiswa.foto_thumb_2020022,
      jenis: mahasiswa.jenis_kelamin_2020022,
    });
  };

  return (
    <View style={styles.container}>
      {mahasiswa && (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.subHeader}>
              <View style={styles.headerAkhir}>
                <Text style={styles.title}> Mahasiswa</Text>
                <Text style={styles.subTitle}>
                  IT powers digital transformation globally
                </Text>
              </View>
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={togalGantiFoto}>
              <View style={styles.foto}>
                <Avatar
                  size="xlarge"
                  rounded
                  source={
                    mahasiswa.foto_2020022
                      ? {uri: `${apiImage}${mahasiswa.foto_thumb_2020022}`}
                      : mahasiswa.jenis_kelamin_2020022 === 'L'
                      ? avatarLaki
                      : mahasiswa.jenis_kelamin_2020022 === 'P'
                      ? avatarPerempuan
                      : defaultAvatar
                  }
                  containerStyle={styles.avatarContainer}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={goToPageFormUpload}
              onPress={togalGantiFoto}
              style={{
                backgroundColor: 'white',
                height: 30,
                width: 30,
                borderRadius: 50,
                marginLeft: 100,
                marginTop: -30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="camera-outline" size={20} color="#39A7FF" />
            </TouchableOpacity>
          </View>

          <View style={{width: '100%', marginTop: 20}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.detail, {width: 120}]}>Nim</Text>
              <Text style={styles.detail}>: {mahasiswa.nim_2020022}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.detail, {width: 120}]}>Nama Lengkap</Text>
              <Text style={styles.detail}>
                : {mahasiswa.nama_lengkap_2020022}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.detail, {width: 120}]}>Alamat</Text>
              <Text style={styles.detail}>: {mahasiswa.alamat_2020022}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.detail, {width: 120}]}>Jenis Kelamin</Text>
              <Text style={styles.detail}>
                {mahasiswa.jenis_kelamin_2020022 === 'P'
                  ? 'Perempuan'
                  : 'Laki-laki'}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.detail, {width: 120}]}>Tanggal Lahir</Text>
              <Text style={styles.detail}>
                : {mahasiswa.tanggal_lahir_2020022}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.detail, {width: 120}]}>Tempat Lahir</Text>
              <Text style={styles.detail}>
                : {mahasiswa.tempat_lahir_2020022}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.detail, {width: 120}]}>No Hp</Text>
              <Text style={[styles.detail, {width: 120}]}>
                : {mahasiswa.nohp_2020022}
              </Text>
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
            Mahasiswa Aktif 2024
          </Text>
        </View>
      )}

      <TouchableOpacity style={styles.fab} onPress={() => editmahasiswa()}>
        <Icon name="create-outline" size={30} color="#FFF" />
      </TouchableOpacity>
      {/* Overlay */}
      <Animated.View
        style={[styles.changePhoto, {transform: [{translateY: gantiFoto}]}]}>
        <View
          style={{
            backgroundColor: 'grey',
            width: 50,
            height: 3,
            borderRadius: 10,
            marginTop: -40,
            marginBottom: 10,
          }}></View>
        <View
          style={{
            marginBottom: 20,
            flexDirection: 'row',
            width: '150%',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Foto user</Text>

          <Avatar
            size="medium"
            rounded
            source={Pic ? {uri: Pic} : avatarLaki}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '60%',
            marginLeft: -130,
          }}>
          <TouchableOpacity
            onPress={takePicture}
            style={{
              borderRadius: 50,
              width: 50,
              height: 50,
              borderWidth: 1,
              borderColor: '#39A7FF',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="camera" size={30} color="#39A7FF" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={searchImage}
            style={{
              borderRadius: 50,
              width: 50,
              height: 50,
              borderWidth: 1,
              borderColor: '#39A7FF',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="image" size={30} color="#39A7FF" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={doRemovePicture}
            style={{
              borderRadius: 50,
              width: 50,
              height: 50,
              borderWidth: 1,
              borderColor: '#39A7FF',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="trash" size={30} color="#39A7FF" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={doUploadImage}
            style={{
              borderRadius: 50,
              width: 50,
              height: 50,
              borderColor: isUploadButtonDisable ? 'white' : '#39A7FF',
              borderWidth: 1,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name="arrow-up-outline"
              size={30}
              color={isUploadButtonDisable ? 'white' : '#39A7FF'}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
      {showOverlay && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={closeOverlay}
          activeOpacity={1}
        />
      )}

      {/* Animated Component, diletakkan di luar View utama */}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },
  changePhoto: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    right: 0,
    height: 200,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2, // Membuatnya berada di atas overlay
  },
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#39A7FF',
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
    backgroundColor: '#39A7FF',
    width: 500,
    height: 500,
    borderRadius: 1000,
    marginTop: -30,
    alignItems: 'center',
    marginLeft: 20,
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,

    bottom: 20,
    backgroundColor: '#39A7FF',
    borderRadius: 30,
    elevation: 8,
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
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
    color: '#39A7FF',
  },
  subTitle: {
    fontSize: 15,
    // fontWeight: 'bold',
    marginBottom: 100,
    marginLeft: 50,
    color: '#39A7FF',
  },
  detail: {
    fontSize: 15,
    color: 'white',
    margin: 5,
  },
  foto: {
    padding: 10,
    justifyContent: 'center',
    borderRadius: 100,
    alignItems: 'center',
    marginTop: -100,
    height: 150,
    width: 150,
    borderWidth: 70,
    borderColor: 'white',
    backgroundColor: 'white',
  },
});

export default DetailMahasiswa;
