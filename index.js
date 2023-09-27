//This is the start of index.js//
require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const appid = process.env.API_KEY;

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});

app.get('/weatherinfo/:city/:unitType', async (req, res) => {
    //run the code;
    const city = req.params.city;
    const unit = req.params.unitType;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${appid}`;
    const options = {
        method: 'GET'
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        res.json(result);
    } catch (error) {
        console.error(error);
    }
});
