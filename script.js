//show date, time
handleCurrentPosition();

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// change C to F

let fahrenheit = document.querySelector(".fahrenheit");
let celsius = document.querySelector(".celsius");
let temp = document.querySelector(".temp");
let date = document.querySelector(".date");

function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let day = weekDays[now.getDay()];
  return `${day} ${hours}:${(minutes < 10 ? "0" : "") + minutes}`;
}

fahrenheit.addEventListener("click", changeToFahrenheit);
celsius.addEventListener("click", changeToCelsius);

function changeToFahrenheit() {
  event.preventDefault();

  let fahrenheit = Math.round((Number(temp.innerHTML) * 9) / 5 + 32);
  temp.innerHTML = fahrenheit;
}

function changeToCelsius() {
  event.preventDefault();
  let celsius = Math.round(((Number(temp.innerHTML) - 32) * 5) / 9);
  temp.innerHTML = celsius;
}

//currentPosition

let key = "16edd4f908ec4dacf218c521821a8b8f";

let requestedWeather = document.querySelector(".btn-success");
let currentWeather = document.querySelector(".btn-primary");

let city = document.querySelector("#search-text-input");
let cityRightSide = document.querySelector(".right-title");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");

currentWeather.addEventListener("click", handleCurrentPosition);
requestedWeather.addEventListener("click", handleWeatherRequest);

function handleCurrentPosition() {
  navigator.geolocation.getCurrentPosition(requestCurrentTemp);
}



function requestCurrentTemp(position) {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}&units=metric`
    )
    .then(showCurrentTemp);
}

function showCurrentTemp(response) {
  if (response) {
    let tempCurrent = Math.round(response.data.main.temp);
    temp.innerHTML = tempCurrent;
    humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;
    wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} m/s`;
    // date.innerHTML = `${day}, ${hours}:${(minutes < 10 ? "0" : "") + minutes}`;
    date.innerHTML = formatDate(response.data.dt * 1000);

    cityRightSide.innerHTML = response.data.name;
  }
}

//requestedData

function handleWeatherRequest() {
  event.preventDefault();

  if (city.value) {
    city.value.charAt(0).toUpperCase();
    cityUpperCase = city.value.charAt(0).toUpperCase() + city.value.slice(1);
    cityRightSide.innerHTML = cityUpperCase;

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${key}&units=metric`
      )
      .then(showRequestedCityTemp);
  }
}

function showRequestedCityTemp(response) {
  let tempRequested = Math.round(response.data.main.temp);
  temp.innerHTML = tempRequested;
}
