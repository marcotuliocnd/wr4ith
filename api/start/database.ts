import mongoose from 'mongoose'
import Env from '@ioc:Adonis/Core/Env'

mongoose.connect(Env.get('DATABASE_URI'), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
