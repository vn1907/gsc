import {Text, KeyboardAvoidingView, View,TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {db, auth, addDoc, collection, onAuthStateChanged, createUserWithEmailAndPassword} from "./firebaseConfig"
import React, {useEffect, useState} from 'react';
import login_bg from './assets/login_bg.png';

const SignUpScreen = () => {
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
          navigation.reset("Nav")
        } 
      });
  }, [])

  const redirectToLogin = () => {
    navigation.navigate("Login")
  }

  async function handleRegisterButton() {
    console.log(`Name: ${name}, Email: ${email}`);
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        try {
            const docRef = await addDoc(collection(db, "users"), {
              name: name,
              email: email 
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        navigation.navigate("Login")
    } catch(error) {
        alert(error.message);
    }
  }

  return (
    <ImageBackground source={login_bg} className="h-full">
    <View className="items-center justify-center m-1 flex ">
    <KeyboardAvoidingView className = "p-7 py-20 m-7 h-screen ">
    
      <View className='mb-7'>
      <Image source={require('./assets/logo.png')} className="w-44 h-44 m-7 pl-6" />
        <Text className='font-bold mb-2 text-white text-lg'>Name</Text>
        <View className="items-center">
        <TextInput
          className='px-3 py-2  rounded-md text-gray-700 w-full bg-transparent border border-white '
          onChangeText={setName}
          value={name}
        />
        </View>
      </View>
      <View className='mb-7'>
        <Text className='font-bold mb-2 text-white text-lg'>Email</Text>
        <View className="items-center">
        <TextInput
          className='px-3 py-2  rounded-md text-gray-700 w-full bg-transparent border border-white '
          onChangeText={setEmail}
          value={email}
        />
        </View>
      </View>
      <View className='mb-9'>
        <Text className='font-bold mb-2 text-white text-lg'>Password</Text>
        <View className="items-center">
        <TextInput
          className='px-3 py-2  rounded-md text-gray-700 w-full bg-transparent border border-white'
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        </View>
      </View>
      <View className="items-center">
      <TouchableOpacity onPress={handleRegisterButton} className='w-1/2 bg-sky-900 hover:bg-sky-400 text-white font-bold py-2 px-4 border-b-4 border-sky-950 hover:border-blue-500 rounded-lg'>
        <Text className='text-white text-center font-bold text-lg'>Register</Text>
      </TouchableOpacity>
      </View>
      <Text onPress={redirectToLogin} className='text-white font-bold text-sm my-2'>Already have an account? <Text className="underline">Login</Text> </Text>
    </KeyboardAvoidingView>
    </View>
    </ImageBackground>
  )
}

export default SignUpScreen;