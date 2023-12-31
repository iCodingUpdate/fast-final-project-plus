
function displayTemperature(response) {
    let temperatureElement = document.querySelector("#current-temperature");
    let temperature = Math.round(response.data.temperature.current);
    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = temperature;
    let iconNew = document.querySelector(".current-temperature-icon");
    iconNew.innerHTML = `<img src="${response.data.condition.icon_url}" width="100" height="100">`;
    let clouds = document.querySelector(".status-cloud");
    clouds.innerHTML = `${response.data.condition.description}`;
    let humidity = document.querySelector("#current-humidity");
    humidity.innerHTML = `${response.data.temperature.humidity}%`;
    let wind = document.querySelector("#current-wind");
    wind.innerHTML = `${response.data.wind.speed}km/h`;

    getForecast(response.data.city);

  }
  
  function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    let city = searchInputElement.value;
  
    let apiKey = "b2a5adcct04b33178913oc335f405433";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(displayTemperature);
  }
  
  function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    if (hours < 10) {
      hours = `0${hours}`;
    }
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  
    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
  }
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
  
  let currentDateELement = document.querySelector("#current-date");
  let currentDate = new Date();
  
  currentDateELement.innerHTML = formatDate(currentDate);

//

function formatDay (timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
};

function getForecast (city) {
let apiKey = "1f59fd84cb7070df9a86f9tce38b8ao1";
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
axios.get(apiUrl).then(displayForecast);
};

function displayForecast (response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = "";

  response.data.daily.forEach(function (day,index) {
    if (index < 5 ) {
      forecastHtml = forecastHtml + `<div class="weather-forecast-day">
          <div class="weather-forecast-date">${formatDay(day.time)}</div>
          <div class="weather-forecast-icon"><img src="${day.condition.icon_url}" width="50" height="50"></div>
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature">
              <strong>${Math.round(day.temperature.maximum)}º</strong>
            </div>
            <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}º</div>
          </div>
        </div>
`;

forecastElement.innerHTML=forecastHtml;
      
    }

});
};


getForecast("Paris");