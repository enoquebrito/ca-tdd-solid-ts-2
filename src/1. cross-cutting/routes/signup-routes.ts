import { Router } from 'express'
import { signUpControllerFactory } from '../factories/signup.factory'
import { routeAdapter } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  const signUpController = signUpControllerFactory()
  router.post('/signup', routeAdapter(signUpController))
}
