const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=b51b04e87d25bb184cbc28f829085591&query='+latitude+','+longitude
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to weather server');

        } else if(response.body.error){
            callback('Unable to find locations');
        }else{
            callback(undefined,'It is currently '+response.body.current.temperature+' Feels like '+response.body.current.feelslike)
        }
    })
    
}


module.exports = forecast