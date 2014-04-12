
function WeatherTrends ()
{

}

WeatherTrends.prototype.getCurrentWeather = function(cb)
{
  $.get('http://www.weathertrends360.com/data/forecast/hourly-1day?key=g2frbigj3c8o4nl08mvizd5d9nrj0dzqfehqwyazahne60odvj&l=Bethlehem,PA&fmt=json', function(data){
    cb(data);
  });
};

WeatherTrends.formatTemp = function( temp )
{
  return parseInt(temp, 10);
}

$hour = $('#hour');
var w = new WeatherTrends();
w.getCurrentWeather(function(weather){
//  document.write(JSON.stringify(weather));
  for(var x in weather.forecast) {
    var hour = weather.forecast[x];
    $hour.append('<img src="http://www.weathertrends360.com/images/wxIcons/' + hour.iconLg + '">')
  }
})