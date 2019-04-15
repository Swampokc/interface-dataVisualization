google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);

var popul = [];
var workMasPop = new Map();
var regions = [];
var koef;

function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Region');
    data.addColumn('number', 'Population');
    workMasPop.forEach(function (value, region, workMasPop) {
       data.addRow([region, value]);
    });

    var options = {
        chartArea:{left:20,top:20,width:'100%',height:'100%'},
        legend: 'none',
        pieSliceText: 'label',
        width: 600,
        height: 600,
        pieHole: 0.5
    };

    var chart = new google.visualization.PieChart(document.getElementById('population-donut-chart'));
    chart.draw(data, options);
}

$(document).ready(function() {
    var ch1 = document.getElementById("pop");
    var pop = ch1.value;
    var arr = pop.split(',');
    for (var i = 0; i < 88; i++) {
        arr[i] = arr[i].replace('[','');
        arr[i] = arr[i].replace(']','');
        popul[i] = Number(arr[i]);
    }

    koef = 0;

    regions[0] = 'New South Wales';
    regions[1] = 'Victoria';
    regions[2] = 'Queensland';
    regions[3] = 'South Australia';
    regions[4] = 'Western Australia';
    regions[5] = 'Tasmania';
    regions[6] = 'Northern Territory';
    regions[7] = 'Australian Capital Territory';

    workMasPop = new Map();

    for (i = 0; i < 8; i++) {
        workMasPop.set(regions[i], Number(popul[11 * i]));
    }

    drawChart();
});

$( "#selectYearPop" ).change(function () {
    workMasPop = new Map();

    year = Number(this.value);
    var modYear = year % 1000;
    if (modYear === 999)
        koef = 0;
    else
        koef = modYear + 1;

    for (i = 0; i < 8; i++)
        if (document.getElementById("check" + i).checked)
            workMasPop.set(regions[i], Number(popul[11 * i + koef]));

    drawChart();
});

$( ".chech_page1" ).change(function() {
    workMasPop = new Map();

    for (i = 0; i < 8; i++)
        if (document.getElementById("check" + i).checked)
            workMasPop.set(regions[i], Number(popul[11 * i + koef]));

    drawChart();
});
