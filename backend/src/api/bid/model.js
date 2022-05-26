import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'

const bidSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  wallet: {
    type: Schema.ObjectId,
    ref: 'Wallet',
    required: true
  },
  minimalBid: {
    type: String
  },
  maximalBid: {
    type: String
  },
  outbidAmount: {
    type: String
  },
  expirationTime: {
    type: String
  },
  assets: [{
    type: Schema.ObjectId,
    ref: 'Asset',
    required: true
  }
  ]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

bidSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      wallet: this.wallet,
      minimalBid: this.minimalBid,
      maximalBid: this.maximalBid,
      outbidAmount: this.outbidAmount,
      expirationTime: this.expirationTime,
      assets: this.assets,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

bidSchema.plugin(mongooseKeywords, { paths: ['minimalBid', 'maximalBid', 'outbidAmount', 'expirationTime'] })
const model = mongoose.model('Bid', bidSchema)

export const schema = model.schema
export default model
