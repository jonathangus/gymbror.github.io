/** @jsx React.DOM */
var React = require('react');
var ExercisesStore = require('../../stores/exercises-store.js');
var GraphItem = require('./graph-item.js');
var ExercisesActions = require('../../actions/exercises-actions.js'); 
var d3 = require('d3');
var _ = require('lodash');

var gItems;
var path;

var w = 300;
var h = 200;
var margin = {top: 20, right: 20, bottom: 20, left: 20},
    padding = {top: 60, right: 60, bottom: 60, left: 60},
    outerWidth = 960,
    outerHeight = 500,
    innerWidth = outerWidth - margin.left - margin.right,
    innerHeight = outerHeight - margin.top - margin.bottom,
    width = innerWidth - padding.left - padding.right,
    height = innerHeight - padding.top - padding.bottom;

var svg;

function _GraphGoTime(items) {
  if(typeof svg !== 'undefined') {
    d3.select("svg").remove();
  }

  svg = d3.select('#chart').append("svg")
    .attr('class', 'Graph')
    .attr("width", width)
    .attr("height", height)
    .attr('viewBox', '0 0 ' + width + ' ' + (height + margin.top + margin.bottom))
    .attr('preserveAspectRatio', 'xMinYMin')
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  _GraphGoItems(items);
}

function _GraphUpdate(items) {
  d3.select("svg").remove();
  _GraphGoTime(items); 
}

function _GraphGoItems(items) {
  gItems = items;

  gItems.forEach(function (d) {
    d.date = new Date(d.date);
    d.close = d.summary;
  });

  data = gItems;

  data.sort(function(a, b) {
    return a.date - b.date;
  });

  var parseDate = d3.time.format("%d-%b-%y").parse,
    formatValue = d3.format(",.2f");

  var maxY = d3.max(data, function(d) {
    return d.close;
  });

  var x = d3.time.scale()
    .range([0, width - margin.left - margin.right]);

  var y = d3.scale.linear()
    .range([height - margin.top - margin.bottom, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickSize(0)
    .tickFormat(d3.time.format('%b %e'))
    .ticks(d3.time.days, 0);

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickSize(0)
    .ticks(maxY / 1000);

  var line = d3.svg.line()
    .x(function(d) {
      return x(d.date);
    })
    .y(function(d) {
      return y(d.close);
    });

  x.domain([data[0].date, data[data.length - 1].date]);
  y.domain(d3.extent(data, function(d) {
    return d.close;
  }));

  var area = d3.svg.area()
    .x(function(d) {
      return x(d.date);
    })
    .y0(height)
    .y1(function(d) {
      return y(d.close);
    });

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  d3.selectAll('.x.axis g.tick').attr("class", "xAxisTicks tick");

  var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .text("a simple tooltip")
    .attr("class", "Graph-tooltip");

  svg.selectAll("dot")
    .data(data)
    .enter().append("circle")
    .attr("r", 7.5)
    .attr("cx", function(d) { return x(d.date); })
    .attr("cy", function(d) { return y(d.close); })
    .on("mouseover", function(d) {
      tooltip.style("visibility", "visible");
      var html = '';

      d.values.forEach(function(i) {
        html += '<div class="Graph-tooltip-row">';
        html += '<span class="Graph-tooltip-rep">' + i.reps + ', </span>';
        html += '<span class="Graph-tooltip-value">' + i.value + '</span>';
        html += '</div>';
      });

      tooltip.html(html); 

    })
    .on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
    .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

  // svg.append("path")
  //   .datum(data)
  //   .attr("class", "area")
  //   .attr("d", area);

  var outLine = svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);

  var totalLength = outLine.node().getTotalLength();
    outLine
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
        .duration(350)
        .ease("linear")
        .attr("stroke-dashoffset", 0);

}

var Graph = React.createClass({
  componentDidMount:function(){
    var items = _.values(this.props.items);
    if(items.length > 0) {
       _GraphGoTime(items);
    }
    else {
      document.getElementById('chart').innerHTML = '';
    }
  },
  componentDidUpdate: function() {
    // console.log('UPDATE FROM GRAPH');
    // console.log(_.values(this.props.items));
    var items = _.values(this.props.items);
    if(items.length > 0) {
       _GraphGoTime(items);
    }
    else {
      document.getElementById('chart').innerHTML = '';
    }
  },

  render:function(){
    return (
      <div>
        <div id="chart"></div>
      </div>
    )
  }
});

module.exports = Graph;