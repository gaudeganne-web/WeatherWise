
export const getWeather = async (city: string) => {

  // Step 1: Find city coordinates
  const geoResponse = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
  );

  if (!geoResponse.ok) {
    throw new Error('Unable to search for city');
  }

  const geoData = await geoResponse.json();

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error('City not found');
  }

  const location = geoData.results[0];

  // Step 2: Get current weather
  const weatherResponse = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=auto`
  );

  if (!weatherResponse.ok) {
    throw new Error('Unable to fetch weather');
  }

  const weatherData = await weatherResponse.json();

  return {
    city: location.name,
    country: location.country,
    current: weatherData.current,
  };
};

export const getForecast = async (city: string) => {

  // Find city coordinates
  const geoResponse = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
  );

  if (!geoResponse.ok) {
    throw new Error('Unable to search for city');
  }

  const geoData = await geoResponse.json();

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error('City not found');
  }

  const location = geoData.results[0];

  // Get 7-day weather forecast
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&forecast_days=7&timezone=auto`
  );

  if (!response.ok) {
    throw new Error('Unable to fetch forecast');
  }

  const data = await response.json();

  return {
    city: location.name,
    country: location.country,
    daily: data.daily,
  };

};
