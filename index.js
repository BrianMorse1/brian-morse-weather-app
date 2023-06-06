//requiring dotenv file for key security.
//require('dotenv').config();

//keys for mapquest (geocoding) and openweather api's. 
const mapquestKey = 'jyim88NKRLxKX4nc7UXSUsDTb138aGkk';
const openweatherKey = "47949a277751c0fcf4d5c60f6eb3cd58";

// variables for accessing user input from search form
const searchElement = document.querySelector('#search-input');
const submit = document.querySelector('#submit');

//variables for DOM elements to be populated with information
let forecast = document.querySelector('#five-day');
let pastSearches = document.querySelector('#past-searches');
let cityName = document.querySelector('#city-name');
let currentDate = document.querySelector('#current-date');
let currentIcon = document.querySelector('#current-weather-icon');
let currentTemp = document.querySelector('#current-temperature');
let currentHumidity = document.querySelector('#current-humidity');
let currentWind = document.querySelector('#current-wind');



//variables for setting lat and long of user searches
let lat;
let long;

//variable for storing current weather icon code provided by weather api
let iconCode;

const getGeo = () => {
    const userInput = searchElement.value;

    //fetch's geocoding data from Mapquestapi
    return fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=${mapquestKey}&location=${userInput}`)
    .then(response => response.json())
    .then(data => { 
        lat = data.results[0].locations[0].latLng.lat;
        long = data.results[0].locations[0].latLng.lng;
        cityName.textContent = userInput;
        })
};
        //function to convert kelvin to farenheit
        const kelvinToFarenheit = (kelvin) => {
            return Math.round((kelvin - 273.15) * 1.8 + 32);
        };
    
        //uses data from geocoding for fetch request to open weather api and sets attributes of DOM to recieved information
        const getWeather = async () => {
            try {
              const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${openweatherKey}`);
              const data = await response.json();
              iconCode = data.list[0].weather[0].icon;
              console.log(data.list[0].weather[0].icon);


              currentDate.textContent = data.list[0].dt_txt;
              currentIcon.setAttribute('src', `http://openweathermap.org/img/w/${iconCode}.png`);
              currentIcon.style.display = 'block';
              currentTemp.textContent = kelvinToFarenheit(data.list[0].main.temp) + '\u00B0';
              currentHumidity.textContent ="Humidity: " + data.list[0].main.humidity + '%';
              currentWind.textContent = "Wind speed: " + data.list[0].wind.speed + ' mph';

            } catch (error) {
              console.log(error);
            }
          };
          

    //function to call both previous functions
    const formHandler = async (event) =>{
        event.preventDefault();
        await getGeo();
        getWeather();
    }

    submit.addEventListener('click', formHandler);
