
function WeatherTrends ()
{

}

WeatherTrends.mapping = {
  'clear':'clear_night',
  'mainly clear':'clear_night',
  'blowingdust': 'windy',
  'cloudy': 'sunny',
  'cloudy-windy': 'windy',
  'fog': 'foggy',
  'hazy': 'foggy',
  'heavy-rain': 'rain',
  'heavy-rain-shower': 'rain',
  'heavy-snow': 'snowing',
  'heavy-snow-shower': 'snowing',
  'isolated-thunder-shower': 'thunder',
  'light-rain': 'rain',
  'light-rain-shower': 'rain',
  'light-snow': 'snow',
  'light-snow-shower': 'snow',
  'moon-clear-skies': 'clear_night',
  'moon-hazy': 'night_foggy',
  'moon-heavy-rain-shower': 'rain',
  'moon-heavy-snow-shower': 'sleet',
  'moon-isolated-thunder-shower': 'thunder',
  'moon-light-rain-shower': 'rain',
  'moon-light-snow-shower': 'sleet',
  'moon-mostly-cloudy': 'partly_cloudy_night',
  'moon-mostly-cloudy-windy': 'partly_cloudy_night',
  'moon-partly-cloudy': 'partly_cloudy_night',
  'moon-partly-cloudy-windy': 'partly_cloudy_night',
  'moon-partly-sunny': 'partly_cloudy',
  'moon-partly-sunny-windy': 'windy',
  'moon-thunder-shower': 'thunder',
  'moon-windy': 'windy',
  'mostly-cloudy': 'cloudy',
  'mostly-cloudy-windy': 'cloudy',
  'partly-cloudy': 'cloudy',
  'partly-cloudy-windy': 'cloudy',
  'partly-sunny': 'partly_cloudy',
  'partly-sunny-windy': 'partly_cloudy',
  'rain-shower-cloudy': 'rain',
  'sleet': 'sleet',
  'snow-shower-cloudy': 'snowing',
  'sunny': 'sunny',
  'sunny-windy': 'sunny',
  'thundershower-cloudy': 'thunder',
  'thundershower': 'thunder',
  'thunderstorm': 'thunder',
  'thunderstorm-severe': 'thunder',
  'tornado': 'windy',
  'windy': 'windy',
  'wintry-mix': 'snow'
};

WeatherTrends.videoMapping = {
  "snowing":"Snow/Snow.mp4",
  "sunny":"Sunny/Sunny.mp4",
  "sleet":"Snow/Snow.mp4",
  "windy":"Cloudy/Cloudy.mp4",
  "cloudy":"Cloudy/Cloudy.mp4",
  "snow": "Snow/Snow.mp4",
  "foggy":"Foggy/Foggy.mp4",
  "rain":"Rain/Rain.mp4",
  "partly_cloud":"Cloudy/Cloudy.mp4",
  "thunder":"Rain/Rain.mp4",
  "night_foggy":"Night/Night.mp4",
  "clear_night":"Night/Night.mp4"
};

WeatherTrends.prototype.getCurrentWeather = function(loc, cb)
{
  var locationString = "" + loc.lat + " " + loc.long;
  var url = 'http://polar-caverns-9154.herokuapp.com/weather/' + locationString;
  $.get(url, function(data){
    cb(data);
  });
};

WeatherTrends.prototype.getCachedWeatherData = function(cb)
{
  chrome.extension.sendRequest({method: "getWeatherData"}, function(response) {
    cb(response);
  });
};

WeatherTrends.formatTemp = function( temp )
{
  return parseInt(temp, 10);
};

WeatherTrends.mapWT2Hack = function( wtName )
{
  return WeatherTrends.mapping[wtName.toLowerCase()];
};

WeatherTrends.mapWT2HackVideo = function ( wtName )
{
  console.log(wtName, WeatherTrends.videoMapping);
  return WeatherTrends.videoMapping[WeatherTrends.mapWT2Hack(wtName)];
};