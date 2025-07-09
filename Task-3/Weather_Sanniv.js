// Import API key from config file
import { weatherConfig } from './config/config.js';

// API key for OpenWeatherMap
const apiKey = weatherConfig.apiKey;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

// DOM elements
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weather-description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const errorContainer = document.getElementById("error-container");
const errorMessage = document.getElementById("error-message");
const weatherContainer = document.getElementById("weather-container");

// Event listeners
searchBtn.addEventListener("click", getWeather);
cityInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        getWeather();
    }
});

// Function to fetch and display weather data
async function getWeather() {
    const city = cityInput.value.trim();
    
    if (!city) {
        showError("Please enter a city name");
        return;
    }
    
    try {
        // Show loading state
        cityName.textContent = "Loading...";
        temperature.textContent = "--°C";
        weatherDescription.textContent = "--";
        humidity.textContent = "--%";
        windSpeed.textContent = "-- m/s";
        weatherContainer.style.display = "block";
        errorContainer.style.display = "none";
        
        // Fetch weather data from API
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
        
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        
        const data = await response.json();
        
        // Update UI with weather data
        updateWeatherUI(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        showError("City not found. Please try again with a valid city name.");
    }
}

// Function to update UI with weather data
function updateWeatherUI(data) {
    // Update city name
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    
    // Update temperature and description
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    
    // Update weather icon
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    
    // Update humidity and wind speed
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} m/s`;
    
    // Show weather container
    weatherContainer.style.display = "block";
    
    // Change background based on weather condition
    changeBackground(data.weather[0].main);
}

// Function to show error message
function showError(message) {
    errorMessage.textContent = message;
    errorContainer.style.display = "block";
    weatherContainer.style.display = "none";
}

// Function to change background based on weather condition
function changeBackground(weatherCondition) {
    // Remove all weather classes first
    document.body.classList.remove("clear", "clouds", "rain", "snow", "thunderstorm");
    
    // Add appropriate class based on weather condition
    switch (weatherCondition.toLowerCase()) {
        case "clear":
            document.body.classList.add("clear");
            break;
        case "clouds":
            document.body.classList.add("clouds");
            break;
        case "rain":
        case "drizzle":
            document.body.classList.add("rain");
            break;
        case "snow":
            document.body.classList.add("snow");
            break;
        case "thunderstorm":
            document.body.classList.add("thunderstorm");
            break;
        default:
            // Default background is already set in CSS
            break;
    }
}

// Initialize the app
function init() {
    // Hide weather container initially
    weatherContainer.style.display = "none";
    errorContainer.style.display = "none";
    
    // Focus on input field
    cityInput.focus();
}

// Call init function when page loads
window.addEventListener("load", init);