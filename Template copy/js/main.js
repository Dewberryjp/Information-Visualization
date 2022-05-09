//load json with d3
d3.json("js/barchartdata.json").then(function(d) {

    data = new Map()
    console.log(d);
    arr = []
    Object.entries(d).forEach(function([year, diss]) {
        diss.year= year
        arr.push(diss)
        Object.entries(diss).forEach(function([disType, amt]) {
            if(!(data.has(disType))) data.set(disType, [])
            data.get(disType).push({year: year, amt: amt})
            

            
        })
        
    })
    console.log(arr);
    console.log(data.keys());
    var stack = d3.stack().keys(['flood','storm','drought','earthquake','landslide','extreme temperature']);
    stackedData = stack(arr)
    console.log(stackedData);
    var xScale = d3.scaleLinear().domain([1960,2020]).range([0, 700]);
    var yScale = d3.scaleLinear().domain([0,2000]).range([500, 0]);

    var colorScale = d3.scaleOrdinal()
    .domain(['flood','storm','drought','earthquake','landslide','extreme temperature'])
    .range(["red", "yellow", "orange", "green", "blue", "purple"]);

    // var areaGen = d3.area()
    // .x((d) => xScale([d.data.year]))
    // .y0((d) => yScale(d[0]))
    // .y1((d) => yScale(d[1]));
    
    d3.select("svg")
    .selectAll("rect")
    
    .data(stackedData)
    .join('rect')
  .attr('width', 40)
  .attr('y', (d) => yScale(d[1]))
  .attr('x', (d) => xScale(d.data.year))
  .attr('height', (d) => yScale(d[0]) -  yScale(d[1]));
    // .join("path")
    // .attr("d", areaGen)
    // .attr("fill", (d) => colorScale(d.key));
    


})