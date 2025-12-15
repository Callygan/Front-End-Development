const API_KEY = "eb40aad3941cc8d0efeb7a6863b076dc";
const CURRENT_WEATHER = document.querySelector(".current-weather");
const FIVE_DAY = document.querySelector(".five-day-weather");
const CITY_INPUT = document.getElementById("cityInput");

// Geolocation on load
window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      fetchWeatherByCoords(latitude, longitude);
    });
  }
});

// Search by city name
CITY_INPUT.addEventListener("keyup", e => {
  if (e.key === "Enter" && CITY_INPUT.value.trim() !== "") {
    fetchWeatherByCity(CITY_INPUT.value.trim());
  }
});

// Fetch weather data
function fetchWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=en&appid=${API_KEY}`;
  fetchWeather(url);
}

function fetchWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=en&appid=${API_KEY}`;
  fetchWeather(url);
}

function fetchWeather(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      renderCurrentWeather(data);
      renderFiveDayForecast(data);
    })
    .catch(err => console.error(err));
}

// Render current weather
function renderCurrentWeather(data) {
  const current = data.list[0];
  const city = `${data.city.name}, ${data.city.country}`;
  const icon = getWeatherIcon(current.weather[0].main);

  CURRENT_WEATHER.innerHTML = `
    <div class="current-card">
        <div class="temperature">
            <h1>${Math.round(current.main.temp)}°C</h1>
            <p>Max: +${Math.round(current.main.temp_max)}°C</p>
        </div>
        <div class="current-location">
            <p>${current.weather[0].main}</p>
            <span>${city}</span>
        </div>
        <div class="weather-icon">
            <img src="images/default.png" alt="weather icon">
        </div>
        
    </div>
  `;
}

// Render five-day forecast
function renderFiveDayForecast(data) {
  FIVE_DAY.innerHTML = "";

  const days = groupByDay(data.list);

  Object.keys(days).slice(0, 5).forEach(day => {
    const dayData = days[day];

    const tempDay = Math.max(...dayData.map(i => i.main.temp_max));
    const tempNight = Math.min(...dayData.map(i => i.main.temp_min));
    const condition = dayData[0].weather[0].main;
    const icon = getWeatherIcon(condition);

    FIVE_DAY.innerHTML += `
      <div class="day-weather">
        <div class="day">${day}</div>
        <div class=daily-icon>
            <img src="${icon}" alt="icon">
        </div>
        <div class="weather-condition">${condition}</div>
        <div class="details">
            <span class="day-night">Day</span>
            <span class="daily-temperature">${Math.round(tempDay)}°C</span>
            <span class="daily-temperature">${Math.round(tempNight)}°C</span>
            <span class="day-night">Night</span>
        </div>
      </div>
    `;
  });
}

// Helper functions
function groupByDay(list) {
  const days = {};

  list.forEach(item => {
    const date = new Date(item.dt_txt);
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

    if (!days[dayName]) {
      days[dayName] = [];
    }
    days[dayName].push(item);
  });

  return days;
}

function getWeatherIcon(condition) {
  switch (condition) {
    case "Rain":
      return "images/rain.png";
    case "Snow":
      return "images/snow.png";
    case "Light Rain":
      return "images/light-rain.png";
    case "Clear":
      return "images/sunny.png";
    case "Clouds":
      return "images/clouds.png";
    default:
      return "images/clouds.png";
  }
}
