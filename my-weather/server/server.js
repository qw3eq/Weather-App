const express = require('express')
const app = express();
const axios = require('axios');
const cors = require('cors');

const port = 3001;

const apiKey = 'd1df9180dcdf7b97a5757d8f3cbb4a30';

app.use(cors())
app.use(express.static('public'));
app.use(express.urlencoded( {extended : true}));
app.use(express.json());





app.get('/', ( req, res ) => {
    res.send("Hello")
})

app.get('/search', ( req, res ) => {
    console.log(req.body)
})

app.post('/search', async ( req, res ) => {
    console.log(req.body)

    try {
    let data = await axios.get('https://api.openweathermap.org/data/2.5/weather', 
    {
        params : {
            q: req.body.search,
            appid: apiKey
        }
    })

    let jsonData = data.data;

    function tempConvert(tempK) {
        return Number(Number(tempK) - 273.15).toFixed(1);
    }

    let obj = {
        cityName: jsonData.name,
        temp: tempConvert(jsonData.main.temp),
        weatherCode: jsonData.weather[0].icon,
    }

    res.send(obj)
} catch (err) {
    console.log("Something went wrong with your request")
    console.log("Uncomment console.log(err) for more info")
   //console.log(err)
}
})

app.listen(port, () => {
    console.log('App is listening on port ' + port);
})