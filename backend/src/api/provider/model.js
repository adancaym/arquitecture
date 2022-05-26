import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'

const providerSchema = new Schema({
  name: {
    type: String
  },
  keyId: [
    { type: String }
  ],
  urlBase: {
    type: String
  },
  enabled: {
    default: false,
    type: Boolean
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

providerSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      keyId: this.keyId,
      urlBase: this.urlBase,
      enabled: this.enabled,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}
providerSchema.plugin(mongooseKeywords, { paths: ['name'] })

const model = mongoose.model('Provider', providerSchema)

export const schema = model.schema
export default model
