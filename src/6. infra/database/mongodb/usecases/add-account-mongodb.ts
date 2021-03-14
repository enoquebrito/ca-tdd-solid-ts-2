import { AddAccountCommand, AccountViewModel } from '../../../../3. domain/usecases/add-account'
import { AddAccountRepository } from '../../../../4. data/repository/usecases/add-account-repository'
import { MongoDbHelper } from '../helper/mongodb.helper'

export class AddAccountMongoDb implements AddAccountRepository {
  async add (accountData: AddAccountCommand): Promise<AccountViewModel> {
    const accountCollection = MongoDbHelper.getCollection('accounts')

    const result = await accountCollection.insertOne(accountData)
    const createdAccount = result.ops[0]
    const { _id, password, ...account } = createdAccount

    return Object.assign({}, account, { id: _id })
  }
}
