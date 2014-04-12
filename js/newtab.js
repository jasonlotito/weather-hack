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
w.getCurrentWeather(function(weather){

  var currentWeather = weather.forecast[0];

  $temp.text(WeatherTrends.formatTemp(currentWeather.avgTempF));
  $desc.text(currentWeather.wx);



//  for(var x in weather.forecast) {
//    var hour = weather.forecast[x];
//
//    $hour.append('<img src="http://www.weathertrends360.com/images/wxIcons/' + hour.iconLg + '">')
//  }
});

$(function() {
  var BV = new $.BigVideo({doLoop: true});
  BV.init();
  BV.show(chrome.extension.getURL('/img/new-tab/Sunny/Sunny Clouds.mp4'));
});
