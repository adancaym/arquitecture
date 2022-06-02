import mongoose from 'mongoose'
import { mongo } from '../../config'

Object.keys(mongo.options || { }).forEach((key) => {
  if (process.env.NODE_ENV==='production')
  mongoose.set(key, mongo.options[key])
})

/* istanbul ignore next */
mongoose.Types.ObjectId.prototype.view = function () {
  return { id: this.toString() }
}

/* istanbul ignore next */
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error: ' + err)
})

export default mongoose
