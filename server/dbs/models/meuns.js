import mongoose from 'mongoose'
const Schema = mongoose.Schema
const MeunSchema = new Schema({
  menu: {
    type: Array,
    require: true
  }
})

export default mongoose.model('Meun', MeunSchema)
