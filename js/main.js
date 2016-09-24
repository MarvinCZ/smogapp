$(document).ready(function(){
	var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 12
    });
	new Point(map, -34.39, 150.624, 'name', 6, {
		a: 't',
		b: 't',
		c: 't',
		d: 't',
		e: 't',
		f: 't',
		g: 't'
	});
	new Point(map, -34.39, 150.644, 'name', 5, {a: 't'});
	new Point(map, -34.39, 150.664, 'name', 4, {a: 't'});
	new Point(map, -34.39, 150.684, 'name', 3, {a: 't'});
	new Point(map, -34.39, 150.704, 'name', 2, {a: 't'});
	new Point(map, -34.39, 150.724, 'name', -1, {a: 't'});
})