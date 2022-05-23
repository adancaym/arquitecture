import { Placement } from '.'
import { User } from '../user'

let user, placement

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  placement = await Placement.create({ user, asset: 'test', status: 'test', bid: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = placement.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(placement.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.asset).toBe(placement.asset)
    expect(view.status).toBe(placement.status)
    expect(view.bid).toBe(placement.bid)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = placement.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(placement.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.asset).toBe(placement.asset)
    expect(view.status).toBe(placement.status)
    expect(view.bid).toBe(placement.bid)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
