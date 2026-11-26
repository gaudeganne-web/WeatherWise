
import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';

export default function SplashScreen() {

  return (
    <View style={styles.container}>

      <StatusBar
        backgroundColor="#1565C0"
        barStyle="light-content"
      />

      <Text style={styles.icon}>☀️</Text>

      <Text style={styles.title}>
        WeatherWise
      </Text>

      <Text style={styles.subtitle}>
        Your Smart Weather Companion
      </Text>

      <Text style={styles.loading}>
        Checking your account...
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#1565C0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    fontSize: 90,
  },

  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 15,
  },

  subtitle: {
    fontSize: 16,
    color: '#E3F2FD',
    marginTop: 10,
  },

  loading: {
    color: '#FFFFFF',
    marginTop: 50,
  },

});
