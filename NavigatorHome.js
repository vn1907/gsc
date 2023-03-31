import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ViewMapLoc from './ViewMap.js';
import UpdateManhole from './addManhole.js';
import {auth} from "./firebaseConfig"

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
    <View className="h-full flex-1">
      <View className="flex-row items-center border">
      <View className="flex-row mt-10 mr-5 flex-1 justify-evenly">
      <Text className="text-2xl font-bold mb-3 text-sky-900">Safe Safar</Text>
      </View>
      <View className="justify-evenly items-end mt-10 mr-5 mb-3">
      <MaterialCommunityIcons name="logout" size={35} color="black" />
      </View>
      </View>
    
    <Tab.Navigator
    initialRouteName="View Map"
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#0c4a6e',
      align: 'bottom',
      tabBarStyle: {height: 60},
      tabBarLabelPosition: 'beside-icon',
      tabBarLabelStyle: {fontSize:15},
    }}>
      
      <Tab.Screen
      name= 'Map'
      component={ViewMap}
      options={{
        headerShown: false,
        tabBarLabel: 'View',
        labelPosition: "beside-icon",
        
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="map" color={color} size={30} />
        ),
      }}
    />
    <Tab.Screen
      name="Add Manhole"
      component={AddManhole}
      options={{
        tabBarLabel: 'Add',
        
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="plus-circle-outline" color={color} size={27}/>
        ),
      }}
    />
  </Tab.Navigator>
  </View>
  );
};

export default Nav;