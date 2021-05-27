var axios = require('axios');
var FormData = require('form-data');
var data = new FormData();

require('dotenv').config();



var config = {
  method: 'get',
  url: `http://api.airvisual.com/v2/nearest_city?key=${process.env.weather_api_key}`,
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});