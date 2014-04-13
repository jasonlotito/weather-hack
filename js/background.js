(function(){

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
        }

        if(request.defaultValue) {
          localStorage[settingName] = JSON.stringify(request.defaultValue);
          sendResponse(request.defaultValue);
        }

        sendResponse();
        break;
    }
  });

  setInterval( function(){
    fetchNewWeatherData();
  }, 60000 * 5 );

  var fetchNewWeatherData = function(cb){
    w.getCurrentWeather(function(data){
      localStorage['weather-trends-data'] = JSON.stringify(data);
      cb && cb(data);
    })
  };

  fetchNewWeatherData();

})();

