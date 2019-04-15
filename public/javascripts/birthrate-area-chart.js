google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawAreaChart);

var headMas = [];
var valueMas = [[]];
var workMas = [];
var yearIndex = [];
var regionIndex = [];
var yearBegin;
var yearEnd;

function drawAreaChart() {
    var data = google.visualization.arrayToDataTable(workMas);

    var options = {
        chartArea:{left:20, top:20, width:'80%', height:'80%'},
        // hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
        vAxis: {minValue: 0},
        width: 1200,
        height: 500,
    };

    var chart = new google.visualization.AreaChart(document.getElementById('birthrate-area-chart'));

    chart.draw(data, options);
}

$(document).ready(function() {
    workMas = [];
    valueMas = [];

    yearBegin = 1999;
    yearEnd = 2009;

    document.getElementById("selectYearTo").options[9].selected = true;
    document.getElementById("selectYearTo").text = yearEnd;

    headMas = ['Year', 'New South Wales', 'Victoria', 'Queensland', 'South Australia',
         'Western Australia', 'Tasmania', 'Northern Territory', 'Australian Capital Territory'];

    valueMas[0] = ['1999', 86784, 58875, 46503, 17958, 24849, 6032, 3576, 4253];
    valueMas[1] = ['2000', 86752, 59171, 47278, 17859, 25093, 5692, 3685, 4065];
    valueMas[2] = ['2001', 84578, 58626, 47678, 17281, 24002, 6430, 3822, 3938];
    valueMas[3] = ['2002', 86583, 61478, 47771, 17665, 23601, 6003, 3724, 4112];
    valueMas[4] = ['2003', 86344, 61058, 48342, 17443, 24273, 5752, 3790, 4128];
    valueMas[5] = ['2004', 85894, 62417, 49940, 17140, 25295, 5809, 3551, 4174];
    valueMas[6] = ['2005', 86589, 63287, 51661, 17800, 26253, 6308, 3659, 4206];
    valueMas[7] = ['2006', 87336, 65236, 52665, 18260, 27776, 6475, 3696, 4479];
    valueMas[8] = ['2007', 89495, 70313, 61249, 19662, 29164, 6662, 3894, 4753];
    valueMas[9] = ['2008', 94684, 71175, 63132, 20229, 31850, 6775, 3942, 4804];
    valueMas[10] = ['2009', 92783, 70920, 66097, 19734, 30878, 6626, 3819, 4858];

    workMas[0] = headMas;
    workMas[1] = valueMas[0];
    workMas[2] = valueMas[1];
    workMas[3] = valueMas[2];
    workMas[4] = valueMas[3];
    workMas[5] = valueMas[4];
    workMas[6] = valueMas[5];
    workMas[7] = valueMas[6];
    workMas[8] = valueMas[7];
    workMas[9] = valueMas[8];
    workMas[10] = valueMas[9];
    workMas[11] = valueMas[10];

    for (var i = 0; i < 11; i++)
        yearIndex[i] = i;

    for (i = 0; i < 8; i++)
        regionIndex[i] = i;
});

$( "#selectYearFrom" ).change(function () {
    workMas = [];
    workMas[0] = headMas;
    yearIndex = [];

    var indexFrom = this.options.selectedIndex;
    var indexTo = document.getElementById("selectYearTo").options.selectedIndex;

    yearBegin = Number(this.value);
    yearEnd = Number(document.getElementById("selectYearTo").value);


    if (indexTo <= indexFrom) {
        document.getElementById("selectYearTo").options[indexFrom].selected = true;
        document.getElementById("selectYearTo").text = yearBegin - 1;
        yearEnd = yearBegin + 1;
    }

    var bIndex;
    if (yearBegin === 1999)
        bIndex = 0;
    else
        bIndex = yearBegin % 1000 + 1;

    for (var i = 0; i <= yearEnd - yearBegin; i++) {
        yearIndex[i] = bIndex + i;
    }
    workMas[0] = [];
    workMas[0][0] = headMas[0];

    // Добавляем заголовки
    for (i = 0; i < regionIndex.length; i++) {
        workMas[0][i + 1] = regions[regionIndex[i]];
    }

    // Добавляем строки
    for (i = 1; i <= yearIndex.length; i++) {
        workMas[i] = [];
        workMas[i][0] = valueMas[yearIndex[i - 1]][0];
        for (j = 1; j <= regionIndex.length; j++) {
            workMas[i][j] = valueMas[i - 1][j];
        }
    }
    drawAreaChart()
});

$( "#selectYearTo" ).change(function () {
    workMas = [];
    workMas[0] = headMas;
    yearIndex = [];

    var indexFrom = document.getElementById("selectYearFrom").options.selectedIndex;
    var indexTo = this.options.selectedIndex;

    yearBegin = Number(document.getElementById("selectYearFrom").value);
    yearEnd = Number(this.value);

    if (indexTo  <= indexFrom) {
        document.getElementById("selectYearFrom").options[indexTo].selected = true;
        document.getElementById("selectYearFrom").text = yearEnd - 1;
        yearBegin = yearEnd - 1;
    }

    var bIndex;
    if (yearBegin === 1999)
        bIndex = 0;
    else
        bIndex = yearBegin % 1000 + 1;

    for (var i = 0; i <= yearEnd - yearBegin; i++) {
        yearIndex[i] = bIndex + i;
    }
    workMas[0] = [];
    workMas[0][0] = headMas[0];

    // Добавляем заголовки
    for (i = 0; i < regionIndex.length; i++) {
        workMas[0][i + 1] = regions[regionIndex[i]];
    }

    // Добавляем строки
    for (i = 1; i <= yearIndex.length; i++) {
        workMas[i] = [];
        workMas[i][0] = valueMas[yearIndex[i - 1]][0];
        for (j = 1; j <= regionIndex.length; j++) {
            workMas[i][j] = valueMas[i - 1][j];
        }
    }

    drawAreaChart()
});

$( ".chech_page2" ).change(function() {
    workMas = [];
    regionIndex = [];

    var j = 0;
    for (var i = 1; i < 9; i++) {
        if (document.getElementById("check-area" + i).checked) {
            regionIndex[j] = i - 1;
            j++;
        }
    }

    workMas[0] = [];
    workMas[0][0] = headMas[0];

    // Добавляем заголовки
    for (i = 0; i < regionIndex.length; i++) {
        workMas[0][i + 1] = regions[regionIndex[i]];
    }

    // Добавляем строки
    for (i = 1; i <= yearIndex.length; i++) {
        workMas[i] = [];
        workMas[i][0] = valueMas[yearIndex[i - 1]][0];
        for (j = 1; j <= regionIndex.length; j++) {
            workMas[i][j] = valueMas[i - 1][j];
        }
    }

    drawAreaChart()
});