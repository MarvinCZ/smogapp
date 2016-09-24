$(document).ready(function(){
	var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
	var marker = new Point(map, -34.397, 150.644, 'name', 'x');
})