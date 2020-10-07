const express = require('express');
const quotation_service = require('./service/quotation.service');


const app = express();

app.use(express.json());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://quotation-client.s3-website.eu-west-3.amazonaws.com/');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.post('/add-quotation', async (req, res) => {
    if (!req.body.quotation_info) {
        return res.status(400).send('missing quotation_info');
    }

    try {
        const quotation = await quotation_service.add_quotation(req.body.quotation_info);
        console.log({quotation});
        res.json(quotation);
    } catch (error) {
        res.status(500).send(error);
    }

})

app.get('/get-all-quotation', async (req, res) => {
    try {
        const quotations = await quotation_service.get_all_quotations();
        console.log({quotations});
        res.json(quotations);
    } catch (error) {
        res.status(500).send(error);
    }
})


app.listen(3000,() => {
    console.log('Server starts on port 3000');
});