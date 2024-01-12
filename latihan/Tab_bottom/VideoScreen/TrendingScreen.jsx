import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function TrendingScreen() {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://youtube.com/shorts/Ba_Y0PYNz8Y?si=bRr7ZcUkA1eNBcYn' }} // Gantilah dengan URL web yang ingin Anda tampilkan
        style={styles.webView}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});
