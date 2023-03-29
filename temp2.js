import React, { useState } from 'react';
import { View, Text, Button, Image, TouchableOpacity, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

export default function UploadManhole() {
  const [image, setImage] = useState("");
  const [location, setLocation] = useState(null);

  const openCamera = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera is required!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync();
    console.log(result);

    if (!result.cancelled) {
      console.log(result.uri);
      setImage(result.uri);
    }
  };

  const pickLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location is required!');
      return;
    }

    let locationResult = await Location.getCurrentPositionAsync({});
    setLocation(locationResult);
  };

  const submitData = () => {
    // handle submit logic here
    console.log('Image:', image);
    console.log('Location:', location);
  };

  return (
    <View style={{ flex: 2, justifyContent: 'center' ,margin: 30 }}>
      <View style={{marginBottom: 50,}}>
      <Text>Upload picture: </Text>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, margin: 10, }} />}
      <View style={{ alignItems: 'center' }}>
      <TouchableOpacity onPress={openCamera} style={{    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    margin: 5}} >
      
        <Text style={{ color: '#fff', padding: 10 }}>Open Camera</Text>
      </TouchableOpacity>
      </View>
      
      </View>

      <View style={{ marginBottom: 30}}>
        <Text>Location:</Text>
        {location && (
        <TextInput editable={false} style={{borderWidth: 1, padding: 10,}}>
          {location.coords.latitude}, {location.coords.longitude}
        </TextInput>
      )}
      <View style={{ alignItems: 'center' }}>
      <TouchableOpacity onPress={pickLocation} style={{    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8, 
    margin: 5, }}>
        <Text style={{ color: '#fff', padding: 10,}}>Access location</Text>
      </TouchableOpacity>
      </View>
      </View>

      <Button title="Submit" onPress={submitData} disabled={!image || !location} />

    </View>
  );
}