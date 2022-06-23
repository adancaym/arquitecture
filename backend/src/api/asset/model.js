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
  detail: {
    type: Object
  },
  tokenId: {
    type: Number
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
      id: this.id,
      name: this.name,
      srcCollection: this.srcCollection,
      detail: this.detail,
      tokenId: this.tokenId,
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
