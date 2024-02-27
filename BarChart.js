class BarChart {
    constructor(obj) {
        this.data = obj.data;
        //Chart
        this.chartWidth = obj.chartWidth;
        this.chartHeight = obj.chartHeight;
        this.xPos = obj.xPos;
        this.yPos = obj.yPos;
        this.chartLabel = obj.chartLabel;
        this.chartLabelPadding = obj.chartLabelPadding;
        this.chartLabelSize = obj.chartLabelSize;
        this.chartStroke = obj.chartStroke;
        this.chartStrokeWeight = obj.chartStrokeWeight;
        this.xChartLabel = obj.xChartLabel;
        this.yChartLabel = obj.yChartLabel;
        this.xChartLabelPadding = obj.xChartLabelPadding;
        this.yChartLabelPadding = obj.yChartLabelPadding;

        //Colours
        this.axisLineColour = obj.axisLineColour;
        this.barColour = obj.barColour;
        this.xLabelColour = obj.xLabelColour;
        this.yLabelColour = obj.yLabelColour;
        this.backgroundColour = obj.backgroundColour;
        this.chartLabelColour = obj.chartLabelColour;
        this.chartStrokeColour = obj.chartStrokeColour;
        this.barStrokeColour = obj.barStrokeColour;
        this.barTextColour = obj.barTextColour;
        this.barTextStrokeColour = obj.barTextStrokeColour;

        //Chart contents
        this.barWidth = obj.barWidth;
        this.xValue = obj.xValue;
        this.yValue = obj.yValue;
        this.barTextSize = obj.barTextSize;
        this.barText = obj.barText;
        this.barStroke = obj.barStroke;
        this.barStrokeWeight = obj.barStrokeWeight;
        this.barTextStroke = obj.barTextStroke;
        this.barTextStrokeWeight = obj.barTextStrokeWeight;
        this.barTextPadding = obj.barTextPadding;

        //Axis Labels and Ticks
        this.labelRotation = obj.labelRotation;
        this.axisTextSize = obj.axisTextSize;
        this.xLabelPadding = obj.xLabelPadding;
        this.yLabelPadding = obj.yLabelPadding;
        this.tickPadding = obj.tickPadding;
        this.numTicks = obj.numTicks;

        //Numbers
        this.rounding = obj.rounding;
        this.decimal = obj.decimal;


        //Maps the max value out of the data (max value = 32)
        this.maxValue = max(this.data.map(d => d[this.yValue]));
        this.scale = this.chartHeight / this.maxValue;
    }

    render() {
        // Rounding function 
        if (this.rounding) {
            for (let i = 0; i < 1000; i++) {
                if (this.maxValue % this.numTicks == 0) {
                    break;
                } else {
                    this.maxValue = this.maxValue + 1
                }
            }
            this.scale = this.chartHeight / this.maxValue;
        }

        push();
        //Translates and creates the chart lines
        translate(this.xPos, this.yPos);
        stroke(this.axisLineColour);
        line(0, 0, 0, -this.chartHeight);
        line(0, 0, this.chartWidth, 0);


        //Creates the ticks on the bar chart
        for (let i = 0; i <= this.numTicks; i++) {
            push();
            translate(0, i * (-this.chartHeight / this.numTicks))
            line(0, 0, -5, 0);
            pop();

            push();

            let tickGap = this.maxValue / this.numTicks
            // console.log(yLabel)

            noStroke();
            fill(this.yLabelColour);
            textAlign(RIGHT, CENTER);
            textSize(this.axisTextSize)
            translate(0, i * (-this.chartHeight / this.numTicks))
            let tickNum = (tickGap * i).toFixed(this.decimal)
            text(tickNum, this.tickPadding, 0)

            pop();
        }

        //Chart labels
        let point1 = this.chartWidth / 2
        let point2 = this.chartHeight

        fill(this.chartLabelColour);
        stroke(this.chartStrokeColour);
        strokeWeight(this.chartStrokeWeight);
        if (this.chartStroke == false) {
            noStroke();
        };
        push();
        //Top label
        textFont(fontBold);
        textAlign(CENTER, BOTTOM);
        textSize(this.chartLabelSize);
        text(this.chartLabel, point1, -point2 + -this.chartLabelPadding);
        pop()

        //Y axis label
        push()
        textFont(fontBold);
        textAlign(CENTER, BOTTOM);
        textSize(this.chartLabelSize);
        rotate(-90);
        text(this.yChartLabel, point2 / 2, -this.yChartLabelPadding);
        pop()

        //X axis label
        push()
        textFont(fontBold);
        textAlign(CENTER, BOTTOM);
        textSize(this.chartLabelSize);
        text(this.xChartLabel, point1, 50 + this.xChartLabelPadding);
        pop();



        /* CREATING THE BARS */

        //Finds the gap between each bar
        let gap = (this.chartWidth - (this.data.length * this.barWidth)) / (this.data.length + 1)

        push()
        for (let i = 0; i < this.data.length; i++) {
            fill(this.barColour);
            stroke(this.barStrokeColour);
            strokeWeight(this.barStrokeWeight);
            if (this.barStroke == false) {
                noStroke();
            };

            rect(5, 0, this.barWidth, -this.data[i][this.yValue] * this.scale);

            //Text on top of bars
            push();
            if (this.barText) {

                fill(this.barTextColour);
                stroke(this.barTextStrokeColour);
                strokeWeight(this.barTextStrokeWeight);
                if (this.barTextStroke == false) {
                    noStroke();
                };
                textFont(fontBold);
                textAlign(CENTER, BOTTOM);
                textSize(this.barTextSize);
                text(this.data[i][this.yValue], 7 + this.barWidth / 2, -this.data[i][this.yValue] * this.scale + -this.barTextPadding);

            }
            pop();

            translate(gap + this.barWidth, 0)

            noStroke();

            //Creates the x labels for the bar chart
            push();

            let xLabel = this.data.map(d => d[this.xValue])
            fill(this.xLabelColour);

            textAlign(BOTTOM, CENTER);
            textSize(this.axisTextSize);
            rotate(this.labelRotation);
            translate(0, 0)
            text(xLabel[i], this.xLabelPadding, this.yLabelPadding);

            pop();
        }


        pop()


        pop();
    }
}

