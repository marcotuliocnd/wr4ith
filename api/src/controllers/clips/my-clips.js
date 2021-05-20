const ClipModel = require('../../models/Clip')

const myClips = async (req, res) => {
  try {
    const {
      status = null,
      createdAtMin = null,
      createdAtMax = null
    } = req.query

    const filter = {
      userId: req.user._id
    }

    if (status) {
      filter.status = status
    }

    if (createdAtMin) {
      const createdAtQuery = filter.createdAt || {}
      filter.createdAt = {
        ...createdAtQuery,
        $gte: new Date(createdAtMin).setHours(0, 0, 0, 0)
      }
    }

    if (createdAtMax) {
      const createdAtQuery = filter.createdAt || {}
      filter.createdAt = {
        ...createdAtQuery,
        $lte: new Date(createdAtMax).setHours(23, 59, 59, 999)
      }
    }

    const clips = await ClipModel.find(filter)

    return res.status(200).json(clips)
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

module.exports = myClips
