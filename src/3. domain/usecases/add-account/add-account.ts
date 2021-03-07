import { AddAccountCommand, AccountViewModel } from './add-account.procols'

export interface AddAccount {
  add: (account: AddAccountCommand) => Promise<AccountViewModel>
}
