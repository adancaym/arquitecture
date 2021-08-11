import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'

const tenantSchema = new Schema({
  name: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

tenantSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

tenantSchema.plugin(mongooseKeywords, { paths: ['name'] })

const model = mongoose.model('Tenant', tenantSchema)

export const schema = model.schema
export default model
