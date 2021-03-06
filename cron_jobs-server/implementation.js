const HDWalletProvider = require("@truffle/hdwallet-provider");
const {OpenSeaSDK, OpenSeaPort} = require('opensea-js')


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
    console.log("infura_key", infura_key)
    try {
        const privateKeys = [priv_key.toString()];
        return new HDWalletProvider({
            privateKeys,
            providerOrUrl: infura_key.toString(),
            chainId: process.env.WEB3_PROVIDER,
        });
    } catch (error) {
        throw new Error('Error creating web3 provider ' + error.message + infura_key + priv_key);
    }
}

const createSeaport = (provider, opensea_key) => {
    try {
        return new OpenSeaSDK(provider, {
            networkName: process.env.NETWORK_OPENSEA_PORT,
            apiKey: opensea_key,
        });
    } catch (error) {
        throw new Error('Error creating seaport ' + error.message);
    }
}

const place_bid = async (seaport, token_id, token_address, acc_address, bidOffer, exp_time_unix) => {
    console.table({token_id, token_address, acc_address, bidOffer, exp_time_unix})
    try {
        const bid = {
            asset: {
                tokenId: token_id,
                tokenAddress: token_address,
            },
            accountAddress: acc_address,
            startAmount: parseFloat(bidOffer),
            expirationTime: exp_time_unix,
        }
        console.log(bid)
        return seaport.createBuyOrder(bid).catch((err) => {
            throw new Error('Error placing bid ' + err.message);
        })
    } catch
        (error)
        {
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
