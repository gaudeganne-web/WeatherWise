
import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

import {
  Card,
  Button,
  ActivityIndicator,
  TextInput,
} from 'react-native-paper';

import { getWeather } from '../services/weatherService';
import { logoutUser } from '../services/authService';

export default function HomeScreen() {

  const [city, setCity] = useState('Goa');
  const [searchCity, setSearchCity] = useState('Goa');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const loadWeather = async (cityName: string) => {

    try {
      setLoading(true);

      const data = await getWeather(cityName);

      setWeather(data);
      setCity(data.city);

    } catch (error: any) {

      Alert.alert('Weather Error', error.message);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather('Goa');
  }, []);

  const getCondition = (code: number) => {

    if (code === 0) return 'Clear Sky';
    if ([1, 2, 3].includes(code)) return 'Partly Cloudy';
    if ([45, 48].includes(code)) return 'Foggy';
    if ([51, 53, 55, 56, 57].includes(code)) return 'Drizzle';
    if ([61, 63, 65, 66, 67].includes(code)) return 'Rainy';
    if ([71, 73, 75, 77].includes(code)) return 'Snowy';
    if ([80, 81, 82].includes(code)) return 'Rain Showers';
    if ([85, 86].includes(code)) return 'Snow Showers';
    if ([95, 96, 99].includes(code)) return 'Thunderstorm';

    return 'Weather Update';
  };

  const getIcon = (code: number) => {

    if (code === 0) return '☀️';
    if ([1, 2, 3].includes(code)) return '⛅';
    if ([45, 48].includes(code)) return '🌫️';
    if ([51, 53, 55, 56, 57].includes(code)) return '🌦️';
    if ([61, 63, 65, 80, 81, 82].includes(code)) return '🌧️';
    if ([71, 73, 75, 77, 85, 86].includes(code)) return '❄️';
    if ([95, 96, 99].includes(code)) return '⛈️';

    return '🌤️';
  };

  const handleSearch = () => {

    if (!searchCity.trim()) {
      Alert.alert('Error', 'Enter a city name');
      return;
    }

    loadWeather(searchCity.trim());
  };

  const handleLogout = async () => {

    try {
      await logoutUser();
    } catch (error: any) {
      Alert.alert('Logout Error', error.message);
    }

  };

  return (

    <ScrollView style={styles.container}>

      <View style={styles.header}>

        <View>
          <Text style={styles.appName}>
            ☀️ WeatherWise
          </Text>

          <Text style={styles.welcome}>
            Your Daily Weather
          </Text>
        </View>

        <Button
          mode="outlined"
          textColor="#FFFFFF"
          onPress={handleLogout}
        >
          Logout
        </Button>

      </View>

      <View style={styles.searchContainer}>

        <TextInput
          placeholder="Enter city name"
          value={searchCity}
          onChangeText={setSearchCity}
          mode="outlined"
          style={styles.searchInput}
          left={<TextInput.Icon icon="map-marker" />}
        />

        <Button
          mode="contained"
          onPress={handleSearch}
          style={styles.searchButton}
        >
          Search
        </Button>

      </View>

      {loading ? (

        <ActivityIndicator
          animating={true}
          size="large"
          color="#1565C0"
          style={{ marginTop: 50 }}
        />

      ) : weather ? (

        <>

          <Card style={styles.weatherCard}>

            <Card.Content style={styles.weatherContent}>

              <Text style={styles.city}>
                {weather.city}, {weather.country}
              </Text>

              <Text style={styles.weatherIcon}>
                {getIcon(weather.current.weather_code)}
              </Text>

              <Text style={styles.temperature}>
                {Math.round(weather.current.temperature_2m)}°C
              </Text>

              <Text style={styles.condition}>
                {getCondition(weather.current.weather_code)}
              </Text>

              <Text style={styles.feelsLike}>
                Feels like {Math.round(
                  weather.current.apparent_temperature
                )}°C
              </Text>

            </Card.Content>

          </Card>

          <Text style={styles.sectionTitle}>
            Today's Weather Details
          </Text>

          <View style={styles.detailsContainer}>

            <Card style={styles.detailCard}>
              <Card.Content style={styles.detailContent}>
                <Text style={styles.detailIcon}>💧</Text>
                <Text style={styles.detailTitle}>Humidity</Text>
                <Text style={styles.detailValue}>
                  {weather.current.relative_humidity_2m}%
                </Text>
              </Card.Content>
            </Card>

            <Card style={styles.detailCard}>
              <Card.Content style={styles.detailContent}>
                <Text style={styles.detailIcon}>💨</Text>
                <Text style={styles.detailTitle}>Wind Speed</Text>
                <Text style={styles.detailValue}>
                  {weather.current.wind_speed_10m} km/h
                </Text>
              </Card.Content>
            </Card>

            <Card style={styles.detailCard}>
              <Card.Content style={styles.detailContent}>
                <Text style={styles.detailIcon}>🌧️</Text>
                <Text style={styles.detailTitle}>Precipitation</Text>
                <Text style={styles.detailValue}>
                  {weather.current.precipitation} mm
                </Text>
              </Card.Content>
            </Card>

            <Card style={styles.detailCard}>
              <Card.Content style={styles.detailContent}>
                <Text style={styles.detailIcon}>🌡️</Text>
                <Text style={styles.detailTitle}>Temperature</Text>
                <Text style={styles.detailValue}>
                  {weather.current.temperature_2m}°C
                </Text>
              </Card.Content>
            </Card>

          </View>

        </>

      ) : (

        <Text style={styles.errorText}>
          No weather information available.
        </Text>

      )}

      <Text style={styles.footer}>
        Weather information powered by Open-Meteo
      </Text>

    </ScrollView>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F1F6FC',
  },

  header: {
    backgroundColor: '#1565C0',
    padding: 22,
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  appName: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  welcome: {
    fontSize: 14,
    color: '#DCEBFF',
    marginTop: 5,
  },

  searchContainer: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  searchInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  searchButton: {
    justifyContent: 'center',
  },

  weatherCard: {
    margin: 15,
    borderRadius: 20,
    backgroundColor: '#1565C0',
  },

  weatherContent: {
    alignItems: 'center',
    padding: 20,
  },

  city: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },

  weatherIcon: {
    fontSize: 75,
    marginTop: 15,
  },

  temperature: {
    fontSize: 55,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  condition: {
    fontSize: 19,
    color: '#FFFFFF',
  },

  feelsLike: {
    fontSize: 14,
    color: '#DCEBFF',
    marginTop: 8,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222222',
    marginHorizontal: 18,
    marginTop: 15,
    marginBottom: 10,
  },

  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

  detailCard: {
    width: '44%',
    margin: 8,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
  },

  detailContent: {
    alignItems: 'center',
    padding: 12,
  },

  detailIcon: {
    fontSize: 30,
  },

  detailTitle: {
    fontSize: 13,
    color: '#777777',
    marginTop: 8,
  },

  detailValue: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#1565C0',
    marginTop: 5,
  },

  errorText: {
    textAlign: 'center',
    marginTop: 40,
    color: 'red',
  },

  footer: {
    textAlign: 'center',
    color: '#888888',
    fontSize: 12,
    margin: 25,
  },

});
