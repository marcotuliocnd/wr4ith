const UserModel = require('../../models/User')
const ClipModel = require('../../models/Clip')

const add = async (req, res) => {
  try {
    const requiredFields = ['link', 'username', 'display_name', 'channel']
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          message: `Missing param: ${field}`
        })
      }
    }

    const { link, username, display_name: displayName, channel } = req.body

    const user = await UserModel.findOne({
      username: channel
    })

    if (!user) {
      return res.status(404).json({
        message: 'Channel not found'
      })
    }

    let clip = await ClipModel.create({
      link,
      username,
      displayName,
      userId: user.id,
      status: 'pending'
    })

    clip = await clip.populate('userId').execPopulate()

    return res.status(200).json(clip)
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

module.exports = add
