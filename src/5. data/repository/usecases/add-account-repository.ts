import { AccountViewModel, AddAccountCommand } from '../../../4. domain/usecases/add-account'

export interface AddAccountRepository {
  add: (accountData: AddAccountCommand) => Promise<AccountViewModel>
}
