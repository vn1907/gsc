import React from 'react';
import MapView , {Marker}from 'react-native-maps';
import { StyleSheet, View, useState } from 'react-native';
import { useEffect } from 'react';
import * as Location from "expo-location";

export default function ViewMapLoc() {
  //const [loc, setLoc] = useState(null);
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
    //setLocation(coords);
    console.log(coords);

    if (coords) {
      const { latitude, longitude } = coords;
      //let address = `${latitude}, ${logitude}`;
      alert(latitude +' '+ longitude);

    }
  };
  
  useEffect(() => {
    setTimeout(() =>{
        GetCurrentLocation();
  }, 1000);
}, []);


  return (
    <View style={styles.container}>
      <MapView style={styles.map}  showsUserLocation={true}>
      <Marker
            coordinate={{latitude: 17.4593039,
            longitude: 78.4331369,
          }}
         />

      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});