import { AddAccountCommand, AccountViewModel } from '../../../../3. domain/usecases/add-account'
import { AddAccountRepository } from '../../../../4. data/repository/usecases/add-account-repository'
import { MongoDbHelper } from '../helper/mongodb.helper'

export class AddAccountMongoDb implements AddAccountRepository {
  async add (accountData: AddAccountCommand): Promise<AccountViewModel> {
    const accountCollection = MongoDbHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)

    return MongoDbHelper.map<AccountViewModel>(result.ops[0], 'password')
  }
}
