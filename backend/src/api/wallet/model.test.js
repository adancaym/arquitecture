import { Wallet } from '.'
import { User } from '../user'

let user, wallet

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  wallet = await Wallet.create({ user, name: 'test', secret: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = wallet.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(wallet.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.name).toBe(wallet.name)
    expect(view.secret).toBe(wallet.secret)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = wallet.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(wallet.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.name).toBe(wallet.name)
    expect(view.secret).toBe(wallet.secret)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
