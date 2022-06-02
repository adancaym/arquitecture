import mongoose, { Schema } from 'mongoose'
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
  event: {
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
  view (full) {
    const view = {
      id: this.id,
      user: this.user.view(),
      asset: this.asset,
      wallet: this.wallet,
      event: this.event,
      status: this.status,
      bid: this.bid,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

placementSchema.plugin(mongooseKeywords, { paths: ['status'] })
const model = mongoose.model('Placement', placementSchema)

export const schema = model.schema
export default model
