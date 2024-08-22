import "./index.css"
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = '966c7ffbfe08c9330ee3c8a7d827b60d';

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: location,
            units: 'metric',
            appid: apiKey,
          },
        }
      );
      setWeatherData({
        location: response.data.name,
        temperature: response.data.main.temp,
        description: response.data.weather[0].description,
      });
      setError(null);
    } catch (err) {
      setWeatherData(null);
      setError('Location not found. Please try again.');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Weather Report</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            className="border p-2 w-full mb-4 rounded-md"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md"
          >
            Get Report
          </button>
        </form>

        {weatherData && (
          <div className="mt-4">
            <h2 className="text-xl font-bold">{weatherData.location}</h2>
            <p className="text-lg">Temperature: {weatherData.temperature}°C</p>
            <p className="text-lg">Weather: {weatherData.description}</p>
          </div>
        )}

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default App;
