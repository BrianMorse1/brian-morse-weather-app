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
let forecast1 = document.querySelector('#forecast-card-1');
let forecast2 = document.querySelector('#forecast-card-2');
let forecast3 = document.querySelector('#forecast-card-3');
let forecast4 = document.querySelector('#forecast-card-4');
let forecast5 = document.querySelector('#forecast-card-5');




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
            
              const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${openweatherKey}`);
              const data = await response.json();
              iconCode = data.list[0].weather[0].icon;
              console.log(data.list[0].weather[0].icon);

              //current weather dom elements
              currentDate.textContent = data.list[0].dt_txt;
              currentIcon.setAttribute('src', `http://openweathermap.org/img/w/${iconCode}.png`);
              currentIcon.style.display = 'block';
              currentTemp.textContent = kelvinToFarenheit(data.list[0].main.temp) + '\u00B0';
              currentHumidity.textContent ="Humidity: " + data.list[0].main.humidity + '%';
              currentWind.textContent = "Wind speed: " + data.list[0].wind.speed + ' mph';
              
              //forecast dom elements
              const dateTime1 = data.list[8].dt_txt;
              const date1 = dateTime1.split(' ')[0]
              forecast1.innerHTML = date1 + '<br>' + kelvinToFarenheit(data.list[8].main.temp) + '\u00B0' + "<br>" + "Wind speed: " + data.list[8].wind.speed + ' mph' + "<br>" + "Humidity: " + data.list[0].main.humidity + '%';

              const dateTime2 = data.list[16].dt_txt;
              const date2 = dateTime2.split(' ')[0]
              forecast2.innerHTML = date2 + '<br>' + kelvinToFarenheit(data.list[16].main.temp) + '\u00B0' + "<br>" + "Wind speed: " + data.list[16].wind.speed + ' mph' + "<br>" + "Humidity: " + data.list[0].main.humidity + '%';

              const dateTime3 = data.list[24].dt_txt;
              const date3 = dateTime3.split(' ')[0]
              forecast3.innerHTML = date3 + '<br>' + kelvinToFarenheit(data.list[8].main.temp) + '\u00B0' + "<br>" + "Wind speed: " + data.list[24].wind.speed + ' mph' + "<br>" + "Humidity: " + data.list[0].main.humidity + '%';
              
              const dateTime4 = data.list[32].dt_txt;
              const date4 = dateTime4.split(' ')[0]
              forecast4.innerHTML = date4 + '<br>' + kelvinToFarenheit(data.list[32].main.temp) + '\u00B0' + "<br>" + "Wind speed: " + data.list[32].wind.speed + ' mph' + "<br>" + "Humidity: " + data.list[0].main.humidity + '%';

              const dateTime5 = data.list[39].dt_txt;
              const date5 = dateTime1.split(' ')[0]
              forecast5.innerHTML = date5 + '<br>' + kelvinToFarenheit(data.list[39].main.temp) + '\u00B0' + "<br>" + "Wind speed: " + data.list[39].wind.speed + ' mph' + "<br>" + "Humidity: " + data.list[0].main.humidity + '%';



            };
    

   
    


    //function to call both previous functions
    const formHandler = async (event) =>{
        event.preventDefault();
        await getGeo();
        getWeather();
    }

    submit.addEventListener('click', formHandler);
