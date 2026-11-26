
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
  Card,
  ActivityIndicator,
} from 'react-native-paper';

import { getWeather } from '../services/weatherService';

export default function SearchScreen() {

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const searchWeather = async () => {

    if (!city.trim()) {
      Alert.alert('Error', 'Please enter a city name');
      return;
    }

    try {
      setLoading(true);
      const result = await getWeather(city.trim());
      setWeather(result);

    } catch (error: any) {
      setWeather(null);
      Alert.alert('Search Error', error.message);

    } finally {
      setLoading(false);
    }
  };

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        🔍 Search City
      </Text>

      <Text style={styles.subtitle}>
        Find weather information for any city.
      </Text>

      <TextInput
        label="Enter City Name"
        value={city}
        onChangeText={setCity}
        mode="outlined"
        style={styles.input}
        left={<TextInput.Icon icon="map-marker" />}
      />

      <Button
        mode="contained"
        onPress={searchWeather}
        loading={loading}
        disabled={loading}
        style={styles.button}
        contentStyle={{ height: 48 }}
      >
        Search Weather
      </Button>

      {loading && (
        <ActivityIndicator
          size="large"
          style={{ marginTop: 30 }}
        />
      )}

      {weather && !loading && (

        <Card style={styles.card}>

          <Card.Content style={styles.cardContent}>

            <Text style={styles.city}>
              {weather.city}, {weather.country}
            </Text>

            <Text style={styles.temperature}>
              {Math.round(weather.current.temperature_2m)}°C
            </Text>

            <Text style={styles.info}>
              Humidity: {weather.current.relative_humidity_2m}%
            </Text>

            <Text style={styles.info}>
              Wind Speed: {weather.current.wind_speed_10m} km/h
            </Text>

            <Text style={styles.info}>
              Feels Like: {weather.current.apparent_temperature}°C
            </Text>

          </Card.Content>

        </Card>

      )}

    </ScrollView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F1F6FC',
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1565C0',
    marginTop: 25,
  },

  subtitle: {
    color: '#777777',
    marginTop: 10,
    marginBottom: 25,
    fontSize: 15,
  },

  input: {
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
  },

  button: {
    borderRadius: 10,
  },

  card: {
    marginTop: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
  },

  cardContent: {
    alignItems: 'center',
    padding: 20,
  },

  city: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1565C0',
  },

  temperature: {
    fontSize: 55,
    fontWeight: 'bold',
    color: '#1565C0',
    marginTop: 15,
  },

  info: {
    fontSize: 16,
    color: '#555555',
    marginTop: 12,
  },

});
