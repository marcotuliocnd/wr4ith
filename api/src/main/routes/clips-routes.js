const addClipController = require('../../controllers/clips/add-clip')
const authMiddleware = require('../../main/middlewares/auth')

module.exports = (router) => {
  router.post('/clips', authMiddleware, addClipController)
}
