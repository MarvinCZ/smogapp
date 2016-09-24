function Point(map, lat, lng, name, value, data = {}) {
    this.map = map;
    this.lat = lat;
    this.lng = lng;
    this.name = name;
    this.value = value;
    this.shown = true;

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
        size = value * 5;
        if(value < 1)
            size = 20;

        this.marker = new google.maps.Marker({
          position: position,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillOpacity: 1,
            fillColor: this.getColor(),
            strokeOpacity: 1,
            strokeColor: '#000000',
            strokeWeight: 1,
            scale: size,
            anchor: new google.maps.Point(0, 0)
          },
          map: map
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

    this.hide = function(){
        if(this.shown)
            this.marker.setMap(null);
        this.shown = false;
    }

    this.show = function(){
        if(!this.shown)
            this.marker.setMap(this.map);
        this.shown = true;
    }

    this.createMarker();
}