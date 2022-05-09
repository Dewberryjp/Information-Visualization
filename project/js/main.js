// The svg

const svg = d3.select("svg"),
  width = +svg.attr("width") - 200,
  height = +svg.attr("height");
var tooltip = svg.append("div") 
  .attr("class", "tooltip")       
  .style("opacity", 0)  

// Map and projection
const path = d3.geoPath();
const projection = d3.geoMercator()
  .scale(70)
  .center([0,20])
  .translate([width / 2, height / 2]);
var dictdata = new Map()
// Data and color scale
const colorScale = d3.scaleThreshold()
  .domain([ 5, 10, 100, 5000,10000,100000])
  .range(d3.schemeBlues[6]);
// d3.json("data/world.geojson", function(d) {
//     console.log(d)
//   })
// Load external data and boot
Promise.all([
d3.json("data/world.geojson", function(d) {

}),
d3.json("data/cmapdata.json", function(d) {
  
  // console.log(d)
})
]).then(function(data){
  
  let topo = data[0]

  Object.entries(data[1]).forEach(([key, d]) => {
    dictdata.set(+key, new Map())

    Object.entries(d).forEach(([key0, i]) => {
      dictdata.set(dictdata.get(+key).set(key0,i))
    })

  })
  // console.log(dictdata);
  // create a small legend based on the color scale with the first colors label being No Data

  const legend = d3.legendColor()
    .labelFormat(d3.format(".0f"))
    .scale(colorScale)
    .title("Tons of CO2 Emitted")
    .orient("vertical")
    .shape("rect")
    .shapePadding(10)
    .labelOffset(8)
    .labels([ "0-5", "5-10", "10-100", "100-5000", "5000-10000", "10000+"])
    
  // Add legend to the map
  svg.append("g")
    .attr("class", "legend")
    .attr("transform", "translate(" + (width+50 ) + ",50)")
    .call(legend);

  
  cMap = svg.append("g");
  
     //the data objects are the fill colors
    // cMap.selectAll("path")
    // .data(topo.features)
    // .join("path")
    //   // draw each country
    //   .attr("d", d3.geoPath()
    //     .projection(projection)
    //   )
    //   // set the color of each country
    //   .attr("fill", function (d) {
    //     if(dictdata.has(year)){
    //       if(dictdata.get(year).has(d.id)){
    //         console.log(dictdata.get(year));
    //         var currCo2 = dictdata.get(year).get(d.id).co2
    //         color = currCo2 || 0;
    //       }
    //     }
    //     return colorScale(color);
    //   })
    //   .append('title')
    //   .text(function (d) {
    //     if(currEntry = dictdata.get(d.id)){
    //       var currCo2 = dictdata.get(d.id).total
    //       d.total = "Total Number of Disasters in "+year+"\n" + currCo2 || '0';
    //     }
    //     return d.total;
    //   })
      var update = (year) => {

        console.log(year);
        console.log(dictdata.get(year));
        cMap.selectAll('path').remove()
        cMap.selectAll('path')
          .data(topo.features)
          .join("path")
          .attr("d", d3.geoPath()
            .projection(projection)
          )
        .attr("fill", function (d) {
          if(dictdata.has(year)){
            if(dictdata.get(year).has(d.id)){
              // console.log(dictdata.get(year));
              var currCo2 = dictdata.get(year).get(d.id).co2
              color = currCo2 || 0;
            }
          }
          return colorScale(color);
        })
        .append('title')
        .text(function (d) {
          if(dictdata.has(year)){
            if(dictdata.get(year).has(d.id)){
              var currCo2 = dictdata.get(year).get(d.id).co2
              var currD = dictdata.get(year).get(d.id).total
              if (currD) {
                d.total = "Total Number of Disasters in "+year+": " + currD + "\n";
              } else d.total = "Total Number of Disasters in "+year+": " + '0'+ "\n";
            
            
              if (currCo2) {
                d.total += "Tons of CO2 emitted in "+year+": " + currCo2+ "\n";
              } else d.total += "Tons of CO2 emitted in "+year+": " + '0'+ "\n";
            }
          }
          return d.total;
        })
        .attr("class","round_corners")
      }
      update(2000)//d3.select('#year-slider').value)
      d3.select('#year-slider').on('input', function() {
        // Update visualization
        // update(parseInt(this.value));
      
        // Update label
        update(parseInt(this.value));

        d3.select('#year-value').text(this.value);
      });
})
