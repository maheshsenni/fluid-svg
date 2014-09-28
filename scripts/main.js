/*jslint browser: true*/
/*global require*/

var donut = require('./DonutChart');
var barChart = require('./BarChart');

(function (window, document) {
	'use strict';
	window.onload = function () {
		donut.render('#donut-container');
		barChart.render('#bar-container', [.2, .3, .5, .1, .4, .7, .3]);
	};
}(window, document));