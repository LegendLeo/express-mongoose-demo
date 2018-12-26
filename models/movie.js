const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovieSchema = new Schema({
  title: { type: String, required: true, max: 120 },
  director: String,
  language: String,
  country: String,
  summary: String,
  flash: String,
  poster: String,
  year: Number,
  meta: {
    createTime: {
      type: Date,
      default: Date.now()
    },
    updateTime: {
      type: Date,
      default: Date.now()
    }
  }
})

MovieSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createTime = this.meta.updateTime = Date.now()
  } else {
    this.meta.updateTime = Date.now()
  }
  next()
})

MovieSchema.statics = {
  fetch (cb) {
    return this
      .find()
      .sort({})
      .exec(cb)
  },
  findById (id, cb) {
    return this
      .findOne({ _id: id })
      .exec(cb)
  }
}

module.exports = mongoose.model('Movie', MovieSchema)
