$hour = $('#hour');
$temp = $('#weather-info .temp');
$desc = $('#weather-info .desc');
$time = $('#time')

var timeFormat = 'h:mm a';
$time.text(moment().format(timeFormat));

setInterval(function(){
  $time.text(moment().format(timeFormat));
}, 1000);

setTimeout(function(){
  $('#flashCover').fadeOut( );
}, 250)

var w = new WeatherTrends();
var updateCachedWeatherData = function() {
  w.getCachedWeatherData(function(weather){

    var currentWeather = weather.forecast[0];

    $temp.text(WeatherTrends.formatTemp(currentWeather.avgTempF));
    $desc.text(currentWeather.wx);

    $(function() {
      var BV = new $.BigVideo({doLoop: true});
      BV.init();
      BV.show(chrome.extension.getURL('/img/new-tab/' + WeatherTrends.mapWT2HackVideo(currentWeather.wx)));
    });

  });
};

setInterval(updateCachedWeatherData, 60000);
updateCachedWeatherData();
