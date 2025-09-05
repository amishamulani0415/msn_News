import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const API_KEY = "bd5e378503939ddaee76f12ad7a97608";
  const city = "delhi";

  useEffect(() => {
    const getWeather = async () => {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        setWeather(res.data);
      } catch (err) {
        console.error("Failed to fetch weather:", err);
      }
    };

    getWeather();
  }, []);

  // Map weather to background images
  const bgImages = {
    Clear: 'https://source.unsplash.com/800x600/?sunny,clear',
    Clouds: 'https://source.unsplash.com/800x600/?cloudy,sky',
    Rain: 'https://source.unsplash.com/800x600/?rain,umbrella',
    Thunderstorm: 'https://source.unsplash.com/800x600/?storm,lightning',
    Snow: 'https://source.unsplash.com/800x600/?snow,winter',
    Mist: 'https://source.unsplash.com/800x600/?mist,fog',
  };

  const condition = weather?.weather[0]?.main;
  const bgImage = bgImages[condition] || 'https://source.unsplash.com/800x600/?weather,nature';

  return (
    <div
      className="relative w-full max-w-sm rounded-xl overflow-hidden shadow-lg text-white"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="bg-black/50 backdrop-blur-sm p-6">
        <h2 className="text-2xl font-bold mb-2">🌤️ Weather Update</h2>

        {weather ? (
          <div className="flex flex-col items-center">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt="Weather Icon"
              className="w-24 h-24"
            />
            <p className="text-xl font-semibold">{weather.main.temp}°C</p>
            <p className="text-sm capitalize">{weather.weather[0].description}</p>
            <p className="text-sm mt-1">📍 {weather.name}</p>
          </div>
        ) : (
          <p className="text-center">Loading weather...</p>
        )}
      </div>
    </div>
  );
};

export default Weather;
