const HDWalletProvider = require("truffle-hdwallet-provider");
const {OpenSeaPort, Network} = require('opensea-js')


const place_a_bid = async (infura_key, priv_key, provider_key, token_id, contract_address, acc_address, desired_bid, max_bid, outbid_value, exp_time, collection_bid) => {
    const provider = web3provider(infura_key, priv_key);
    const openSeaPort = createSeaport(provider, provider_key);
    return place_bid_history(openSeaPort, token_id, contract_address, acc_address, desired_bid, max_bid, outbid_value, exp_time, collection_bid);
}

const web3provider = (infura_key, priv_key) => {
    try {
        return new HDWalletProvider({
            privateKeys: [priv_key], providerOrUrl: infura_key, chainId: 4, // 4 for rinkeby testnet, check for mainnet
        });
    } catch (error) {
        throw new Error('Error creating web3 provider');
    }
}

const createSeaport = (provider, opensea_key) => {
    try {
        return new OpenSeaPort(provider, {
            netwoName: Network.Rinkeby, apiKey: opensea_key,
        });
    } catch (error) {
        throw new Error('Error creating seaport');
    }
}

const place_bid = async (seaport, token_id, token_address, acc_address, bidOffer, exp_time_unix) => {
    try {
        return seaport.createBuyOrder({
            asset: {
                tokenId: token_id, tokenAddress: token_address,
            }, accountAddress: acc_address, startAmount: bidOffer, expirationTime: Math.round(exp_time_unix),
        })
            .then((response) => console.log(response))
            .catch((err) => console.log('Error : ' + err))
    } catch (error) {
        throw new Error('Error placing bid');
    }

}

async function place_bid_history(seaport, token_id, contract_address, acc_address, desired_bid, max_bid, outbid_value, exp_time, collection_bid) { // exp_time in minutes

    try {
        const expire_time_temp = Date.now() / 1000 + exp_time * 60;

        if (!collection_bid) {
            return place_bid(seaport, token_id, contract_address, acc_address, desired_bid, expire_time_temp);
        }
        const last_bid = collection_bid / 1e18;
        const bidOffer = last_bid + outbid_value;
        if (bidOffer <= desired_bid) {
            return place_bid(seaport, token_id, contract_address, acc_address, desired_bid, expire_time_temp);
        }
        if (bidOffer <= max_bid) {
            return place_bid(seaport, token_id, contract_address, acc_address, bidOffer, expire_time_temp);
        }
    } catch (error) {
        throw new Error('Error placing bid history');
    }

}

module.exports = {
    place_a_bid,
}
