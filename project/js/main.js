// The svg
const svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height");
var tooltip = svg.append("div") 
  .attr("class", "tooltip")       
  .style("opacity", 0)  
function mouseover(d){
  tooltip.transition()    
    .duration(200)    
    .style("opacity", .9);    
  tooltip.html(d)  
    .style("left", (d3.event.pageX) + "px")   
    .style("top", (d3.event.pageY - 28) + "px");  
}

function mouseout(d){
  tooltip.transition()    
    .duration(500)    
    .style("opacity", 0); 
}
// Map and projection
const path = d3.geoPath();
const projection = d3.geoMercator()
  .scale(70)
  .center([0,20])
  .translate([width / 2, height / 2]);
var dictdata = new Map()
// Data and color scale
const colorScale = d3.scaleThreshold()
  .domain([0, 10, 50, 100, 1000, 10000])
  .range(d3.schemeBlues[7]);
d3.json("data/world.geojson", function(d) {
    console.log(d)
  })
// Load external data and boot
Promise.all([
d3.json("data/world.geojson", function(d) {

}),
d3.json("data/mapdata.json", function(d) {
  
  console.log(d)
})
]).then(function(data){
  let topo = data[0]

  Object.entries(data[1]).forEach(([key, d]) => {
    dictdata.set(d.id, d)
    console.log(d);
  })
  console.log(dictdata);
  svg.append("g")
    .selectAll("path")
    .data(topo.features)
    .join("path")
      // draw each country
      .attr("d", d3.geoPath()
        .projection(projection)
      )
      // set the color of each country
      .attr("fill", function (d) {
        if(dictdata.get(d.id)){
          var currCo2 = dictdata.get(d.id).co2
          color = currCo2 || 0;
        }
        return colorScale(color);
      })
      .append('title')
      .text(function (d) {
        if(dictdata.get(d.id)){
          var currCo2 = dictdata.get(d.id).total
          d.total = "Total Number of Disasters Since 1960 \n" + currCo2 || '0';
        }
        return d.total;
      })
})
