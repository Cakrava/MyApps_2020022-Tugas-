// ini uploadimagenya ya

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import avatarLaki from '../Src/laki.jpg';
import avatarPerempuan from '../Src/perempuan.jpg';
import {apiImage, apiDosen} from '../API';

export default function FormUploadDosen({route, navigation}) {
  const {nik_2020022, foto_2020022, jenis} = route.params;
  const [Pic, setPic] = useState(null);
  const [uriImage, setUriImage] = useState();
  const [typeImage, setTypeImage] = useState();
  const [fileNameImage, setFileNameImage] = useState();
  const [isUploadButtonDisable, setIsUploadButtonDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (foto_2020022) {
      setPic(`${apiImage}${foto_2020022}`);
    }
  }, [foto_2020022]);

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
      let response = await fetch(`${apiDosen}/uploadImage/${nik_2020022}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      let responseJson = await response.json();
      setToastMsg(responseJson.message);
    } catch (error) {
      setToastMsg('Error uploading image. Please try again.');
    } finally {
      setLoading(false);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={searchImage} underlayColor="rgba(0,0,0,0)">
        <Avatar
          size="xlarge"
          rounded
          source={
            Pic
              ? {uri: Pic}
              : jenis === 'L'
              ? avatarLaki
              : jenis === 'P'
              ? avatarPerempuan
              : null // Add a default avatar or handle null appropriately
          }
          containerStyle={styles.avatarStyle}
        />
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: isUploadButtonDisable ? '#aaa' : '#65B741'},
          ]}
          onPress={doUploadImage}
          disabled={isUploadButtonDisable}>
          <Text style={styles.buttonText}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              'Upload Foto'
            )}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#19376D'}]}
          onPress={takePicture}>
          <Text style={styles.buttonText}>Take Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#D21312'}]}
          onPress={doRemovePicture}>
          <Text style={styles.buttonText}>Remove Picture</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
  },
  avatarStyle: {
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    elevation: 3,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
