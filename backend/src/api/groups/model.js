import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords';

const groupsSchema = new Schema({
  name: {
    type: String
  },
  menus: [
    {
      type: Schema.ObjectId,
      ref: 'Menu'
    }
  ]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

groupsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      menus: this.menus,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}
groupsSchema.plugin(mongooseKeywords, { paths: ['name'] })
const model = mongoose.model('Groups', groupsSchema)

export const schema = model.schema
export default model
