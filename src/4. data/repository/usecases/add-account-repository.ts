import { AccountViewModel, AddAccountCommand } from '../../../3. domain/usecases/add-account/add-account.procols'

export interface AddAccountRepository {
  add: (accountData: AddAccountCommand) => Promise<AccountViewModel>
}
