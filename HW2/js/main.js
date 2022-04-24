const quarterlyReport = [
	{ month: 'May', sales: 6900 },
	{ month: 'June', sales: 14240 },
	{ month: 'July', sales: 25000 },
	{ month: 'August', sales: 17500 }
];

let barchart = new BarChart({
	'parentElement': '#barchart'
}, quarterlyReport);

barchart.updateVis()