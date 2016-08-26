/**
 * Created by dcreey on 8/23/2016.
 */

app.controller('temperatureCtrl', function($scope, $http, $rootScope){
    var temperature = this;
    temperature.frequency = 'day';
    temperature.graphContainer = d3.select("#TemperatureGraph");

    temperature.getDataAndBuildGraph = function() {
        getAllTempertatureValues().then(function(data) {
            removeGraph();
            buildLineGraph(data.data, temperature.graphContainer);
        })
    }

    function getAllTempertatureValues() {
        return $http.get($rootScope.apiUrl + 'temperatures', {params:{"frequency": temperature.frequency }});
    }

    function removeGraph() {
        temperature.graphContainer.html("");
    }

    function isLineHidden(id){
        return d3.select("path#" + id).classed("hide");
    }

    // d3 - procedural mess
    // credit to http://bl.ocks.org/natemiller/7dec148bb6aab897e561
    function buildLineGraph(data, graphContainer) {
        var margin = {top: 10, right: 10, bottom: 100, left: 40},
            margin2 = {top: 430, right: 10, bottom: 20, left: 40},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom,
            height2 = 500 - margin2.top - margin2.bottom;

        var color = d3.scale.category10();

        var x = d3.time.scale().range([0, width]),
            x2 = d3.time.scale().range([0, width]),
            y = d3.scale.linear().range([height, 0]),
            y2 = d3.scale.linear().range([height2, 0]);

        var xAxis = d3.svg.axis().scale(x).orient("bottom"),
            xAxis2 = d3.svg.axis().scale(x2).orient("bottom"),
            yAxis = d3.svg.axis().scale(y).orient("left");

        var brush = d3.svg.brush()
            .x(x2)
            .on("brush", brush);

        var line = d3.svg.line()
            .defined(function(d) { return !isNaN(d.temperature); })
            .interpolate("cubic")
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.temperature); });

        var line2 = d3.svg.line()
            .defined(function(d) { return !isNaN(d.temperature); })
            .interpolate("cubic")
            .x(function(d) {return x2(d.date); })
            .y(function(d) {return y2(d.temperature); });

        var svg = graphContainer.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .style("overflow", "initial");

        svg.append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", width)
            .attr("height", height);

        var focus = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var context = svg.append("g")
            .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

        color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

        data.forEach(function(d) {
            d.date = new Date(d.date);
        });

        var sources = color.domain().map(function(name) {
            return {
                name: name,
                values: data.map(function(d) {
                    return {date: d.date, temperature: +d[name]};
                })
            };
        }).sort(function(a, b) {return a.name > b.name});

        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain([d3.min(sources, function(c) { return d3.min(c.values, function(v) { return v.temperature; }); }),
            d3.max(sources, function(c) { return d3.max(c.values, function(v) { return v.temperature; }); }) ]);
        x2.domain(x.domain());
        y2.domain(y.domain());

        var focuslineGroups = focus.selectAll("g")
            .data(sources)
            .enter().append("g");

        var focuslines = focuslineGroups.append("path")
            .attr("class","line")
            .attr("d", function(d) { return line(d.values); })
            .style("stroke", function(d) {return color(d.name);})
            .attr("id", function(d) { return d.name; })
            .attr("clip-path", "url(#clip)")
            .on("hover",function(d){
                this;
            });

        focus.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        focus.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        var contextlineGroups = context.selectAll("g")
            .data(sources)
            .enter().append("g");

        var contextLines = contextlineGroups.append("path")
            .attr("class", "line")
            .attr("d", function(d) { return line2(d.values); })
            .style("stroke", function(d) {return color(d.name);})
            .attr("clip-path", "url(#clip)");

        context.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height2 + ")")
            .call(xAxis2);

        context.append("g")
            .attr("class", "x brush")
            .call(brush)
            .selectAll("rect")
            .attr("y", -6)
            .attr("height", height2 + 7);

        buildLegend(sources, color, svg, width);
        appendHoverText(svg, margin, width, height, x, y, data);

        function brush() {
            x.domain(brush.empty() ? x2.domain() : brush.extent());
            focus.selectAll("path.line").attr("d",  function(d) {return line(d.values)});
            focus.select(".x.axis").call(xAxis);
            focus.select(".y.axis").call(yAxis);
        }
    }

    // legend item
    function buildLegend(sources, color, svg, width) {
        var legend = svg.append("g")
            .attr("class", "legend")
            .attr("height", 100)
            .attr("width", 100)
            .attr('transform', 'translate(50,50)')

        legend.selectAll('rect')
            .data(sources)
            .enter()
            .append("rect")
            .attr("x", width + 75)
            .attr("y", function(d, i){ return i *  20;})
            .attr("width", 10)
            .attr("height", 10)
            .style("fill", function(d) {return color(d.name);})
            .on("click", function(d) {
                // click event - hide or show graph
                var keyElement = d3.select(this);
                if (!keyElement.classed("clicked")) {
                    keyElement.classed("clicked", true);
                    d3.select("path#" + d.name).classed("hide", true);
                }
                else {
                    keyElement.classed("clicked", false);
                    d3.select("path#" + d.name).classed("hide", false);
                }
            })
            .attr("data-name", function(d) { d.name; });

        legend.selectAll('text')
            .data(sources)
            .enter()
            .append("text")
            .attr("x", width + 45)
            .attr("y", function(d, i){ return i *  20 + 9.5;})
            .text(function(d) {
                var text = d.name.charAt(0).toUpperCase() + d.name.slice(1);
                return text;
            });
    }

    // on hover item
    // credit to https://bl.ocks.org/mbostock/3902569
    function appendHoverText(svg, margin, width, height, x, y, data) {
        var bisectDate = d3.bisector(function(d) { return d.date; }).left;

        var hoverText = svg.append("g")
            .attr("class", "focus")
            .style("display", "none");

        hoverText.append("circle")
            .attr("r", 4.5);

        hoverText.append("text")
            .attr("x", 9)
            .attr("dy", ".35em");

        svg.append("rect")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height)
            .on("mouseover", function() { hoverText.style("display", null); })
            .on("mouseout", function() { hoverText.style("display", "none"); })
            .on("mousemove", mousemove)
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");;

        function mousemove() {
            var x0 = x.invert(d3.mouse(this)[0]),
                i = bisectDate(data, x0, 1),
                d0 = data[i - 1],
                d1 = data[i],
                d = x0 - d0.date > d1.date - x0 ? d1 : d0,
                y0 = 0,
                text,
                minHidden = isLineHidden("min"),
                maxHidden = isLineHidden("max");
            if ((Math.abs(y(d.max) - d3.mouse(this)[1]) < Math.abs(y(d.min) - d3.mouse(this)[1]) &&
                !maxHidden) || (minHidden && !maxHidden)) {
                y0 = y(d.max);
                text = d.max;
            }
            else if(!minHidden) {
                y0 = y(d.min);
                text = d.min;
            }
            else { hoverText.style("display", "none"); }

            hoverText.attr("transform", "translate(" + (x(d.date) + margin.left)  + "," + (y0 + margin.top) + ")");
            hoverText.select("text").text(parseFloat(text).toFixed(2));
        }
    }

    temperature.getDataAndBuildGraph();
});