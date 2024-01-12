// 01 halaman DetailMahasiswa.js atau komponen yang sesuai
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Image} from 'react-native';
import {apiMahasiswa} from '../API';

const DetailMahasiswa = ({route}) => {
  const {nim_2020022} = route.params; // Mengambil NIM yang diteruskan sebagai parameter

  const [mahasiswa, setMahasiswa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`Hasil data ${nim_2020022}`);
        const response = await fetch(`${apiMahasiswa}/${nim_2020022}`, {
          method: 'GET',
        });

        const json = await response.json();
        setMahasiswa(json);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [nim_2020022]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      {mahasiswa && (
        <View style={styles.container}>
          <Text style={styles.title}>Mahasiswa</Text>
          <Text style={{fontSize: 15}}>Kampus IT Terakreditasi A</Text>
          <View style={styles.body}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.subHeader}>
                <Text
                  style={{color: 'purple', fontSize: 30, fontWeight: 'bold'}}>
                  Biodata
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: 'white',
                  height: 1,
                  width: 80,
                  marginLeft: 30,
                }}></View>
              <Text style={{fontSize: 15, color: 'white'}}> ++ </Text>

              <View
                style={{
                  backgroundColor: 'white',
                  height: 1,
                  width: 80,
                  // marginLeft: 30,
                }}></View>
            </View>
            <View style={{paddingLeft: 20}}>
              <View style={{width: '100%', marginTop: 20}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.detail, {width: 120}]}>Nim</Text>
                  <Text style={styles.detail}>: {mahasiswa.nim_2020022}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.detail, {width: 120}]}>
                    Nama Lengkap
                  </Text>
                  <Text style={styles.detail}>
                    : {mahasiswa.nama_lengkap_2020022}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.detail, {width: 120}]}>Alamat</Text>
                  <Text style={styles.detail}>
                    : {mahasiswa.alamat_2020022}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.detail, {width: 120}]}>
                    Jenis Kelamin
                  </Text>
                  <Text style={styles.detail}>
                    {mahasiswa.jenis_kelamin_2020022 === 'P'
                      ? 'Perempuan'
                      : 'Laki-laki'}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.detail, {width: 120}]}>
                    Tanggal Lahir
                  </Text>
                  <Text style={styles.detail}>
                    : {mahasiswa.tanggal_lahir_2020022}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.detail, {width: 120}]}>
                    Tempat Lahir
                  </Text>
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

                <View
                  style={{
                    backgroundColor: 'white',
                    height: 1,
                    width: 200,
                    marginTop: 100,
                    marginBottom: 10,
                  }}></View>
                <Text style={{fontSize: 15, color: 'white'}}>
                  "Kampus IT membuka pintu ilmu, terhubung ide kreatif,
                  menginspirasi generasi, teknologi berpadu kecerdasan,
                  menantang batas kemungkinan."
                </Text>
                <View
                  style={{
                    width: 340,
                    marginTop: 120,
                    marginLeft: 190,
                  }}>
                  <Text style={{fontSize: 12, color: 'white'}}>
                    Poweren by Vra Corporation©
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'white',
  },
  body: {
    height: 1000,
    width: 380,
    marginTop: 30,
    // paddingLeft: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: 'purple',
  },
  subHeader: {
    backgroundColor: 'white',
    width: 100,
    height: 40,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginLeft: 20,
    marginTop: 0,
    alignItems: 'center',
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
    color: 'purple',
  },
  subTitle: {
    fontSize: 15,
    // fontWeight: 'bold',
    marginBottom: 100,
    marginLeft: 50,
    color: 'purple',
  },
  detail: {
    fontSize: 18,
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

export default DetailMahasiswa;
