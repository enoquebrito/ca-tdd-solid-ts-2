import { AddAccount, AddAccountCommand, AccountViewModel } from '../../../domain/usecases/add-account'
import { Encrypter } from '../../protocols/encrypter.protocol'

export class DbAddAccount implements AddAccount {
  constructor (private readonly encrypter: Encrypter) { }

  async add (account: AddAccountCommand): Promise<AccountViewModel> {
    const { password } = account
    await this.encrypter.encrypt(password)
    return new Promise(resolve => resolve(null))
  }
}
