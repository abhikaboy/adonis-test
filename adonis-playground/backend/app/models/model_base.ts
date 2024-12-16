import { users } from '#start/database'
import { Document, FindCursor, WithId } from 'mongodb'
import { InsertOneResult } from 'mongodb'

export type QueryResponse = Promise<FindCursor<any>> | Promise<WithId<Document> | null>
export type QueryMayResponse = Promise<FindCursor<any>>
export type CreateResponse = Promise<InsertOneResult<Document>>

export default class ModelBase {
  constructor() {}

  /**
   * Function to Query for a singular document while appropriately handling errors
   * @param request function containing MongoDB query
   * @returns Promise<FindCursor<any> | WithId<Document> | null>
   */
  static async handleQuery(request: () => QueryResponse) {
    try {
      const res: FindCursor | Document | null = await request()
      if (!res) {
        return null
      }
      return res
    } catch (error) {
      console.log(error)
      return { message: error }
    }
  }

  static async handleQueryMany(request: () => QueryMayResponse) {
    try {
      const res: FindCursor = await request()
      if (!res) {
        return null
      }
      return res.toArray()
    } catch (error) {
      console.log(error)
      return { message: error }
    }
  }

  static async handleCreate(request: () => CreateResponse) {
    try {
      const res: InsertOneResult<Document> = await request()
      if (!res) {
        return null
      }
      return res as InsertOneResult<Document>
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
