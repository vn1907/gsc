import { StatusBar } from 'expo-status-bar';
<<<<<<< HEAD
import { StyleSheet, Text, View, SafeAreaView, Button, Image, Alert } from 'react-native';
=======
import { StyleSheet, Text, View, SafeAreaView, Button, Image, TextInput, TouchableHighlight } from 'react-native';
>>>>>>> parent of 0cf1db7 (update addManhole.js)
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import {useNavigation} from '@react-navigation/native';

export default function App() {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [photo, setPhoto] = useState();
  const [location, setLocation] = useState(null);

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
  };

  if (photo) {
    

<<<<<<< HEAD
      function savePhoto () {
        console.log("submitt");
        Alert.alert("Successfully submitted");
      };
=======
    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };
>>>>>>> parent of 0cf1db7 (update addManhole.js)

    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
<<<<<<< HEAD
        { <Button title="Submit" onPress={savePhoto} /> }
=======
        {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined}
>>>>>>> parent of 0cf1db7 (update addManhole.js)
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

    <View style={{ marginBottom: 30}}>
        <Text>Location:</Text>
        {location && (
        <TextInput editable={false} style={{borderWidth: 1, padding: 10,}}>
          {location.coords.latitude}, {location.coords.longitude}
        </TextInput>
      )}
     
      </View>
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