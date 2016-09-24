function Point(map, lat, lng, name, value, data = {}) {
    this.map = map;
    this.lat = lat;
    this.lng = lng;
    this.name = name;
    this.value = value;
    if(this.value > 6)
        this.value = 6;
    this.data = data;

    this.getMarker = function(){
        if(!this.marker)
            this.createMarker();

        return this.marker;
    }

    this.createMarker = function(){
        position = {lat: this.lat, lng: this.lng};
        size = value * 100;
        if(value < 1)
            size = 400;
        this.marker = new google.maps.Circle({
            strokeColor: "#000000",
            strokeOpacity: 1,
            strokeWeight: 1,
            fillColor: this.getColor(),
            fillOpacity: 1,
            map: map,
            center: position,
            radius: size
        });
        this.tooltip = new Tooltip(this.map, this.marker, this.data, this.name);
        return this.marker;
    }

    this.getColor = function(){
        if(this.value < 1)
            return "#FFFFFF";

        var val = (this.value - 1) * 40;
        var red   =  55 + val;
        var green = 255 - val;

        return "#" + red.toString(16) + green.toString(16) + "37"; //55DEC -> 37HEX
    }

    this.createMarker();
}