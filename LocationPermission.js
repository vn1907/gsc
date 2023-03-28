import React from 'react';
import {Text, View, Button} from 'react-native';
import * as Location from "expo-location";
import { useEffect } from 'react';

const LocationPermission = () => {

  async  function  GetCurrentLocation () {
    let { status } = await Location.requestPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission not granted",
        "Allow the app to use location service.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }

    let { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      const { latitude, longitude } = coords;
      //let address = `${latitude}, ${logitude}`;
      alert(latitude +' '+ longitude);

    }
  };
  
  useEffect(() => {
    setTimeout(() =>{
        GetCurrentLocation()
  }, 1000);
}, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Button title="Allow location access"/>

    </View>
  );
};

export default LocationPermission;