import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
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
