// Store our API endpoint inside queryUrl
var queryUrl = "../static/data/cleanData.json"
//var queryUrl = "static/data/zillow.json"

// Perform a GET request to the query URL
d3.json(queryUrl).then((data) =>{
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data);
  //alert(data)
});
  

function createFeatures(inpData) {
  // Sending our earthquakes layer to the createMap function
  createMap(inpData);
}

function createMap(crimes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });


  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap]
  });

  // Loop through the cities array and create one marker for each city, bind a popup containing its name and population add it to the map
  for (var i = 0; i < 1000; i++) {
    var city = crimes[i];
    L.marker([city.Latitude, city.Longitude])
      .bindPopup("<h1>" + city.City + "</h1> <hr> <h3>Crime " + city["Offense Description"] + "</h3>")
      .addTo(myMap);
  } 
  
  // Loop through each metro array and create a marker , bind a popup containing its name and population add it to the map
//  for (var i = 0; i < 51; i++) {
//    var metro = neighborhood[i];
//    L.marker([city.latitude, city.longitude])
//      .bindPopup("<h1>" + metro.Metro + "</h1> <hr> <h3>neighborhood " + metro["Average Price"] + "</h3>")
//      .addTo(myMap);
//  }   
}
