const request = require('request');

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW1vbDAyOTYiLCJhIjoiY2t3a2YzaDVlMXJpeDJucXZ6eXVqMXJudCJ9.kR3kF29Gs1u365H9Th-GGg&limit=1'

    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to location service!',undefined);
        }else if(response.body.features.length === 0){
            callback('Unable to find location. try another search',undefined);
        }else{
            callback(undefined,{
                latitude: response.body.features[0].geometry.coordinates[1],
                longitude:response.body.features[0].geometry.coordinates[0],
                location: response.body.features[0].place_name
            })

        }
    })
}

module.exports = geocode