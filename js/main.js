var markers;
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
    var points = getData();
    markers = [];
    for(var i=0;i<points.length;i++) {
        markers.push(new Point (
            map,
            parseFloat(points[i]['lat']),
            parseFloat(points[i]['long']),
            points[i]['name'],
            points[i]['index'],
            points[i]['data']
        ));
    }
    for(var i=0;i<points2.length;i++) {
        markers.push(new Point (
            map,
            parseFloat(points2[i]['lat']),
            parseFloat(points2[i]['long']),
            points2[i]['name'],
            points2[i]['index'],
            points2[i]['data']
        ));
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
        var type = $(this).val();
        for(var i = 0; i < markers.length; i++) {
            markers[i].setScale(type);
        }
    });
});