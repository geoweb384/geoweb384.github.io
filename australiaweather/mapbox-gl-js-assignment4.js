mapboxgl.accessToken =
'pk.eyJ1IjoiYWxhcmllYzAwMSIsImEiOiJjbWYycmwzMGExZW43MmtvZjI0cjQ3aHYwIn0.aS7KnudBFXEBUF_C-B2bbw';

//adding the API key
const TOMORROW_API_KEY = "26isPatoGD8eM3IT4dVGSQqrk5VV3x8A"; // niko api key"4T3Km5uvYExj2lZ9OFCa8wtgsAnPGIK1"];

//limits bounds to australia, user cannot stray
const australiaBounds = [
    [112.0, -44.0],
    [154.0, -10.0]
];

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/standard-satellite',
    center: [133.5, -25.5],
    zoom: 1,
    maxBounds: australiaBounds,
    projection: 'mercator'
});

//resize to fit all of Australia in any screen size
//user sees bounding box on load
map.fitBounds(australiaBounds);

/////////////////////////////////////////////////

//less-cities.json loads into cityfeatures
let cityFeatures = [];

//establishing variables to store lat-long information globally
let selectedCity = null;
let selectedCoords = null;

//every time user clicks a new city will start to draw a new chart
let weatherChart = null;

// Weather codes lookup object - directly embedded
const weatherCodes = {
  "0": "Unknown",
  "1000": "Clear, Sunny",
  "1100": "Mostly Clear",
  "1101": "Partly Cloudy",
  "1102": "Mostly Cloudy",
  "1001": "Cloudy",
  "2000": "Fog",
  "2100": "Light Fog",
  "4000": "Drizzle",
  "4001": "Rain",
  "4200": "Light Rain",
  "4201": "Heavy Rain",
  "5000": "Snow",
  "5001": "Flurries",
  "5100": "Light Snow",
  "5101": "Heavy Snow",
  "6000": "Freezing Drizzle",
  "6001": "Freezing Rain",
  "6200": "Light Freezing Rain",
  "6201": "Heavy Freezing Rain",
  "7000": "Ice Pellets",
  "7101": "Heavy Ice Pellets",
  "7102": "Light Ice Pellets",
  "8000": "Thunderstorm"
};

// Helper function to convert weather code to description
function getWeatherDescription(code) {
  // Convert code to string since JSON keys are strings
  const codeStr = String(code);
  
  // Return the description if found, otherwise return a default
  return weatherCodes[codeStr] || `Unknown weather (code: ${code})`;
}

//helper function to call the API
function buildWeatherUrl(lat, lng) {

  //desired weather forecast fields (at least five)
  const fields = [
    "temperature",
    "humidity",
    "weatherCode",
    "precipitationIntensity",
    "cloudCover"
  ].join(",");

  const timesteps = "1h";          //hourly forecast
  const startTime = "now";         //range goes from now to...
  const endTime = "nowPlus8h";     //eight hours later
  const units = "metric";

  //build the API request for tomorrow.io
  const url =
    `https://api.tomorrow.io/v4/weather/forecast` +
    `?location=${lat},${lng}` +
    `&fields=${fields}` +
    `&timesteps=${timesteps}` +
    `&units=${units}` +
    `&startTime=${startTime}` +
    `&endTime=${endTime}` +
    `&apikey=${TOMORROW_API_KEY}`;

  return url;
}


function fetchWeatherForSelectedCity() {
  //making sure that a city is actually selected
  if (!selectedCoords || !selectedCity) {
    console.warn("No city selected yet.");
    return;
  }

  //tomorrow.io uses lat-long whereas js uses long-lat
  const [lng, lat] = selectedCoords;   

  //calling the API for weather information
  const url = buildWeatherUrl(lat, lng);
  console.log("Calling Tomorrow.io with:", url);

  //creates a GET request 
  $.getJSON(url, function (data) {

    const hourly = data.timelines.hourly;       //collect hourly weather
    const firstHour = hourly[0].values;

    const temperature = firstHour.temperature;  //in celcius
    const humidity = firstHour.humidity;        //% relative humidity
    const cloudCover = firstHour.cloudCover;    //%cloud cover
    const weatherCode = firstHour.weatherCode;  //weather conditions
    const rainIntensity = firstHour.rainIntensity; //precipitation intensity

    //text to show up 
    document.getElementById("weather-output").innerHTML = 
      `<strong>Weather for ${selectedCity.properties.city}</strong><br>
       Weather: ${getWeatherDescription(weatherCode)}<br>
       Temperature: ${temperature}°C<br>
       Cloud Cover: ${cloudCover}%<br>
       Humidity: ${humidity}%<br>
       Precipitation: ${rainIntensity} mm/h<br>`;

    const isRaining = rainIntensity > 0;
    const advice = getFashionAdvice(temperature, isRaining);
    document.getElementById("fashion-advice").textContent = advice;


    const canvas = document.getElementById("chart");
    const ctx = canvas.getContext("2d");

    const chartData = {
      labels: [
        "Temperature (°C)",
        "Humidity (%)",
        "Cloud Cover (%)",
        "Precipitation (mm/h)"
      ],
      datasets: [{
        label: `Conditions in ${selectedCity.properties.city}`,
        data: [temperature, humidity, cloudCover, rainIntensity],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)" 
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)"
        ],
        borderWidth: 1.3
      }]
    };

    const config = {
      type: "polarArea",
      data: chartData,
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              font: {
                family: "Courier New, monospace",
                size: 12
              },
              color: "#0000AA"
            }
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            grid: {
              color: "rgba(0,0,0,0.12)"
            },
            angleLines: {
              color: "rgba(0,0,0,0.25)"
            },
            ticks: {
              backdropColor: "transparent",
              color: "#0000AA",
              showLabelBackdrop: false
            },
            pointLabels: {
              color: "#0000AA",
              font: {
                family: "Courier New, monospace",
                size: 13
              }
            }
          }
        }
      }
    };

    // prevent multiple charts stacking
    if (weatherChart) {
      weatherChart.destroy();
    }

    //create a new chart and save it in the global variable
    weatherChart = new Chart(ctx, config);

  }).fail(function (jqxhr, textStatus, error) {
    console.error("Tomorrow.io request failed:", textStatus, error);
    document.getElementById("outfit-text").textContent =
      "Failed to load weather data. Please try clicking again.";
  });
}

