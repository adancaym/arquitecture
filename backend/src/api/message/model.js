import mongoose, { Schema } from 'mongoose'

const messageSchema = new Schema({
  to: {
    type: String
  },
  from: {
    type: String
  },
  message: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

messageSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      to: this.to,
      from: this.from,
      message: this.message,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Message', messageSchema)

export const schema = model.schema
export default model
