import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button, Text} from 'react-native';
import Home from './Home.js';
import Nav from './Navigator.js';


const Stack = createNativeStackNavigator();
const HomeScreen = ({navigation}) => {
  return (
    <Button
      title="Start"
      onPress={() =>
        navigation.navigate('Main')
      }
    />
  );
};

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Main" component={Nav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;