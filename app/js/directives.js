'use strict';

/* Directives */
//new directive to create a force node graph
vivoviz.directive('ghVisualization', function () {
	
	//initialize some variables for our graphic
	var width = 960,
	height = 500;
	var color = d3.scale.category20();

	return {
	restrict: 'E', //the directive can be invoked only by using <my-directive> tag in the template
	//setup local scope to recieve a value
	//variables are passed in and out of the directive through the scope
	//these can be considered bound variables
	scope: {
		val: '=',
	},
	link: function (scope, element, attrs) {

		//create new area to draw our graphic
		var svg = d3.select(element[0])
			.append("svg")
			.attr("width", width)
			.attr("height", height);


		//newValue automatically gets the current value of 'val'
		scope.$watch('val', function(newVal,oldVal) {
			// clear the elements inside of the directive
			svg.selectAll('*').remove();
			// if 'val' is undefined, exit
			if (!newVal) {
				return;
			}
			
			//force is the type of chart we are creating
			var force = d3.layout.force()
				.charge(-120)
				.linkDistance(30)
				.size([width, height])
				.nodes(newVal.nodes)
				.links(newVal.links)
				.start();
			
			//run code for visualization
			//based on: http://bl.ocks.org/mbostock/4062045
			
			//create links between nodes
			var link = svg.selectAll(".link")
				.data(newVal.links)
				.enter().append("line")
				.attr("class", "link")
				.style("stroke-width", function(d) { return Math.sqrt(d.value); });

			//create nodes
			var node = svg.selectAll(".node")
				.data(newVal.nodes)
				.enter().append("circle")
				.attr("class", "node")
				.attr("r", 7)
				.style("fill", function(d) { return color(d.group); })
				.call(force.drag);

			//add title to nodes
			node.append("title")
			    .text(function(d) { return d.name; });

			//initialize the graphic
			force.on("tick", function() {
				link.attr("x1", function(d) { return d.source.x; })
					.attr("y1", function(d) { return d.source.y; })
					.attr("x2", function(d) { return d.target.x; })
					.attr("y2", function(d) { return d.target.y; });
	
			node.attr("cx", function(d) { return d.x; })
				.attr("cy", function(d) { return d.y; });
			});
		});
	}
	}
});