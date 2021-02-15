import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const sutFactory = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('Email Validator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = sutFactory()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@mail.com')

    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const sut = sutFactory()
    jest.spyOn(sut, 'isValid').mockReturnValueOnce(true)
    const isValid = sut.isValid('valid_email@mail.com')

    expect(isValid).toBe(true)
  })

  test('Should call validator with correct email', () => {
    const sut = sutFactory()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')

    sut.isValid('any_email@mail.com')

    expect(isEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
