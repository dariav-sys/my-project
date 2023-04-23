//show date, time

let now = new Date();
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let day = weekDays[now.getDay()];

let time = document.querySelector(".right-undertitle");
time.innerHTML = `${day}, ${hours}:${minutes}`;

// change C to F

let fahrenheit = document.querySelector(".fahrenheit");
let celsius = document.querySelector(".celsius");
let temp = document.querySelector(".temp");

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

//
// let city = prompt("Enter the city:").toLowerCase();
// lookForCity(city);

// function lookForCity(city) {
//   // const capitalCity = city.charAt(0).toUpperCase() + city.slice(1);
// }

// alert(
//   `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
// );

let key = "16edd4f908ec4dacf218c521821a8b8f";
let requestedWeather = document.querySelector(".btn-success");
let currentWeather = document.querySelector(".btn-primary");

let city = document.querySelector("#search-text-input");
let cityRightSide = document.querySelector(".right-title");

currentWeather.addEventListener("click", handleCurrentPosition);
requestedWeather.addEventListener("click", handleWeatherRequest);

function handleCurrentPosition() {
  navigator.geolocation.getCurrentPosition(requestCurrentTemp);
}

function requestCurrentTemp(position) {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}`
    )
    .then(showCurrentTemp);
}

function showCurrentTemp(response) {
  console.log(response.data);
  let tempCurrent = Math.round(response.data.main.temp - 273.15);
  temp.innerHTML = tempCurrent;
  cityRightSide.innerHTML = response.data.name;
}

function handleWeatherRequest() {
  event.preventDefault();

  city.value.charAt(0).toUpperCase();
  cityRightSide.innerHTML = city.value;
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${key}&units=metric`
    )
    .then(showRequestedCityTemp);
}

function showRequestedCityTemp(response) {
  let tempRequested = Math.round(response.data.main.temp);
  temp.innerHTML = tempRequested;
}
