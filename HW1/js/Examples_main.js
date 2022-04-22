
d3.select("body")
    .append("p")
    .text("Hello World!");

const provinces = ['AB', 'BC', 'MB', 'NB', 'NL', 'NT', 'NS', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'];

const p = d3.select('body').selectAll('p')
    .data(provinces)
    .enter()
    .append('p')
    .text((province, i) => province + " " + i)
    .attr('class', 'custom-paragraph')
    .style('font-weight', 'bold')
    .style('color', d => {
      if(d == 'BC')
        return 'blue';
      else
        return 'red';
    });

const numericData = [1, 2, 4, 8, 16];

// Add <svg> element (drawing space)
const svg = d3.select('body').append('svg')
    .attr('width', 300)
    .attr('height', 50);

// Add rectangle
svg.selectAll('rect')
    .data(numericData)
    .enter()
  .append('rect')
    .attr('fill', 'red')
    .attr('width', 50)
    .attr('height', 50)
    .attr('y', 0)
    .attr('x', (d, index) => index * 60);