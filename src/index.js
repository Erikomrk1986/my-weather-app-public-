function formatDate(timestamp) {
  let currentTime = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentTime.getDay()];

  let currentLocalTime = currentTime.toLocaleString("en-AU", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${currentLocalTime}`;
}

function showTemperature(response) {
  let celsTemperature = Math.round(response.data.main.temp);
  let h3 = document.querySelector(".col2");
  h3.innerHTML = `${celsTemperature} °`;
}

function displayWeatherCondition(response) {
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
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
  document.querySelector("#precip").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#sunrise").innerHTML = formatDate(response.data.sys.sunrise * 1000
    
  );
  document.querySelector("#sunset").innerHTML = formatDate(response.data.sys.sunset * 1000
    
  );
}

//* SEARCH CITY -->　DISPLAY WEATHER CONDITION*
function searchCity(city) {
  let apiKey = "9656d85472f993f571de9d36d411cd1e";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
//* HANDLE SUBMIT --> SEARCH CITY
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#loc_input");
  let city = cityInput.value;
  searchCity(city);
}
//* SEARCH CITY --> DISPLAY WEAHTER CONDITION*
function searchLocation(position) {
  let apiKey = "9656d85472f993f571de9d36d411cd1e";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`;
  let apiUrl = `${apiEndpoint}&appid=${apiKey}&units=metric`;

  https: axios.get(apiUrl).then(displayWeatherCondition);
}
// CURRENT CITY --> SEARCH LOCATION
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let locForm = document.querySelector("#loc_form");
locForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("bangkok");
