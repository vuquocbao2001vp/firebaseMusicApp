import {View, Text, StyleSheet, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import MusicPlayer from "./screens/MusicPlayer";
import firestore from '@react-native-firebase/firestore';
const App = () => {
//   {
//   const songsCollection = firestore().collection('songs').get();
//   console.log(songsCollection);
// }
useEffect (() => {
  firestore().collection("songs").get().then((querySnapshot) => {
    console.log(querySnapshot.docs)
  })
},[])
  return (
    <View style={style.container}>
      <StatusBar barStyle="light-content" />
      <MusicPlayer />  
    </View>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
