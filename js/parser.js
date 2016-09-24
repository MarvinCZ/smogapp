function getData(){
    var lat = "";
    var long = "";
    var data = [];
    var measurements = {};
    var cz = json['States'][0];
    var components;
    var index = 0;
    var name = '';
    for(var i=0;i<cz['Regions'].length;i++) {
        for(var j=0;j<cz['Regions'][i]['Stations'].length;j++) {
            index = cz['Regions'][i]['Stations'][j]['Ix'];
            name = cz['Regions'][i]['Stations'][j]['Name'];
            if(cz['Regions'][i]['Stations'][j]['Code'] != ""){
                lat = cz['Regions'][i]['Stations'][j]['Lat'];
                long = cz['Regions'][i]['Stations'][j]['Lon'];
                components = cz['Regions'][i]['Stations'][j]['Components'];
                measurements = {};
                for(var k=0;k<components.length;k++) {
                    if(k == 5) continue;
                    if(components[k]['Ix'] > 0) {
                        measurements[components[k]['Code']] = [components[k]['Val']];
                    }
                }
                data.push({name: name, index: index, lat: lat, long: long, data: measurements});
            }
        }
    }
    return data;
}