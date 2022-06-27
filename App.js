import {View, Text, StyleSheet, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import MusicPlayer from "./navigation/screens/MusicPlayer";
import firestore from '@react-native-firebase/firestore';
import MainContainer from './navigation/MainContainer';
const App = () => {
//   {
//   const songsCollection = firestore().collection('songs').get();
//   console.log(songsCollection);
// }
useEffect (() => {
  firestore().collection("songs").get().then((querySnapshot) => {
    console.log(querySnapshot.docs[0].data().artist)
  })
},[])
  return (
    <View style={style.container}>
      <StatusBar barStyle="light-content" />
      {/* <MusicPlayer />   */}
      <MainContainer />
    </View>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
