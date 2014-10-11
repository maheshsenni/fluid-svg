/*global require,module */

var d3 = require('d3');

module.exports = {
  render: function (selector, data) {
    'use strict';
    var selection = d3.select(selector);

    if (!selection) {
      throw new Error("No elements for selector:" + selector);
    }

    var arc = d3.svg.arc()
      .innerRadius(20)
      .outerRadius(40)
      .startAngle(0);

    var g = selection.append("g")
      .attr("transform", "translate(50, 50)");

    var background = g.append("path")
      .datum({endAngle: 2 * Math.PI})
      .style("fill", "#7f8c8d")
      .attr("d", arc);

    var foreground = g.append("path")
      .datum({endAngle: .4 * 2 * Math.PI})
      .style("fill", "#3498db")
      .attr("d", arc);
  }
};
