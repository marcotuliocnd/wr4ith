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
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'disapproved'],
      default: 'pending'
    }
  }, {
    timestamps: true
  })
)

module.exports = ClipModel
