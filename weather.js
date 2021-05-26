var request = require('request');
var {weather} = require('./weather.json')

var options = {
  'method': 'GET',
  'url': `http://api.airvisual.com/v2/nearest_city?key=${weather}`,
  'headers': {
  },
  formData: {

  }
};

request(options, function (error, response) {
  if (error) throw new Error(error);
  console.table(response.body);
});