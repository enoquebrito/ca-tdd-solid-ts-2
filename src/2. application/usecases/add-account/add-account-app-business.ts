import { AddAccount, AddAccountCommand, AccountViewModel, AddAccountRepository, Encrypter } from './add-account-app-business.protocols'

export class AddAccountAppBusiness implements AddAccount {
  constructor (private readonly encrypter: Encrypter, private readonly addAccountRepository: AddAccountRepository) { }

  async add (account: AddAccountCommand): Promise<AccountViewModel> {
    const hashedPassword = await this.encrypter.encrypt(account.password)
    const createdAccountPromise = this.addAccountRepository.add(Object.assign({}, account, { password: hashedPassword }))

    return createdAccountPromise
  }
}
