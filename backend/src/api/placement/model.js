import mongoose, {Schema} from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'

const placementSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  asset: {
    type: Schema.ObjectId,
    ref: 'Asset',
    required: true
  },
  status: {
    type: String
  },
  wallet: {
    type: Schema.ObjectId,
    ref: 'Wallet',
    required: true
  },
  event: [{
    type: Object
  }],
  order: {
    type: Object
  },
  error: {
    type: Object
  },
  bid: {
    type: Schema.ObjectId,
    ref: 'Bid',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => {
      delete ret._id
    }
  }
})

placementSchema.methods = {
  view(full) {
    const view = {
      id: this.id,
      user: this.user.view(),
      asset: this.asset,
      wallet: this.wallet,
      event: this.event,
      status: this.status,
      order: this.order,
      error: this.error,
      bid: this.bid,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
    return full ? {
      ...view
      // add properties for a full view
    } : view
  },
  placeAbidView: function () {
    return {
      id: this.id,
      placeABid: {
        infura_key: process.env.WEB3_PROVIDERS_HTTP_PROVIDER,
        priv_key: this.wallet.secret, // wallet.privateKey,
        provider_key: this.asset.apikey, // open sea key
        token_id: this.asset.asset.token_id, // asset
        contract_address: this.asset.asset.asset_contract.address, // contract address hex
        acc_address: this.wallet.name, //
        desired_bid: this.bid.minimalBid, // form bid
        max_bid: this.bid.maximalBid, // form bid
        outbid_value: this.bid.outbidAmount, // form bid
        exp_time: this.bid.expirationTime, // form bid
        collection_bid: this.event ? this.event[this.event.length - 1].bid_amount : null, // event last_bid
        acc_offer: this.event ? this.event[this.event.length - 1].from_account.address : null, // event last_bid
      }
    }
  }
}

placementSchema.plugin(mongooseKeywords, {paths: ['status']})
const model = mongoose.model('Placement', placementSchema)

export const schema = model.schema
export default model
