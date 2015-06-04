Map = function(settings) {
    var world,
        regions;
    var projection,
        path;
    var svg,
        g,
        selected,
        countries;
    var width = settings.width,
        height = settings.height;
    var factor = 1;//800/280;
    var colorBar = {
        stepWidth: 50 * factor,
        stepHeight: 20 * factor,
        stepGap: 10 * factor,
        stepCount: 7,
        x: 770,//3500,
        y: 600//3500
    };
    var year;
    var m0,
        r0;
    var that = this;
    var data = settings.data;
    var type;

    svg = d3.select(settings.div).append("svg:svg")
        .attr("width", settings.width)
        .attr("height", settings.height);
    var defs = svg.append('defs');
    var hash = defs.append("pattern")
        .attr('id', 'hash')
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', '5')
        .attr('height', '5')
        .attr("x", 0).attr("y", 0)
        .append("g").style("fill", "none").style("stroke", settings.colorHash);
    hash.append("path").attr("d", "M-5,5 l10,-10");
    hash.append("path").attr("d", "M0,10 l10,-10");
    hash.append("path").attr("d", "M5,0 l-5,5");
    g = svg.append("svg:g");
    svg.append("style").attr("type", "text/css").text(map_css);
    colorBar.element = svg.append("svg:g");

    countries = g.selectAll("path.country");

    this.loadMap = function(year) {
        world = settings.features;
        regions = regions_regions.regions;
        world.forEach(function (country) {
            var area;
            var centroid;
            if (country.geometry.type === "Polygon") {
                area = d3.geo.area(country.geometry);
                centroid = d3.geo.centroid(country.geometry);
            } else if (country.geometry.type === "MultiPolygon") {
                area = 0;
                country.geometry.coordinates.forEach(function (polygon) {
                    var polygon_ = {
                        "type": "Polygon",
                        "coordinates": polygon
                    };
                    var area_ = d3.geo.area(polygon_);
                    if (area_ > area) {
                        area = area_;
                        centroid = d3.geo.centroid(polygon_);
                    }
                });
            }
            country.centroid = centroid;

            for (var region in regions) {
                if (regions.hasOwnProperty(region)) {
                    if (regions[region].map && regions[region].map.indexOf(country.properties.name) !== -1) {
                        if (!regions[region].centroid_area) {
                            regions[region].centroid_area = 0;
                        }
                        if (regions[region].centroid_area < area) {
                            regions[region].centroid = centroid;
                        }
                    }
                }
            }
        });

        countries = countries.data(world);
        countries.exit().remove();
        countries = countries
            .enter()
            .append("svg:path")
            .attr("class", "country")
            .attr("d", path)
            .attr("fill", "#8E908F")
            .attr("alt", function(d) { return d.properties.name; });

        if (settings.clickable) {
            countries
                .attr("class", "country hoverable")
                .on('mouseover', function(d) {
                    //$(settings.div).trigger("country_hover", [d, selected]);
                })
                .on('mouseout', function(d) {
                    //$(settings.div).trigger("country_hover", [null, selected]);
                });
            countries.on('click', country_click);
        }
        if (data) {
            that.setData(data);
        }
        //$(settings.div).removeClass("waiting");
    };
    
    if (typeof(settings.year)!=="undefined") {
        this.loadMap(settings.year);
    }

    this.setType = function(type_) {
        type = type_;

        if (settings.regions === "USA") {
            projection = d3.geo.albersUsa()
                .scale(1000)
                .translate([ width/2, height/2-100 ]);
        } else {
                if (type === "globe") {
                    projection = d3.geo.projection(d3.geo.orthographic.raw)
                        .clipAngle(90)
                        .scale(380)
                        .translate([ width/2, height/2 ]);
                } else {
                    projection = d3.geo.projection(d3.geo.equirectangular.raw)
                        .scale(200)
                        .translate([ width/2, height/2 ]);
                }
        }
        path = d3.geo.path().projection(projection);
        refresh();
    };

    this.setType(settings.type);
    
    var arcs,
        arc_scale,
        arc;
    var color_scale;

    this.setData = function(data_) {
        data = data_;
        if (!world || !regions) {
            return;
        }
        data.forEach(function(data) {
            switch (data.dim) {
                case 1:
                    if (data.scale) {
                        color_scale = data.scale;
                    } else {
                        if (typeof(data.min) === "undefined") {
                            data.min = d3.min(data, function(d) { return d.value; });
                        }
                        if (typeof(data.max) === "undefined") {
                            data.max = d3.max(data, function(d) { return d.value; });
                        }
                        if (typeof(data.mean) === "undefined") {
                            data.mean = d3.mean(data, function(d) { return d.value; });
                        }
                        if (data.scaleDesc==="log") {
                            if (data.colorMean) {
                                color_scale = d3.scale.log().domain([+data.min+0.0000001, +data.mean, +data.max]);
                            } else {
                                color_scale = d3.scale.log().domain([+data.min+0.0000001, +data.max]);
                            }
                        } else {
                            if (data.colorMean) {
                                color_scale = d3.scale.linear().domain([+data.min, +data.mean, +data.max]);
                            } else {
                                color_scale = d3.scale.linear().domain([+data.min, +data.max]);
                            }
                        }
                        if (data.colorMean) {
                            color_scale
                                .clamp(true)
                                .range([data.colorLow, data.colorMean, data.colorHigh]);
                        } else {
                            color_scale
                                .clamp(true)
                                .range([data.colorLow, data.colorHigh]);
                        }
                        color_scale.nice();
                        if (data.interpolate && d3["interpolate" + data.interpolate]) {
                            color_scale.interpolate(d3["interpolate" + data.interpolate]);
                        }
					    var format_ = d3.format("n");
				        var formatFlow = function(v) {
				            var s = "";
				            v *= 1e3;
				            if (v >= 1000) {
				                s = "k";
				                v /= 1000;
				                if (v >= 1000) {
				                    s = "M";
				                    v /= 1000;
				                    if (v > 1000) {
				                        s = "G";
				                        v /= 1000;
				                    }
				                }
				            }
				            v = v.toPrecision(3);
				            return format_(v) + " " + s + "$";
				        };
			            var format = function(v) {
				            if (v > 1e-5) {
				                v = Math.round(v*1e5)/1e5;
				            }
				            return format_(v);
				        };
                        data.nice_min = color_scale.domain()[0];
                        data.nice_max = color_scale.domain()[data.colorMean ? 2 : 1];
                        for (var i = 0; i < colorBar.stepCount+1; i++) {
                            var value = data.nice_min + i*(data.nice_max-data.nice_min)/colorBar.stepCount;
                            value = Math.round(value * 100) / 100;
                            colorBar.element.append("svg:rect")
                                .attr("x", i*(colorBar.stepWidth + colorBar.stepGap) + colorBar.x)
                                .attr("y", colorBar.y)
                                .attr("width", colorBar.stepWidth)
                                .attr("height", colorBar.stepHeight)
                                .attr("stroke-width", "1")
                                .attr("style", "stroke:#999;stroke-linecap: round;fill:" + color_scale(value) + ";");
                            colorBar.element.append("svg:text")
                                .attr("x", i*(colorBar.stepWidth + colorBar.stepGap) + colorBar.stepWidth/2 + colorBar.x)
                                .attr("y", colorBar.stepHeight * 2 + colorBar.y)
                                .attr("dy", "0em")
                                //.attr("style", "text-anchor:middle;font-family:\"Gillius ADF\";font-size:70px;fill:#999;")
                                .attr("style", "text-anchor:middle;font-family:\"Arial\";font-size:16px;fill:#333;")
                                .text(settings.dollars ? "" + formatFlow(value) : "" + Math.round(value*10000)/10000);
                        }
                    }
                    var dataMap = {
                        min: data.min,
                        max: data.max
                    };
                    data.forEach(function(d) {
                        if (settings.regions === "USA") {
                            dataMap[d.region] = d;
                        } else {
                            if (regions[d.region]) {
                                regions[d.region].map.forEach(function(c) {
                                    dataMap[c] = d;
                                });
                            } else {
                                console.error(d.region + " not found");
                            }
                        }
                    });
                    countries.attr("fill", function(d) {
                        return typeof(dataMap[d.properties.name])==='undefined' ? data.invalidColor : (dataMap[d.properties.name].color || color_scale(dataMap[d.properties.name].value));
                    });
                    countries.attr("stroke", function(d) {
                        return data.colorStroke;
                    });
                    countries.attr("class", function(d) {
                        return d.properties.name=="Antarctica" ? "hidden" : "";
                    });
                    break;
                case 2:
                    arc = d3.geo.greatArc()
                        .source(function(d) { return regions[d.region_from].centroid || []; })
                        .target(function(d) { return regions[d.region_to].centroid || []; });
                    if (data.scale) {
                        arc_scale = data.scale;
                    } else {
                        if (typeof(data.min) === "undefined") {
                            data.min = d3.min(data, function(d) { return d.value; });
                        }
                        if (typeof(data.max) === "undefined") {
                            data.max = d3.max(data, function(d) { return d.value; });
                        }
                        arc_scale = d3.scale.log()
                            .domain([data.min, data.max])
                            .range([0, 10]);
                    }
                    arcs = svg.selectAll("path.arc")
                        .data(flows)
                        .enter()
                        .append("svg:path")
                        .attr("class", "arc");
                    break;
            }
        });
        refresh();
    };
    
    var zoom;
    
    if (settings.zoomable) {
        zoom = d3.behavior.zoom()
            .scaleExtent([1, 4])
            .on("zoom", function() {
                var t = d3.event.translate,
                    s = d3.event.scale;
                /*path.projection().scale((type==="globe" ? 200 : 80)*s);
                if (type!=="globe") {
                    path.projection().translate([t[0]+width/2,t[1]+height/2]);
                }
                refresh();*/
                if (type==="globe") {
                    if (d3.event.sourceEvent.type=="mousemove") {
                        path.projection().rotate([t[0]/Math.PI/s,-t[1]/Math.PI/s,0]);
                    } else {
                        var tmp = path.projection().rotate();
                        zoom.translate([tmp[0]*Math.PI*s,-tmp[1]*Math.PI*s]);
                        path.projection().scale(380*s);
                    }
                    refresh();
                } else {
                    if (d3.event.sourceEvent.type=="mousemove") {
                        path.projection().rotate([(.0+t[0])/3.5/s,0,0]);
                    } else {
                        var tmp = path.projection().rotate();
                        path.projection().rotate([(.0+t[0])/3.5/s,0,0]);
                    }
                    g.attr("transform", "translate(0," + t[1] + ") scale(" + s + ")").style("stroke-width", 1 / s + "px");
                    refresh();
                }
            });
        svg.call(zoom);
    }

    function country_click(d) {
      /*if (selected) {
          selected.classed('selected', false).transition().attr('transform', 'translate(0, 0) scale(1)').style('fill', '');
          if (selected[0][0] === this) {
              selected = undefined;
              if (country_click) {
                  country_click();
              }
              return;
          }
      }
      selected = d3.select(this);
      var svg = this.parentNode;
    
      //Zoom
      var centroid = path.centroid(d);
      var x = centroid[0] / 2, y = centroid[1] / 2;
    
      //move element to end of SVG so that it's drawn last of all
      svg.appendChild(this);
    
      selected.classed('selected', true).transition().attr('transform', 'translate(-'+x+',-'+y+') scale(1.5)').style('fill', 'red');
      */

        var x, y, k;
        if (d && selected !== d) {
            var centroid = path.centroid(d);
            var bounds = path.bounds(d);
            x = centroid[0];
            y = centroid[1];
            k = Math.min(5.5, 120 / Math.min(Math.abs(bounds[0][0] - bounds[1][0]), Math.abs(bounds[0][1] - bounds[1][1])));
            selected = d;
        } else {
            x = width / 2;
            y = height / 2;
            k = 1;
            selected = null;
        }
        g.selectAll("path").classed("selected", selected && function(d) { return d === selected; });
        g.transition().duration(1000).attr("transform", "translate(" + width / 2 + "," + height / 2 + ") scale(" + k + ") translate(" + -x + "," + -y + ")").style("stroke-width", 1 / k + "px");
        //$(settings.div).trigger("country_click", [d, selected]);
        refresh();
    }
    
    this.getSVG = function() {
        return svg;
    };

    function refresh() {
        countries.attr("d", function(d) { 
            var p = path(d);
            return p ? p:"M 0 0";
        });
        if (arcs) {
            arcs.attr("d", function(d) {
                    var p = path(arc(d));
                    return p ? p:"M 0 0";
                })
                .attr("stroke-width", function(d) {
                    return arc_scale(d.value);
                });
        }
    }
    
    refresh();

    return this;
};
