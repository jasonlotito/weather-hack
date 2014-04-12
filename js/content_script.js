
$((function(){
  // <link href='//fonts.googleapis.com/css?family=Tauri' rel='stylesheet' type='text/css'>
  var font = document.createElement('link');
  font.href = '//fonts.googleapis.com/css?family=Tauri';
  font.rel = 'stylesheet';
  font.type = 'text/css';
  document.head.appendChild(font);

  var isShowing = true;

  var w = new WeatherTrends();
  w.getCurrentWeather(function(data){

    var mouseIsDown = false,
      initialOffsetX = 0,
      initialOffsetY = 0,
      currentWeather = data.forecast[0],
      currentWeatherIcon = currentWeather.iconBase;

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

    img.src = chrome.extension.getURL('img/weather/colored/' + WeatherTrends.mapWT2Hack(currentWeatherIcon) + '.png');
    img.style.width = '160px';
    img.style.margin = '10px';


    var text = WeatherTrends.formatTemp(currentWeather.avgTempF) + '˚ and ' + currentWeather.wx;

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

    function showWeatherDialog()
    {
      isShowing = true;
      $(this.weatherOverlay).show();
      this.root.style.top = '10px';
      this.root.style.right = '10px';
      this.root.style.left = "";
    }

    function hideWeatherDialog()
    {
      isShowing = false;
      $(this.weatherOverlay).hide();
      this.root.style.top = '10px';
      this.root.style.right = '10px';
      this.root.style.left = "";
    }

    $closeIcon.on('click', clickUp.bind(this));

    $openIcon.on('click', clickDown.bind(this));
    $openIcon.on('mouseover', closeHoverEvent.bind(this));
    $openIcon.on('mouseout', closeBlurEvent.bind(this));

    var text = document.createTextNode(text)
    desc.appendChild(text);
    desc.className = 'weatherhack-desc';

    this.weatherOverlay.appendChild(img);
    this.weatherOverlay.appendChild(desc);

    this.root.appendChild(openIcon);
    this.root.appendChild(closeIcon);
    this.root.appendChild(this.weatherOverlay);

    document.body.appendChild(this.root);
  });
}));