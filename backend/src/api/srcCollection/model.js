import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'

const srcCollectionSchema = new Schema({
  name: {
    type: String
  },
  status: {
    type: String
  },
  provider: {
    type: String
  },
  apikey: {
    type: String
  },
  srcCollection: {
    type: Object
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

srcCollectionSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      provider: this.provider,
      status: this.status,
      apikey: this.apikey,
      srcCollection: this.srcCollection,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

srcCollectionSchema.plugin(mongooseKeywords, { paths: ['name'] })
const model = mongoose.model('SrcCollection', srcCollectionSchema)

export const schema = model.schema
export default model
