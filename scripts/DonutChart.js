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

    var rotateCycle = function () {
      console.timeEnd("Rotation");
      console.time("Rotation");
      d3.select(this).transition()
        .duration(5000)
        .attrTween("transform", function () { return d3.interpolateString("rotate(0)", "rotate(360)"); })
        .each("end", rotateCycle);
    };    
    var rotationG = g.append("g").each(rotateCycle);

    var background = rotationG.append("path")
      .datum({endAngle: 2 * Math.PI})
      .style("fill", "#7f8c8d")
      .attr("d", arc);

    var foreground = rotationG.append("path")
      .datum({endAngle: .4 * 2 * Math.PI})
      .style("fill", "#3498db")
      .attr("d", arc);
  }
};
