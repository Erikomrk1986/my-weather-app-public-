let currentTime = new Date();
console.log(document.querySelector("date"));

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[currentTime.getDay()];

let hours = (`0` + currentTime.getHours()).slice(-2);
let minutes = (`0` + currentTime.getMinutes()).slice(-2);

let h2 = document.querySelector("h2");

h2.innerHTML = `${day}  ${hours}:${minutes}`;
console.log(new Date());
//////////////////////////////////////////////////////////////////////
//when searching for a city (i.e. Paris),
//display the city name
//after the user submits the form
///////////////////////
function showTemperature(response) {
  let celsTemperature = Math.round(response.data.main.temp);
  let h3 = document.querySelector(".col2");
  h3.innerHTML = `${celsTemperature} °C`;
}

/////////////      //////    /////    /////    /////    /////    ////   ////   ////
//　searched
//* DISPLAY WEATHER CONDITION
function displayWeatherCondition(response) {
  document.querySelector("#loc_name").innerHTML = response.data.name;
  document.querySelector("#current_temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}°`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windspeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#precipitation").innerHTML = Math.round(
    response.data.wind.speed
  );
}
//* SEARCH CITY - ***　DISPLAY WEATHER CONDITION 1
function searchCity(city) {
  let apiKey = "9656d85472f993f571de9d36d411cd1e";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
//* HANDLE SUBMIT
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#loc_input");
  let city = cityInput.value;
  searchCity(city); //when submit, call function [search city]
}
//* SEARCH CITY - *** DISPLAY WEAHTER CONDITION 2
function searchLocation(position) {
  let apiKey = "9656d85472f993f571de9d36d411cd1e";
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
  let apiUrl = `${apiEndpoint}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
// CURRENT CITY
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let locForm = document.querySelector("#loc_form");
locForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
////////
searchCity("New York");
