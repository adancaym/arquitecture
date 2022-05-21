import { Process } from '.'

let process

beforeEach(async () => {
  process = await Process.create({ name: 'test', provider: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = process.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(process.id)
    expect(view.name).toBe(process.name)
    expect(view.provider).toBe(process.provider)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = process.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(process.id)
    expect(view.name).toBe(process.name)
    expect(view.provider).toBe(process.provider)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
