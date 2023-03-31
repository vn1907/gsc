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
    <View className="justify-between">
    <KeyboardAvoidingView className = "p-9 py-20 m-5 h-screen">
      <View className='mb-7'>
        <Text className='font-bold mb-2 text-gray-700'>Name</Text>
        <View className="items-center">
        <TextInput
          className='px-3 py-2 border rounded-md text-gray-700 w-64 bg-white'
          onChangeText={setName}
          value={name}
        />
        </View>
      </View>
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
          className='px-3 py-2 border rounded-md text-gray-700 w-64 bg-white '
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        </View>
      </View>
      <View className="items-center">
      <TouchableOpacity onPress={handleRegisterButton} className='w-1/2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'>
        <Text className='text-white text-center font-bold text-lg'>Register</Text>
      </TouchableOpacity>
      </View>
      <Text onPress={redirectToLogin} className='text-blue-500 font-bold text-sm my-2'>Already have an account? Login </Text>
    </KeyboardAvoidingView>
    </View>
  )
}

export default SignUpScreen;