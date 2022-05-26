import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords';

const suscriptionSchema = new Schema({
  name: {
    type: String
  },
  validity: {
    type: String
  },
  price: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

suscriptionSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      validity: this.validity,
      price: this.price,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}
suscriptionSchema.plugin(mongooseKeywords, { paths: ['name'] })

const model = mongoose.model('Suscription', suscriptionSchema)

export const schema = model.schema
export default model
