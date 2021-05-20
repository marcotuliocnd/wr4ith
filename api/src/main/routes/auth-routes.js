const registerController = require('../../controllers/auth/register')

module.exports = (router) => {
  router.post('/auth/register', registerController)
}
