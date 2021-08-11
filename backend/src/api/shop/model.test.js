import { Shop } from '.'
import { User } from '../user'

let user, shop

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  shop = await Shop.create({ user, name: 'test', products: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = shop.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(shop.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.name).toBe(shop.name)
    expect(view.products).toBe(shop.products)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = shop.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(shop.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.name).toBe(shop.name)
    expect(view.products).toBe(shop.products)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
