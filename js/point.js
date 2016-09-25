var limitTable = {
    'index': {min: 1, max: 6, reverted: false},
    'light': {min: 17.5, max: 21.7, reverted: true},
    'temperature': {min: -10, max: 30, reverted: true},
    'humidity': {min: 0.2, max: 0.8, reverted: false},
    'NO2': {min: 0, max: 500, reverted: false},
    'SO2': {min: 0, max: 625, reverted: false},
    'CO': {min: 0, max: 33000, reverted: false},
    'PM10': {min: 0, max: 150, reverted: false},
    'PM2_5': {min: 0, max: 220, reverted: false},
    'O3': {min: 0, max: 300, reverted: false}
};

function Point(map, lat, lng, name, type, data = {}) {
    this.map = map;
    this.lat = lat;
    this.lng = lng;
    this.name = name;
    this.type = type;
    this.shown = true;
    this.scale = 'index';
    this.scaleRate = null;
    this.data = data;

    this.getMarker = function(){
        if(!this.marker)
            this.createMarker();

        return this.marker;
    }

    this.createMarker = function(){
        position = {lat: this.lat, lng: this.lng};

        this.marker = new google.maps.Marker({
          position: position,
          map: map
        });
        this.setScale('index');

        this.tooltip = new Tooltip(this.map, this.marker, this.data, this.name);
        return this.marker;
    }

    this.getColor = function(){
        var red = 0;
        var green = 0;
        var blue = 0;
        var val;
        rate = this.getScaleRate();
        if(rate < 0) {
            return "#ffffff";
        }
        if(this.scale == 'humidity') {
            val   = rate * 200;
            red   = 140 - val / 1.5;
            green = 180 - val / 1.5;
            blue  = 230 - val / 1.5;
        } else if(this.scale == 'light') {
            val   = rate * 255;
            red   = 0 + val;
            green = 0 + val;
            blue  = 0 + val * 0.8;
        } else if(this.scale == 'temperature') {
            val   = rate * 200;
            red   = 255 - val;
            green = 55 + val;
            blue  = 0;
        } else {
            val   = rate * 200;
            red   =  55 + val;
            green = 255 - val;
            blue  = 37;
        }
        red = Math.round(red);
        red = red.toString(16).length == 2 ? red.toString(16) : "0"+red.toString(16);
        green = Math.round(green);
        green = green.toString(16).length == 2 ? green.toString(16) : "0"+green.toString(16);
        blue = Math.round(blue);
        blue = blue.toString(16).length == 2 ? blue.toString(16) : "0"+blue.toString(16);

        return "#" + red + green + blue; //55DEC -> 37HEX
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
        var strokeColor = this.type == 'chmi' ? '#000000' : '#313975';

        this.marker.setIcon({
            path: google.maps.SymbolPath.CIRCLE,
            fillOpacity: 1,
            fillColor: this.getColor(),
            strokeOpacity: 1,
            strokeColor: strokeColor,
            strokeWeight: 1,
            scale: this.getSize(),
            anchor: new google.maps.Point(0, 0)
        });

        this.marker.setZIndex(this.getSize());
    }

    this.getScaleRate = function(){
        if(this.scaleRate)
            return this.scaleRate;
        if(!this.data[this.scale] || !limitTable[this.scale]){
            this.scaleRate = -1;
            return -1;
        }

        var rate = this.data[this.scale] - limitTable[this.scale].min;
        rate /= (limitTable[this.scale].max - limitTable[this.scale].min);
        if(rate > 1)
            rate = 1;
        if(rate < 0)
            rate = 0;

        if(limitTable[this.scale].reverted)
            rate = 1 - rate;

        this.scaleRate = rate;
        return this.scaleRate;
    }

    this.getSize = function(){
        rate = this.getScaleRate();
        if(rate < 0)
            return 5;

        return rate * 20 + 5;
    }

    this.createMarker();
}