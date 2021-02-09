import { Schema, model, Document } from 'mongoose'
import bcrypt from 'bcrypt'

export interface UserDocument extends Document {
  username: string
  password: string
  channel: string
  comparePassword: (candidatePassword: string) => Promise<any>
}

const User = new Schema<UserDocument>(
  {
    username: String,
    password: String,
    channel: String,
  },
  {
    timestamps: true,
    strict: true,
  }
)

User.pre('save', function (next) {
  var user = this

  if (!user.isModified('password')) return next()

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

User.methods.comparePassword = function (candidatePassword: string) {
  return bcrypt.compareSync(candidatePassword, this.password)
}

export default model<UserDocument>('users', User)
