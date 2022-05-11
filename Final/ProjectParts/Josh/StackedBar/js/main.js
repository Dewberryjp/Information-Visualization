//load json with d3
d3.json("ProjectParts/Josh/StackedBar/js/barchartdata.json").then(function(d) {

    data = new Map()
    // console.log(d);
    arr = []
    var padding =50;
    var width = 500
    var height = 500
    var max = 0 
    Object.entries(d).forEach(function([year, diss]) {
        diss.year= year
        arr.push(diss)
        Object.entries(diss).forEach(function([disType, amt]) {
            if(!(data.has(disType))) data.set(disType, [])
            data.get(disType).push({year: year, amt: amt})


            
        })
        
    })
    var keys = ['flood','storm','drought','earthquake','landslide',"extreme temperature "]
    arr.forEach(function(d) {
        //if object d doesn't have a key set it to 0
        keys.forEach(function(key) {
            if(!(d.hasOwnProperty(key))) d[key] = 0
        })
    })
    var years = []
    for(var i = 1960; i <= 2020; i=i+10) {
        years.push(i)
    }
      // Add X axis
    var svg = d3.select('svg')
    
        
    var stack = d3.stack()
        .keys(keys);
    stackedData = stack(arr)
    console.log(stackedData);
    var xScale = d3.scaleLinear().domain([1960,2020]).range([0+padding, 700]);
    var yScale = d3.scaleLinear().domain([0,2000]).range([500, 0]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale).ticks(7));

    // Add Y axis
    //find max value in stack data


    var max = 0
    stackedData.forEach(function(d) {
        d.forEach(function(value) {
            value.forEach(function(v) {
                if(v && v>max) max = v
        })
    })})
    var y = d3.scaleLinear()
        .domain([0, max])
        .range([ height, 0 ]);
    svg.append("g")
        .attr("transform", "translate("+padding+",0)")
        .call(d3.axisLeft(y));

    var colorScale = d3.scaleOrdinal()
    .domain(keys)
    .range(["red", "yellow", "orange", "green", "blue", "purple"]);
        
 

    svg.selectAll("rect")
        .data(stackedData)
        .enter().append("g")
        .attr("fill", function(d) { 
            // console.log(d);
            return colorScale(d.key); })
            .selectAll("rect")
            .data(function(d) { return d; })
            .enter().append("rect")
            .attr("x", function(d) { 
                // console.log(d.data.year);
                return xScale(d.data.year); })
            .attr("y", function(d) { return yScale(d[1]); })
            .attr("height", function(d) { return yScale(d[0]) - (yScale(d[1])); })
            .attr("width", 10);

    const legend = d3.legendColor()
    .labelFormat(d3.format(".0f"))
    .scale(colorScale)
    .title("Type Of Disaster")
    .orient("vertical")
    .shape("rect")
    .shapePadding(10)
    .labelOffset(8)
    .labels(keys);

    svg.append("g")
    .attr("class", "legend")
    .attr("transform", "translate(" + (padding+ 50 ) + ",50)")
    .call(legend);
        // .join('rect')
        // .attr('width', 40)
        // .attr('y', (d) => yScale(d[1]))
        // .attr('x', (d) => {console.log("object");
        //     console.log(d);
        //     xScale(d.data.year)})
        // .attr('height', (d) => yScale(d[0]) -  yScale(d[1]));
    // .join("path")
    // .attr("d", areaGen)
    // .attr("fill", (d) => colorScale(d.key));
    


})