class HorizontalBarChart {
    constructor(obj) {
        this.data = obj.data;
        //Chart
        this.chartWidth = obj.chartWidth;
        this.chartHeight = obj.chartHeight;
        this.xPos = obj.xPos;
        this.yPos = obj.yPos;
        this.chartLabel = obj.chartLabel;
        this.chartLabelPadding = obj.chartLabelPadding;
        this.chartLabelSize = obj.chartLabelSize;
        this.chartStroke = obj.chartStroke;
        this.chartStrokeWeight = obj.chartStrokeWeight;
        this.xChartLabel = obj.xChartLabel;
        this.yChartLabel = obj.yChartLabel;
        this.xChartLabelPadding = obj.xChartLabelPadding;
        this.yChartLabelPadding = obj.yChartLabelPadding;

        //Colours
        this.axisLineColour = obj.axisLineColour;
        this.barColour = obj.barColour;
        this.xLabelColour = obj.xLabelColour;
        this.yLabelColour = obj.yLabelColour;
        this.backgroundColour = obj.backgroundColour;
        this.chartLabelColour = obj.chartLabelColour;
        this.chartStrokeColour = obj.chartStrokeColour;
        this.barStrokeColour = obj.barStrokeColour;
        this.barTextColour = obj.barTextColour;
        this.barTextStrokeColour = obj.barTextStrokeColour;

        //Chart contents
        this.barWidth = obj.barWidth;
        this.xValue = obj.xValue;
        this.yValue = obj.yValue;
        this.barTextSize = obj.barTextSize;
        this.barText = obj.barText;
        this.barStroke = obj.barStroke;
        this.barStrokeWeight = obj.barStrokeWeight;
        this.barTextStroke = obj.barTextStroke;
        this.barTextStrokeWeight = obj.barTextStrokeWeight;
        this.barTextPadding = obj.barTextPadding;

        //Axis Labels and Ticks
        this.labelRotation = obj.labelRotation;
        this.axisTextSize = obj.axisTextSize;
        this.xLabelPadding = obj.xLabelPadding;
        this.yLabelPadding = obj.yLabelPadding;
        this.tickPadding = obj.tickPadding;
        this.numTicks = obj.numTicks;

        //Numbers
        this.rounding = obj.rounding;
        this.decimal = obj.decimal;


        //Maps the max value out of the data (max value = 32)
        this.maxValue = max(this.data.map(d => d[this.yValue]));
        this.scale = this.chartHeight / this.maxValue;
    }

