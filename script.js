//show date, time
handleCurrentPosition();

let celsiusTemperature = null;

// change C to F

let temp = document.querySelector(".temp");
let date = document.querySelector(".date");
let celsiusLink = document.querySelector("#celsius-link");
let fahrenheitLink = document.querySelector("#fahrenheit-link");

function formatDate(timestamp) {
  let now = new Date(timestamp * 1000);
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekDays[now.getDay()];
  return `${day}, ${hours}:${(minutes < 10 ? "0" : "") + minutes}`;
}

function formatTimestamp(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

fahrenheitLink.addEventListener("click", changeToFahrenheit);
celsiusLink.addEventListener("click", changeToCelsius);

function changeToFahrenheit() {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheit = Math.round((celsiusTemperature * 9) / 5 + 32);
  temp.innerHTML = fahrenheit;
}
function changeToCelsius() {
  event.preventDefault();

  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");

  celsiusTemperature
    ? Math.round(((celsiusTemperature - 32) * 5) / 9)
    : celsiusTemperature;

  temp.innerHTML = celsiusTemperature;
}

//currentPosition

let key = "16edd4f908ec4dacf218c521821a8b8f";

let requestedWeather = document.querySelector(".btn-success");

let city = document.querySelector("#search-text-input");
let cityRightSide = document.querySelector(".right-title");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let iconElement = document.querySelector("#icon");
let forecastElement = document.querySelector("#forecast");

requestedWeather.addEventListener("click", handleRequest);

function handleCurrentPosition() {
  navigator.geolocation.getCurrentPosition(requestCurrentTemp);
}

function requestCurrentTemp(position) {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}&units=metric`
    )
    .then(showCurrentData);
}

function showCurrentData(response) {
  if (response) {
    celsiusTemperature = Math.round(response.data.main.temp);

    temp.innerHTML = celsiusTemperature;
    checkSecondaryData(response);
  }
}

//requestedData

function handleRequest() {
  event.preventDefault();

  if (city.value) {
    city.value.charAt(0).toUpperCase();
    cityUpperCase = city.value.charAt(0).toUpperCase() + city.value.slice(1);
    cityRightSide.innerHTML = cityUpperCase;

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${key}&units=metric`
      )
      .then(showRequestedData);
  }
}

function showRequestedData(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  temp.innerHTML = celsiusTemperature;
  checkSecondaryData(response);
}

function checkSecondaryData(response) {
  humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} m/s`;
  date.innerHTML = formatDate(response.data.dt);

  cityRightSide.innerHTML = response.data.name;

  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute("alt", `${response.data.weather[0].description}`);
  getForecastBasedOnCoordinares(response.data.coord);
}

function getForecastBasedOnCoordinares(coordinates) {
  let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lat}&appid=${key}&units=metric`;
  axios.get(url).then(displayForecast);
}

function displayForecast(response) {
  let forecastHTML = "";

  let forecast = response.data.daily;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
              <div class="card">
                <div class="card-body">
                  <p class="card-uppertext">${formatTimestamp(
                    forecastDay.dt
                  )}</p>
                  <img
                    id="forecast-icon"
                    src="https://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png"
                    class="forecast-icon"
                  />
                  <p class="card-text">${Math.round(forecastDay.temp.day)}ºC</p>
                </div>
              </div>
            </div>`;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}
