const { model: Model, Schema } = require('mongoose')

const UserModel = Model(
  'User',
  Schema({
    username: {
      unique: true,
      type: String
    },
    password: String
  })
)

module.exports = UserModel
