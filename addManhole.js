import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image, Alert } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { storage } from './firebaseConfig';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import * as Location from 'expo-location';

export default function App() {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [photo, setPhoto] = useState();
  const [location, setLocation] = useState(null);
  const FOLDER_NAME = "manholeImages";

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    console.log(newPhoto.uri)
    setPhoto(newPhoto);
    
    pickLocation();

  };

  if (photo) {
    function urlToBlob(url) {
      return new Promise((resolve, reject) => {
          var xhr = new XMLHttpRequest();
          xhr.onerror = reject;
          xhr.onreadystatechange = () => {
              if (xhr.readyState === 4) {
                  resolve(xhr.response);
              }
          };
          xhr.open('GET', url);
          xhr.responseType = 'blob';
          xhr.send();
      })
    
    }
    let uploadPhoto = async () => {
      const metadata = {
        contentType: 'image/jpeg',
      };
      const filename = photo.uri.substring(photo.uri.lastIndexOf('/') + 1);
      urlToBlob(photo.uri).then((blob) => {
        const imageRef = ref(storage, FOLDER_NAME + "/" + filename);
        uploadBytes(imageRef, blob, metadata).then(() => {
          alert("Image uploaded")
          getDownloadURL(imageRef).then((downloadURL) => {
            console.log('File available at', downloadURL);
          });
        })
      })
      console.log('submitttt');
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />

        <Button title="Confirm" onPress={uploadPhoto} />
        <Button title="Discard" onPress={() => setPhoto(undefined)} />
      </SafeAreaView>
    );
  }

  const pickLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location is required!');
      return;
    }

    let locationResult = await Location.getCurrentPositionAsync({});
    setLocation(locationResult);
    console.log(locationResult);
  };

  return (
    <View>
      <Text>Upload picture: </Text>
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <Button title="Take Pic" onPress={takePic} />
      </View>
      <StatusBar style="auto" />
    </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

    width: 300,
    height: 400,
  },
  buttonContainer: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end'
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1,
  }
});