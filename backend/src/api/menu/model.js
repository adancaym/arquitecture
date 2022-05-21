import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords';

const menuSchema = new Schema({
  name: {
    type: String
  },
  menus: [
    {
      type: Schema.ObjectId,
      ref: 'Menu'
    }
  ],
  color: {
    type: String
  },
  icon: {
    type: String
  },
  path: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

menuSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      menus: this.menus,
      color: this.color,
      icon: this.icon,
      path: this.path,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}
menuSchema.plugin(mongooseKeywords, { paths: ['name'] })

const model = mongoose.model('Menu', menuSchema)

export const schema = model.schema
export default model
