import { EmailValidator, Controller, HttpResponse, HttpRequest, AddAccount } from './signup.protocols'
import { badRequest, serverError, success } from '../../helpers'
import { InternalServerError, InvalidParamError, MissingParamError } from '../../errors'

export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator, private readonly addAcount: AddAccount) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = await this.addAcount.add({
        name,
        email,
        password
      })

      return success(account)
    } catch (error) {
      return serverError(new InternalServerError())
    }
  }
}
