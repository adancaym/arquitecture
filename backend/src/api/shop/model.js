import mongoose, {Schema} from 'mongoose'

const shopSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    default: "Descripcion"
  },
  picture: [
    {
      principal: {
        type: Boolean,
        default: false,
      },
      uri: {
        type: String,
        default: "https://www.salesland.net/sites/default/files/inline-images/shop-in-shop-salesland.png"
      }
    }
  ],
  name: {
    type: String
  },
  products: [
    {
      type: Schema.ObjectId,
      ref: 'Product',
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

shopSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user,
      name: this.name,
      products: this.products,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      description: this.description,
      picture: this.picture,
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Shop', shopSchema)

export const schema = model.schema
export default model
