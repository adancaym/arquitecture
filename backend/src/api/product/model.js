import mongoose, {Schema} from 'mongoose'

const productSchema = new Schema({
  name: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  picture: [
    {
      principal: {
        type: Boolean,
        default: false,
      },
      uri: {
        type: String,
        default: "https://www.macworld.com/wp-content/uploads/2021/03/apple-products-2018-100782368-orig-1.jpg"
      }
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

productSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      user: this.user,
      picture: this.picture,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Product', productSchema)

export const schema = model.schema
export default model
