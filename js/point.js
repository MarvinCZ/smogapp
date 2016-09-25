function Point(map, lat, lng, name, value, data = {}) {
    this.map = map;
    this.lat = lat;
    this.lng = lng;
    this.name = name;
    this.value = value;
    this.shown = true;
    this.scale = 'index';
    this.scaleRate = null;

    this.limitTable = {
        'index': {min: 1, max: 6},
        'light': {min: 1, max: 20},
        'temperature': {min: -20, max: 40},
        'humidity': {min: 0, max: 1},
        'NO2': {min:0, max: 67}
    };

    this.data = data;
    this.data['index'] = value;

    this.getMarker = function(){
        if(!this.marker)
            this.createMarker();

        return this.marker;
    }

    this.createMarker = function(){
        position = {lat: this.lat, lng: this.lng};

        this.marker = new google.maps.Marker({
          position: position,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillOpacity: 1,
            fillColor: this.getColor(),
            strokeOpacity: 1,
            strokeColor: '#000000',
            strokeWeight: 1,
            scale: this.getSize(),
            anchor: new google.maps.Point(0, 0)
          },
          zIndex: this.getScaleRate() * 20,
          map: map
        });
        this.tooltip = new Tooltip(this.map, this.marker, this.data, this.name);
        return this.marker;
    }

    this.getColor = function(){
        rate = this.getScaleRate();
        if(rate < 0)
            return "#ffffff";

        var val = Math.round(rate * 200);
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

    this.setScale = function(type){
        this.scaleRate = null;
        this.scale = type;

        this.marker.setIcon({
            path: google.maps.SymbolPath.CIRCLE,
            fillOpacity: 1,
            fillColor: this.getColor(),
            strokeOpacity: 1,
            strokeColor: '#000000',
            strokeWeight: 1,
            scale: this.getSize(),
            anchor: new google.maps.Point(0, 0)
        });

        this.marker.setZIndex(this.getSize());
    }

    this.getScaleRate = function(){
        if(this.scaleRate)
            return this.scaleRate;
        if(!this.data[this.scale] || !this.limitTable[this.scale]){
            this.scaleRate = -1;
            return -1;
        }

        var rate = this.data[this.scale] - this.limitTable[this.scale].min;
        rate /= (this.limitTable[this.scale].max - this.limitTable[this.scale].min);
        if(rate > 1)
            rate = 1;
        if(rate < 0)
            rate = 0;

        this.scaleRate = rate;
        return rate;
    }

    this.getSize = function(){
        rate = this.getScaleRate();
        if(rate < 0)
            return 5;

        return rate * 20 + 5;
    }

    this.createMarker();
}