import { Collection, MongoClient } from 'mongodb'

export const MongoDbHelper = {
  client: null as MongoClient,

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map<T> (collection: any, ...properties: string[]): T {
    for (const prop of properties) {
      if (collection[prop]) {
        delete collection[prop]
      }
    }

    const { _id, ...collectionModel } = collection
    return Object.assign({}, collectionModel, { id: _id })
  }
}
