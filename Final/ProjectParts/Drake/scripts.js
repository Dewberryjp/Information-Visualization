mapData = new Map()
d3.json('ProjectParts/Drake/finallinedata.json')
    .then(d => {

        Object.entries(d).forEach(([key, e]) => {
            mapData.set(key, [])
            Object.entries(e).forEach(([key2, e2]) => {
                if (key2 == "id") return;
                if (!('co2' in e2)) {
                    e2.co2 = 0
                }
                if (!('total' in e2)) {
                    e2.total = 0
                }
                mapData.get(key).push({
                    year: key2,
                    co2: e2.co2,
                    total: e2.total
                })


            })

        })
        console.log(mapData);

        var svg = d3.select("svg"),
            margin = 200,
            width = svg.attr("width") - margin,
            height = svg.attr("height") - margin
        var dataset = mapData.get('ALB')
        svg = svg.append('g')

        function update(country) {
            var dataset = mapData.get(country)
            maxdis = 0;
            maxco2 = 0;
            svg.remove()
            svg = d3.select('svg').append('g')
            dataset.forEach(element => {
                console.log(element.year, element.co2, element.total)
                if (maxdis <= element.total) {
                    maxdis = element.total;
                }
                if (maxco2 <= element.co2) {
                    maxco2 = element.co2;
                }

            })
            disyScale = d3.scaleLinear()
                .domain([0, maxdis])
                .range([height, 0]);
            co2yScale = d3.scaleLinear()
                .domain([0, maxco2])
                .range([height, 0]);

            var g = svg.append('g')
                .attr("transform", "translate(" + 100 + "," + 100 + ")");

            console.log(mapData.keys())
            d3.select('select')
                .selectAll('option')
                .data(mapData.keys())
                .enter()
                .append("option")
                .text(d => d)
                .attr("value", function(d) {
                    console.log(d)
                    return d;
                })
            d3.select('#dropdown').on('input', function() {
                console.log(this.value)
                update(this.value)
            })
            //Title Text
            svg.append('text')
                .attr('x', width / 2 + 100)
                .attr('y', 50)
                .attr('text-anchor', 'middle')
                .style('font-family', 'sans-serif')
                .style('font-size', 20)
                .text('Tons of CO2 vs. Amount of Natural Disasters by Year')
            //xAxis Label
            svg.append('text')
                .attr('x', width / 2 + 100)
                .attr('y', height - 15 + 150)
                .attr('text-anchor', 'middle')
                .style('font-family', 'sans-serif')
                .style('font-size', 14)
                .text('Years')
                
            //yAxis Label
            svg.append('text')
                .attr('text-anchor', 'middle')
                .attr('transform', 'translate(60,' + height / 1.5 + ')rotate(-90)')
                .style('font-family', 'sans-serif')
                .style('font-size', 14)
                .text('Amount of Disasters')
            //Adds 2nd yAxis label
            svg.append('text')
                .attr('text-anchor', 'middle')
                .attr('transform', 'translate(950,' + height / 1.5 + ')rotate(-270)')
                .style('font-family', 'sans-serif')
                .style('font-size', 14)
                .text('Tons of CO2 Emitted')

            //Adds Axis's
            g.append('g')
                .attr('transform', 'translate (0,' + height + ')')
                .call(d3.axisBottom(xScale))
                
            g.append('g')
                .call(d3.axisLeft(disyScale));
            g.append('g')
                .attr('transform', 'translate(800,' + 0 + ')')
                .call(d3.axisRight(co2yScale));

            //adding circles for given data
            svg.append('g').selectAll("dot")
                .data(dataset)
                .enter()
                .append('circle')
                .attr('cx', function(d) {
                    return xScale(d.year);
                })
                .attr('cy', function(d) {
                    return disyScale(d.total);
                })
                .style('fill', "red")
                .attr('r', 3)
                .attr('transform', "translate (" + 100 + "," + 100 + ")");
            //Connects circles
            var line = d3.line()
                .x(function(d) {
                    return xScale(d.year);
                })
                .y(function(d) {
                    return disyScale(d.total);
                })
                .curve(d3.curveMonotoneX)
            svg.append('path')
                .datum(dataset)
                .attr('class', 'line')
                .attr('transform', 'translate(' + 100 + ',' + 100 + ")")
                .attr('d', line)
                .style("fill", "none")
                .style('stroke', 'red')
                .style('stroke-width', '2');


            svg.append('g').selectAll("dot")
                .data(dataset)
                .enter()
                .append('circle')
                .attr('cx', function(d) {
                    return xScale(d.year);
                })
                .attr('cy', function(d) {
                    return co2yScale(d.co2);
                })
                .style('fill', "blue")
                .attr('r', 3)
                .attr('transform', "translate (" + 100 + "," + 100 + ")");
            //Connects circles
            var line = d3.line()
                .x(function(d) {
                    return xScale(d.year);
                })
                .y(function(d) {
                    return co2yScale(d.co2);
                })
                .curve(d3.curveMonotoneX)
            svg.append('path')
                .datum(dataset)
                .attr('class', 'line')
                .attr('transform', 'translate(' + 100 + ',' + 100 + ")")
                .attr('d', line)
                .style("fill", "none")
                .style('stroke', 'blue')
                .style('stroke-width', '2');
        }



        function printData(dataset) {
            dataset.forEach(element => {
                console.log(element.year, element.co2, element.total)
            })
        }
        printData(dataset)


        var xScale = d3.scaleLinear()
            .domain([1960, 2020])
            .range([0, width]),
            maxdis = 0;
        maxco2 = 0;
        dataset.forEach(element => {
            console.log(element.year, element.co2, element.total)
            if (maxdis <= element.total) {
                maxdis = element.total;
            }
            if (maxco2 <= element.co2) {
                maxco2 = element.co2;
            }

        })
        disyScale = d3.scaleLinear()
            .domain([0, maxdis])
            .range([height, 0]);
        co2yScale = d3.scaleLinear()
            .domain([0, maxco2])
            .range([height, 0]);
        var g = svg.append('g')
            .attr("transform", "translate(" + 100 + "," + 100 + ")");
        console.log(mapData.keys())
        d3.select('select')
            .selectAll('option')
            .data(mapData.keys())
            .enter()
            .append("option")
            .text(d => d)
            .attr("value", function(d) {
                console.log(d)
                return d;
            })
        d3.select('#dropdown').on('input', function() {
            console.log(this.value)
            update(this.value)
        })
        //Title Text
        svg.append('text')
            .attr('x', width / 2 + 100)
            .attr('y', 50)
            .attr('text-anchor', 'middle')
            .style('font-family', 'sans-serif')
            .style('font-size', 20)
            .text('Tons of CO2 vs. Amount of Natural Disasters by Year')
        //xAxis Label
        svg.append('text')
            .attr('x', width / 2 + 100)
            .attr('y', height - 15 + 150)
            .attr('text-anchor', 'middle')
            .style('font-family', 'sans-serif')
            .style('font-size', 14)
            .text('Years')
        //yAxis Label
        svg.append('text')
            .attr('text-anchor', 'middle')
            .attr('transform', 'translate(60,' + height / 1.5 + ')rotate(-90)')
            .style('font-family', 'sans-serif')
            .style('font-size', 14)
            .text('Amount of Disasters')
        //Adds 2nd yAxis label
        svg.append('text')
            .attr('text-anchor', 'middle')
            .attr('transform', 'translate(950,' + height / 1.5 + ')rotate(-270)')
            .style('font-family', 'sans-serif')
            .style('font-size', 14)
            .text('Tons of CO2 Emitted')

        //Adds Axis's
        g.append('g')
            .attr('transform', 'translate (0,' + height + ')')
            .call(d3.axisBottom(xScale));
        g.append('g')
            .call(d3.axisLeft(disyScale));
        g.append('g')
            .attr('transform', 'translate(800,' + 0 + ')')
            .call(d3.axisRight(co2yScale));

        //adding circles for given data
        svg.append('g').selectAll("dot")
            .data(dataset)
            .enter()
            .append('circle')
            .attr('cx', function(d) {
                return xScale(d.year);
            })
            .attr('cy', function(d) {
                return disyScale(d.total);
            })
            .style('fill', "red")
            .attr('r', 3)
            .attr('transform', "translate (" + 100 + "," + 100 + ")");
        //Connects circles
        var line = d3.line()
            .x(function(d) {
                return xScale(d.year);
            })
            .y(function(d) {
                return disyScale(d.total);
            })
            .curve(d3.curveMonotoneX)
        svg.append('path')
            .datum(dataset)
            .attr('class', 'line')
            .attr('transform', 'translate(' + 100 + ',' + 100 + ")")
            .attr('d', line)
            .style("fill", "none")
            .style('stroke', 'red')
            .style('stroke-width', '2');


        svg.append('g').selectAll("dot")
            .data(dataset)
            .enter()
            .append('circle')
            .attr('cx', function(d) {
                return xScale(d.year);
            })
            .attr('cy', function(d) {
                return co2yScale(d.co2);
            })
            .style('fill', "blue")
            .attr('r', 3)
            .attr('transform', "translate (" + 100 + "," + 100 + ")");
        //Connects circles
        var line = d3.line()
            .x(function(d) {
                return xScale(d.year);
            })
            .y(function(d) {
                return co2yScale(d.co2);
            })
            .curve(d3.curveMonotoneX)

        svg.append('path')
            .datum(dataset)
            .attr('class', 'line')
            .attr('transform', 'translate(' + 100 + ',' + 100 + ")")
            .attr('d', line)
            .style("fill", "none")
            .style('stroke', 'blue')
            .style('stroke-width', '2');

        d3.select('svg')
            .append("rect")
            .attr("x", width * .25).attr("y", 750).attr("height", 20).attr("width", 20).style("fill", "red")
        d3.select('svg')
            .append("rect")
            .attr("x", width * .25).attr("y", 775).attr("height", 20).attr("width", 20).style("fill", "blue");
        d3.select('svg')
            .append("text")
            .attr("x", width * .25 + 25)
            .attr("y", 765)
            .text("Natural Disasters")
        d3.select('svg')
            .append("text")
            .attr("x", width * .25 + 25)
            .attr("y", 790)
            .text("CO2")
    })