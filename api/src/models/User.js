const { model: Model, Schema } = require('mongoose')

const UserModel = Model(
  'User',
  Schema({
    username: {
      unique: true,
      type: String
    },
    password: String
  }, {
    timestamps: true
  })
)

module.exports = UserModel
