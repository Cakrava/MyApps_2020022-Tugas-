import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DataDosen from './DataDosen';
import DetailDosen from './DetailDosen';
import TambahDataDosen from './TambahDataDosen';
import EditDataDosen from './EditDataDosen';
import FormUploadDosen from './UploadImageDosen';

const Stack = createNativeStackNavigator();

export default function MhNav() {
  return (
    <NavigationContainer independent>
      <Stack.Navigator initialRouteName="DataMahasiswa">
        <Stack.Screen
          name="DataDosen"
          component={DataDosen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="upload" component={FormUploadDosen} />
        <Stack.Screen name="Detail" component={DetailDosen} />
        <Stack.Screen name="Tambah" component={TambahDataDosen} />
        <Stack.Screen name="EditDosen" component={EditDataDosen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
