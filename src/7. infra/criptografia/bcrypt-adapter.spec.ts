import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hashed_value'))
  }
}))

interface SutTypes {
  sut: BcryptAdapter
  salt: number
}

const sutFactory = (): SutTypes => {
  const salt = 12
  const sut = new BcryptAdapter(salt)

  return {
    sut,
    salt
  }
}

describe('Bcrypt Adapter', () => {
  it('Should call bcrypt with correct values', async () => {
    const { sut, salt } = sutFactory()
    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  it('Should return a hash on success', async () => {
    const { sut } = sutFactory()

    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hashed_value')
  })

  it('Should throw if bcrypt throws', async () => {
    const { sut } = sutFactory()
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })

  it('Should throw if bcrypt throws', async () => {
    const { sut } = sutFactory()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(async (): Promise<string> => {
      throw new Error()
    })

    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})
