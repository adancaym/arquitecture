import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'

const assetSchema = new Schema({
  name: {
    type: String
  },
  srcCollection: {
    type: Schema.ObjectId,
    ref: 'SrcCollection'
  },
  provider: {
    type: String
  },
  apikey: {
    type: String
  },
  asset: {
    type: Object
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

assetSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      srcCollection: this.srcCollection,
      provider: this.provider,
      apikey: this.apikey,
      asset: this.asset,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

assetSchema.plugin(mongooseKeywords, { paths: ['name'] })
const model = mongoose.model('Asset', assetSchema)

export const schema = model.schema
export default model
