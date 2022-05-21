import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from "mongoose-keywords";

const fileSchema = new Schema({
  file: {
    type: String
  },
  ext: {
    type: String
  },
  name: {
    type: String
  },
  size: {
    type: String
  },
  mime: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

fileSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      file: this.file,
      ext: this.ext,
      name: this.name,
      size: this.size,
      mime: this.mime,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

fileSchema.plugin(mongooseKeywords, { paths: ['file', 'name', 'mime'] })

const model = mongoose.model('File', fileSchema)

export const schema = model.schema
export default model
