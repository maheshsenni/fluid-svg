/*global require,module */

var d3 = require('d3');

module.exports = {
	render: function (selector, data) {
		'use strict';
		var selection = d3.select(selector);

		if (!selection) {
			throw new Error("No elements for selector:" + selector);
		}

		var y = d3.scale.linear().range([0, 100]);

    var barWidth = 100 / data.length;

    var bar = selection.selectAll("g")
      .data(data)
      .enter().append("g")
      .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

    bar.append("rect")
      .attr("y", function(d) {
      	return y(d);
      })
      .attr("height", function(d) {
      	return 100 - y(d);
      })
      .attr("width", barWidth - 2)
      .attr("fill", "#2ecc71");
	}
};
