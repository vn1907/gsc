import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ViewMapLoc from './ViewMap.js';
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

  
  return (
    <Tab.Navigator
    initialRouteName="View Map"
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#e91e63',
      align: 'bottom',
    }}>
      <Tab.Screen
      name= 'Map'
      component={ViewMap}
      options={{
        headerShown: false,
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