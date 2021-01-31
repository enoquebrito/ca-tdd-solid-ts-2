import { AccountViewModel } from '../view-models'

export interface AddAccountCommand {
  name: string
  email: string
  password: string
}

export interface AddAccount {
  add: (account: AddAccountCommand) => AccountViewModel
}
