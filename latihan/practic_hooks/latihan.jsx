import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
export default function latihan() {
  const [count, setCount] = useState(0);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          fontSize: 40,
          fontWeight: 'bold',
          color: 'red',
          marginVertical: 10,
        }}>
        {count}
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: 'blue',
          padding: 10,
          borderRadius: 1
          }}
        onPress={() => setCount(count + 1)}>
        <Text
          style={{
            color: '#FFF',
          }}>
          Click Me
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: '#ff8188',
          padding: 10,
          borderRadius: 10,
          marginTop: 10,
        }}
        onPress={() => setCount(0)}>
        <Text
          style={{
            color: '#FFF',
          }}>
          Reset
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
