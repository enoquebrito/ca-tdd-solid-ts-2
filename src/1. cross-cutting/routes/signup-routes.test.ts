import { MongoDbHelper } from '../../7. infra/database/mongodb/helper/mongodb.helper'
import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoDbHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoDbHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoDbHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  it('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'John Doe',
        email: 'johndoe@mail.com',
        password: 'strong_password',
        passwordConfirmation: 'strong_password'
      })
      .expect(200)
  })
})
