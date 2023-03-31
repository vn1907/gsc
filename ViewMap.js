import React from 'react';
import MapView , {Marker, Callout}from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useEffect, useState, useRef } from 'react';
import * as Location from "expo-location";
import {db, collection, getDocs, } from "./firebaseConfig"

export default function ViewMapLoc() {
  const location = useRef("");
  const [long, setLong] = useState(null);
  const data = useRef([{
        latitude: 17.44,
        longitude: 78.49,
        imageUrl: "",
      }]);
  const mapRef = useRef("");
  // const data= [
  //   {

  //     latitude: 17.45,
  //     longitude: 78.43,
  //   },
  //   {
  //     latitude: 17.44,
  //     longitude: 78.49,
  //   },
  // ]
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
    setLong(coords);
    location.current = coords;
    console.log(coords);

    if (coords) {
      const { latitude, longitude } = coords;
      //let address = `${latitude}, ${logitude}`;
      console.log(latitude +' '+ longitude);

    }
  };

  async function getManholeData() {
    console.log("Inside getManholeData")
    const manholeData = []
    try {
      const querySnapshot = await getDocs(collection(db, "manholes"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        manholeData.push(doc.data());
      });
      data.current = manholeData
      //setData(manholeData)
      mapRef;
      console.log("Documents successfully retrieved");
      console.log(data.current)
    } catch(error) {
      console.error("Error getting document: ", error);
    }
    
  }
  
  useEffect(() => {
    setTimeout(() =>{
        GetCurrentLocation();
  }, 1000);
    setTimeout(() =>{
      getManholeData();
  }, 1000);
  }, []);



  return (
    <View style={styles.container}>
      <View>
        <MapView ref={mapRef} style={styles.map} showsUserLocation={true} >
        {data.current.map((item,key) => (<Marker key={key}
              coordinate={{latitude: item.latitude, longitude: item.longitude}
            }
          >
            <Callout>
              <View>
                <Text>{item.email}</Text>
                <WebView style={styles.preview} source={{ uri: item.imageUrl }} resizeMode="cover" />
              </View>
            </Callout>
          </Marker>
          )
        )
        }
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '95%',
  },
  preview: {
    width: 300,
    height: 400,
  },
});