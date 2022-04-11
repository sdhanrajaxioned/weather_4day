$(document).ready(function () {
  var cityInput = $('#city_field')
  var currentDay = $('.day');
  var currentDate = $('.date');
  var defaultCity = 'mumbai';
  var cityName = $('.city');
  var temp = $('.temp');
  var icons = $('.icons-container img');
  console.log(icons);
  var humidity = $('.humidity');
  var windSpeed = $('.wind');
  var compass = $('.compass');
  var findBtn = $('#find-btn')

  //function to display weather which takes city as mumbai on load.
  function getWeather(city){
    $.ajax({
      type: "GET",
      url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=99c8f5a43ff2ca350e86b61742e15d3e`,
      data: "JSON",
      success: function(response) {
        displayDate();
        displayWeatherIcon(response);
        var cityData = response['name'];
        var tempData = response['main']['temp'];
        var tempDataC = (tempData - 273.15).toFixed(0);
        var windData = response['wind']['speed'];
        var windDataKmHr = (windData * 3.6).toFixed(2);
        var humidityData = response['main']['humidity'];
        var directionData = response['wind']['deg'];
        var compassData = degreeToDirection(directionData);

        cityName.html(cityData);
        temp.html(tempDataC + '&deg; C');
        humidity.html(humidityData + ' %' );
        windSpeed.html(windDataKmHr + 'km/hr')
        compass.html(compassData);
      }
    });
  }

  function displayWeatherIcon(data) {
    var mainData = (data['weather'][0]['main']).toLowerCase();
    icons.each(function() {
      // icon.removeClass('hide');
      var iconData = $(this).data('icon');
      var icon = $(this);
      if(iconData === mainData)
        icon.removeClass('hide');
      else if(mainData === 'smoke' || mainData === 'haze')
        $('.icon-last').removeClass('hide');
      else
        icon.addClass('hide');
    })
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