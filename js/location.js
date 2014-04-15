var WeatherHackLocation = {
  get: function(cb){
    chrome.extension.sendRequest({method: "getSetting", settingName: 'location'}, function(response) {
      cb(response);
    });
  }
};