import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddScreen from './AddScreen'; // Import your AddScreen component
import PersonScreen from './PersonScreen'; // Import your PersonScreen component

const Stack = createNativeStackNavigator();

function Index() {
  return (
    <Stack.Navigator initialRouteName="AddScreen">
      <Stack.Screen name="AddScreen" component={AddScreen} />
      <Stack.Screen name="PersonScreen" component={PersonScreen} />{' '}
      {/* Register PersonScreen */}
    </Stack.Navigator>
  );
}

export default Index;
