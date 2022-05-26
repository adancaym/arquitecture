import { Suscription } from '.'

let suscription

beforeEach(async () => {
  suscription = await Suscription.create({ name: 'test', validity: 'test', price: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = suscription.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(suscription.id)
    expect(view.name).toBe(suscription.name)
    expect(view.validity).toBe(suscription.validity)
    expect(view.price).toBe(suscription.price)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = suscription.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(suscription.id)
    expect(view.name).toBe(suscription.name)
    expect(view.validity).toBe(suscription.validity)
    expect(view.price).toBe(suscription.price)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
