function updateWeatherApp(response) {
  let cityElement = document.querySelector("#weather-app-city");
  let timeElement = document.querySelector("#current-time");
  let date = new Date(response.data.time * 1000);
  let conditionElement = document.querySelector("#current-conditions");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#weather-app-icon");
  let temperatureElement = document.querySelector("#weather-app-temperature");
  let temperature = response.data.temperature.current;

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date); 
  conditionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;
  temperatureElement.innerHTML = Math.round(temperature);

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "04aft6704ff52a4b6b603b4986c4oc2a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeatherApp);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-form-input");
  searchCity(searchInputElement.value);
}

function getForecast(city) {
  let apiKey = "04aft6704ff52a4b6b603b4986c4oc2a";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) { 
    forecastHtml = forecastHtml + `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">☁️</div>
        <div class="weather-forecast-temperatures">
          <div class="forecast-forecast-temperature">
            <strong>19°</strong>
          </div> 
          <div class="weather-forecast-temperature">12°</div>
        </div>
      </div>
    `;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Melbourne");