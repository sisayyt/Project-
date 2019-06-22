// Create our map, giving it the streetmap and earthquakes layers to display on load
var myMapZ = L.map("zillowmap", {
  center: [
    37.09, -95.71
  ],
  zoom: 5,
  layers: [streetmapZ]
});

// Store our API endpoint inside queryUrl
var queryUrl = "../static/data/zillow.json"
console.log('Im running!')

// Perform a GET request to the query URL
d3.json(queryUrl).then((data) =>{
    // Once we get a response, send the data.features object to the createFeatures function
  createFeaturesZ(data);
  console.log('[Data]: ', data)
  //alert(data)
});
  

function createFeaturesZ(inpDataZ) {
  // Sending our earthquakes layer to the createMap function
  createMapZ(inpDataZ);
}

function createMapZ(crimesZ) {

  // Define streetmap and darkmap layers
  var streetmapZ = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });



  // Loop through the cities array and create one marker for each city, bind a popup containing its name and population add it to the map
  for (var i = 0; i < 5; i++) {
    var cityZ = crimesZ[i];
    L.marker([cityZ.latitude, cityZ.longitude])
      .bindPopup("<h1>" + cityZ.Metro + "</h1> <hr> <h3>Crime " + cityZ["Offense Description"] + "</h3>")
      .addTo(myMapZ);
  }  
}