
$((function(){

  function WeatherHack() {

    var font = document.createElement('link'),
      that = this;
    font.href = '//fonts.googleapis.com/css?family=Tauri';
    font.rel = 'stylesheet';
    font.type = 'text/css';
    document.head.appendChild(font);

    var isShowing = true;

    // Build initial overlay

    var mouseIsDown = false,
      initialOffsetX = 0,
      initialOffsetY = 0;


    this.root = document.createElement('div');
    this.root.id = 'weather-hack-root';

    this.weatherOverlay = document.createElement('div');
    this.root.addEventListener('mousedown', function(e){
      e.preventDefault();
      mouseIsDown = true;
      this.root.style.cursor = 'move';
      initialOffsetX = e.layerX;
      initialOffsetY = e.layerY;
    }.bind(this));

    window.addEventListener('mousemove', function(e){
      e.preventDefault();
      if(mouseIsDown && isShowing){
        this.root.style.right = 'inherit';
        this.root.style.left = window.scrollX + (e.clientX - initialOffsetX) + 'px';
        this.root.style.top = window.scrollY + (e.clientY - initialOffsetY) + 'px';
      }
    }.bind(this));

    window.addEventListener('mouseup', function(e){
      e.preventDefault();
      mouseIsDown = false;
      this.root.style.cursor = 'pointer';
    }.bind(this));

    this.weatherOverlay.id = "weather-hack";
    var img = document.createElement('img');

  //  img.src = chrome.extension.getURL('img/weather/colored/' + WeatherTrends.mapWT2Hack(currentWeatherIcon) + '.png');
    img.style.width = '160px';
    img.style.margin = '10px';
    img.id = 'weather-hack-weather-image';

    var desc = document.createElement('p');
    var upUrl = chrome.extension.getURL('img/up.png'),
      downUrl = chrome.extension.getURL('img/down.png');

    var closeIcon = document.createElement('img'),
      openIcon = document.createElement('img'),
      $closeIcon = $(closeIcon),
      $openIcon = $(openIcon);
      closeIcon.className = 'weatherhack-weather-icon-close';
      openIcon.className = 'weatherhack-weather-icon-close';
      closeIcon.src = upUrl;
      openIcon.src = downUrl;
      $openIcon.hide(),
      shouldBeOpened = true;


    var clickUp = function(e){
      shouldBeOpened = false;
      e.preventDefault();
      e.stopPropagation();
      $closeIcon.hide();
      $openIcon.show();
      hideWeatherDialog();
    };

    var clickDown = function(e){
      shouldBeOpened = true;
      e.preventDefault();
      e.stopPropagation();
      $closeIcon.show();
      $openIcon.hide();
      showWeatherDialog();
    };

    var closeHoverEvent = function(e){
      ! shouldBeOpened && showWeatherDialog();
    };

    var closeBlurEvent = function(e){
      ! shouldBeOpened && hideWeatherDialog();
    };

    var showWeatherDialog = function()
    {
      isShowing = true;
      $(that.weatherOverlay).show();
      that.root.style.top = '10px';
      that.root.style.right = '10px';
      that.root.style.left = "";
    };

    var hideWeatherDialog = function()
    {
      isShowing = false;
      $(that.weatherOverlay).hide();
      that.root.style.top = '10px';
      that.root.style.right = '10px';
      that.root.style.left = "";
    };

    $closeIcon.on('click', clickUp.bind(this));

    $openIcon.on('click', clickDown.bind(this));
    $openIcon.on('mouseover', closeHoverEvent.bind(this));
    $openIcon.on('mouseout', closeBlurEvent.bind(this));

    var text = document.createTextNode('')
    desc.appendChild(text);
    desc.className = 'weatherhack-desc';

    this.weatherOverlay.appendChild(img);
    this.weatherOverlay.appendChild(desc);

    this.root.appendChild(openIcon);
    this.root.appendChild(closeIcon);
    this.root.appendChild(this.weatherOverlay);

    document.body.appendChild(this.root);

    var $weatherDescription = $('#weather-hack .weatherhack-desc');
    var $weatherIcon = $('#weather-hack-weather-image');

    var w = new WeatherTrends();

    var updateWeatherDisplay = function(){
      w.getCachedWeatherData(function(data){
        var currentWeather = data.forecast[0];
        var currentWeatherIcon = currentWeather.iconBase;

        var descriptionText = WeatherTrends.formatTemp(currentWeather.avgTempF) + '˚ and ' + currentWeather.wx;

        $weatherDescription.text(descriptionText);
        $weatherIcon[0].src = chrome.extension.getURL('img/weather/colored/' + WeatherTrends.mapWT2Hack(currentWeatherIcon) + '.png');
      });
    }

    setInterval(updateWeatherDisplay.bind(this), 60000 * 5);
    updateWeatherDisplay();
  }

  new WeatherHack();
}));