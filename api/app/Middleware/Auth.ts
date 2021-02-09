import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import jwt from 'jsonwebtoken'

import User from 'App/Models/User'

export default class Auth {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const authorizationTokenHeader = request.header('authorization')

    if (!authorizationTokenHeader) {
      return response.unauthorized({
        success: false,
        message: 'Please, log in to proceed',
      })
    }

    const decodedToken = jwt.decode(authorizationTokenHeader.replace('Bearer ', ''))

    if (!decodedToken) {
      return response.unauthorized({
        success: false,
        message: 'Please, log in to proceed',
      })
    }

    request.user = await User.findById(decodedToken)

    await next()
  }
}
