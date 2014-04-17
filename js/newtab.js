$(function(){
  $hour = $('#hour');
  $temp = $('#weather-info .temp');
  $desc = $('#weather-info .desc');
  $time = $('#time')

  var timeFormat = 'h:mm a';
  $time.text(moment().format(timeFormat));

  setInterval(function(){
    $time.text(moment().format(timeFormat));
  }, 1000);

  var times;

  WeatherHackLocation.get(function(location){
    times = SunCalc.getTimes(new Date(), 51.5, -0.1);
    console.log(times);
  });


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
        BV.show(chrome.extension.getURL('/img/new-tab/' + WeatherTrends.mapWT2HackVideo(currentWeather.iconBase)), {ambient: true});
      });

    });
  };


  setInterval(updateCachedWeatherData, 60000);
  updateCachedWeatherData();

  function buildPopupDom(mostVisitedURLs) {
    var popupDiv = document.getElementById('mostVisited');
    var ol = popupDiv.appendChild(document.createElement('ol'));

    console.log(mostVisitedURLs);

    function onAnchorClick(event) {
      event.preventDefault();
      chrome.tabs.create({ url: event.srcElement.href });
      return false;
    }

    var maxLinksCount = mostVisitedURLs.length > 8 ? 8 : mostVisitedURLs.length;

    for (var i = 0; i < maxLinksCount; i++) {
      var li = ol.appendChild(document.createElement('li'));
      var a = li.appendChild(document.createElement('a'));
      a.href = mostVisitedURLs[i].url;
      a.appendChild(document.createTextNode(mostVisitedURLs[i].title));
      a.addEventListener('click', onAnchorClick);
    }
  }

  chrome.topSites.get(buildPopupDom);

});
