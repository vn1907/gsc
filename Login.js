import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = () => {
    // handle login functionality
  }

  const handleRegister = () => {
    // handle registration functionality
  }

  const toggleRegister = () => {
    setIsRegistering(!isRegistering);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{isRegistering ? 'Register' : 'Login'}</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setEmail(text)}
        value={email}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
      />
      {isRegistering ? (
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={toggleRegister}>
        <Text style={styles.toggleText}>{isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 32,
    marginBottom: 24,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingLeft: 10,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#1e88e5',
    padding: 12,
    borderRadius: 4,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  toggleText: {
    marginTop: 16,
    color: '#1e88e5',
  },
});
