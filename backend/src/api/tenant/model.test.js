import { Tenant } from '.'

let tenant

beforeEach(async () => {
  tenant = await Tenant.create({ name: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = tenant.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(tenant.id)
    expect(view.name).toBe(tenant.name)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = tenant.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(tenant.id)
    expect(view.name).toBe(tenant.name)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
