
import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';

import { Button, ActivityIndicator } from 'react-native-paper';

import { auth, db } from '../services/firebase';

import { logoutUser } from '../services/authService';

import { doc, getDoc } from 'firebase/firestore';

export default function ProfileScreen() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadProfile = async () => {

      try {

        const user = auth.currentUser;

        if (!user) return;

        setEmail(user.email || '');

        const userDoc = await getDoc(
          doc(db, 'users', user.uid)
        );

        if (userDoc.exists()) {
          setName(userDoc.data().name || '');
        }

      } catch (error: any) {

        Alert.alert('Profile Error', error.message);

      } finally {

        setLoading(false);

      }

    };

    loadProfile();

  }, []);

  const handleLogout = async () => {

    try {
      await logoutUser();
    } catch (error: any) {
      Alert.alert('Logout Error', error.message);
    }

  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (

    <View style={styles.container}>

      <Text style={styles.avatar}>👤</Text>

      <Text style={styles.title}>
        My Profile
      </Text>

      <View style={styles.card}>

        <Text style={styles.label}>
          Full Name
        </Text>

        <Text style={styles.value}>
          {name || 'Not available'}
        </Text>

        <Text style={styles.label}>
          Email Address
        </Text>

        <Text style={styles.value}>
          {email || 'Not available'}
        </Text>

      </View>

      <Button
        mode="contained"
        buttonColor="#D32F2F"
        onPress={handleLogout}
        style={styles.button}
        contentStyle={{ height: 48 }}
      >
        LOGOUT
      </Button>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F6FC',
    padding: 25,
  },

  avatar: {
    fontSize: 80,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1565C0',
    marginTop: 15,
  },

  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 22,
    marginTop: 30,
  },

  label: {
    fontSize: 14,
    color: '#777777',
    marginTop: 10,
  },

  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222222',
    marginTop: 6,
  },

  button: {
    width: '100%',
    marginTop: 30,
    borderRadius: 10,
  },

});
