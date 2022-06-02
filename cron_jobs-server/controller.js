const {place_a_bid} =  require("./implementation");

const place_a_bid_request = ({body}, res, next) =>
    place_a_bid(...body)
        .then(order => res.json(order))
        .catch(e => res.status(500).json(e));

module.exports = {
    place_a_bid_request
}
