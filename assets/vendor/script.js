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
  var cityField = $('#city_field');
  var findBtn = $('#find-btn');
  var subscribeBtn = $('.subscribe-btn');

  // function to display weather which takes city as mumbai on load.
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
        humidity.html(humidityData + '%' );
        windSpeed.html(windDataKmHr + 'km/hr')
        compass.html(compassData);
        cityField.removeClass('invalid');
        cityField.next().hide();
      },
      error: validateCityField
    });
  }
  
  // passing mumbai as default city to getWeather()
  function defaultWeather(){
    getWeather(defaultCity);
  }

  defaultWeather();

  // retrieves img with respect to weather condition
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
  
  // Appends weather icon to icons-container
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
    e.preventDefault()
    getWeather(cityInput.val());
  })

  // form valdiation starts here
  // validates whether input field is empty
  function emptyField(input) {
    input.removeClass('invalid');
    if(input.val() == ''){
      input.addClass('invalid');
      input.next().html('**This field cant be empty!**');
      input.next().show();
      return false
    }
  }

  // validate cityField 
  function validateCityField(xhr) {
    cityField.removeClass('invalid');
    if(cityField.val() == ''){
      emptyField(cityField);
    }
    else if(xhr.status === 404) {
      cityField.addClass('invalid');
      cityField.next().html('**Please enter valid city name!**');
      cityField.next().show();
    } 
  }

  // validates email
  function validateEmail(emailField, emailReg) {
    emailField.removeClass('invalid');
    if(emailField.val() == '') {
      emptyField(emailField);
    } else if(!emailReg.test(emailField.val())) {
      emailField.addClass('invalid');
      emailField.next().html('**Please enter valid email!**')
      return false;
    }
  }

  function validateSubscribeForm() {
  var emailField = $('#email');
  var emailReg = /^[\w]{1,}[\w.+-]{0,}@[\w-]{1,}([.][a-zA-Z]{2,3}|[.][\w-]{2,3}[.][a-zA-Z]{2,3})$/;
    validateEmail(emailField, emailReg);
    if($('.subscribe input').hasClass('invalid')) {
      return false 
    } else {
      emailField.next().hide();
      alert ('Form submitted successfully!');
      return true
    }
  }

  subscribeBtn.click(validateSubscribeForm);

  // Hamburger menu 
  $('.hamburger').click(function (){
    $('.hamburger').toggleClass('active');
    $('.bar').toggleClass('active');
    $('.navbar').slideToggle(function() {
      $('.navbar').toggleClass('show');
    });
  })
});