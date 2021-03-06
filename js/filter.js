var isInRange = function(value, filter){
    type = scaleType;
    if(!limitTable[type])
        return true;

    var min = parseFloat(filter[0]);
    var max = parseFloat(filter[1]);

    if(limitTable[type].min >= min && limitTable[type].max <= max)
        return true;

    return value >= min && value <= max;
}
var filterMarkers;
$(document).ready(function(){
    var validators = ['O3', 'NO2', 'CO', 'SO2', 'PM10', 'PM2_5', 'temperature', 'humidity', 'light'];
    filterMarkers = function(){
        var toHide = [];
        var shown = [];
        var hasO3    = $('input[name=filter_O3]').is(':checked');
        var hasNO2   = $('input[name=filter_NO2]').is(':checked');
        var hasCO    = $('input[name=filter_CO]').is(':checked');
        var hasSO2   = $('input[name=filter_SO2]').is(':checked');
        var hasPM10  = $('input[name=filter_PM10]').is(':checked');
        var hasPM2_5 = $('input[name=filter_PM2_5]').is(':checked');
        var hasTemperature = $('input[name=filter_temperature]').is(':checked');
        var hasHumidity    = $('input[name=filter_humidity]').is(':checked');
        var hasLight       = $('input[name=filter_light]').is(':checked');
        var indexInterval  = slider.noUiSlider.get();
        var conditionals   = [hasO3, hasNO2, hasCO, hasSO2, hasPM10, hasPM2_5, hasTemperature, hasHumidity, hasLight];

        var typeChmi = $('input[name=type_chmi]').is(':checked');
        var typeBox  = $('input[name=type_box]').is(':checked');

        for(var i = 0; i < markers.length; i++) {
            shown = false;

            for(var j = 0; j < conditionals.length; j++) {
                var scale = scaleType;
                if(conditionals[j] && validators[j] in markers[i]['data'] &&
                    isInRange(markers[i]['data'][scale], indexInterval) &&
                    ((markers[i]['type'] == "chmi" && typeChmi) || (markers[i]['type'] == "box" && typeBox)) &&
                    markers[i]['time'] == boxTime) {
                    shown = true;
                    break;
                }
            }

            if(shown) {
                markers[i].show();
            } else {
                toHide.push(i);
            }
        }

        setTimeout(function(){
            for(var i = 0; i < toHide.length; i++){
                markers[toHide[i]].hide();
            }
        }, 500);
    };

    $('input[type=checkbox]').change(filterMarkers);
    document.getElementById('slider').noUiSlider.on('update', filterMarkers);
});