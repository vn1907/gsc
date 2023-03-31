import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import{useEffect} from 'react';
import Nav from './NavigatorHome.js';
import SignUpScreen from './SignUpScreen.js';
import LoginScreen from './LoginScreen.js';
import SuccessScreen from './SuccessScreen.js';

const Stack = createNativeStackNavigator();

const HomeScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() =>{
      navigation.navigate('Login')
  }, 2000);
  }, []);
  return (
    <View className="flex items-center h-full justify-center">
      <Image source={require('./assets/logo.png')} className="w-44 h-44 mb-7" />
      <View className="items-center">
      <Text className="text-slate-600 text-lg font-bold">Risky roads await you on the way</Text>
      <Text  className="text-slate-800 text-lg font-bold"> - let us be your guide.</Text>
      </View>
    </View>
  );
};

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false,}}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false,}}/>
        <Stack.Screen name="Main" component={Nav} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;