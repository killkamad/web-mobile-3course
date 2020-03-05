import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import HomeScreen from "./src/HomeScreen";

const App = () => {
  return(<HomeScreen/>);
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})


export default App;