    render() {
        // Rounding function 
        if (this.rounding) {
            for (let i = 0; i < 1000; i++) {
                if (this.maxValue % this.numTicks == 0) {
                    break;
                } else {
                    this.maxValue = this.maxValue + 1
                }
            }
            this.scale = this.chartHeight / this.maxValue;
        }

        push();
        //Translates and creates the chart lines
        translate(this.xPos, this.yPos);
        stroke(this.axisLineColour);
        line(0, 0, this.chartWidth, 0);
        line(0, 0, 0, this.chartHeight);


        //Creates the ticks on the bar chart
        for (let i = 0; i <= this.numTicks; i++) {
            push();
            translate(i * (this.chartWidth / this.numTicks), 0)
            line(0, 0, 0, -5);
            pop();

            push();

            let tickGap = this.maxValue / this.numTicks

            noStroke();
            fill(this.yLabelColour);
            textAlign(CENTER, BOTTOM);
            textSize(this.axisTextSize)
            translate(i * (this.chartWidth / this.numTicks), 0)
            let tickNum = (tickGap * i).toFixed(this.decimal)
            text(tickNum, 0, this.tickPadding)

            pop();
        }

        //Chart labels
        let point1 = this.chartWidth / 2
        let point2 = this.chartHeight

        fill(this.chartLabelColour);
        stroke(this.chartStrokeColour);
        strokeWeight(this.chartStrokeWeight);
        if (this.chartStroke == false) {
            noStroke();
        };
        push();
        //Bottom label
        textFont(fontBold);
        textAlign(CENTER, BOTTOM);
        textSize(this.chartLabelSize);
        text(this.chartLabel, point1, point2 + this.chartLabelPadding);
        pop()

        //X axis label
        push()
        textFont(fontBold);
        textAlign(CENTER, CENTER);
        textSize(this.chartLabelSize);
        text(this.yChartLabel, point2 / 2, -this.yChartLabelPadding);
        pop()

        //Y axis label
        push()
        textFont(fontBold);
        textAlign(CENTER, BOTTOM);
        textSize(this.chartLabelSize);
        rotate(-90)
        text(this.xChartLabel, -point1, -this.xChartLabelPadding);
        pop();



        /* CREATING THE BARS */

        //Finds the gap between each bar
        let gap = (this.chartHeight - (this.data.length * this.barWidth)) / (this.data.length + 1)

        push()
        for (let i = 0; i < this.data.length; i++) {
            fill(this.barColour);
            stroke(this.barStrokeColour);
            strokeWeight(this.barStrokeWeight);
            if (this.barStroke == false) {
                noStroke();
            };

            rect(1, 5, this.data[i][this.yValue] * this.scale, this.barWidth)

            //Text on top of bars
            push();
            if (this.barText) {

                fill(this.barTextColour);
                stroke(this.barTextStrokeColour);
                strokeWeight(this.barTextStrokeWeight);
                if (this.barTextStroke == false) {
                    noStroke();
                };
                textFont(fontBold);
                textAlign(LEFT, CENTER);
                textSize(this.barTextSize);
                text(this.data[i][this.yValue], this.data[i][this.yValue] * this.scale + this.barTextPadding, this.barWidth / 2,);

            }
            pop();
            translate(0, this.barWidth + gap,)


            //Creates the x labels for the bar chart
            push();

            let xLabel = this.data.map(d => d[this.xValue])
            fill(this.xLabelColour);

            textAlign(RIGHT, CENTER);
            textSize(this.axisTextSize);
            rotate(-this.labelRotation);
            translate(0, 0)
            text(xLabel[i], this.xLabelPadding, this.yLabelPadding);

            pop();
        }
        pop()


        pop();
    }
}

class PlotChart {
    constructor(obj) {
        this.data = obj.data;
        //Chart
        this.chartWidth = obj.chartWidth;
        this.chartHeight = obj.chartHeight;
        this.xPos = obj.xPos;
        this.yPos = obj.yPos;
        this.chartLabel = obj.chartLabel;
        this.chartLabelPadding = obj.chartLabelPadding;
        this.chartLabelSize = obj.chartLabelSize;
        this.chartStroke = obj.chartStroke;
        this.chartStrokeWeight = obj.chartStrokeWeight;
        this.xChartLabel = obj.xChartLabel;
        this.yChartLabel = obj.yChartLabel;
        this.xChartLabelPadding = obj.xChartLabelPadding;
        this.yChartLabelPadding = obj.yChartLabelPadding;

        //Colours
        this.axisLineColour = obj.axisLineColour;
        this.barColour = obj.barColour;
        this.xLabelColour = obj.xLabelColour;
        this.yLabelColour = obj.yLabelColour;
        this.backgroundColour = obj.backgroundColour;
        this.chartLabelColour = obj.chartLabelColour;
        this.chartStrokeColour = obj.chartStrokeColour;
        this.barStrokeColour = obj.barStrokeColour;
        this.barTextColour = obj.barTextColour;
        this.barTextStrokeColour = obj.barTextStrokeColour;

        //Chart contents
        this.barWidth = obj.barWidth;
        this.xValue = obj.xValue;
        this.yValue = obj.yValue;
        this.barTextSize = obj.barTextSize;
        this.barText = obj.barText;
        this.barStroke = obj.barStroke;
        this.barStrokeWeight = obj.barStrokeWeight;
        this.barTextStroke = obj.barTextStroke;
        this.barTextStrokeWeight = obj.barTextStrokeWeight;
        this.barTextPadding = obj.barTextPadding;
        this.plotSize = obj.plotSize;

        //Axis Labels and Ticks
        this.labelRotation = obj.labelRotation;
        this.axisTextSize = obj.axisTextSize;
        this.xLabelPadding = obj.xLabelPadding;
        this.yLabelPadding = obj.yLabelPadding;
        this.tickPadding = obj.tickPadding;
        this.numTicks = obj.numTicks;

        //Numbers
        this.rounding = obj.rounding;
        this.decimal = obj.decimal;


        //Maps the max value out of the data (max value = 32)
        this.maxValue = max(this.data.map(d => d[this.yValue]));
        this.scale = this.chartHeight / this.maxValue;
    }

