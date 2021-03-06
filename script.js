var   w = 1000,
      h =  800;
      circleWidth = 4;

var palette = {
      "lightgray": "#EDF5E1",
      "gray": "#FFFFFF",
      "mediumgray": "#FFFFFF",
      "blue": "#FFFFFF"
  }

var colors = d3.scale.ordinal() // D3 Version 4
.range(["#05386B", "#379683" , "#8EE4AF"]);

var nodes = [
      { name: "Sustainability", target: [0, 1], value: 65 },
      { name: "IT \n Consulting", target: [0], value: 65 },
      { name: "Business Consulting", target: [0, 1], value: 95 },
      { name: "Industry 4.0", target: [0, 1, 2], value: 55 },
      { name: "M2M", target: [0, 3], value: 40 },
      { name: "Machine Learning", target: [0,3,4], value: 90 },
      { name: "APP/API", target: [0,3,4,5], value: 40  },
      { name: "Ai", target: [0, 1, 2], value: 40 },
      { name: "Cyber Security", target: [0, 1, 2, 8], value: 70 },
      //{ name: "", target: [0,1,2], value: 20 },
      { name: "About", target: [0,1,2,3,9], value: 45 },
      { name: "Contact", target: [0,1,2,3,4,5,6,7,8,10], value: 45 },
      { name: "", target: [0,1,2,7,8 ], value: 16 },
      { name: "", target: [0,1,2,7,8], value: 25 },
      { name: "", target: [0,1,2,3,4,5,6,7,8,9,10,11,12], value: 35 },
      { name: "", target: [0,1,2,7,8], value: 25 },
      { name: "", target: [0,1,2,12], value: 25 },
      { name: "", target: [0,9,10], value: 20 },
      { name: "", target: [0,9,10], value: 37 },
];

var links = [];

for (var i = 0; i < nodes.length; i++){
      if (nodes[i].target !== undefined) {
            for ( var x = 0; x < nodes[i].target.length; x++ )
              links.push({
                  source: nodes[i],
                  target: nodes[nodes[i].target[x]]
              });
      };
};


var myChart = d3.select('body')
      .append("div")
        .classed("svg-container", true)

      .append('svg')
        .attr({
            "width": "100%",
            "height": "100%"
            })
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 1000 800")
        .classed("svg-content-responsive", true)


var force = d3.layout.force()
      .nodes(nodes)
      .links([])
      .gravity(0.1)
      .charge(-1000)
      .size([w,h]);

      var link = myChart.selectAll('line')
            .data(links).enter().append('line')
            .attr('stroke', palette.lightgray)
            .attr('strokewidth', '1');

      var node =  myChart.selectAll('circle')
            .data(nodes).enter()
            .append('g')
            .call(force.drag);


     node.append('circle')
            .attr('cx', function(d){return d.x; })
            .attr('cy', function(d){return d.y; })
            .attr('r', function(d,i){
                  console.log(d.value);
                  if ( i > 0 ) {
                        return circleWidth + d.value;
                  } else {
                        return circleWidth + d.value;
                  }
            })
            .attr('fill', function(d,i){
                  if ( i > 0 ) {
                        return colors(i);
                  } else {
                        return colors(i);
                  }
            })
            .attr('strokewidth', function(d,i){
                  if ( i > 0 ) {
                        return '0';
                  } else {
                        return '2';
                  }
            })
            .attr('stroke', function(d,i){
                  if ( i > 0 ) {
                        return '';
                  } else {
                        return 'black';
                  }
            });


      force.on('tick', function(e){
            node.attr('transform', function(d, i){
              return 'translate(' + d.x + ','+ d.y + ')'
            })

          link
              .attr('x1', function(d){ return d.source.x; })
              .attr('y1', function(d){ return d.source.y; })
              .attr('x2', function(d){ return d.target.x; })
              .attr('y2', function(d){ return d.target.y; })
      });


      node.append('text')
            .text(function(d){ return d.name; })
            .attr('font-family', 'Raleway', 'Helvetica Neue, Helvetica')
            .attr('fill', function(d, i){
              console.log(d.value);
                  if ( i > 0 && d.value < 10 ) {
                        return palette.mediumgray;
                  } else if ( i > 0 && d.value >10 ) {
                        return palette.mediumgray;
                  } else {
                        return palette.blue;
                  }
            })
            .attr('text-anchor', function(d, i) {
                  return 'middle';
            })
            .attr('font-size', function(d, i){
                  if (i > 0) {
                        return '1.3em';

                  } else {
                        return '1.3em';
                  }
            })
            .on("click", function(d, i) {
                  if (i == 0) {
                        window.open("http://google.com");
                  } if (d.name == "About") {
                        window.open("https://stackoverflow.com");
                  } if (d.name == "Contact") {
                        window.open("https://facebook.com");
                  }
            });


force.start();