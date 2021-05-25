const Discord = require("discord.js");	
const fetch = require("node-fetch");
const config_key = require("./weather.json");

const base_url = `http://api.weatherapi.com/v1/current.json?key=${config_key}`;
async function getWeather(_city){
    let weather = await fetch(
        base_url"&q="+_city;
    );


}