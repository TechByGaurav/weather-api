import React, { useState } from "react";
import Weather from "./Weather";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather =async ()=>
  {
    if(!city) return;

    const API_KEY="03c34717643223a665e91ac58622ccb2"; 
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    try
    {
      const response=await fetch(url);
      if(!response.ok) throw new Error ("City not found")

        const data=await response.json();
        setWeatherData(data);
        setError("")
    }
        catch (err)
        {
          setError(err.message)
          setWeatherData(null)
        }
    }



  
  return (
    <div className="app">
      <h1>🌦 Weather App</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}
      {weatherData && <Weather data={weatherData} />}

     
    </div>
  );
}

export default App;
