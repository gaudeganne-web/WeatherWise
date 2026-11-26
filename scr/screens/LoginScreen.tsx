
import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import {
  TextInput,
  Button,
} from 'react-native-paper';

import { loginUser } from '../services/authService';

export default function LoginScreen({ navigation }: any) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [secure, setSecure] = useState(true);

  const handleLogin = async () => {

    if (!email.trim() || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    try {
      setLoading(true);

      await loginUser(email, password);

      Alert.alert('Success', 'Login successful!');

    } catch (error: any) {

      Alert.alert(
        'Login Failed',
        error.code === 'auth/invalid-credential'
          ? 'Invalid email or password.'
          : error.message
      );

    } finally {
      setLoading(false);
    }
  };

  return (

    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >

      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >

        <Text style={styles.icon}>☀️</Text>

        <Text style={styles.title}>
          WeatherWise
        </Text>

        <Text style={styles.subtitle}>
          Welcome Back!
        </Text>

        <Text style={styles.description}>
          Login to check your weather updates
        </Text>

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
          secureTextEntry={secure}
          style={styles.input}
          left={<TextInput.Icon icon="lock" />}
          right={
            <TextInput.Icon
              icon={secure ? 'eye' : 'eye-off'}
              onPress={() => setSecure(!secure)}
            />
          }
        />

        <Button
          mode="contained"
          onPress={handleLogin}
          loading={loading}
          disabled={loading}
          style={styles.button}
          contentStyle={{ height: 50 }}
        >
          LOGIN
        </Button>

        <View style={styles.registerRow}>

          <Text style={styles.registerText}>
            Don't have an account?
          </Text>

          <Text
            style={styles.registerLink}
            onPress={() => navigation.navigate('Register')}
          >
            {' '}Register
          </Text>

        </View>

      </ScrollView>

    </KeyboardAvoidingView>

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
    fontSize: 75,
    textAlign: 'center',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1565C0',
    textAlign: 'center',
    marginTop: 10,
  },

  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 25,
    color: '#222222',
  },

  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#777777',
    marginTop: 10,
    marginBottom: 30,
  },

  input: {
    marginBottom: 18,
    backgroundColor: '#FFFFFF',
  },

  button: {
    marginTop: 15,
    borderRadius: 10,
  },

  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },

  registerText: {
    color: '#666666',
  },

  registerLink: {
    color: '#1565C0',
    fontWeight: 'bold',
  },

});
