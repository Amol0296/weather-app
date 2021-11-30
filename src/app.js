const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode')
const app = express();

// Define path for express config
const publicDirPath = (path.join(__dirname,'../public'));
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// setup staatic directory to serve
app.use(express.static(publicDirPath))

// Setup handle bar engine and views location
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath)
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Amol'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Page',
        name:'Amol'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        name:'Amol'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provide address'
        });
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
   
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Amol',
        errorMessage:'Help article not found'
    })

})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Amol',
        errorMessage:'Page not found'
    })

})
app.listen(3000,()=>{
    console.log('Server is started on port: 3000');
})