(function(){

  var getCurrentPosition = function(){
    navigator.geolocation.getCurrentPosition(function(loc){
      var coords = loc.coords;
      var lat = coords.latitude;
      var long = coords.longitude;
      location.set(lat,long);
      fetchNewWeatherData(location.get());
    });
  };

  var location = {
    set: function(lat,long){
      localStorage['location'] = JSON.stringify({lat: lat, long:long});
    },
    /**
     *
     * @returns {{lat: float, long: float}}
     */
    get: function(){
      return JSON.parse(localStorage['location']);
    }
  }

  var w = new WeatherTrends();

  chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    switch(request.method){
      case 'getWeatherData':
        var trendsData = localStorage['weather-trends-data'];

        if(!trendsData) {
          fetchNewWeatherData(sendResponse);
        } else {
          sendResponse(JSON.parse(trendsData));
        }
        break;

      case 'setSetting':
        var settingName = request.settingName,
          settingValue = request.settingValue;
          localStorage[settingName] = JSON.stringify(settingValue);
        sendResponse();
        break;

      case 'getSetting':
        var settingName = request.settingName;

        if(localStorage[settingName]){
          sendResponse(JSON.parse(localStorage[settingName]));
          return;
        }

        if(request.defaultValue) {
          localStorage[settingName] = JSON.stringify(request.defaultValue);
          sendResponse(request.defaultValue);
          return;
        }

        sendResponse();
        break;
    }
  });

  setInterval( function(){
    fetchNewWeatherData(location.get());
  }, 60000 * 5 );

  var fetchNewWeatherData = function(loc, cb){
    w.getCurrentWeather(loc || location.get(), function(data){
      localStorage['weather-trends-data'] = JSON.stringify(data);

      var currentWeather = data.forecast[0];
      var currentWeatherIcon = currentWeather.iconBase;


      var descriptionText = WeatherTrends.formatTemp(currentWeather.avgTempF) + '˚ and ' + currentWeather.wx;


      if( ! localStorage['lastWeatherDescription'] || localStorage['lastWeatherDescription'] !== descriptionText) {
        chrome.notifications.create('weatherChanged', {
          type:'basic',
          title: 'Weather',
          message: descriptionText,
          iconUrl: chrome.extension.getURL('img/weather/colored/' + WeatherTrends.mapWT2Hack(currentWeatherIcon) + '.png')
        }, function(e){

        });

        localStorage['lastWeatherDescription'] = descriptionText;
      }

      cb && cb(data);
    })
  };

  getCurrentPosition();

  if(localStorage['location']){
    fetchNewWeatherData(location.get());
  }


})();

