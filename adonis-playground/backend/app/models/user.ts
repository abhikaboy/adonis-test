import ModelBase from './model_base.js'
import { users } from '#start/database'
import { QueryResponse, CreateResponse } from '#models/model_base'

type User = {
  _id: string
}

export class UserModel extends ModelBase {
  constructor() {
    super()
  }
}
