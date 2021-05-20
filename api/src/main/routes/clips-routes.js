const addClipController = require('../../controllers/clips/add-clip')
const myClipsController = require('../../controllers/clips/my-clips')
const voteClipController = require('../../controllers/clips/vote-clip')
const authMiddleware = require('../../main/middlewares/auth')

module.exports = (router) => {
  router.post('/clips', authMiddleware, addClipController)
  router.get('/clips/my', authMiddleware, myClipsController)
  router.patch('/clips/:clipId/vote', authMiddleware, voteClipController)
}
