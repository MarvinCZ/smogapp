$(document).ready(function(){
    var substances = ['O3', 'NO2', 'CO', 'SO2', 'PM10', 'PM2_5'];
    var filterMarkers = function(){
        var shown = [];
        var hasO3 =    $('input[name=filter_O3]').is(':checked');
        var hasNO2 =   $('input[name=filter_NO2]').is(':checked');
        var hasCO =    $('input[name=filter_CO]').is(':checked');
        var hasSO2 =   $('input[name=filter_SO2]').is(':checked');
        var hasPM10 =  $('input[name=filter_PM10]').is(':checked');
        var hasPM2_5 = $('input[name=filter_PM2_5]').is(':checked');
        var indexInterval = slider.noUiSlider.get();
        var conditionals = [hasO3, hasNO2, hasCO, hasSO2, hasPM10, hasPM2_5];

        for(var i = 0; i < markers.length; i++) {
            shown = false;

            for(var j = 0; j < conditionals.length; j++) {
                if(conditionals[j] && substances[j] in markers[i]['data'] && markers[i]['value'] >= indexInterval[0] && markers[i]['value'] <= indexInterval[1]) {
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