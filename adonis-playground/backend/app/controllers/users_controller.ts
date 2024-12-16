import type { HttpContext } from '@adonisjs/core/http'

import { UserModel } from '#models/user'
import { database, users } from '#start/database'
import { getUserById, registerUser, checkDuplicateEmail } from '#validators/users'
import { ObjectId } from 'mongodb'
import { sign } from 'jsonwebtoken'
/**
 * UsersController is responsible for handling all the requests related to the users
 */

export default class UsersController {
  // Register a new user to the database
  public async register({ request }: HttpContext) {
    const payload = await request.validateUsing(registerUser)
    let creationResponse = await UserModel.handleCreate(async () => await users.insertOne(payload))
    if (creationResponse) {
      const accessToken = sign(creationResponse, 'secret', { expiresIn: '24h' })
      const refreshToken = sign(creationResponse, 'secret', { expiresIn: '31d' })
      return {
        ...creationResponse,
        accessToken,
        refreshToken,
      }
    } else {
      throw 'Failed to register'
    }
  }

  // Get all users from the database
  public async getUsers() {
    return UserModel.handleQuery(async () => await users.find({}))
  }

  public async checkDuplicateEmail({ request }: HttpContext) {
    const payload = await request.validateUsing(checkDuplicateEmail)
    let queryResult = await UserModel.handleQuery(
      async () => await users.findOne({ email: payload.email })
    )
    return queryResult !== null
  }

  // Get a single user from the database by their id
  public async getUserById({ request }: HttpContext) {
    const payload = await request.validateUsing(getUserById)
    return UserModel.handleQuery(async () => await users.findOne({ _id: new ObjectId(payload.id) }))
  }
}
