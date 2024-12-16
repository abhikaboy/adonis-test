/*
|--------------------------------------------------------------------------
| Database connection
|--------------------------------------------------------------------------
|
| The database connection is called on startup to connect to the MongoBD server
| and create a new connection. MongoDB collections are also registered inside
| here and are available to the application.
|
*/

import { Collection, Db, MongoClient, ServerApiVersion } from 'mongodb'
import env from '#start/env'

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(env.get('ATLAS_URI'), {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

/*
  Register Collections here
*/
export let database: Db
export let users: Collection

export async function run() {
  try {
    await client.connect()
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 })
    database = client.db('main')
    users = database.collection('users')

    console.log('Pinged your deployment. You successfully connected to MongoDB!')
  } finally {
  }
}

run()
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB', error)
  })
