const registerController = require('../../controllers/auth/register')
const loginController = require('../../controllers/auth/login')

module.exports = (router) => {
  router.post('/auth/register', registerController)
  router.post('/auth/login', loginController)
}
