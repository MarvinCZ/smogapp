function latlngToPoint(map, latLng) {
    var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
    var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
    var scale = Math.pow(2, map.getZoom());
    var worldPoint = map.getProjection().fromLatLngToPoint(latLng);
    var point = new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
    return point;
}

var tooltip;
var mapParent;
var substTransTable = {
    NO2: 'NO<span class=subscript>2</span>',
    CO: 'CO',
    SO2: 'SO<span class=subscript>2</span>',
    O3: 'O<span class=subscript>3</span>',
    PM10: 'PM<span class=subscript>10</span>',
    PM2_5: 'PM<span class=subscript>2.5</span>'
}

$(document).ready(function(){
	tooltip = $('#tooltip');
	mapParent = $('body');	
});

function Tooltip(map, marker, data, name){
	this.minMargin = 50;
	this.marker = marker;
	this.map = map;
	this.data = data;
	this.name = name;
	this.point = null;

	var self = this;

	this.show = function(){
		tooltip.data('active', this.id);
		var output = "<table class='table table-striped'><tr><th colspan=2>" + this.name + "</th></tr>";
		for(var key in this.data) {
			output += "<tr><th>" + substTransTable[key] + "</th><td>" + this.data[key] + "</td></th>"
		}
		output += "</table>"

		tooltip.html(output);

		this.reposition();
		tooltip.show();
	}

	this.reposition = function(){
		var top = this.point.y - tooltip.height()/2;
		if(top < this.minMargin){
			top = this.minMargin;
		}
		if($(window).height() - top - tooltip.height() < this.minMargin){
			top = $(window).height() - tooltip.height() - this.minMargin;
		}
		tooltip.css({
			'top': top,
			'left': this.point.x + 20
		});
	}

	this.repositionToPoint = function(x, y){
		this.point = {x: x, y: y};
		this.reposition();
	}

	this.hide = function(){
		tooltip.hide();
	}


	if(this.marker !== null && typeof this.marker !== 'undefined'){
		google.maps.event.addListener(this.marker, "mouseover", function(){
			var position = this.center;
			if(typeof position === 'undefined')
				position = this.position;
			var point = latlngToPoint(self.map, position);
			var offset = mapParent.offset();
			self.repositionToPoint(point.x + offset.left, point.y + offset.top)
			self.show();
		});
		google.maps.event.addListener(this.marker, "mouseout", function(){
			self.hide();
		});
	}
}