    render() {
        // Rounding function 
        if (this.rounding) {
            for (let i = 0; i < 1000; i++) {
                if (this.maxValue % this.numTicks == 0) {
                    break;
                } else {
                    this.maxValue = this.maxValue + 1
                }
            }
            this.scale = this.chartHeight / this.maxValue;
        }

        push();
        //Translates and creates the chart lines
        translate(this.xPos, this.yPos);
        stroke(this.axisLineColour);
        line(0, 0, 0, -this.chartHeight);
        line(0, 0, this.chartWidth, 0);


        //Creates the ticks on the bar chart
        for (let i = 0; i <= this.numTicks; i++) {
            push();
            translate(0, i * (-this.chartHeight / this.numTicks))
            line(this.chartWidth, 0, -5, 0);
            pop();

            push();

            let tickGap = this.maxValue / this.numTicks
            // console.log(yLabel)

            noStroke();
            fill(this.yLabelColour);
            textAlign(RIGHT, CENTER);
            textSize(this.axisTextSize)
            translate(0, i * (-this.chartHeight / this.numTicks))
            let tickNum = (tickGap * i).toFixed(this.decimal)
            text(tickNum, this.tickPadding, 0)

            pop();
        }

        //Chart labels
        let point1 = this.chartWidth / 2
        let point2 = this.chartHeight

        fill(this.chartLabelColour);
        stroke(this.chartStrokeColour);
        strokeWeight(this.chartStrokeWeight);
        if (this.chartStroke == false) {
            noStroke();
        };
        push();
        //Top label
        textFont(fontBold);
        textAlign(CENTER, BOTTOM);
        textSize(this.chartLabelSize);
        text(this.chartLabel, point1, -point2 + -this.chartLabelPadding);
        pop()

        //Y axis label
        push()
        textFont(fontBold);
        textAlign(CENTER, BOTTOM);
        textSize(this.chartLabelSize);
        rotate(-90);
        text(this.yChartLabel, point2 / 2, -this.yChartLabelPadding);
        pop()

        //X axis label
        push()
        textFont(fontBold);
        textAlign(CENTER, BOTTOM);
        textSize(this.chartLabelSize);
        text(this.xChartLabel, point1, 50 + this.xChartLabelPadding);
        pop();



        /* CREATING THE Plots */

        //Finds the gap between each plot
        let gap = (this.chartWidth - (this.data.length * this.barWidth)) / (this.data.length + 1)

        push()
        for (let i = 0; i < this.data.length; i++) {
            fill(this.barColour);
            stroke(this.barStrokeColour);
            strokeWeight(this.barStrokeWeight);
            if (this.barStroke == false) {
                noStroke();
            };

            ellipse(this.barWidth, -this.data[i][this.yValue] * this.scale, this.plotSize, this.plotSize);

            //Text on top of bars
            push();
            if (this.barText) {

                fill(this.barTextColour);
                stroke(this.barTextStrokeColour);
                strokeWeight(this.barTextStrokeWeight);
                if (this.barTextStroke == false) {
                    noStroke();
                };
                textFont(fontBold);
                textAlign(LEFT, BOTTOM);
                textSize(this.barTextSize);
                text(this.data[i][this.yValue], 5 + this.barWidth / 2, -this.data[i][this.yValue] * this.scale + -this.barTextPadding);

            }
            pop();

            translate(gap + this.barWidth, 0)


            //Creates the x labels for the bar chart
            push();

            let xLabel = this.data.map(d => d[this.xValue])
            fill(this.xLabelColour);

            textAlign(BOTTOM, CENTER);
            textSize(this.axisTextSize);
            rotate(this.labelRotation);
            translate(0, 0)
            text(xLabel[i], this.xLabelPadding, this.yLabelPadding);

            pop();
        }
        pop()


        pop();
    }
}

class StackedBarChart {
    constructor(obj) {
        this.data = obj.data;
        //Chart
        this.chartWidth = obj.chartWidth;
        this.chartHeight = obj.chartHeight;
        this.xPos = obj.xPos;
        this.yPos = obj.yPos;
        this.chartLabel = obj.chartLabel;
        this.chartLabelSize = obj.chartLabelSize;
        this.chartStroke = obj.chartStroke;
        this.chartStrokeWeight = obj.chartStrokeWeight;
        this.chartLabelPadding = obj.chartLabelPadding;
        this.xChartLabel = obj.xChartLabel;
        this.yChartLabel = obj.yChartLabel;
        this.xChartLabelPadding = obj.xChartLabelPadding;
        this.yChartLabelPadding = obj.yChartLabelPadding;
        this.legendSize = obj.legendSize;
        this.legendPadding = obj.legendPadding;

        //Colours
        this.axisLineColour = obj.axisLineColour;
        this.barColours = obj.barColours;
        this.xLabelColour = obj.xLabelColour;
        this.yLabelColour = obj.yLabelColour;
        this.backgroundColour = obj.backgroundColour;
        this.chartLabelColour = obj.chartLabelColour;
        this.chartStrokeColour = obj.chartStrokeColour;
        this.barStrokeColour = obj.barStrokeColour;
        this.barTextColour = obj.barTextColour;
        this.barTextStrokeColour = obj.barTextStrokeColour;
        this.averageLineColour = obj.averageLineColour;

        //Chart contents
        this.barWidth = obj.barWidth;
        this.xValue = obj.xValue;
        this.yValues = obj.yValues;
        this.barTextSize = obj.barTextSize;
        this.barText = obj.barText;
        this.barStroke = obj.barStroke;
        this.barStrokeWeight = obj.barStrokeWeight;
        this.barTextStroke = obj.barTextStroke;
        this.barTextStrokeWeight = obj.barTextStrokeWeight;
        this.barTextPadding = obj.barTextPadding;
        this.averageLine = obj.averageLine;

        //Axis Labels and Ticks
        this.labelRotation = obj.labelRotation;
        this.axisTextSize = obj.axisTextSize;
        this.xLabelPadding = obj.xLabelPadding;
        this.yLabelPadding = obj.yLabelPadding;
        this.tickPadding = obj.tickPadding;
        this.numTicks = obj.numTicks;

        //Numbers
        this.rounding = obj.rounding;
        this.decimal = obj.decimal;
        this.totalValue = obj.totalValue;


        //Finds max value
        this.maxValue = max(this.data.map(d => d[this.totalValue]))

        //Scale
        this.scale = this.chartHeight / this.maxValue;
    }



