import { SignUpController } from '../../2. presentation/controllers/signup/signup.controller'
import { EmailValidatorAdapter } from '../../6. utils/email-validator/email-validator-adapter'
import { AddAccountAppBusiness } from '../../3. application/usecases/add-account/add-account-app-business'
import { BcryptAdapter } from '../../7. infra/criptografia/bcrypt-adapter'
import { AddAccountMongoDb } from '../../7. infra/database/mongodb/usecases/add-account-mongodb'

export const signUpControllerFactory = (): SignUpController => {
  const salt = 12
  const bcrypAdapter = new BcryptAdapter(salt)
  const addAccountMongoDb = new AddAccountMongoDb()
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const addAccountAppBusiness = new AddAccountAppBusiness(bcrypAdapter, addAccountMongoDb)
  const signUpController = new SignUpController(emailValidatorAdapter, addAccountAppBusiness)

  return signUpController
}
