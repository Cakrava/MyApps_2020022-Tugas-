import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DataMahasiswa from './DataMahasiswa';
import EditDataMahasiswa from './EditDataMahasiswa';
import DetailMahasiswa from './DetailMahasiswa';
import TambahDataMahasiswa from './TambahDataMahasiswa';
import UploadImageMahasiswa from './UploadImageMahasiswa';
import Login from '../Login';
const Stack = createNativeStackNavigator();

export default function MhNav() {
  return (
    <>
      <Stack.Navigator initialRouteName="DataMahasiswa">
        <Stack.Screen
          name="DataMahasiswa"
          component={DataMahasiswa}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Detail" component={DetailMahasiswa} />
        <Stack.Screen name="FormUpload" component={UploadImageMahasiswa} />
        <Stack.Screen name="Tambah" component={TambahDataMahasiswa} />
        <Stack.Screen name="EditMahasiswa" component={EditDataMahasiswa} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </>
  );
}
