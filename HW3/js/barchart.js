class barchart {

    constructor(_config,_data,_xVal) {
      this.config = {
        parentElement: _config.parentElement,
        containerWidth: _config.containerWidth || 500,
        containerHeight: _config.containerHeight || 200,
        margin: { top: 10, bottom: 30, right: 80, left: 40 },
        xAxisVal: _config.xAxisVal,
        yAxisVal: _config.yAxisVal
      }
      this.data = _data
      // Call a class function
      this.initVis();
    }
  
    initVis() {
        let vis = this;
        // console.log(vis._xVal);
        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

        vis.svg = d3.select(vis.config.parentElement)
        .attr('width', vis.config.containerWidth)
        .attr('height', vis.config.containerHeight);

        vis.chart = vis.svg.append('g')
            .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`); 
        
        vis.xScale = d3.scaleLinear()
        .domain([0, d3.max(vis.data, vis.config.xAxisVal)])
        .range([0, vis.width]);
      
        vis.yScale = d3.scaleBand()
            .domain(vis.data.map(vis.config.yAxisVal))
            .range([0, vis.height])
            .paddingInner(0.1);

        vis.xAxis = d3.axisBottom(vis.xScale)
            .ticks(10)
            .tickSizeOuter(0);
    
        vis.yAxis = d3.axisLeft(vis.yScale)
            .tickSizeOuter(0);
        // Append empty x-axis group and move it to the bottom of the chart
        vis.xAxisG = vis.chart.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate(0,${vis.height})`);

    // Append y-axis group 
        vis.yAxisG = vis.chart.append('g')
            .attr('class', 'axis y-axis');

    }
    updateVis() {
        let vis = this;
        // Sales for x axis
        
        vis.xScale.domain([0, d3.max(vis.data, vis.config.xAxisVal)]);
        // Month for y axis
        vis.yScale.domain(vis.data.map(vis.config.yAxisVal));

        vis.renderVis();
    }

    renderVis() {
        let vis = this;
        // console.log(vis.config.xAxisVal);
        // Add rectanglesW
        console.log(vis.data);
        let bars = vis.chart.selectAll('.bar').data(vis.data)

        let barEnter = bars.enter()
        .append('rect')
            .attr('class', 'bar')
            .attr('x', 0);

        barEnter.merge(bars).transition()
        .duration(500)
            .attr('width', d => vis.xScale(vis.config.xAxisVal(d)))
            .attr('height', vis.yScale.bandwidth()).transition()
            .duration(500)
            .attr('y', d => vis.yScale(vis.config.yAxisVal(d)))
            
        bars.exit().remove();

        vis.xAxisG.call(vis.xAxis);
        vis.yAxisG.call(vis.yAxis);
    }
}