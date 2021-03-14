import { AddAccountCommand, AccountViewModel } from '../../../../4. domain/usecases/add-account'
import { AddAccountRepository } from '../../../../5. data/repository/usecases/add-account-repository'
import { MongoDbHelper } from '../helper/mongodb.helper'

export class AddAccountMongoDb implements AddAccountRepository {
  async add (accountData: AddAccountCommand): Promise<AccountViewModel> {
    const accountCollection = MongoDbHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)

    return MongoDbHelper.map<AccountViewModel>(result.ops[0], 'password')
  }
}
