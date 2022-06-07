const express = require('express')
const bodyParser = require('body-parser');

const {place_a_bid_request} = require("./controller");
const app = express()
const port = 4000
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/', (req, res) => {
    res.json({order: req.body})
})

app.post('/place_a_bid', place_a_bid_request)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
