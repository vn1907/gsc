import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image, Alert } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { storage } from './firebaseConfig';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {db, auth, addDoc, collection, getDocs, onAuthStateChanged, createUserWithEmailAndPassword} from "./firebaseConfig"
import * as Location from 'expo-location';

export default function App() {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [photo, setPhoto] = useState();
  const [location, setLocation] = useState(null);
  const [downloadURL, setDownloadURL] = useState(null);
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

    async function uploadManholeInfo2Firebase() {
      console.log("inside uploadManholeInfo2Firebase: "+location);
      try {
        console.log("Location: " + JSON.stringify(location));
        const latitude = location["coords"].latitude;
        const longitude = location["coords"].longitude;
        console.log("Inside uploadManholeInfo2Firebase: " + downloadURL);
        const docRef = await addDoc(collection(db, "manholes"), {
          email: auth.currentUser.email,
          imageUrl: downloadURL,
          latitude: latitude,
          longitude: longitude,
          acceptedBy: 1,
          rejectedBy: 0
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
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
            setDownloadURL(downloadURL)
            console.log('File available at', downloadURL);
            if (downloadURL) {
              uploadManholeInfo2Firebase()
            }
            
          });
          })
      })
      console.log('submitttt');
    };

    return (
      <SafeAreaView >
        <Image style={styles.container} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />

        <Button title="Submit" onPress={uploadPhoto} />
        <Button title="Cancel" onPress={() => setPhoto(undefined)} />
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
    
  };

  return (
    <View>
      <Text className="mb-7 font-bold">Upload picture: </Text>
    <Camera ref={cameraRef} style={styles.container}>
      <View>
        <Button title="Click image" onPress={takePic} />
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
})