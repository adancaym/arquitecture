const express = require('express')
const {place_a_bid_request} = require("./controller");
const app = express()
const port = 4000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/place_a_bid', place_a_bid_request)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