    render() {
        //Scale function 
        if (this.rounding) {
            for (let i = 0; i < 1000; i++) {
                if (this.maxValue % this.numTicks == 0) {
                    break;
                } else {
                    this.maxValue = this.maxValue + 1
                }
            }
            this.scale = this.chartHeight / this.maxValue;
        }

        push();
        //Translates and creates the chart lines
        translate(this.xPos, this.yPos);
        stroke(this.axisLineColour);
        line(0, 0, 0, -this.chartHeight);
        line(0, 0, this.chartWidth, 0);


        //Creates the ticks on the bar chart
        for (let i = 0; i <= this.numTicks; i++) {
            push();
            translate(0, i * (-this.chartHeight / this.numTicks))
            line(0, 0, -5, 0);
            pop();

            push();

            let tickGap = this.maxValue / this.numTicks
            // console.log(yLabel)

            noStroke();
            fill(this.yLabelColour);
            textAlign(RIGHT, CENTER);
            textSize(this.axisTextSize)
            translate(0, i * (-this.chartHeight / this.numTicks))
            let tickNum = (tickGap * i).toFixed(this.decimal)
            text(tickNum, this.tickPadding, 0)

            pop();
        }

        //Chart labels
        let point1 = this.chartWidth / 2
        let point2 = this.chartHeight

        fill(this.chartLabelColour);
        stroke(this.chartStrokeColour);
        strokeWeight(this.chartStrokeWeight);
        if (this.chartStroke == false) {
            noStroke();
        };
        push();
        //Top label
        textFont(fontBold);
        textAlign(CENTER, BOTTOM);
        textSize(this.chartLabelSize);
        text(this.chartLabel, point1, -point2 + -this.chartLabelPadding);
        pop()

        //Y axis label
        push()
        textFont(fontBold);
        textAlign(CENTER, BOTTOM);
        textSize(this.chartLabelSize);
        rotate(-90);
        text(this.yChartLabel, point2 / 2, -this.yChartLabelPadding);
        pop()

        //X axis label
        push()
        textFont(fontBold);
        textAlign(CENTER, BOTTOM);
        textSize(this.chartLabelSize);
        text(this.xChartLabel, point1, 50 + this.xChartLabelPadding);
        pop();



        /* CREATING THE BARS */

        //Finds the gap between each bar
        let gap = (this.chartWidth - (this.data.length * this.barWidth)) / (this.data.length + 1)

        push()
        for (let i = 0; i < this.data.length; i++) {
            //Used to toggle stroke on/off
            stroke(this.barStrokeColour);
            strokeWeight(this.barStrokeWeight);
            if (this.barStroke == false) {
                noStroke();
            };

            //Draws the stacked bars
            push();
            for (let j = 0; j < this.yValues.length; j++) {
                let barHeight = -this.data[i][this.yValues[j]] * this.scale;
                fill(this.barColours[j]);
                rect(5, 0, this.barWidth, barHeight);
                translate(0, barHeight)

                //Bar Text
                push();
                if (this.barText) {

                    fill(this.barTextColour);
                    stroke(this.barTextStrokeColour);
                    strokeWeight(this.barTextStrokeWeight);
                    if (this.barTextStroke == false) {
                        noStroke();
                    };

                    // rotate(90)
                    textFont(fontBold);
                    textAlign(CENTER, CENTER);
                    textSize(this.barTextSize);
                    text(this.data[i][this.yValues[j]], this.barWidth / 2, (this.data[i][this.yValues[j]]) / 2 * this.scale + this.barTextPadding);
                    // rotate(-90)
                }
                pop();

            }
            pop();


            translate(gap + this.barWidth, 0);

            // Creates the x labels for the bar chart
            noStroke();
            push();
            let xLabel = this.data.map(d => d[this.xValue])
            fill(this.xLabelColour);

            textAlign(BOTTOM, CENTER);
            textSize(this.axisTextSize);
            rotate(this.labelRotation);
            translate(0, 0)
            text(xLabel[i], this.xLabelPadding, this.yLabelPadding);

            pop();
        }


        //Draws the average line
        let sum = 0
        for (let i = 0; i < this.data.length; i++) {
            sum += int(this.data[i].Total)
        }
        let avgLine = sum / this.data.length
        if (this.averageLine) {
            stroke(this.averageLineColour)
            line(-this.chartWidth, -avgLine * this.scale, 5, -avgLine * this.scale)
        }



        //Draws the chart legend
        let legendX = 0;
        let legendY = this.chartHeight / 6;

        for (let i = 0; i < this.yValues.length; i++) {
            //Used to toggle stroke on/off
            stroke(this.barStrokeColour);
            strokeWeight(this.barStrokeWeight);
            if (this.barStroke == false) {
                noStroke();
            };
            fill(this.barColours[i])
            rect(-legendX, legendY, -this.legendSize, this.legendSize)

            noStroke();
            fill(this.chartLabelColour);
            textAlign(RIGHT, CENTER);
            textSize(this.axisTextSize);
            text(this.yValues[i], legendX + -this.legendPadding, legendY + (this.legendSize / 2))
            translate(0, this.legendSize + (this.legendSize / 2))
        }



        pop()

        pop();
    }
}

