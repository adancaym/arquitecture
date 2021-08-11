import { Photo } from '.'
import { User } from '../user'

let user, photo

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  photo = await Photo.create({ user, uri: 'test', principal: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = photo.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(photo.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.uri).toBe(photo.uri)
    expect(view.principal).toBe(photo.principal)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = photo.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(photo.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.uri).toBe(photo.uri)
    expect(view.principal).toBe(photo.principal)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
