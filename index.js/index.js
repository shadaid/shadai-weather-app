function formatDate(timestamp) {
    let date = new date(timestamp);
    let hours =date. gethours();
    if (hours< 10) {
        hours='0${hours}';
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0 ${minutes}`;
    }
    let days = [
      "Sunday",
      "Monday",
      "Tuseday",
      "wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[date.getDay()];
    return `${day} ${hours}: ${minutes}`;
  }
  function formatDay (timestamp) {
      let date= new Date (timestamp *1000);
      let day= date.getDay();
      let days=["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"];
      return days[day];
  }

  function displayForecast(response) {
      let forecastElement=document.querySelector("#forecast");
      let forecast= response.data.daily;

     let forecastHTML ='<div class="row">';
     forecast.forEach(function(forecastDay, index){
         if(index< 6){
             forecastHTML=
             forecastHTML +
             '<div class= "col-2">'
             <div ="forecast-date">
                ${formatDay(forecastDay.dt)} <div>
                    <div class="forecast-temp">
                        <span class ="forecast-temp-max">${Math.round(forecastDay.temp.max
                            )}°</span>
                           < span class ="forecast-temp-min">${Math.round(forecastDay.temp.min
                            )}°</span>
                        </div>
                        </div>
        }
        });
        forecastHTML=forecastHTML+ '</div>'
         forecastElement.innerHTML= forecastHTML
  }
  function searchCity(city) {
    let apiKey = "bcc51cb566ad8a19e770432935622393";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiURL).then(displayTemperature);
  }
  function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");
  
    celsiusTemperature = response.data.main.temp;
  
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
  
    getForecast(response.data.coord);
  }
  
  function search(city) {
    let apiKey = "abe8133e2a18c1d21a8707cbc98dbdb8";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
  }
  
  let searchForm = document.querySelector("#submit");
  searchForm.addEventListener("click", handleSubmit);
  
  let shareButton = document.querySelector("#current-location-button");
  shareButton.addEventListener("click", getCurrentLocation);
  
  searchCity("New York");
  