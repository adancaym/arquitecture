import { Bid } from '.'
import { User } from '../user'

let user, bid

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  bid = await Bid.create({ user, wallet: 'test', minimalBid: 'test', maximalBid: 'test', outbidAmount: 'test', expirationTime: 'test', assets: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = bid.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(bid.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.wallet).toBe(bid.wallet)
    expect(view.minimalBid).toBe(bid.minimalBid)
    expect(view.maximalBid).toBe(bid.maximalBid)
    expect(view.outbidAmount).toBe(bid.outbidAmount)
    expect(view.expirationTime).toBe(bid.expirationTime)
    expect(view.assets).toBe(bid.assets)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = bid.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(bid.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.wallet).toBe(bid.wallet)
    expect(view.minimalBid).toBe(bid.minimalBid)
    expect(view.maximalBid).toBe(bid.maximalBid)
    expect(view.outbidAmount).toBe(bid.outbidAmount)
    expect(view.expirationTime).toBe(bid.expirationTime)
    expect(view.assets).toBe(bid.assets)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
