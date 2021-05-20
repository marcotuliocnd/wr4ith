const bcrypt = require('bcrypt')
const UserModel = require('../../models/User')

const register = async (req, res) => {
  try {
    const requiredFields = ['username', 'password']
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          message: `Missing param: ${field}`
        })
      }
    }

    const { username, password } = req.body

    let user = await UserModel.findOne({
      username
    })

    if (user) {
      return res.status(400).json({
        message: 'User already exists'
      })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    user = await UserModel.create({
      username,
      password: hashedPassword
    })

    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

module.exports = register
