//requiring dotenv file for key security.
require('dotenv').config();

//keys for mapquest (geocoding) and openweather api's. 
const mapquestKey = process.env.mapquestKey;
const openweatherKey = process.env.mapquestKey;

// variables for accessing user input from search form
const searchElement = document.querySelector('#search-input');
const userInput = searchElement.value;
const submit = document.querySelector('#submit');

//variables for setting lat and long of user searches
let lat;
let long;

const formHandler = () => {
    preventDefault();

    //fetch's geocoding data from Mapquestapi
    fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=${mapquestKey}&location=${userInput}`)
    .then(response => response.json())
    .then(data => { 
        console.log(data)
    })};

    addEventListener(submit, formHandler);
