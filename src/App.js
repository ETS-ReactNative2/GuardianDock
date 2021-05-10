import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import APILoader from './ApiLoader';

const App = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Text style={styles.test}>Hello, world!</Text>
      <APILoader url="https://fortniteapi.io/v1/lookup?username=Ninja"></APILoader>
    </View>
  )
}

const styles = StyleSheet.create({
  test: {
    color: "white",
    fontSize: 20
  },
  name: {
    fontSize: 20,
    color: 'white'
  }
});

export default App;