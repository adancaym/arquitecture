import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { processNames } from '../catalogs/staticCatalogs'

const processSchema = new Schema({
  name: {
    required: true,
    unique: true,
    enum: processNames,
    type: String
  },
  provider: {
    required: true,
    type: Schema.ObjectId,
    ref: 'Provider'
  },
  requireApiKey: {
    required: true,
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

processSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      provider: this.provider,
      requireApiKey: this.requireApiKey,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}
processSchema.plugin(mongooseKeywords, { paths: ['name'] })

const model = mongoose.model('Process', processSchema)

export const schema = model.schema
export default model
