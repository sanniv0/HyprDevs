# Weather App

A modern weather forecast application that allows users to search for weather information by city name using the OpenWeatherMap API.

## Features

- **City Search**: Input field for entering city names
- **Current Weather Display**: Shows temperature, weather condition, humidity, and wind speed
- **Dynamic Visuals**: Background and icons change based on weather conditions
- **Responsive Design**: Works on mobile, tablet, and desktop devices
- **Error Handling**: Clear feedback when city is not found or API errors occur

## Technologies Used

- HTML5
- CSS3 (with Flexbox and CSS animations)
- JavaScript (Vanilla JS with Fetch API and async/await)
- OpenWeatherMap API
- Font Awesome icons

## Setup Instructions

### Prerequisites

- Web browser (Chrome, Firefox, Safari, Edge)
- OpenWeatherMap API key

### Getting an API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/) and create a free account
2. After signing up/logging in, go to your API keys section
3. Generate a new API key if you don't already have one
4. Copy your API key for use in the application

### Installation

1. Clone or download this repository
2. Open `config/config.js` in a code editor
3. Replace `YOUR_API_KEY` with your actual OpenWeatherMap API key:
   ```javascript
   export const weatherConfig = {
       apiKey: "YOUR_API_KEY"
   };
   ```
4. Save the file
5. Open `index.html` in your web browser

## How to Use

1. Enter a city name in the search field
2. Press Enter or click the search button
3. View the current weather information for the specified city
4. Notice how the background changes based on the weather condition

## API Usage

This application uses the OpenWeatherMap Current Weather Data API. The free tier allows up to 60 calls per minute or 1,000,000 calls per month.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- The application uses metric units (Celsius, meters per second)
- Weather icons are provided by OpenWeatherMap
- Background colors change based on weather conditions for better visual feedback
