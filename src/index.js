function formatDate(timestamp) {
  let currentTime = new Date(timestamp);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//Display FORECAST
function displayForecast(response) {
  let forecast = response.data.daily;
  
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = ``;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6 && 0 < index) {
      forecastHTML =
        forecastHTML +
        `
      <div class="row">
            <div class="col-sm" id="day"> 
              ${formatDay(forecastDay.dt)} </div>
            
              <div class="col-sm" id="icon"> 
             　<img 
                src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" 
                alt""  width="60" /> 
            </div>       
            <div class="col-sm" id="temp-max-min>  
            <span class = "weather-forecast-temperature-max"> ${Math.round(
              forecastDay.temp.max
            )}° 
            </span>|
            <span class = "weather-forecast-temperature-min"> ${Math.round(
              forecastDay.temp.min
            )}° 
           </span>
            </div> 
            </div>
            </div><hr>
      `;
    }
  })
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;

}

function getForecast(coordinates) {
  let apiKey = "9656d85472f993f571de9d36d411cd1e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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
  document.querySelector("#loc_name").innerHTML = `${response.data.name}, ${response.data.sys.country}`;
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
  document.querySelector("#sunrise").innerHTML = 
   formatDate(response.data.sys.sunrise * 1000);
  document.querySelector("#sunset").innerHTML = 
   formatDate(response.data.sys.sunset * 1000);
  
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord); 
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

let currentLocationButton = document.querySelector("#current-location-bttn");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
