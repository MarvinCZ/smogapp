function getData(){
    var lat = "";
    var long = "";
    var data = [];
    var measurements = {};
    var components;
    var index = 0;
    var name = '';
    var state = '';

    for(var h=0;h<realTimeJSON['States'].length;h++) {
        state = realTimeJSON['States'][h]['Code'];

        for(var i=0;i<realTimeJSON['States'][h]['Regions'].length;i++) {
            for(var j=0;j<realTimeJSON['States'][h]['Regions'][i]['Stations'].length;j++) {

                index = realTimeJSON['States'][h]['Regions'][i]['Stations'][j]['Ix'];
                name  = realTimeJSON['States'][h]['Regions'][i]['Stations'][j]['Name'];

                if(realTimeJSON['States'][h]['Regions'][i]['Stations'][j]['Code'] != ""){
                    lat        = realTimeJSON['States'][h]['Regions'][i]['Stations'][j]['Lat'];
                    long       = realTimeJSON['States'][h]['Regions'][i]['Stations'][j]['Lon'];
                    components = realTimeJSON['States'][h]['Regions'][i]['Stations'][j]['Components'];
                    measurements = {};
                    measurements["index"] = realTimeJSON['States'][h]['Regions'][i]['Stations'][j]['Ix'];

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