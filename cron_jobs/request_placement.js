const axios = require('axios');
const {SELF_HOST, SELF_PORT, BACKEND_HOST, BACKEND_PORT} = process.env;


axios.get(`${BACKEND_HOST}:${BACKEND_PORT}`)
    .then((({data}) => console.log(data)))
    .then(() =>
        axios.get(`${SELF_HOST}:${SELF_PORT}`).then((({data}) => console.log(data)))
    )

