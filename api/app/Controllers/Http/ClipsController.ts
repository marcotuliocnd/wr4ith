import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Clip from 'App/Models/Clip'
import ClipStoreValidator from 'App/Validators/ClipStoreValidator'
import ClipVoteValidator from 'App/Validators/ClipVoteValidator'

export default class ClipsController {
  async store({ response, request }: HttpContextContract) {
    const data = await request.validate(ClipStoreValidator)

    await Clip.create({ ...data, status: 'pending' })

    return response.json({
      success: true,
      message: 'The provided clip was stored successfully',
    })
  }

  async list({ request, response }: HttpContextContract) {
    const { page = 1, limit = 10 } = request.get()

    const data = await Clip.find({})
      .limit(parseInt(limit, 10))
      .skip(parseInt(page, 10) !== 1 ? parseInt(limit, 10) * parseInt(page, 10) : 0)

    return response.json({
      success: true,
      data,
    })
  }

  async vote({ request, response, params }: HttpContextContract) {
    const { clip_id: clipId } = params
    const { status } = await request.validate(ClipVoteValidator)

    const data = await Clip.findById(clipId)

    if (!data) {
      return response.notFound({ success: false, message: 'Clip not found' })
    }

    data.status = status

    await data.save()

    // TODO - Post on twitter

    return response.json({
      success: true,
      data,
    })
  }
}
