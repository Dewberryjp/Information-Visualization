var format = function(d) {
    d = d / 1000000;
    return d3.format(',.02f')(d) + 'M';
}

const svg = d3.select("svg")

const projection = d3.geoMercator()
  .scale(70)

transformData = (csvData) => {
    data = d3.csv(csvdata)
    data.map()
}

var map = d3.choropleth()
    .geofile('countries.json')
    .colors(d3.schemeYlGnBu[9])
    .column('YR2010')
    .format(format)
    .legend(true)
    //Map data for Natural disaster, Country Name => Country Code
    .unitId('iso3');

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
    d.total = data.get(d.id) || 0;
    return colorScale(d.total);
  })