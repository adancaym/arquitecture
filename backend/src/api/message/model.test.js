import { Message } from '.'

let message

beforeEach(async () => {
  message = await Message.create({ to: 'test', from: 'test', message: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = message.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(message.id)
    expect(view.to).toBe(message.to)
    expect(view.from).toBe(message.from)
    expect(view.message).toBe(message.message)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = message.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(message.id)
    expect(view.to).toBe(message.to)
    expect(view.from).toBe(message.from)
    expect(view.message).toBe(message.message)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
