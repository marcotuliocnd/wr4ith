const { Router } = require('express')
const { readdirSync } = require('fs')
const path = require('path')

module.exports = (app) => {
  const router = Router()
  app.use('/', router)

  readdirSync(path.join(__dirname, '..', 'routes')).map(async file => {
    if (!file.includes('.test.')) {
      const route = (await import(path.join(__dirname, '..', 'routes', file))).default

      route(router)
    }
  })
}
