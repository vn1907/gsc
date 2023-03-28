import {Text, KeyboardAvoidingView, View,TextInput, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import { auth, onAuthStateChanged, signInWithEmailAndPassword } from "./firebaseConfig";

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
    <KeyboardAvoidingView className = "p-4 m-5 flex justify-center h-screen">
      <View className='mb-4'>
        <Text className='font-bold mb-2 text-gray-700 '>Email</Text>
        <TextInput
          className='px-3 py-2 border rounded-md text-gray-700 w-full bg-white'
          onChangeText={setEmail}
          value={email}
        />
      </View>
      <View className='mb-4'>
        <Text className='font-bold mb-2 text-gray-700'>Password</Text>
        <TextInput
          className='px-3 py-2 border rounded-md text-gray-700 w-full bg-white'
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
      </View>
      <TouchableOpacity onPress={handleLoginButton} className='bg-blue-500 py-2 rounded-md my-2'>
        <Text className='text-white text-center font-bold text-lg'>Login</Text>
      </TouchableOpacity>
      <Text onPress={redirectToRegister} className='text-blue-500 font-bold text-lg my-2'>Don't have an account? Register </Text>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen;