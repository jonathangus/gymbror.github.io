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

  svg = d3.select('#chart').append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr('viewBox', '0 0 ' + width + ' ' + (height + margin.top + margin.bottom))
    .attr('preserveAspectRatio', 'xMinYMin')
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  _GraphGoItems(items);
}

function _GraphGoItems(items) {
  gItems = _.values(items);

  gItems.forEach(function (d) {
    d.date = new Date(d.date);
    d.close = d.summary;
  });

  data = gItems;

  var parseDate = d3.time.format("%d-%b-%y").parse,
    bisectDate = d3.bisector(function(d) {
      return d.date;
    }).left,
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
    .ticks(d3.time.days, 1);

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


  data.sort(function(a, b) {
    return a.date - b.date;
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

  svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + (width - 50) + ",0)")
    .call(yAxis);
  d3.selectAll('.y.axis g.tick').attr("class", "yAxisTicks tick");
  d3.selectAll('.x.axis g.tick').attr("class", "xAxisTicks tick");

  function make_y_axis() {
    return d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(maxY / 1000);

  };
  svg.append("g")
    .attr("class", "grid")
    .style("stroke-dasharray", ("3, 3"))
    .call(make_y_axis()
      .tickSize((-width + margin.right + margin.left), 0, 0)
      .tickFormat("")
    );

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

  var focusLine = svg.append("g")
      .attr("class", "focus")
      .style("display", "none");

  var focus = svg.append("g")
      .attr("class", "focus")
      .style("display", "none");

  focus.append("text")
      .attr("x", 1)
      .attr("dy", ".05em");

  var focusText = svg.append("g")
      .attr("class", "focus")
      .style("display", "none");

  focus.append("circle")
      .attr("r", 6);

  focusLine.append("line")
        .attr("class", "x")
        .style("stroke", "#46464F")
        .style("opacity", 0.9)
        .attr("y1", 0)
        .attr("y2", -maxY);

  focusText.append("text")
      .attr("x", 9)
      .attr("dy", ".35em");

  svg.append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .on("mouseover", function() { focus.style("display", null);        
                                    focusLine.style("display", null)
                                    focusText.style("display", null);;})
      .on("mouseout", function() { focus.style("display", "none"); 
                                   focusLine.style("display", "none");
                                   focusText.style("display", "none");})
      .on("mousemove", mousemove);

  function mousemove() {
  var x0 = x.invert(d3.mouse(this)[0]),
      i = bisectDate(data, x0, 1),
      d0 = data[i - 1],
      d1 = data[i],
      d = x0 - d0.date > d1.date - x0 ? d1 : d0;

  focus.attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")");
  focusText.select("text").attr("transform", "translate(" + x(d.date) + "," + -10 + ")").text(d.summary + " summary");
  // focusLine.attr("transform", "translate(" + x(d.date) + "," + height + ")");
}
}

var Graph = React.createClass({
  getInitialState:function(){
    return {
      items: null
    }
  },
  propTypes: {
    exerciseID: React.PropTypes.string.isRequired,
  },
  componentDidMount: function() {
    var that = this;

    ExercisesStore.addChangeListener(this._onChange);
    ExercisesStore.getSortedWorkouts(this.props.exerciseID).then(function(items) {
      that.setState({items: items});
      _GraphGoTime(items);
    });
  },

  componentWillUnmount: function() {
    ExercisesStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    var that = this;
    
    ExercisesStore.getSortedWorkouts(this.props.exerciseID).then(function(items) {
      that.setState({items: items});
      _GraphGoTime(items)
    });
  },

  removeWorkout: function(workoutId) {
    ExercisesActions.removeWorkout(this.props.exerciseID, workoutId);
  },

  render:function(){

    var graph = [];

    for(key in this.state.items) {
      graph.push(<GraphItem key={key} removeWorkout={this.removeWorkout} item={this.state.items[key]} />)
    }

    return (
      <div>
      <div id="chart"></div>
      <div>{graph}</div>
      </div>
    )
  }
});

module.exports = Graph;