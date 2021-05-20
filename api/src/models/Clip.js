const { model: Model, Schema } = require('mongoose')

const ClipModel = Model(
  'Clip',
  Schema({
    link: String,
    username: String,
    displayName: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }, {
    timestamps: true
  })
)

module.exports = ClipModel
