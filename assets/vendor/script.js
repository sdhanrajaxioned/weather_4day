$(document).ready(function () {
  var cityInput = $('#city_field')
  var currentDay = $('.day');
  var currentDate = $('.date');
  var defaultCity = 'mumbai';
  var cityName = $('.city');
  var temp = $('.temp');
  var humidity = $('.humidity');
  var windSpeed = $('.wind');
  var compass = $('.compass');
  var findBtn = $('#find-btn');

  //function to display weather which takes city as mumbai on load.
  function getWeather(city){
    $.ajax({
      type: "GET",
      url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=99c8f5a43ff2ca350e86b61742e15d3e`,
      data: "JSON",
      success: function(response) {
        displayDate();
        var cityData = response['name'];
        var tempData = response['main']['temp'];
        var tempDataC = (tempData - 273.15).toFixed(0);
        var weatherData = response['weather'][0]['main'];
        var windData = response['wind']['speed'];
        var windDataKmHr = (windData * 3.6).toFixed(2);
        var humidityData = response['main']['humidity'];
        var directionData = response['wind']['deg'];
        var compassData = degreeToDirection(directionData);
        
        displayWeatherIcon(weatherData);
        
        cityName.html(cityData);
        temp.html(tempDataC + '&deg; C');
        humidity.html(humidityData + ' %' );
        windSpeed.html(windDataKmHr + 'km/hr')
        compass.html(compassData);
      }
    });
  }

  function getweatherIconPath(weatherData) {
    if(weatherData === 'Drizzle')
      return 'assets/images/icons/icon-13.svg';
    if(weatherData === 'Thunderstorm')
      return 'assets/images/icons/icon-12.svg';
    if(weatherData === 'Rain')
      return 'assets/images/icons/icon-14.svg';
    if(weatherData === 'Clear')
      return 'assets/images/icons/icon-1.svg';
    if(weatherData === 'Clouds')
      return 'assets/images/icons/icon-5.svg';
    if(weatherData === 'Smoke' || weatherData === 'Haze' || weatherData === 'Mist')
      return 'assets/images/icons/icon-7.svg';
  }

  function displayWeatherIcon(weatherData){
    getweatherIconPath(weatherData);
    var path = getweatherIconPath(weatherData);
    $('.icons-container').html(`<img src=${path} alt='${weatherData} icon'>`)
  }

  //converts weather wind degrees to compass directions
  function degreeToDirection(degrees) {
    var directions = ['North', 'NorthEast', 'East', 'SouthEast', 'South', 'SouthWest', 'West', 'NorthWest'];
    degrees = degrees * 8 / 360;
    degrees = Math.round(degrees, 0);
    degrees = (degrees + 8) % 8;
    return directions[degrees];
  }
  
  // passing mumbai as default city to getWeather()
  function defaultWeather(){
    getWeather(defaultCity);
  }

  // displays current day date & month 
  function displayDate() {
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var days = ["Sunday", "Monday", "Tuesday","Wednesday","Thursday", "Friday", "Saturday"];
    var today = new Date();
    var day = days[today.getDay()];
    var month = monthNames[today.getMonth()];
    var date = today.getDate();
    currentDay.html(day);
    currentDate.html(date + " " + month);
  }
  
  findBtn.click(function(e) {
    e.preventDefault();
    getWeather(cityInput.val());
  })
  
  defaultWeather();

});