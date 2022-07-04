import mongoose, { Schema } from 'mongoose'

const logsSchema = new Schema({
  request: {
    type: Object
  },
  response: {
    type: Object
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

logsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      request: this.request,
      response: this.response,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Logs', logsSchema)

export const schema = model.schema
export default model
