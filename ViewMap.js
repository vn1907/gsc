import React from 'react';
import MapView , {Marker}from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { useEffect,useState } from 'react';
import * as Location from "expo-location";

export default function ViewMapLoc() {
  const [long, setLong] = useState(null);
  const data= [
    {

      latitude: 17.45,
      longitude: 78.43,
    },
    {
      latitude: 17.44,
      longitude: 78.49,
    },
  ]
  async  function  GetCurrentLocation () {
    console.log('1');
    let { status } = await Location.requestPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission not granted",
        "Allow the app to use location service.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }
    console.log('2');
    let { coords } = await Location.getCurrentPositionAsync();
    setLong(coords);
    console.log(coords);

    if (coords) {
      const { latitude, longitude } = coords;
      //let address = `${latitude}, ${logitude}`;
      console.log(latitude +' '+ longitude);

    }
  };
  
  useEffect(() => {
    setTimeout(() =>{
        GetCurrentLocation();
  }, 1000);
}, []);



  return (
    <View style={styles.container}>
      <MapView style={styles.map}  showsUserLocation={true} >
      {data.map((item,key) => (<Marker key={key}
            coordinate={{latitude: item.latitude, longitude: item.longitude}
          }
         />
         )
      )
      }
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