/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('/', 'ClipsController.store')
    Route.get('/', 'ClipsController.list')
    Route.patch('/:clip_id', 'ClipsController.vote')
  })
    .prefix('clips')
    .middleware(['auth'])

  Route.group(() => {
    Route.post('/register', 'AuthController.register')
    Route.post('/login', 'AuthController.login')
  }).prefix('auth')
})
  .prefix('/api')

Route.get('/', async () => {
  return { status: 'running' }
})
