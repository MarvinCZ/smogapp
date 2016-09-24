function getData(){
    var lat = "";
    var long = "";
    var data = [];
    var measurements = {};
    var components;
    var index = 0;
    var name = '';
    var state = '';

    for(var h=0;h<json['States'].length;h++) {
        state = json['States'][h]['Code'];

        for(var i=0;i<json['States'][h]['Regions'].length;i++) {
            for(var j=0;j<json['States'][h]['Regions'][i]['Stations'].length;j++) {

                index = json['States'][h]['Regions'][i]['Stations'][j]['Ix'];
                name  = json['States'][h]['Regions'][i]['Stations'][j]['Name'];

                if(json['States'][h]['Regions'][i]['Stations'][j]['Code'] != ""){
                    lat        = json['States'][h]['Regions'][i]['Stations'][j]['Lat'];
                    long       = json['States'][h]['Regions'][i]['Stations'][j]['Lon'];
                    components = json['States'][h]['Regions'][i]['Stations'][j]['Components'];
                    measurements = {};

                    for(var k=0;k<components.length;k++) {
                        if((components[k]['Ix'] > 0 || components[k]['Ix'] < -1) && components[k]['Val']) {
                            measurements[components[k]['Code']] = [components[k]['Val']];
                        }
                    }

                    data.push({state: state, name: name, index: index, lat: lat, long: long, data: measurements});
                }
            }
        }
    }
    return data;
}