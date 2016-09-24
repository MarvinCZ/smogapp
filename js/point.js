function Point(map, lat, lng, name, value, data = {}) {
	this.map = map;
	this.lat = lat;
	this.lng = lng;
	this.name = name;
	this.value = value;
	this.data = data;

	this.getMarker = function(){
		if(!this.marker)
			this.createMarker();

		return this.marker;
	}

	this.createMarker = function(){
		position = {lat: this.lat, lng: this.lng};
		this.marker = new google.maps.Marker({
			map: this.map,
			position: position,
			title: this.name
		});
		return this.marker;
	}

	this.createMarker();
}