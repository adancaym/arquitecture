const axios = require('axios');
const {
    SELF_HOST,
    SELF_PORT,
    BACKEND_HOST,
    BACKEND_PORT,
    MASTER_KEY,
} = process.env;

try {
    axios.get(`${BACKEND_HOST}:${BACKEND_PORT}/placements/dispatch`, {
        params: {
            access_token: MASTER_KEY,
            limit: 4
        }
    }).then((async ({data}) => {
        console.log(data)
        for (let i of data) {
            const {id, placeABid} = i
            await axios.post(`${SELF_HOST}:${SELF_PORT}/place_a_bid`, placeABid)
                .then((({data: order}) => {
                    console.log(order)
                    axios.put(`${BACKEND_HOST}:${BACKEND_PORT}/placements/dispatched/${id}`, order, {
                        params: {
                            access_token: MASTER_KEY
                        }
                    }).then(({data}) => {
                        //console.log('paso put', data)
                    })
                        .catch(err => {
                            console.log('paso catch')
                            axios.put(`${BACKEND_HOST}:${BACKEND_PORT}/placements/dispatched/error/${id}`, {error: err}, {
                                params: {
                                    access_token: MASTER_KEY
                                }
                            })
                        })
                }))
                .catch((err) => {
                    console.log('paso catch2', err)

                    axios.put(`${BACKEND_HOST}:${BACKEND_PORT}/placements/dispatched/error/${id}`, {error: err.response.data}, {
                        params: {
                            access_token: MASTER_KEY
                        }
                    })
                })
        }
    }))

} catch (error) {
    console.log(error);
}