class HorizontalStackedBarChart {
    constructor(obj) {
        this.data = obj.data;
        //Chart
        this.chartWidth = obj.chartWidth;
        this.chartHeight = obj.chartHeight;
        this.xPos = obj.xPos;
        this.yPos = obj.yPos;
        this.chartLabel = obj.chartLabel;
        this.chartLabelSize = obj.chartLabelSize;
        this.chartStroke = obj.chartStroke;
        this.chartStrokeWeight = obj.chartStrokeWeight;
        this.chartLabelPadding = obj.chartLabelPadding;
        this.xChartLabel = obj.xChartLabel;
        this.yChartLabel = obj.yChartLabel;
        this.xChartLabelPadding = obj.xChartLabelPadding;
        this.yChartLabelPadding = obj.yChartLabelPadding;
        this.legendSize = obj.legendSize;
        this.legendPadding = obj.legendPadding;

        //Colours
        this.axisLineColour = obj.axisLineColour;
        this.barColours = obj.barColours;
        this.xLabelColour = obj.xLabelColour;
        this.yLabelColour = obj.yLabelColour;
        this.backgroundColour = obj.backgroundColour;
        this.chartLabelColour = obj.chartLabelColour;
        this.chartStrokeColour = obj.chartStrokeColour;
        this.barStrokeColour = obj.barStrokeColour;
        this.barTextColour = obj.barTextColour;
        this.barTextStrokeColour = obj.barTextStrokeColour;

        //Chart contents
        this.barWidth = obj.barWidth;
        this.xValue = obj.xValue;
        this.yValues = obj.yValues;
        this.barTextSize = obj.barTextSize;
        this.barText = obj.barText;
        this.barStroke = obj.barStroke;
        this.barStrokeWeight = obj.barStrokeWeight;
        this.barTextStroke = obj.barTextStroke;
        this.barTextStrokeWeight = obj.barTextStrokeWeight;
        this.barTextPadding = obj.barTextPadding;

        //Axis Labels and Ticks
        this.labelRotation = obj.labelRotation;
        this.axisTextSize = obj.axisTextSize;
        this.xLabelPadding = obj.xLabelPadding;
        this.yLabelPadding = obj.yLabelPadding;
        this.tickPadding = obj.tickPadding;
        this.numTicks = obj.numTicks;

        //Numbers
        this.rounding = obj.rounding;
        this.decimal = obj.decimal;
        this.totalValue = obj.totalValue;


        //tweak max value

        this.maxValue = max(this.data.map(d => d[this.totalValue]))

        // this.value1 = max(this.data.map(d => d[this.yValues[0]]))
        // this.value2 = max(this.data.map(d => d[this.yValues[1]]))
        // this.maxValue = this.value1 + this.value2

        this.scale = this.chartHeight / this.maxValue;
    }



