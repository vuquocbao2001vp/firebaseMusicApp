import React, {Component} from "react";
import { View, Text, Touchable, TouchableOpacity, Image, Platform, ActivityIndicator } from "react-native";
import { firebaseApp } from '../Components/firebaseConfig.js';
var ImagePicker = require('react-native-image-picker');
import RNFetchBlob from 'react-native-fetch-blob'

const storage = firebaseApp.storage();
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

var options = {
  title: 'Select img',
  customButtons: [
    {name: 'img', title: 'Choose images'},
  ],
  storageOption: {
    skipBackup: true,
    path: 'images'
  }
};

const uploadImage = (uri, mime = 'img/jpg') => {
  return new Promise((resolve, reject)=>{
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://','') : uri ;
    const sessionId = new Date().getTime();
    let uploadBlob = null;
    const imageRef = storage.ref('images').child(`${sessionId}.jpg`);

    fs.readFile(uploadUri, 'base64')
    .then((data)=>{
      return Blob.build(data,{type:`${mime}; BASE64`});
    })
    .then((blob)=>{
      uploadBlob = blob
      return imageRef.put(blob, {contentType: mime})
    })
    .then(()=>{
      uploadBlob.close()
      return imageRef.getDownloadURL()
    })
    .then((url)=>{
      resolve(url)
    })
    .catch((error)=>{
      reject(error)
    })
  })
}

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      
    }
  }
  pickImage(){
    ImagePicker.launchImageLibrary(options, (response) => {
      this.setState({avatarSource:''})
      if(response.didCancel){
      }
      else if (response.error){
      }
      else if (response.customButtons){
      }
      else {
        uploadImage(response.uri)
        .then(url => this.setState({avatarSource: url}))
        .catch(error => console.log(error))
      }
    });
  }  
  render(){
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
              {
                (()=>{
                  switch(this.state.avatarSource){
                    case null: return null
                    case '': return <ActivityIndicator />
                    default: return (
                      <Image source={this.state.avatarSource} style={{height:150, width: 120}} />
                    )
                  }
                }) ()
              }
              <TouchableOpacity onPress={()=>{this.pickImage()}}>
                <Image source={this.state.avatarSource} style={{height:150, width: 120}} />
                <Text style={{color:'green', fontSize:30}}>
                  Upload File
                </Text>
              </TouchableOpacity>
              
            </View>
        );
    }
}