import {Text, KeyboardAvoidingView, View,TextInput, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {db, auth, addDoc, collection, onAuthStateChanged, createUserWithEmailAndPassword} from "./firebaseConfig"
import React, {useEffect, useState} from 'react';

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
    <KeyboardAvoidingView className = "p-4 m-5 flex justify-center h-screen">
      <View className='mb-4'>
        <Text className='font-bold mb-2 text-gray-700'>Name</Text>
        <TextInput
          className='px-3 py-2 border rounded-md text-gray-700 w-full bg-white'
          onChangeText={setName}
          value={name}
        />
      </View>
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
      <TouchableOpacity onPress={handleRegisterButton} className=' py-2 bg-blue-500 rounded-md'>
        <Text className='text-white text-center font-bold text-lg'>Register</Text>
      </TouchableOpacity>
      <Text onPress={redirectToLogin} className='text-blue-500 font-bold text-lg my-2'>Already have an account? Login </Text>
    </KeyboardAvoidingView>
  )
}

export default SignUpScreen;