    render() {
        //Scale function 
        if (this.rounding) {
            for (let i = 0; i < 1000; i++) {
                if (this.maxValue % this.numTicks == 0) {
                    break;
                } else {
                    this.maxValue = this.maxValue + 1
                }
            }
            this.scale = this.chartHeight / this.maxValue;
        }

        push();
        //Translates and creates the chart lines
        translate(this.xPos, this.yPos);
        stroke(this.axisLineColour);
        line(0, 0, this.chartWidth, 0);
        line(0, 0, 0, this.chartHeight);


        //Creates the ticks on the bar chart
        for (let i = 0; i <= this.numTicks; i++) {
            push();
            translate(i * (this.chartWidth / this.numTicks), 0)
            line(0, 0, 0, -5);
            pop();

            push();

            let tickGap = this.maxValue / this.numTicks
            // console.log(yLabel)

            noStroke();
            fill(this.yLabelColour);
            textAlign(CENTER, BOTTOM);
            textSize(this.axisTextSize)
            translate(-i * (-this.chartWidth / this.numTicks), 0)
            let tickNum = (tickGap * i).toFixed(this.decimal)
            text(tickNum, 0, this.tickPadding)

            pop();
        }

        //Chart labels
        let point1 = this.chartWidth / 2
        let point2 = this.chartHeight

        fill(this.chartLabelColour);
        stroke(this.chartStrokeColour);
        strokeWeight(this.chartStrokeWeight);
        if (this.chartStroke == false) {
            noStroke();
        };
        push();
        //Bottom label
        textFont(fontBold);
        textAlign(CENTER, BOTTOM);
        textSize(this.chartLabelSize);
        text(this.chartLabel, point1, point2 + this.chartLabelPadding);
        pop()

        //X axis label
        push()
        textFont(fontBold);
        textAlign(CENTER, BOTTOM);
        textSize(this.chartLabelSize);
        text(this.yChartLabel, point2 / 2, -this.yChartLabelPadding);
        pop()

        //Y axis label
        push()
        textFont(fontBold);
        textAlign(CENTER, BOTTOM);
        textSize(this.chartLabelSize);
        rotate(-90);
        text(this.xChartLabel, -point1, -this.xChartLabelPadding);
        pop();


        /* CREATING THE BARS */

        //Finds the gap between each bar
        let gap = (this.chartWidth - (this.data.length * this.barWidth)) / (this.data.length + 1)

        push()
        for (let i = 0; i < this.data.length; i++) {
            //Used to toggle stroke on/off
            stroke(this.barStrokeColour);
            strokeWeight(this.barStrokeWeight);
            if (this.barStroke == false) {
                noStroke();
            };

            //Draws the stacked bars
            push();
            for (let j = 0; j < this.yValues.length; j++) {
                let barHeight = this.data[i][this.yValues[j]] * this.scale;
                fill(this.barColours[j]);
                rect(1, 5, barHeight, this.barWidth);
                translate(barHeight, 0)

                //Bar Text
                push();
                if (this.barText) {

                    fill(this.barTextColour);
                    stroke(this.barTextStrokeColour);
                    strokeWeight(this.barTextStrokeWeight);
                    if (this.barTextStroke == false) {
                        noStroke();
                    };

                    textFont(fontBold);
                    textAlign(CENTER, CENTER);
                    textSize(this.barTextSize);
                    text(this.data[i][this.yValues[j]], (this.data[i][this.yValues[j]]) / 2 * -this.scale + -this.barTextPadding, this.barWidth / 2);

                }
                pop();

            }
            pop();

            translate(0, gap + this.barWidth);

            // Creates the x labels for the bar chart
            noStroke();
            push();
            let xLabel = this.data.map(d => d[this.xValue])
            fill(this.xLabelColour);

            textAlign(RIGHT, CENTER);
            textSize(this.axisTextSize);
            rotate(-this.labelRotation);
            translate(0, 0)
            text(xLabel[i], -this.xLabelPadding, -this.yLabelPadding);

            pop();
        }

        //Draws the chart legend
        let legendX = this.chartWidth;
        let legendY = -this.chartHeight / 2

        for (let i = 0; i < this.yValues.length; i++) {
            //Used to toggle stroke on/off
            stroke(this.barStrokeColour);
            strokeWeight(this.barStrokeWeight);
            if (this.barStroke == false) {
                noStroke();
            };
            fill(this.barColours[i])
            rect(legendX, legendY, this.legendSize, this.legendSize)

            noStroke();
            fill(this.chartLabelColour);
            textAlign(RIGHT, CENTER);
            textSize(this.axisTextSize);
            text(this.yValues[i], legendX + -this.legendPadding, legendY + (this.legendSize / 2))
            translate(0, this.legendSize + (this.legendSize / 2))
        }

        pop()

        pop();
    }
}

class ClusteredBarChart {
    constructor(obj) {
        this.data = obj.data;
        //Chart
        this.chartWidth = obj.chartWidth;
        this.chartHeight = obj.chartHeight;
        this.xPos = obj.xPos;
        this.yPos = obj.yPos;
        this.chartLabel = obj.chartLabel;
        this.chartLabelSize = obj.chartLabelSize;
        this.chartStroke = obj.chartStroke;
        this.chartStrokeWeight = obj.chartStrokeWeight;
        this.chartLabelPadding = obj.chartLabelPadding;
        this.xChartLabel = obj.xChartLabel;
        this.yChartLabel = obj.yChartLabel;
        this.xChartLabelPadding = obj.xChartLabelPadding;
        this.yChartLabelPadding = obj.yChartLabelPadding;
        this.legendSize = obj.legendSize;
        this.legendPadding = obj.legendPadding;

        //Colours
        this.axisLineColour = obj.axisLineColour;
        this.barColours = obj.barColours;
        this.xLabelColour = obj.xLabelColour;
        this.yLabelColour = obj.yLabelColour;
        this.backgroundColour = obj.backgroundColour;
        this.chartLabelColour = obj.chartLabelColour;
        this.chartStrokeColour = obj.chartStrokeColour;
        this.barStrokeColour = obj.barStrokeColour;
        this.barTextColour = obj.barTextColour;
        this.barTextStrokeColour = obj.barTextStrokeColour;

        //Chart contents
        this.barWidth = obj.barWidth;
        this.xValue = obj.xValue;
        this.yValues = obj.yValues;
        this.barTextSize = obj.barTextSize;
        this.barText = obj.barText;
        this.barStroke = obj.barStroke;
        this.barStrokeWeight = obj.barStrokeWeight;
        this.barTextStroke = obj.barTextStroke;
        this.barTextStrokeWeight = obj.barTextStrokeWeight;
        this.barTextPadding = obj.barTextPadding;

        //Axis Labels and Ticks
        this.labelRotation = obj.labelRotation;
        this.axisTextSize = obj.axisTextSize;
        this.xLabelPadding = obj.xLabelPadding;
        this.yLabelPadding = obj.yLabelPadding;
        this.tickPadding = obj.tickPadding;
        this.numTicks = obj.numTicks;

        //Numbers
        this.rounding = obj.rounding;
        this.decimal = obj.decimal;
        this.totalValue = obj.totalValue;


        //This loop finds the max value by adding all totals into an array and finding the max
        let maxValueArray = [];
        for(let i=0;i<this.yValues.length;i++){
            maxValueArray.push(max(this.data.map(d => d[this.yValues[i]])))
        };
        let trueMaxValue = max(maxValueArray);

        this.maxValue = trueMaxValue
        this.scale = this.chartHeight / this.maxValue;
        
        // console.log(this.maxValue)
    }



