"user strict";

$(document).ready(function(){
  
/********** EVENTS **********/    
  /* start app when page loaded*/
  $(window).on("load",init());

  /* switch non-metric => metric */
  $('#celsius').on('click', function(){
    isFahren(false);
  });
        
  /* switch metric => non-metric */
  $('#fahrenheit').on('click', function(){   
    isFahren(true);
  }); 
  
/********** FUNCTIONS **********/  
  
  /* call get before show */
  function init(){   
    $.when(getGeoInfo()).then(showGeoInfo);
  }
  
  /* get data from API */
  var geo = {};
  function getGeoInfo(){
    var api = 'https://api.wunderground.com/api/';
    var key = '7c9cefa085d55a15';
    var feature ='/conditions/forecast/hourly/q/';
    var link = api + key + feature + 'autoip.json';
    var icon_url = 'https://icons.wxug.com/i/c/v4/';
    
    console.log(link);
    
    //ajax call//
    return $.ajax({
      type: 'GET',
      url : link,
      dataType : "jsonp",
      success : function(loc) {
        geo.day = loc.forecast.simpleforecast.forecastday[0].date.weekday;
        geo.city = loc.current_observation.display_location.full;
        geo.weather = loc.hourly_forecast[0].condition;
        geo.weather_icon = icon_url + loc.hourly_forecast[0].icon_url.split("/").reverse()[0].split(".")[0] + ".svg" ;
        geo.temp_f = Math.round(loc.hourly_forecast[0].temp.english);
        geo.temp_c = Math.round(loc.hourly_forecast[0].temp.metric); c=geo.temp_c;
        geo.temp_hi = loc.forecast.simpleforecast.forecastday[0].high;
        geo.temp_lo = loc.forecast.simpleforecast.forecastday[0].low;
        geo.precip = loc.hourly_forecast[0].pop;
        geo.humidity = loc.hourly_forecast[0].humidity;
        geo.wind = loc.hourly_forecast[0].wspd;
        geo.update = loc.current_observation.observation_time;
      },
      error: function(xhr){
        alert("An error occured: " + xhr.status + " " + xhr.statusText);
      }
    });
  }
  
    
  /* display weather info in html */
  function showGeoInfo(){
    $('#location').html(geo.city);
    $('#day').html(geo.day);
    $('#weather').html(geo.weather);
    $('#weather-icon').attr('src',geo.weather_icon);
    $('#precip').html(geo.precip + '&#37;');
    $('#humidity').html(geo.humidity + '&#37;');
    
    isFahren(true);
    
    //timestamp//
    $('#update').html(geo.update);
  }
 
  /* switches displayed unit on click */
  function isFahren(bool){
    if (bool){
      $('#fahrenheit').prop('disabled', true);  
      $('#celsius').prop('disabled', false);
      $('#temp-num').html(geo.temp_f);
      $('#temp-lo').html(' ' + geo.temp_lo.fahrenheit + '&#176;');
      $('#temp-hi').html(' ' + geo.temp_hi.fahrenheit + '&#176;');
      $('#wind').html(geo.wind.english + ' mph');
    }else {     
      $('#fahrenheit').prop('disabled', false);  
      $('#celsius').prop('disabled', true);    
      $('#temp-num').html(geo.temp_c);
      $('#temp-lo').html(' ' + geo.temp_lo.celsius + '&#176;');
      $('#temp-hi').html(' ' + geo.temp_hi.celsius + '&#176;');
      $('#wind').html(geo.wind.metric + ' kph');
    }
  }  
  
});
  
  
  /* FOR TESTING & EDITING: DATA ARE STATIC 
  function showGeoInfo(){
    var loc ={};
    //"         https://icons.wxug.com/i/c/v4/partlysunny.svg"
    loc.url = "https://icons.wxug.com/i/c/a/rain.gif";
    link = "https://icons.wxug.com/i/c/v4/" + loc.url.split("/").reverse()[0].split(".")[0] + ".svg";
    
    console.log(link);
    
    $('#location').html("Daly City, CA");
    $('#day').html("Tuesday");
    $('#weather').html("Partly Sunny");
    $('#weather-icon').attr('src',link);
    $('#precip').html('10&#37;');
    $('#humidity').html('64&#37;');
    
    //temp fahrenheit & celsius//
    $('#temp-f').html('212 ');
    $('#temp-lo-f').html(' &#x21E3; 49&#176;');
    $('#temp-hi-f').html('&#x21E1; 59&#176;');
    $('#temp-c').html('100 ');
    $('#temp-lo-c').html(' &#x21E3; 9&#176;');
    $('#temp-hi-c').html('&#x21E1; 14&#176;');
    
    //wind speed//
    $('#wind-mph').html('16 mph');
    $('#wind-kph').html('26 kph');
    
    //timestamp//
    $('#update').html("Last Updated on May 1, 2:01 PM PDT");
    //console.log(geo);
  }
  */
  


  /* WHEN USING HTML5 GEO
  $(window).on("load",init());
  
  geo.humidity = loc.current_observation.relative_humidity;
  
  function init(){
  
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
       maximumAge: 0
    };
  
    function success(pos){
      var geo = {};
      geo.lat = pos.coords.latitude;
      geo.lon = pos.coords.longitude;
      getGeoInfo(geo);
      //console.log(geo);
    }
    
    function error(){
      $('.container').innerText = "Unable to retrieve your location";  
    }
        
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition (success,error,options);
    }
  }
  */