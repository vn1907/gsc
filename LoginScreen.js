import {Text, KeyboardAvoidingView, View,TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import { auth, onAuthStateChanged, signInWithEmailAndPassword } from "./firebaseConfig";
import login_bg from './assets/login_bg.png';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
          navigation.navigate("Main")
        } 
      });
  }, [])
  
  const handleLoginButton = async() => {
    console.log(`mail: ${email}, Password: ${password}`);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("Main")
  } catch(error) {
      alert(error.message);
  }
  }

  const redirectToRegister = () => {
    navigation.navigate("SignUp")
  }

  return (
    <ImageBackground source={login_bg} className="h-full">
    <KeyboardAvoidingView className = "items-center justify-center m-1 flex h-4/5">
    <Image source={require('./assets/logo.png')} className="w-44 h-44 mb-7 mt-7" />
      <View className='mb-7'>
        <Text className='font-bold mb-2 text-white text-lg '>Email</Text>
        <View className="items-center">
        <TextInput
          className='px-3 py-2 rounded-md text-gray-700 w-64 bg-transparent border border-white text-white font-bold'
          onChangeText={setEmail}
          value={email}
        />
        </View>
      </View>
      <View className='mb-9'>
        <Text className='font-bold mb-2 text-white text-lg'>Password</Text>
        <View className="items-center">
        <TextInput
          className='px-3 py-2 rounded-md text-gray-700 w-64 bg-transparent border border-white text-white font-bold'
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        </View>
      </View>
      <View className="items-center">
      <TouchableOpacity onPress={handleLoginButton} className="w-1/2 bg-sky-900 hover:bg-sky-400 text-white font-bold py-2 px-4 border-b-4 border-sky-950 hover:border-blue-500 rounded-lg">
        <Text className='text-white text-center font-bold text-lg'>Login</Text>
      </TouchableOpacity>
      </View>
      <Text onPress={redirectToRegister} className='text-white font-bold text-sm my-2'>Don't have an account? <Text className="underline">Register</Text></Text>
      
    </KeyboardAvoidingView>
    </ImageBackground>
  )
}

export default LoginScreen;