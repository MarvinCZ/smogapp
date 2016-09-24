$(document).ready(function(){
    var substances = ['O3', 'NO2', 'CO', 'SO2', 'PM10', 'PM2_5'];

    $('div.checkbox.subst > label > input').change(function(){
        var shown = [];
        var hasO3 = $('div.checkbox.subst > label > input[name=O3]').is(':checked');
        var hasNO2 = $('div.checkbox.subst > label > input[name=NO2]').is(':checked');
        var hasCO = $('div.checkbox.subst > label > input[name=CO]').is(':checked');
        var hasSO2 = $('div.checkbox.subst > label > input[name=SO2]').is(':checked');
        var hasPM10 = $('div.checkbox.subst > label > input[name=PM10]').is(':checked');
        var hasPM2_5 = $('div.checkbox.subst > label > input[name=PM2_5]').is(':checked');
        var conditionals = [hasO3, hasNO2, hasCO, hasSO2, hasPM10, hasPM2_5];

        for(var i = 0; i < markers.length; i++) {
            shown = false;

            for(var j = 0; j < conditionals.length; j++) {
                if(conditionals[j] && substances[j] in markers[i]['data']) {
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
    });
});