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
    type: Schema.ObjectId,
    ref: 'Provider'
  },
  slug: {
    type: String
  },
  minToken: {
    type: Number
  },
  maxToken: {
    type: Number
  },
  totalAssetPopulated: {
    type: Number
  },
  basePrice: {
    type: Number,
    default: 0
  },
  totalAssets: {
    type: Number
  },
  detail: {
    type: Object
  },
  traits: [
    {
      key: {
        type: String
      },
      values: [
        {
          type: String
        }
      ]
    }
  ]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => {
      delete ret._id
    }
  }
})

srcCollectionSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      status: this.status,
      provider: this.provider,
      detail: this.detail,
      slug: this.slug,
      minToken: this.minToken,
      maxToken: this.maxToken,
      totalAssets: this.totalAssets,
      totalAssetPopulated: this.totalAssetPopulated,
      traits: this.traits,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

srcCollectionSchema.plugin(mongooseKeywords, { paths: ['name', 'status'] })
const model = mongoose.model('SrcCollection', srcCollectionSchema)

export const schema = model.schema
export default model
