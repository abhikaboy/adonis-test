/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UsersController = () => import('#controllers/users_controller')
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('', [UsersController, 'getUsers'])
    router.get('id', [UsersController, 'getUserById'])
    router.get('check-duplicate-email', [UsersController, 'checkDuplicateEmail'])
    router.post('register', [UsersController, 'register'])
  })
  .prefix('/users')
