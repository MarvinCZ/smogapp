var markers;
$(document).ready(function(){
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 49.397, lng: 13.644},
        zoom: 8
    });
    var points = getData();
    var marker = new Point(map, 49.397, 13.644, 'name', 'x');
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
});
