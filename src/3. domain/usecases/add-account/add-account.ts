import { AddAccountCommand, AccountViewModel } from '.'

export interface AddAccount {
  add: (account: AddAccountCommand) => Promise<AccountViewModel>
}
