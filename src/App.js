import React, {useState} from 'react';
import {getWeather} from './api/getWeather';
import './App.css';

const App = () => {
    const [location, setLocation] = useState('');
    const [weather, setWeather] = useState({});
    const find = async (e) => {
        if (e.key === 'Enter'){
            const data = await getWeather(location);
            setWeather(data);
            setLocation('');
        }
    }
    return(
        <div className = "main-container">
            <input type="text" className = "search" 
            placeholder="Find Location" value={location} 
            onChange = {(e) => setLocation(e.target.value)}
            onKeyPress = {find}
            />
            {weather.main && (
                <div className = "city">
                    <h2 className = "city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <div className = "city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className = "info">
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        <p>{weather.weather[0].description}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
export default App;