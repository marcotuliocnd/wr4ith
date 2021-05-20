const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('../../models/User')
const env = require('../../main/config/env')

const login = async (req, res) => {
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

    const user = await UserModel.findOne({
      username
    })

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    const passwordIsCorrect = await bcrypt.compareSync(password, user.password)
    if (!passwordIsCorrect) {
      return res.status(401).json({
        message: 'User not found'
      })
    }

    const userJson = user.toJSON()
    delete userJson.password

    const token = jwt.sign(userJson, env.appKey)

    return res.status(200).json({
      ...userJson,
      token
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

module.exports = login
