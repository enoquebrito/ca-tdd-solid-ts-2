import { AccountViewModel, AddAccountCommand } from '../../../3. domain/usecases/add-account'

export interface AddAccountRepository {
  add: (accountData: AddAccountCommand) => Promise<AccountViewModel>
}
