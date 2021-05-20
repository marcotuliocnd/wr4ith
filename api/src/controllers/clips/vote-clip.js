const { isValidObjectId } = require('mongoose')
const ClipModel = require('../../models/Clip')

const myClips = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.clipId)) {
      return res.status(400).json({
        message: 'Invalid Clip Id'
      })
    }

    const clip = await ClipModel.findOne({
      _id: req.params.clipId,
      userId: req.user._id
    })

    if (!clip) {
      return res.status(404).json({
        message: 'Clip not found'
      })
    }

    const { status } = req.body
    if (!['pending', 'approved', 'disapproved'].includes(status)) {
      return res.status(400).json({
        message: 'Invalid Status'
      })
    }

    clip.status = status
    await clip.save()

    return res.status(200).json(clip)
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

module.exports = myClips
