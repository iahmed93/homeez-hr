const express = require('express');
const quotation_service = require('./service/quotation.service');


const app = express();

app.use(express.json());

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