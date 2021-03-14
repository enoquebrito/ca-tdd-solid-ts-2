import { MongoDbHelper } from '../helper/mongodb.helper'
import { AddAccountMongoDb } from './add-account-mongodb'

describe('AddAccount MongoDB', () => {
  beforeAll(async () => {
    await MongoDbHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoDbHelper.disconnect()
  })

  const sutFactory = (): AddAccountMongoDb => {
    return new AddAccountMongoDb()
  }

  it('Should return an account on success', async () => {
    const sut = sutFactory()
    const newAccountData = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }

    const createdAccount = await sut.add(newAccountData)
    expect(createdAccount).toBeTruthy()
    expect(createdAccount.id).toBeTruthy()
    expect(createdAccount.name).toBe('any_name')
    expect(createdAccount.email).toBe('any_email@mail.com')
    console.log(createdAccount)
  })
})
