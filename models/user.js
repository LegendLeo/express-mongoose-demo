const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    max: 50
  },
  password: {
    type: String,
    required: true
  },
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
  let user = this
  if (this.isNew) {
    this.meta.createTime = this.meta.updateTime = Date.now()
  } else {
    this.meta.updateTime = Date.now()
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return next(err)
    } else {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err)
        } else {
          user.password = hash
          next()
        }
      })
    }
  })
})

UserSchema.statics = {
  fetch(cb) {
    return this.find()
      .sort({})
      .exec(cb)
  },
  findById(id, cb) {
    return this.findOne({ _id: id }).exec()
  }
}

module.exports = mongoose.model('User', UserSchema)
