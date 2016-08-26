/**
 * Created by dcreey on 8/23/2016.
 */

app.controller('temperatureCtrl', function($scope, $http, $rootScope){
    var temperature = this;
    temperature.frequency = 'day';
    temperature.graphContainer = d3.select("#TemperatureGraph");

    temperature.getDataAndBuildGraph = function() {
        getAll().then(function(data) {
            removeGraph();
            buildLineGraph(data.data);
        })
    }

    function getAll() {
        return $http.get($rootScope.apiUrl + 'temperature/search', {params:{"frequency": temperature.frequency }});
    }

    function removeGraph() {
        temperature.graphContainer.html("");
    }

    // d3 - procedural mess
    function buildLineGraph(data) {
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

        var svg = temperature.graphContainer.append("svg")
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
            .attr("clip-path", "url(#clip)");

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

        function brush() {
            x.domain(brush.empty() ? x2.domain() : brush.extent());
            focus.selectAll("path.line").attr("d",  function(d) {return line(d.values)});
            focus.select(".x.axis").call(xAxis);
            focus.select(".y.axis").call(yAxis);
        }
    }

    function getGraphTitle(){
        var title = " - Averaged by ";
        if (temperature.frequency === "day") return "";
        return title + temperature.frequency;
    }

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
            .style("fill", function(d) {return color(d.name);});

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

    temperature.getDataAndBuildGraph();
});