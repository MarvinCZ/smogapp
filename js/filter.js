var isInRange = function(type, value, filter){
    if(!limitTable[type])
        return true;

    if(limitTable[type].min >= filter[0] && limitTable[type].max <= filter[1])
        return true;

    return value >= filter[0] && value <= filter[1];
}
$(document).ready(function(){
    var validators = ['O3', 'NO2', 'CO', 'SO2', 'PM10', 'PM2_5', 'temperature', 'humidity', 'light'];
    var filterMarkers = function(){
        var shown = [];
        var hasO3 =    $('input[name=filter_O3]').is(':checked');
        var hasNO2 =   $('input[name=filter_NO2]').is(':checked');
        var hasCO =    $('input[name=filter_CO]').is(':checked');
        var hasSO2 =   $('input[name=filter_SO2]').is(':checked');
        var hasPM10 =  $('input[name=filter_PM10]').is(':checked');
        var hasPM2_5 = $('input[name=filter_PM2_5]').is(':checked');
        var hasTemperature = $('input[name=filter_temperature]').is(':checked');
        var hasHumidity =    $('input[name=filter_humidity]').is(':checked');
        var hasLight =       $('input[name=filter_light]').is(':checked');
        var indexInterval = slider.noUiSlider.get();
        var conditionals = [hasO3, hasNO2, hasCO, hasSO2, hasPM10, hasPM2_5, hasTemperature, hasHumidity, hasLight];

        for(var i = 0; i < markers.length; i++) {
            shown = false;

            for(var j = 0; j < conditionals.length; j++) {
                var scale = scaleType;
                if(conditionals[j] && validators[j] in markers[i]['data'] &&
                    isInRange(scale, markers[i]['data'][scale], indexInterval)) {

                    shown = true;
                    break;
                }
            }

            if(shown) {
                markers[i].show();
            } else {
                markers[i].hide();
            }
        }
    };

    $('input[type=checkbox]').change(filterMarkers);
    document.getElementById('slider').noUiSlider.on('update', filterMarkers);
});