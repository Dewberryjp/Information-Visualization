/**
 * Load data from CSV file asynchronously and render chart
 */
 d3.csv('all_drinking.csv').then(data => {

	// Generate filters from input elements on index.html
    data.map(d => d.percent = +d.percent)
	const getFilters = () => {
		let s = {
			"sex": "female",
			"type": "any",
		};
		$('.btn-group .active input').each(function (d, i) {
			$(this).hasClass('sex') ? s.sex = $(this).attr('value') : s.type = $(this).attr('value')
		});

		return s;
	};
	// Actually filter the data
	const filterData = (data) => {
		let filters = getFilters();
        // console.log(filters);
        data.sort((a, b) => {
            //added sorting of the data by percent b/c i like it this way
            return b.percent-a.percent;
        });
		return data.filter((d) => d.sex == filters.sex &&
			d.type == filters.type);
	}
    const yAxis = d => d.state;
    const xAxis = d => d.percent;
	// Do any tranformations of the data
	// Create a new bar chart instance and pass the filtered data to the bar chart class
    d3.select("#vis").append('svg')
    let chart = new barchart({
        parentElement: "svg",
        containerWidth: 1200,
        containerHeight: 800,
        xAxisVal: xAxis,
        yAxisVal: yAxis
    }, filterData(data));
	// Show chart by calling updateVis

    chart.updateVis();
    // console.log(data);
	// Update the data passed to the chart whenever you interact with a button
	$('input').change(() => {
        // console.log(data);
		chart.data = filterData(data);
        // console.log(chart.data);
		chart.updateVis();
	});
    
})
// .catch(error => console.error(error));