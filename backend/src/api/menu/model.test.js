import { Menu } from '.'

let menu

beforeEach(async () => {
  menu = await Menu.create({ name: 'test', menus: 'test', color: 'test', icon: 'test', path: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = menu.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(menu.id)
    expect(view.name).toBe(menu.name)
    expect(view.menus).toBe(menu.menus)
    expect(view.color).toBe(menu.color)
    expect(view.icon).toBe(menu.icon)
    expect(view.path).toBe(menu.path)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = menu.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(menu.id)
    expect(view.name).toBe(menu.name)
    expect(view.menus).toBe(menu.menus)
    expect(view.color).toBe(menu.color)
    expect(view.icon).toBe(menu.icon)
    expect(view.path).toBe(menu.path)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
