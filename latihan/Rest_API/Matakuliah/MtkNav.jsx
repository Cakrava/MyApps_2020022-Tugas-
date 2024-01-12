import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DataMatakuliah from './DataMatakuliah';
import DetailMatakuliah from './DetailMatakuliah';
import TambahDataMatakuliah from './TambahDataMatakuliah';
import EditDataMatakuliah from './EditDataMatakuliah';

const Stack = createNativeStackNavigator();

export default function MhNav() {
  return (
    <NavigationContainer independent>
      <Stack.Navigator initialRouteName="DataMahasiswa">
        <Stack.Screen
          name="DataMatakuliah"
          component={DataMatakuliah}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Detail" component={DetailMatakuliah} />
        <Stack.Screen name="Tambah" component={TambahDataMatakuliah} />
        <Stack.Screen name="EditMatakuliah" component={EditDataMatakuliah} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
