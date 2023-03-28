import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ViewMapLoc from './ViewMap.js';
import { useEffect } from 'react';
import * as Location from "expo-location";
import UpdateManhole from './addManhole.js';

function AddManhole() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <UpdateManhole/>
    </View>
  );
}

function ViewMap() {
  return (

      <ViewMapLoc/>
    
  );
}



const Tab = createBottomTabNavigator();

 const Nav = () => {

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
    <Tab.Navigator
    initialRouteName="View Map"
    screenOptions={{
      tabBarActiveTintColor: '#e91e63',
      align: 'bottom'
    }}>
      <Tab.Screen
      name="View Map"
      component={ViewMap}
      options={{
        tabBarLabel: 'View Map',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="map" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Add Manhole"
      component={AddManhole}
      options={{
        tabBarLabel: 'Add Manhole',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="plus-circle-outline" color={color} size={size} />
        ),
      }}
    />
    

  </Tab.Navigator>
  );
};

export default Nav;