
$((function(){
  var w = new WeatherTrends();
  w.getCurrentWeather(function(data){
    var currentWeather = data.forecast[0];
    var currentWeatherIcon = currentWeather.iconLg;
    this.ePopup = document.createElement('div');
    this.ePopup.id = "weather-hack";
    var img = document.createElement('img');

    img.src = chrome.extension.getURL('img/weather/colored/' + currentWeatherIcon);
    img.style.height = '160px';
    img.style.width = '160px';
    img.style.margin = '10px';


    var text = WeatherTrends.formatTemp(currentWeather.avgTempF) + '˚ and ' + currentWeather.wx;


    var desc = document.createElement('p');
    var closeIcon = document.createElement('img');
    closeIcon.className = 'weatherhack-weather-icon-close';
    var url = chrome.extension.getURL('img/close.png');
    closeIcon.src = url;
    closeIcon.addEventListener('click', function(){
      this.ePopup.remove();
    }.bind(this));
    var text = document.createTextNode(text)
    desc.appendChild(text);
    desc.className = 'weatherhack-desc';

    this.ePopup.appendChild(closeIcon);
    this.ePopup.appendChild(img);
    this.ePopup.appendChild(desc);

    document.body.appendChild(this.ePopup);
  });
}));