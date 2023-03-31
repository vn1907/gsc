import * as React from 'react';
import { Text, View, ActionBar, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ViewMapLoc from './ViewMap.js';
import UpdateManhole from './addManhole.js';
import { Button } from 'react-native-web';

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
    <View className="h-full">
      <View className="items-center w-1/2">
      <TouchableOpacity className="mt-10 flex">
        <Text className="text-bold ">Logout</Text>
      </TouchableOpacity>
      </View>
    <Tab.Navigator
    initialRouteName="View Map"
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#1B4470',
      align: 'bottom',
      tabBarStyle: {height: 80},
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
        tabBarLabelStyle: {paddingLeft:35},
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="map" color={color} size={40} />
        ),
      }}
    />
    <Tab.Screen
      name="Add Manhole"
      component={AddManhole}
      options={{
        tabBarLabel: 'Add',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="plus-circle-outline" color={color} size={50} />
        ),
      }}
    />
  </Tab.Navigator>
  </View>
  );
};

export default Nav;