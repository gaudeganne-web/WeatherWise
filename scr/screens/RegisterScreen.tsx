
import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';

import {
  TextInput,
  Button,
} from 'react-native-paper';

import { registerUser } from '../services/authService';

import { db } from '../services/firebase';

import {
  doc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';

export default function RegisterScreen({ navigation }: any) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {

    if (!name.trim() || !email.trim() || !password) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {

      setLoading(true);

      const user = await registerUser(email, password);

      await setDoc(doc(db, 'users', user.uid), {
        name: name.trim(),
        email: email.trim(),
        createdAt: serverTimestamp(),
      });

      Alert.alert('Success', 'Account created successfully!');

    } catch (error: any) {

      Alert.alert('Registration Failed', error.message);

    } finally {

      setLoading(false);

    }
  };

  return (

    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.icon}>🌤️</Text>

      <Text style={styles.title}>
        Create Account
      </Text>

      <Text style={styles.subtitle}>
        Join WeatherWise Today!
      </Text>

      <TextInput
        label="Full Name"
        value={name}
        onChangeText={setName}
        mode="outlined"
        style={styles.input}
        left={<TextInput.Icon icon="account" />}
      />

      <TextInput
        label="Email Address"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        left={<TextInput.Icon icon="email" />}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
        style={styles.input}
        left={<TextInput.Icon icon="lock" />}
      />

      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        mode="outlined"
        secureTextEntry
        style={styles.input}
        left={<TextInput.Icon icon="lock-check" />}
      />

      <Button
        mode="contained"
        onPress={handleRegister}
        loading={loading}
        disabled={loading}
        style={styles.button}
        contentStyle={{ height: 50 }}
      >
        REGISTER
      </Button>

      <Text
        style={styles.loginLink}
        onPress={() => navigation.navigate('Login')}
      >
        Already have an account? Login
      </Text>

    </ScrollView>

  );
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#FFFFFF',
  },

  icon: {
    fontSize: 65,
    textAlign: 'center',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1565C0',
    marginTop: 10,
  },

  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    color: '#777777',
    marginTop: 10,
    marginBottom: 30,
  },

  input: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },

  button: {
    marginTop: 15,
    borderRadius: 10,
  },

  loginLink: {
    textAlign: 'center',
    marginTop: 25,
    color: '#1565C0',
    fontWeight: 'bold',
  },

});
