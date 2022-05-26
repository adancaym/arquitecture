import { Groups } from '.'

let groups

beforeEach(async () => {
  groups = await Groups.create({ name: 'test', menus: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = groups.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(groups.id)
    expect(view.name).toBe(groups.name)
    expect(view.menus).toBe(groups.menus)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = groups.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(groups.id)
    expect(view.name).toBe(groups.name)
    expect(view.menus).toBe(groups.menus)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
