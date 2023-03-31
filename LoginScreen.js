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
    <KeyboardAvoidingView className = "px-14 py-20 m-1 flex h-screen">
      <View className='mb-7'>
        <Text className='font-bold mb-2 text-gray-700 '>Email</Text>
        <View className="items-center">
        <TextInput
          className='px-3 py-2 border rounded-md text-gray-700 w-64 bg-white'
          onChangeText={setEmail}
          value={email}
        />
        </View>
      </View>
      <View className='mb-9'>
        <Text className='font-bold mb-2 text-gray-700'>Password</Text>
        <View className="items-center">
        <TextInput
          className='px-3 py-2 border rounded-md text-gray-700 w-64 bg-white'
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        </View>
      </View>
      <View className="items-center">
      <TouchableOpacity onPress={handleLoginButton} className="w-1/2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
        <Text className='text-white text-center font-bold text-lg'>Login</Text>
      </TouchableOpacity>
      </View>
      <Text onPress={redirectToRegister} className='text-blue-500 font-bold text-sm my-2'>Don't have an account? Register </Text>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen;