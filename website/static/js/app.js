function buildMetadata(city) {
  //alert(sample);
   
  var url = `/cityPop2/${city}`; 
  d3.json(url).then((data) =>{
    //console.log(data);
    var PANEL = d3.select("#city-sample");

    PANEL.html("");

    Object.entries(data[0]).forEach(([key,value]) =>{
      PANEL.append("h6").text(`${key}: ${value}`);
    })
    
  });
}
  

function buildCharts(city) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var url = `/cityCrime2/${city}`; 
  d3.json(url).then((data) =>{

    // @TODO: Build a Chart using the sample data
    const city = data[0].city;
    const crimetype = data[8].type;
    const year = ["2010","2011","2012","2013","2014","2015","2016"]
    const yearValues = [data[8]["2010"],data[8]["2011"],data[8]["2012"],data[8]["2013"],data[8]["2014"],data[8]["2015"],data[8]["2016"]]

    var bardata = [{
      name: city,
      x: year,
      y: yearValues,
      type: 'bar',
      //hovertext: otu_labels.slice(0,10),
      //hoverinfo: "hovertext",
    }];

    var barlayout = {
      margin: {t:0,1:0}
    };
    Plotly.purge('bar');
    Plotly.plot('bar', bardata, barlayout);
  });

 }

function init() {
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/cityPop").then((dataPop) => {
    dataPop.forEach((pop) => {
      selector
        .append("option")
        .text(pop.city)
        .property("value", pop.city);
    });

    // Use the first sample from the list to build the initial plots
     const firstCity = dataPop[0];
     buildCharts(firstCity.city);
     buildMetadata(firstCity.city);
  });
}

function optionChanged(newCity) {
  // Fetch new data each time a new sample is selected
  buildCharts(newCity);
  buildMetadata(newCity);
  //alert("You chose " + newCity + "! Wow!")
}

// Initialize the dashboard
init();
