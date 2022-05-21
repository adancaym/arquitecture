import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'

const walletSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String
  },
  secret: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

walletSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user?.view(full),
      name: this.name,
      secret: this.secret,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

walletSchema.plugin(mongooseKeywords, { paths: ['name'] })
const model = mongoose.model('Wallet', walletSchema)

export const schema = model.schema
export default model
