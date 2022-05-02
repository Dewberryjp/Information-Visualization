const svg = d3.select('svg');

// Show circle with initial radius of 60px
const circle = svg.append('circle')
    .attr('cx', 100)
    .attr('cy', 100) 
    .attr('fill', 'none')   
    .attr('stroke', 'blue') 
    .attr('r', 60);

function update(radius) {
  circle.attr('r', radius);
}

// Event slider for input slider
d3.select('#radius-slider').on('input', function() {
  // Update visualization
  update(parseInt(this.value));

  // Update label
  d3.select('#radius-value').text(this.value);
});
d3.select('#tooltip')
.on('mouseover', (event,d) => {
  d3.select('#tooltip')
    .style('display', 'block')
    // Format number with million and thousand separator
    .html(`<div class="tooltip-label">Population</div>${d3.format(',')(d.population)}`);
})
.on('mousemove', (event) => {
  d3.select('#tooltip')
    .style('left', (event.pageX + vis.config.tooltipPadding) + 'px')
    .style('top', (event.pageY + vis.config.tooltipPadding) + 'px')
})
.on('mouseleave', () => {
  d3.select('#tooltip').style('display', 'none');
});