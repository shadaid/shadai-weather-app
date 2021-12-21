'use strict';

let units = 'imperial';
let city = 'Brooklyn';
const apiKey = '"bcc51cb566ad8a19e770432935622393"';
const daysOfWeek = [
 'Sunday',
 'Monday',
 'Tuesday',
 'Wednesday',
 'Thursday',
 'Friday',
 'Saturday',
];

function formatDate(timestamp) {
 const date = new Date(timestamp);
 const hours = String(date.getHours()).padStart(2, '0');
 const minutes = String(date.getMinutes()).padStart(2, '0');

 let amPM;

 if (hours > 12) {
 hours -= 12;
 amPM = 'pm';
 } else {
 amPM = 'am';
 }

 const day = daysOfWeek[date.getDay()];
 return `${day} ${hours}:${minutes} ${amPM}`;
}

function displayForecast(response) {
 const forecastElement = document.getElementById('forecast');

 let forecastDays = [1, 2, 3, 4, 5, 6];
 let forecastHTML = `<div class="row">`;

 forecastDays.forEach(function (day) {
 const max = Math.round(response.data.daily[day].temp.max);
 const min = Math.round(response.data.daily[day].temp.min);

 const timestamp = response.data.daily[day].dt;
 const forecastDate = new Date(timestamp * 1000);
 const dayOfWeek = daysOfWeek[forecastDate.getDay()];

 forecastHTML =
 forecastHTML +
 `
 <div class="col-2">
 <div class="weather-forecast-date">${dayOfWeek}</div>
 <img src="http://openweathermap.org/img/wn/${response.data.daily[day].weather[0].icon}@2x.png" alt="" width="42" />
 <div class="weather-forecast-temp">
 <span class="weather-forecast-temp-max">${max}° </span
 ><span class="weather-forecast-temp-min">${min}°</span>
 </div>
 </div>`;
 });

 forecastHTML = forecastHTML + `</div>`;

 forecastElement.innerHTML = forecastHTML;
}

function displayWeather(response) {
 const cityElement = document.getElementById('city');
 const temperatureElement = document.getElementById('temperature');
 const descriptionElement = document.getElementById('description');
 const humidityElement = document.getElementById('humidity');
 const windElement = document.getElementById('wind');
 const dateElement = document.getElementById('date');
 const iconElement = document.getElementById('icon');

 const lat = response.data.coord.lat;
 console.log(lat);
 const lon = response.data.coord.lon;

 const forecastAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

 cityElement.textContent = response.data.name;
 temperatureElement.textContent = Math.round(response.data.main.temp);
 descriptionElement.textContent = response.data.weather[0].description;
 humidityElement.textContent = response.data.main.humidity;
 windElement.textContent = Math.round(response.data.wind.speed);
 dateElement.textContent = formatDate(response.data.dt * 1000);
 iconElement.src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;

 axios.get(forecastAPI).then(displayForecast);
}

function search(city) {
 const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

 axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
 event.preventDefault();
 city = document.getElementById('city-input').value;
 search(city);
}

function changeToImperial(event) {
 event.preventDefault();
 const windUnitsElement = document.getElementById('wind-units');

 units = 'imperial';
 windUnitsElement.textContent = ' mph';
 celciusLink.classList.remove('disabled');
 fahrenheitLink.classList.add('disabled');

 search(city);
}

function changeToMetric(event) {
 event.preventDefault();
 const windUnitsElement = document.getElementById('wind-units');

 units = 'metric';
 windUnitsElement.textContent = ' km/h';
 celciusLink.classList.add('disabled');
 fahrenheitLink.classList.remove('disabled');
 search(city);
}

const form = document.getElementById('search-form');
form.addEventListener('submit', handleSubmit);

const fahrenheitLink = document.getElementById('fahrenheit-link');
fahrenheitLink.addEventListener('click', changeToImperial);

const celciusLink = document.getElementById('celcius-link');
celciusLink.addEventListener('click', changeToMetric);

search(city);
// displayForecast();
  
 
  