map.on("load", () => {

  fetch("less-cities.geojson")
    .then(res => res.json())
    .then(data => {

      cityFeatures = data.features;

      map.addSource("cities", {
        type: "geojson",
        data: data
      });

      map.addLayer({
        id: "cities-layer",
        type: "circle",
        source: "cities",
        paint: {
          "circle-radius": 3,
          "circle-color": "white",
          "circle-stroke-width": 1,
          "circle-stroke-color": "blue"
        }
      });
    });

});

////

map.on("click", "cities-layer", (e) => {
  const f = e.features[0];
  const coords = f.geometry.coordinates;
  document.getElementById("city").textContent = f.properties.city;
  map.easeTo({
    center: coords,
    zoom: 6
  });
});

////

map.on("click", (e) => {
  if (!cityFeatures.length) return;

  const hit = map.queryRenderedFeatures(e.point, { layers: ["cities-layer"] });
  if (hit.length) return;

  let nearest = null;
  let minDist = Infinity;

  for (let i = 0; i < cityFeatures.length; i++) {
    const f = cityFeatures[i];
    const coords = f.geometry.coordinates;
    const lng = coords[0];
    const lat = coords[1];

    const dx = e.lngLat.lng - lng;
    const dy = e.lngLat.lat - lat;
    const d = dx * dx + dy * dy;

    if (d < minDist) {
      minDist = d;
      nearest = f;
    }
  }

  if (!nearest) return;

  const [lng, lat] = nearest.geometry.coordinates;

  //added these to store the lat-long information globally
  selectedCity = nearest;
  selectedCoords = [lng, lat];

  if (selectedCity.properties.admin_name === "Tasmania") {
    const imgElement = document.getElementById("tasmania-photo");
    imgElement.src = "Tazy.png";
    imgElement.style.display = "block";
  } else {
    document.getElementById("tasmania-photo").style.display = "none";
  }

  map.easeTo({ center: [lng, lat], zoom: 6 });

  document.getElementById("information").style.display = "none";
  document.getElementById("city").textContent = nearest.properties.city;
  document.getElementById("admin_name").textContent = "State: " + (nearest.properties.admin_name || "N/A");
  document.getElementById("population").textContent = "Population: " + (nearest.properties.population || "N/A");

  //--after clicking on the map if you open the console log
  //--it will say selected city: name, lat-long so has bene stored globally
  console.log("Selected city:", selectedCity.properties.city, selectedCoords);

  //--triggering the weather fetch here
  fetchWeatherForSelectedCity();
  
});


function getFashionAdvice(temperature, isRaining) {
  console.log("getFashionAdvice inputs:", temperature, isRaining);

  if (typeof temperature !== "number" || isNaN(temperature)) {
    return "Sorry! I couldn't read the temperature data properly.";
  }

  let advice = "";

    if (temperature > 40) {
        advice = "Stay indoors, turn on the AC.";
    } 
    else if (temperature >= 35 && temperature <= 40) {
        advice = "Wear nothing but sunscreen.";
    } 
    else if (temperature >= 25 && temperature < 35) {
        advice = " shorts, tank top, bucket hat, and especially sunscreen.";
    } 
    else if (temperature >= 20 && temperature < 25) {
        if (isRaining) {
            advice = "Cargo shorts, flip flops, a  shirt and an umbrella";
        } else {
            advice = "Cargo shorts, flip flops and a  shirt";
        }
    } 
    else if (temperature >= 10 && temperature < 20) {
        if (isRaining) {
            advice = "T-shirt, capris, and maybe a cap. And bring an umbrella and maybe a hoodie.";
        } else {
            advice = "T-shirt, capris, and maybe a cap.";
        }
    } 
    else if (temperature < 10) {
        if (isRaining) {
            advice = "Hoodie, pants, an umbrella and wellies.";
        } else {
            advice = "Hoodie and pants.";
        }
    }
    
    return advice;
}