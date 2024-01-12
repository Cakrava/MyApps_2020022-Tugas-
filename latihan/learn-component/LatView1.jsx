import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
export default function LatImage() {
return (
<View style={styles.container}>
<Image
source={require('./Image/frieren.jpg')}
style={styles.image}
/>
<Image
source={require('./Image/fern.jpg')}
style={styles.image}
/>
</View>

);
}
const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor :'white',
justifyContent: 'center',
alignItems: 'center',
},
image: {
width: 200,
height: 200,
borderRadius: 100,
margin: 10,
},
});
