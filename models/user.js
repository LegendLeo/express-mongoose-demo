const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  fisrt_name: { type: String, required: true, max: 50 },
  last_name: { type: String, required: true, max: 50 },
  birthday: { type: Date },
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

UserSchema.pre('save', next => {
  if (this.isNew) {
    this.meta.createTime = this.meta.updateTime = Date.now()
  } else {
    this.meta.updateTime = Date.now()
  }
  next()
})

UserSchema.statics = {
  fetch (cb) {
    return this
      .find()
      .sort({})
      .exec(cb)
  },
  findById (id, cb) {
    return this
      .findOne({ _id: id })
      .exec()
  }
}

module.exports = mongoose.model('User', UserSchema)
