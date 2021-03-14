import { Encrypter, AddAccountCommand, AccountViewModel, AddAccountRepository } from './add-account-app-business.protocols'
import { AddAccountAppBusiness } from './add-account-app-business'

interface SutTypes {
  sut: AddAccountAppBusiness
  encrypterStub: Encrypter
  addAccountRepositoryStub: AddAccountRepository
}

const encrypterFactory = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (password: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new EncrypterStub()
}

const addAccountRepositoryFactory = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accounData: AddAccountCommand): Promise<AccountViewModel> {
      const createdAccount: AccountViewModel = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email'
      }
      return new Promise(resolve => resolve(createdAccount))
    }
  }
  return new AddAccountRepositoryStub()
}

const sutFactory = (): SutTypes => {
  const encrypterStub = encrypterFactory()
  const addAccountRepositoryStub = addAccountRepositoryFactory()
  const sut = new AddAccountAppBusiness(encrypterStub, addAccountRepositoryStub)
  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub
  }
}

describe('DbAddAccount Usecase', () => {
  it('Should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = sutFactory()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    const accountData: AddAccountCommand = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  it('Should throw if encrypter throws', async () => {
    const { sut, encrypterStub } = sutFactory()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const accountData: AddAccountCommand = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  it('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = sutFactory()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')

    const accountData: AddAccountCommand = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    })
  })

  it('Should throw if addAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = sutFactory()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const accountData: AddAccountCommand = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  it('Should return an account on success', async () => {
    const { sut } = sutFactory()

    const accountData: AddAccountCommand = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    const createdAccount = await sut.add(accountData)
    expect(createdAccount).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email'
    })
  })
})
