var markers;
var scaleType = 'index';
var boxTime = 0;
$(document).ready(function(){
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 49.901, lng: 16.097},
        zoom: 7
    });
    var slider = document.getElementById('slider');
    noUiSlider.create(slider, {
        start: [0, 6],
        step: 1,
        connect: true,
        tooltips: [true, true],
        range: {
            'min': 0,
            'max': 6
        }
    });
    var timeSlider = document.getElementById('time-slider');
    noUiSlider.create(timeSlider, {
        start: 0,
        step: 1,
        tooltips: true,
        range: {
            'min': 0,
            'max': 3
        }
    });
    var points = getData();
    markers = [];
    for(var i=0;i<points.length;i++) {
        markers.push(new Point (
            map,
            parseFloat(points[i]['lat']),
            parseFloat(points[i]['long']),
            points[i]['name'],
            'chmi',
            points[i]['data']
        ));
    }

    for(var i = 0; i < boxdata.length; i++){
        for(var j = 0; j < boxdata[i].length; j++){
            markers.push(new Point (
                map,
                parseFloat(boxdata[i][j]['lat']),
                parseFloat(boxdata[i][j]['long']),
                boxdata[i][j]['name'],
                'box',
                boxdata[i][j]['data'],
                i
            ));
        }
    }

    $('.pin-aside').hide();
    $('.hide-aside').hide();

    $('aside').hover(function(){
        var pinned = $('aside').hasClass('pinned');
        if(!pinned){
            $('.pin-aside').show();
            $('.show-aside').hide();
        }
    },function(){
        var pinned = $('aside').hasClass('pinned');
        if(!pinned){
            $('.pin-aside').hide();
            $('.show-aside').show();
        }
    })

    $('aside .icon').click(function(){
        $('aside').toggleClass('pinned');
        $('.map-container').toggleClass('map-container-pinned');

        var pinned = $('aside').hasClass('pinned');

        if(pinned){
            $('.pin-aside').hide();
            $('.hide-aside').show();
        }
        else{
            $('.pin-aside').show();
            $('.hide-aside').hide();
        }

    });

    $('#scale').change(function(){
        scaleType = $(this).val();
        for(var i = 0; i < markers.length; i++) {
            markers[i].setScale(scaleType);
        }
        slider.noUiSlider.updateOptions({
            range: {
                'min': limitTable[scaleType].min,
                'max': limitTable[scaleType].max
            },
            step: scaleType == 'index' ? 1 : 0.1,
            start: [limitTable[scaleType].min, limitTable[scaleType].max]
        });
    });

    $('#scale').val('index');

    document.getElementById('time-slider').noUiSlider.on('update', function(data){
        boxTime = parseInt(data[0]);
        if(filterMarkers)
            filterMarkers();
    });

    var ticker;

    $('#animate').click(function(){
        timeSlider.noUiSlider.set(0);
        ticker = setInterval(function(){
            var value = parseInt(timeSlider.noUiSlider.get()[0]);
            value += 1;
            if(value >= 4){
                value = 0;
                clearInterval(ticker);
            }
            timeSlider.noUiSlider.set(value);
        }, 1000);
    });
});