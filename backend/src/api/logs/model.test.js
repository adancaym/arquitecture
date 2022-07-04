import { Logs } from '.'

let logs

beforeEach(async () => {
  logs = await Logs.create({ request: 'test', response: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = logs.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(logs.id)
    expect(view.request).toBe(logs.request)
    expect(view.response).toBe(logs.response)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = logs.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(logs.id)
    expect(view.request).toBe(logs.request)
    expect(view.response).toBe(logs.response)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
