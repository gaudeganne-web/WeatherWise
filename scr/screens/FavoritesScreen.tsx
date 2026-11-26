
import React from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function FavoritesScreen() {

  return (

    <View style={styles.container}>

      <Text style={styles.icon}>❤️</Text>

      <Text style={styles.title}>
        Favorite Cities
      </Text>

      <Text style={styles.subtitle}>
        Your saved cities will appear here.
      </Text>

      <Text style={styles.message}>
        Search for a city and add it to your favorites!
      </Text>

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

  icon: {
    fontSize: 70,
  },

  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#1565C0',
    marginTop: 20,
  },

  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginTop: 12,
  },

  message: {
    fontSize: 14,
    color: '#888888',
    marginTop: 20,
    textAlign: 'center',
  },

});
