
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
  ActivityIndicator,
  Button,
} from 'react-native-paper';

import { getForecast } from '../services/weatherService';

export default function ForecastScreen() {

  const [forecast, setForecast] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadForecast = async () => {

    try {
      setLoading(true);

      const data = await getForecast('Goa');

      setForecast(data);

    } catch (error: any) {

      Alert.alert('Forecast Error', error.message);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadForecast();
  }, []);

  const getCondition = (code: number) => {

    if (code === 0) return 'Clear Sky';
    if ([1, 2, 3].includes(code)) return 'Cloudy';
    if ([45, 48].includes(code)) return 'Foggy';
    if ([51, 53, 55, 56, 57].includes(code)) return 'Drizzle';
    if ([61, 63, 65, 80, 81, 82].includes(code)) return 'Rainy';
    if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Snowy';
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

  const formatDate = (date: string) => {
    return new Date(date + 'T12:00:00').toLocaleDateString(
      'en-IN',
      {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      }
    );
  };

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        🌤️ 7-Day Forecast
      </Text>

      <Text style={styles.subtitle}>
        {forecast
          ? `${forecast.city}, ${forecast.country}`
          : 'Weather forecast'}
      </Text>

      <Button
        mode="outlined"
        onPress={loadForecast}
        style={styles.refresh}
        loading={loading}
        disabled={loading}
      >
        Refresh Forecast
      </Button>

      {loading ? (

        <ActivityIndicator
          size="large"
          style={{ marginTop: 50 }}
        />

      ) : forecast ? (

        forecast.daily.time.map((date: string, index: number) => (

          <Card key={date} style={styles.card}>

            <Card.Content style={styles.row}>

              <View style={styles.dateSection}>
                <Text style={styles.date}>
                  {formatDate(date)}
                </Text>

                <Text style={styles.condition}>
                  {getIcon(forecast.daily.weather_code[index])}{' '}
                  {getCondition(forecast.daily.weather_code[index])}
                </Text>
              </View>

              <View style={styles.tempSection}>

                <Text style={styles.maxTemp}>
                  {Math.round(
                    forecast.daily.temperature_2m_max[index]
                  )}°
                </Text>

                <Text style={styles.minTemp}>
                  {Math.round(
                    forecast.daily.temperature_2m_min[index]
                  )}°
                </Text>

              </View>

              <Text style={styles.rain}>
                💧 {forecast.daily.precipitation_probability_max[index]}%
              </Text>

            </Card.Content>

          </Card>

        ))

      ) : (

        <Text style={styles.error}>
          Forecast unavailable.
        </Text>

      )}

      <Text style={styles.footer}>
        Data provided by Open-Meteo
      </Text>

    </ScrollView>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F1F6FC',
    padding: 15,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1565C0',
    marginTop: 20,
  },

  subtitle: {
    fontSize: 16,
    color: '#777777',
    marginTop: 8,
  },

  refresh: {
    marginTop: 18,
    marginBottom: 10,
  },

  card: {
    marginVertical: 7,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },

  dateSection: {
    flex: 1,
  },

  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222222',
  },

  condition: {
    fontSize: 12,
    color: '#777777',
    marginTop: 8,
  },

  tempSection: {
    flexDirection: 'row',
    gap: 12,
  },

  maxTemp: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1565C0',
  },

  minTemp: {
    fontSize: 18,
    color: '#777777',
  },

  rain: {
    fontSize: 13,
    color: '#1565C0',
    marginLeft: 8,
  },

  error: {
    textAlign: 'center',
    marginTop: 40,
    color: '#D32F2F',
  },

  footer: {
    textAlign: 'center',
    color: '#888888',
    marginVertical: 25,
    fontSize: 12,
  },

});
