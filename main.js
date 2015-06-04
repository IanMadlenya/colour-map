var map;

function downloadSVG() {
    d3.select(this)
        .attr("download", "map.svg")
        .attr("href", "data:image/svg+xml;charset=utf-8;base64," + btoa(unescape(encodeURIComponent((new XMLSerializer).serializeToString(map.getSVG().attr("version", "1.1").attr("xmlns", "http://www.w3.org/2000/svg").node())))));
}

function initialize() {
    d3.select("#download-svg").on("click", downloadSVG);
    var regions_indices = {};
    var regions;
    if (dataInfo.regions==="USA") {
       regions_indices = [
            "Alabama",
            "Alaska",
            "Arizona",
            "Arkansas",
            "California",
            "Colorado",
            "Connecticut",
            "Delaware",
            "District of Columbia",
            "Florida",
            "Georgia",
            "Hawaii",
            "Idaho",
            "Illinois",
            "Indiana",
            "Iowa",
            "Kansas",
            "Kentucky",
            "Louisiana",
            "Maine",
            "Maryland",
            "Massachusetts",
            "Michigan",
            "Minnesota",
            "Mississippi",
            "Missouri",
            "Montana",
            "Nebraska",
            "Nevada",
            "New Hampshire",
            "New Jersey",
            "New Mexico",
            "New York",
            "North Carolina",
            "North Dakota",
            "Ohio",
            "Oklahoma",
            "Oregon",
            "Pennsylvania",
            "Rhode Island",
            "South Carolina",
            "South Dakota",
            "Tennessee",
            "Texas",
            "Utah",
            "Vermont",
            "Virginia",
            "Washington",
            "West Virginia",
            "Wisconsin",
            "Wyoming"
        ];
    } else {
        regions = regions_regions.regions;
        for (var region in regions) {
            if (regions.hasOwnProperty(region)) {
                regions_indices[regions[region].index] = region;
            }
        }
    }
    map = new Map({
        div: "#body",
        width: 1280,
        height: 800,
        year: 2009,
        zoomable: true,
        type: dataInfo.mapType || "map",
        colorHash: dataInfo.colorhash || "black",
        regions: dataInfo.regions,
        dollars: dataInfo.dollars,
        features: dataInfo.regions === "USA" ? usa_features.features : world_features.features
    });
    if (dataInfo.collapseRegions) {
        data = d3.nest().key(function(d) {
            return d.region;
        }).rollup(function(d) {
            return d3[dataInfo.collapseRegions](d, function(g) {
                return g.value;
            });
        }).entries(data).map(function(d) {
            return {
                region: d.key,
                value: d.values
            };
        });
    }
    dataInfo.min = 0;
    dataInfo.max = 0;
    data.forEach(function(d) {
        if (d.value > dataInfo.max) {
            dataInfo.max = d.value;
        }
        if (d.value < dataInfo.min) {
            dataInfo.min = d.value;
        }
        if (d.region || typeof(d.region_index)!=="undefined") {
            data.dim = 1;
        }
        if (d.region_from || typeof(d.region_from_index)!=="undefined") {
            data.dim = 2;
        }
        if (typeof(d.region_index)!=="undefined") {
            d.region = regions_indices[d.region_index-1];
        }
    });
    data.min = dataInfo.shownMin || dataInfo.min;
    data.max = dataInfo.shownMax || dataInfo.max;
    data.invalidColor = dataInfo.invalidColor || "none";
    data.colorStroke = dataInfo.colorstroke || "none";
    data.mean = dataInfo.mean;
    data.interpolate = dataInfo.interpolate;
    data.scaleDesc = dataInfo.scale || "linear";
    data.colorLow = dataInfo.colorLow || "rgb(247,251,255)";
    data.colorHigh = dataInfo.colorHigh || "rgb(8,48,107)";
    data.colorMean = dataInfo.colorMean;
    map.setData([data]);
}
