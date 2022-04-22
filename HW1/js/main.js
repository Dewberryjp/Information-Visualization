// Activity 1
const sandwiches = [
    { name: "Thesis", price: 7.95, size: "large" },
    { name: "Dissertation", price: 8.95, size: "large" },
    { name: "Highlander", price: 6.50, size: "small" },
    { name: "Just Tuna", price: 6.50, size: "small" },
    { name: "So-La", price: 7.95, size: "large" },
    { name: "Special", price: 12.50, size: "small" }
];

const svg = d3.select('body')
    .append('svg')
    .attr('width', 500)
    .attr('height', 100);
    //lowered to make exercise 2 fit on the same page 

svg.selectAll('circle')
    .data(sandwiches)
    .enter()
.append('circle')
    .attr('r',(d) => {
        if(d.size === 'large'){
            return 30
        } else {
            return 15
        }
    })
    .attr('cx', (d,i) => 50+i*80)
    .attr('cy', 50)
    .attr('stroke', 'black')
    .attr('stroke-width', 4)
    .attr('fill', d => {
        if(d.price < 7.00)
          return 'blue';
        else
          return 'red';
      })
// Activity 2
y_padding = 15
d3.csv('cities_and_population.csv')
  .then(data => {
    data = data.map(d => {
        d.population = +d.population
        d.x = +d.x
        d.y = +d.y
        return d
    });
    data = data.filter(d => d.eu == "true")
    d3.select("body")
        .append("p")
        .text("The number of EU countries: " + data.length);
    const svg = d3.select('body')
        .append('svg')
        .attr('width', 700)
        .attr('height', 550);
    svg.selectAll('circle')
        .data(data)
        .enter()
      .append('circle')
        .attr('fill','red')
        .attr('cx',d => d.x)
        .attr('cy',d => d.y)
        .attr('fill','tan')
        .attr('r', d =>{
            if (d.population < 1000000) 
                return 4 
            return 8
        });
    
    svg.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('x',d => d.x)
        .attr('y',d => d.y - y_padding)
        .attr('class','city-label')
        .attr('opacity',d => {
            if (d.population < 1000000) 
                return 0
            return 100    
        })
        .attr('fill','black')
        .text(d => d.city)
  })
  .catch(error => {
    console.error('Error loading the data: '+ error);
  });


