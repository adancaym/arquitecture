const HDWalletProvider = require("@truffle/hdwallet-provider");
const {OpenSeaPort, Network} = require('opensea-js')


const place_a_bid = async (body) => {
    const {
        infura_key,
        priv_key,
        provider_key,
        token_id,
        contract_address,
        acc_address,
        desired_bid,
        max_bid,
        outbid_value,
        exp_time,
        collection_bid
    } = body
    const provider = web3provider(infura_key, priv_key);
    const openSeaPort = createSeaport(provider, provider_key);
    return place_bid_history(openSeaPort, token_id, contract_address, acc_address, desired_bid, max_bid, outbid_value, exp_time, collection_bid);


}

const web3provider = (infura_key, priv_key) => {
    try {
        const privateKeys = [priv_key.toString()];
        return new HDWalletProvider({
            privateKeys, providerOrUrl: infura_key.toString(), chainId: '4', // 4 for rinkeby testnet, check for mainnet
        });
    } catch (error) {
        throw new Error('Error creating web3 provider ' + error.message + infura_key + priv_key);
    }
}

const createSeaport = (provider, opensea_key) => {
    try {
        return new OpenSeaPort(provider, {
            networkName: Network.Main, apiKey: opensea_key,
        });
    } catch (error) {
        throw new Error('Error creating seaport ' + error.message);
    }
}

const place_bid = async (seaport, token_id, token_address, acc_address, bidOffer, exp_time_unix) => {
    try {
        return seaport.createBuyOrder({
            asset: {
                tokenId: token_id, tokenAddress: token_address,
            },
            accountAddress: acc_address,
            startAmount: parseFloat(bidOffer).toFixed(18),
            expirationTime: exp_time_unix,
        }).catch((err) => {
            throw new Error('Error placing bid ' + err.message);
        })
    } catch (error) {
        throw new Error('Error placing bid ' + error.message);
    }

}

async function place_bid_history(seaport, token_id, contract_address, acc_address, desired_bid, max_bid, outbid_value, exp_time, collection_bid) { // exp_time in minutes
    const expire_time_temp = Math.round(Date.now() / 1000 + 60 * 60 * parseInt(exp_time))

    try {
        if (!collection_bid) {
            console.log("1")
            console.table({token_id, contract_address, acc_address, desired_bid, expire_time_temp})
            return place_bid(seaport, token_id, contract_address, acc_address, desired_bid, expire_time_temp);
        }
        const last_bid = collection_bid / 1e18;
        const bidOffer = parseFloat(last_bid) + parseFloat(outbid_value);
        if (bidOffer <= desired_bid) {
            console.log("2")
            console.table({token_id, contract_address, acc_address, desired_bid, expire_time_temp})
            return place_bid(seaport, token_id, contract_address, acc_address, desired_bid, expire_time_temp);
        }
        if (bidOffer <= max_bid) {
            console.log("3")
            console.table({token_id, contract_address, acc_address, bidOffer, expire_time_temp})
            return place_bid(seaport, token_id, contract_address, acc_address, bidOffer, expire_time_temp);
        }
    } catch (error) {
        throw new Error('Error placing bid history' + error.message + ' ' + expire_time_temp.toString());
    }

}

module.exports = {
    place_a_bid,
}
