import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import jwt from 'jsonwebtoken'

import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'
import LoginValidator from 'App/Validators/LoginValidator'

export default class AuthController {
  async login({ request, response }: HttpContextContract) {
    const { username, password } = await request.validate(LoginValidator)

    const user = await User.findOne({ username })

    if (!user) {
      return response.notFound({
        success: false,
      })
    }

    const isPasswordCorrect = await user.comparePassword(password)

    if (!isPasswordCorrect) {
      return response.notFound({
        success: false,
      })
    }

    const { password: pass, ...data } = user.toJSON()

    return response.json({
      success: true,
      data: {
        user: data,
        token: this.generateToken(data),
      },
    })
  }

  async register({ request, response }: HttpContextContract) {
    const userData = await request.validate(RegisterValidator)

    const user = new User(userData)

    await user.save()

    return response.json({
      success: true,
      data: user,
    })
  }

  generateToken(payload = {}) {
    return {
      type: 'bearer',
      token: jwt.sign(payload, Env.get('APP_KEY')),
    }
  }
}
