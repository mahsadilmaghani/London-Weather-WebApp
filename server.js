var express = require('express')
var request = require('request');
const logger = require('./logger/logger');
//console.log(logger);

var app = express();

// set up template engine
app.set('view engine', 'ejs');

// static files
app.use(express.static('./public'));

var url = 'https://www.metaweather.com/api/location/44418/';

app.get('/', function(req, res){
  request(url, function(error, response, body) {
    weather_json = JSON.parse(body);
    console.log(weather_json);

    var weather = {
      city: weather_json['title'],
      state: weather_json.consolidated_weather[0].weather_state_name,
      min_temp: Math.round(weather_json.consolidated_weather[0].min_temp),
      max_temp: Math.round(weather_json.consolidated_weather[0].max_temp),
      humidity: weather_json.consolidated_weather[0].humidity

    };
    var weather_data = {weather : weather};
    res.render('weather', weather_data);
  });

});

// listening to port 8000
app.listen(8000);
logger.info("Listening to port 8000");
