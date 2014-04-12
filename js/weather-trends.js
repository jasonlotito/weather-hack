
function WeatherTrends ()
{

}

WeatherTrends.mapping = {
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
  'moon-mostly-cloudy': 'partly_cloud_night',
  'moon-mostly-cloudy-windy': 'partly_cloud_night',
  'moon-partly-cloudy': 'partly_cloud_night',
  'moon-partly-cloudy-windy': 'partly_cloud_night',
  'moon-partly-sunny': 'parly_cloudy',
  'moon-partly-sunny-windy': 'windy',
  'moon-thunder-shower': 'thunder',
  'moon-windy': 'windy',
  'mostly-cloudy': 'cloudy',
  'mostly-cloudy-windy': 'cloudy',
  'partly-cloudy': 'cloudy',
  'partly-cloudy-windy': 'cloudy',
  'partly-sunny': 'partly_cloudy',
  'partly-sunny-windy': 'partly_coudy',
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

WeatherTrends.prototype.getCurrentWeather = function(cb)
{
  $.get('http://www.weathertrends360.com/data/forecast/hourly-1day?key=g2frbigj3c8o4nl08mvizd5d9nrj0dzqfehqwyazahne60odvj&l=Bethlehem,PA&fmt=json', function(data){
    cb(data);
  });
};

WeatherTrends.formatTemp = function( temp )
{
  return parseInt(temp, 10);
};

WeatherTrends.mapWT2Hack = function( wtName )
{
  return WeatherTrends.mapping[wtName];
};

WeatherTrends.mapWT2HackVideo = function ( wtName )
{

};