import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const App = () => {
  return(
    <View style = {styles.container}>
      <View style = {styles.item1}></View>
      <View style = {styles.item2}></View>
      <View style = {styles.item3}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  item1:{
    backgroundColor:'#369',
    width:50,
    height:50,
  },
  item2:{
    backgroundColor: '#363',
    width:50,
    height:50,
  },
  item3:{
    backgroundColor: '#963',
    width:50,
    height:50,
  }
})

export default App;