    render() {
        //This function rounds the maxValue to a divisible number
        if (this.rounding) {
            for (let i = 0; i < 1000; i++) {
                if (this.maxValue % this.numTicks == 0) {
                    break;
                } else {
                    this.maxValue = this.maxValue + 1
                }
            }
            this.scale = this.chartHeight / this.maxValue;
        }

        push();
        //Translates and creates the chart lines
        translate(this.xPos, this.yPos);
        stroke(this.axisLineColour);
        line(0, 0, 0, -this.chartHeight);
        line(0, 0, this.chartWidth, 0);


        //Creates the ticks on the bar chart
        for (let i = 0; i <= this.numTicks; i++) {
            push();
            translate(0, i * (-this.chartHeight / this.numTicks))
            line(this.chartWidth, 0, -5, 0);
            pop();

            push();

            let tickGap = this.maxValue / this.numTicks
            // console.log(yLabel)

            noStroke();
            fill(this.yLabelColour);
            textAlign(RIGHT, CENTER);
            textSize(this.axisTextSize)
            translate(0, i * (-this.chartHeight / this.numTicks))
            let tickNum = (tickGap * i).toFixed(this.decimal)
            text(tickNum, this.tickPadding, 0)

            pop();
        }

        //Chart labels
        let point1 = this.chartWidth / 2
        let point2 = this.chartHeight

        fill(this.chartLabelColour);
        stroke(this.chartStrokeColour);
        strokeWeight(this.chartStrokeWeight);
        if (this.chartStroke == false) {
            noStroke();
        };
        push();
        //Top label
        textFont(fontBold);
        textAlign(CENTER, BOTTOM);
        textSize(this.chartLabelSize);
        text(this.chartLabel, point1, -point2 + -this.chartLabelPadding);
        pop()

        //Y axis label
        push()
        textFont(fontBold);
        textAlign(CENTER, BOTTOM);
        textSize(this.chartLabelSize);
        rotate(-90);
        text(this.yChartLabel, point2 / 2, -this.yChartLabelPadding);
        pop()

        //X axis label
        push()
        textFont(fontBold);
        textAlign(CENTER, BOTTOM);
        textSize(this.chartLabelSize);
        text(this.xChartLabel, point1, 50 + this.xChartLabelPadding);
        pop();



        /* CREATING THE BARS */

        //Finds the gap between each bar
        let gap = (this.chartWidth - (this.data.length * this.barWidth)) / (this.data.length + 1) / 3

        push()
        for (let i = 0; i < this.data.length; i++) {
            //Used to toggle stroke on/off
            stroke(this.barStrokeColour);
            strokeWeight(this.barStrokeWeight);
            if (this.barStroke == false) {
                noStroke();
            };

            //Draws the stacked bars
            push();
            for (let j = 0; j < this.yValues.length; j++) {
                let barHeight = -this.data[i][this.yValues[j]] * this.scale;
                fill(this.barColours[j]);
                rect(0, 0, this.barWidth, barHeight);
                translate(this.barWidth, 0)

                //Bar Text
                push();
                if (this.barText) {

                    fill(this.barTextColour);
                    stroke(this.barTextStrokeColour);
                    strokeWeight(this.barTextStrokeWeight);
                    if (this.barTextStroke == false) {
                        noStroke();
                    };

                    textFont(fontBold);
                    textAlign(RIGHT, BOTTOM);
                    textSize(this.barTextSize);
                    text(this.data[i][this.yValues[j]], this.barWidth / 2 + -this.barTextPadding, (-this.data[i][this.yValues[j]]) * this.scale);

                }
                pop();

            }

            // for (let l = 0; l < this.yValues.length; l++) {}
            pop();

            translate(gap + this.barWidth * this.yValues.length, 0);

            // Creates the x labels for the bar chart
            noStroke();
            push();
            let xLabel = this.data.map(d => d[this.xValue])
            fill(this.xLabelColour);

            textAlign(BOTTOM, CENTER);
            textSize(this.axisTextSize);
            rotate(this.labelRotation);
            translate(0, 0)
            text(xLabel[i], this.xLabelPadding, this.yLabelPadding);

            pop();
        }

        //Draws the chart legend
        let legendX = 0;
        let legendY = this.chartHeight / 6;

        for (let i = 0; i < this.yValues.length; i++) {
            //Used to toggle stroke on/off
            stroke(this.barStrokeColour);
            strokeWeight(this.barStrokeWeight);
            if (this.barStroke == false) {
                noStroke();
            };
            fill(this.barColours[i])
            rect(-legendX, legendY, -this.legendSize, this.legendSize)

            noStroke();
            fill(this.chartLabelColour);
            textAlign(RIGHT, CENTER);
            textSize(this.axisTextSize);
            text(this.yValues[i], legendX + -this.legendPadding, legendY + (this.legendSize / 2))
            translate(0, this.legendSize + (this.legendSize / 2))
        }

        pop()

        pop();
    }
}

