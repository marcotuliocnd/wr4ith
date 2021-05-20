const mongoose = require('mongoose')

const env = require('./config/env')

mongoose.connect(env.mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  const app = require('./config/app')
  app.listen(env.port, () => console.log(`> Server running at port ${env.port}`))
})
  .catch(console.error)
