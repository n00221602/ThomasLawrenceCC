//Global variables
let barCharts = [];
let data;
let cleanData = [];
let numRows;

let fontLight;
let fontRegular;
let fontBold;


//Preloads the data file
function preload() {
    data = loadTable("data/ApartmentRent.csv", "csv", "header");
    fontLight = loadFont("fonts/Roboto-Thin.ttf");
    fontRegular = loadFont("fonts/Roboto-Regular.ttf");
    fontBold = loadFont("fonts/Roboto-Bold.ttf");

}

function setup() {
    //Creates the canvas, and changes the angle mode to use degrees
    background(0)
    createCanvas(2000, 4000)
    angleMode(DEGREES);


    //(numRows = 11)
    numRows = data.rows.length;

    //This loop pushes the row objects into the cleanData array
    for (let i = 0; i < numRows; i++) {
        cleanData.push(data.rows[i].obj)
    }

    //Creates an object including the variables in the BarChart class (BarChart.js)

    //Bar Chart
    let barChart01 = {
        data: cleanData,
        chartWidth: 750,
        chartHeight: 600,
        xPos: 110,
        yPos: 750,

        axisLineColour: "#d9d9d9",
        barColour: "#eb7734",
        barTextColour: "#ffffff",
        xLabelColour: "#f3ff4f",
        yLabelColour: "#f3ff4f",

        barWidth: 40,
        barTextSize: 14,
        barText: true,
        xValue: "Year",
        yValue: "One Bed",
        labelRotation: 45,
        axisTextSize: 18,
        xLabelPadding: -12,
        yLabelPadding: 30,
        numTicks: 9,
        rounding: false,
        decimal: 0,
        tickPadding: -10,

        chartLabel: "One Bed Apartment Monthly Prices 2008-2022",
        xChartLabel: "Year",
        yChartLabel: "Total (in Euros)",
        xChartLabelPadding: 35,
        yChartLabelPadding: 50,
        chartLabelPadding: 15,
        chartLabelSize: 30,
        chartLabelColour: "#ffffff",
        chartStroke: true,
        chartStrokeColour: "#eb7734",
        chartStrokeWeight: 3,

        barStroke: false,
        barStrokeColour: "#ffffff",
        barStrokeWeight: 2,
        barTextStroke: false,
        barTextStrokeColour: "#e74434",
        barTextStrokeWeight: 1,
        barTextPadding: 2,

    }

    //Bar Chart
    let barChart02 = {
        data: cleanData,
        chartWidth: 750,
        chartHeight: 600,
        xPos: 1100,
        yPos: 750,

        axisLineColour: "#d9d9d9",
        barColour: "#47a4f5",
        barTextColour: "#ffffff",
        xLabelColour: "#f3ff4f",
        yLabelColour: "#f3ff4f",

        barWidth: 40,
        barTextSize: 14,
        barText: false,
        xValue: "Year",
        yValue: "Three Bed",
        labelRotation: 45,
        axisTextSize: 18,
        xLabelPadding: -12,
        yLabelPadding: 30,
        numTicks: 9,
        rounding: false,
        decimal: 0,
        tickPadding: -10,

        chartLabel: "Three Bed Apartment Monthly Prices 2008-2022",
        xChartLabel: "Year",
        yChartLabel: "Total (in Euros)",
        xChartLabelPadding: 35,
        yChartLabelPadding: 60,
        chartLabelPadding: 15,
        chartLabelSize: 30,
        chartLabelColour: "#ffffff",
        chartStroke: false,
        chartStrokeColour: "#eb7734",
        chartStrokeWeight: 1,

        barStroke: true,
        barStrokeColour: "#ffffff",
        barStrokeWeight: 3,
        barTextStroke: false,
        barTextStrokeColour: "#e74434",
        barTextStrokeWeight: 1,
        barTextPadding: 2,

    }

    //Horizontal bar Chart
    let barChart03 = {
        data: cleanData,
        chartWidth: 750,
        chartHeight: 750,
        xPos: 110,
        yPos: 1050,

        axisLineColour: "#d9d9d9",
        barColour: "#31bd36",
        barTextColour: "#ffffff",
        xLabelColour: "#f3ff4f",
        yLabelColour: "#f3ff4f",

        barWidth: 40,
        barTextSize: 16,
        barText: true,
        xValue: "Year",
        yValue: "Two Bed",
        labelRotation: 0,
        axisTextSize: 18,
        xLabelPadding: -8,
        yLabelPadding: -22,
        numTicks: 9,
        rounding: false,
        decimal: 0,
        tickPadding: -10,

        chartLabel: "Two Bed Apartment Monthly Prices 2008-2022",
        xChartLabel: "Year",
        yChartLabel: "Total (in Euros)",
        xChartLabelPadding: 55,
        yChartLabelPadding: 55,
        chartLabelPadding: 50,
        chartLabelSize: 30,
        chartLabelColour: "#ffffff",
        chartStroke: false,
        chartStrokeColour: "#eb7734",
        chartStrokeWeight: 1,

        barStroke: false,
        barStrokeColour: "#ffffff",
        barStrokeWeight: 2,
        barTextStroke: false,
        barTextStrokeColour: "#e74434",
        barTextStrokeWeight: 1,
        barTextPadding: 5,

    }

    //Horizontal Stacked Bar Chart
    let barChart04 = {
        data: cleanData,
        chartWidth: 750,
        chartHeight: 750,
        xPos: 1100,
        yPos: 1050,

        axisLineColour: "#d9d9d9",
        barColours: ["#eb7734", "#31bd36", "#47a4f5"],
        barTextColour: "#ffffff",
        xLabelColour: "#f3ff4f",
        yLabelColour: "#f3ff4f",

        barWidth: 50,
        barTextSize: 20,
        barText: true,
        xValue: "Year",
        yValues: ["One Bed", "Two Bed"],
        labelRotation: 0,
        axisTextSize: 18,
        xLabelPadding: 10,
        yLabelPadding: 20,
        numTicks: 6,
        rounding: false,
        decimal: 0,
        tickPadding: -5,
        totalValue: "Total",
        legendSize: 30,
        legendPadding: 10,

        chartLabel: "Dublin Apartment prices (2008 - 2022)",
        xChartLabel: "Year",
        yChartLabel: "Total (in Euros)",
        chartLabelPadding: 60,
        xChartLabelPadding: 70,
        yChartLabelPadding: 50,
        chartLabelSize: 30,
        chartLabelColour: "#ffffff",
        chartStroke: false,
        chartStrokeColour: "#eb7734",
        chartStrokeWeight: 1,

        barStroke: true,
        barStrokeColour: "#ffffff",
        barStrokeWeight: 2,
        barTextStroke: false,
        barTextStrokeColour: "#e74434",
        barTextStrokeWeight: 1,
        barTextPadding: -0,

    }

    //Plot Chart
    let barChart05 = {
        data: cleanData,
        chartWidth: 750,
        chartHeight: 600,
        xPos: 110,
        yPos: 2700,

        axisLineColour: "#d9d9d9",
        barColour: "#eb7734",
        barTextColour: "#ffffff",
        xLabelColour: "#f3ff4f",
        yLabelColour: "#f3ff4f",

        barWidth: 40,
        plotSize: 15,
        barTextSize: 14,
        barText: true,
        xValue: "Year",
        yValue: "Three Bed",
        labelRotation: 45,
        axisTextSize: 18,
        xLabelPadding: -12,
        yLabelPadding: 30,
        numTicks: 9,
        rounding: false,
        decimal: 0,
        tickPadding: -10,

        chartLabel: "One Bed Apartment Monthly Prices 2008-2022",
        xChartLabel: "Year",
        yChartLabel: "Total (in Euros)",
        xChartLabelPadding: 35,
        yChartLabelPadding: 50,
        chartLabelPadding: 15,
        chartLabelSize: 30,
        chartLabelColour: "#ffffff",
        chartStroke: false,
        chartStrokeColour: "#eb7734",
        chartStrokeWeight: 1,

        barStroke: false,
        barStrokeColour: "#ffffff",
        barStrokeWeight: 2,
        barTextStroke: false,
        barTextStrokeColour: "#e74434",
        barTextStrokeWeight: 1,
        barTextPadding: 10,

    }

    //Stacked Bar Chart
    let barChart06 = {
        data: cleanData,
        chartWidth: 750,
        chartHeight: 600,
        xPos: 1100,
        yPos: 2700,

        axisLineColour: "#d9d9d9",
        barColours: ["#eb7734", "#31bd36", "#47a4f5"],
        barTextColour: "#ffffff",
        xLabelColour: "#f3ff4f",
        yLabelColour: "#f3ff4f",
        averageLineColour:"#ff0000",

        barWidth: 40,
        barTextSize: 12,
        barText: true,
        xValue: "Year",
        yValues: ["One Bed", "Two Bed", "Three Bed"],
        labelRotation: 45,
        axisTextSize: 18,
        xLabelPadding: -12,
        yLabelPadding: 30,
        numTicks: 6,
        rounding: false,
        decimal: 0,
        tickPadding: -5,
        totalValue: "Total",
        legendSize: 30,
        legendPadding: 40,
        averageLine: true,

        chartLabel: "Dublin Apartment prices (2008 - 2022)",
        xChartLabel: "Year",
        yChartLabel: "Total (in Euros)",
        chartLabelPadding: 15,
        xChartLabelPadding: 35,
        yChartLabelPadding: 50,
        chartLabelSize: 30,
        chartLabelColour: "#ffffff",
        chartStroke: false,
        chartStrokeColour: "#eb7734",
        chartStrokeWeight: 1,

        barStroke: true,
        barStrokeColour: "#ffffff",
        barStrokeWeight: 2,
        barTextStroke: false,
        barTextStrokeColour: "#e74434",
        barTextStrokeWeight: 1,
        barTextPadding: 0,

    }

    //Expanded Stacked Bar Chart
    let barChart07 = {
        data: cleanData,
        chartWidth: 1750,
        chartHeight: 600,
        xPos: 110,
        yPos: 3700,

        axisLineColour: "#d9d9d9",
        barColours: ["#eb7734", "#31bd36", "#47a4f5"],
        barTextColour: "#ffffff",
        xLabelColour: "#f3ff4f",
        yLabelColour: "#f3ff4f",

        barWidth: 30,
        barTextSize: 12,
        barText: false,
        xValue: "Year",
        yValues: ["One Bed", "Two Bed", "Three Bed"],
        labelRotation: 45,
        axisTextSize: 18,
        xLabelPadding: -12,
        yLabelPadding: 30,
        numTicks: 9,
        rounding: false,
        decimal: 0,
        tickPadding: -5,
        totalValue: "Total",
        legendSize: 30,
        legendPadding: 40,

        chartLabel: "Dublin Apartment prices (2008 - 2022)",
        xChartLabel: "Year",
        yChartLabel: "Total (in Euros)",
        chartLabelPadding: 15,
        xChartLabelPadding: 35,
        yChartLabelPadding: 50,
        chartLabelSize: 30,
        chartLabelColour: "#ffffff",
        chartStroke: false,
        chartStrokeColour: "#eb7734",
        chartStrokeWeight: 1,

        barStroke: true,
        barStrokeColour: "#ffffff",
        barStrokeWeight: 2,
        barTextStroke: false,
        barTextStrokeColour: "#e74434",
        barTextStrokeWeight: 1,
        barTextPadding: 10,

    };






    //A new BarChart is created using the barchart01 variable
    barCharts.push(new BarChart(barChart01));
    barCharts.push(new BarChart(barChart02));
    barCharts.push(new HorizontalBarChart(barChart03));
    barCharts.push(new HorizontalStackedBarChart(barChart04));
    barCharts.push(new PlotChart(barChart05));
    barCharts.push(new StackedBarChart(barChart06));
    barCharts.push(new ClusteredBarChart(barChart07));
}

function draw() {
    background(30);
    barCharts.forEach(bar => bar.render());

}

