import { Provider } from '.'

let provider

beforeEach(async () => {
  provider = await Provider.create({ name: 'test', keyId: 'test', urlBase: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = provider.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(provider.id)
    expect(view.name).toBe(provider.name)
    expect(view.keyId).toBe(provider.keyId)
    expect(view.urlBase).toBe(provider.urlBase)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = provider.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(provider.id)
    expect(view.name).toBe(provider.name)
    expect(view.keyId).toBe(provider.keyId)
    expect(view.urlBase).toBe(provider.urlBase)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
