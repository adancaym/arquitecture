import { Bot } from '.'

let bot

beforeEach(async () => {
  bot = await Bot.create({ name: 'test', route: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = bot.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(bot.id)
    expect(view.name).toBe(bot.name)
    expect(view.route).toBe(bot.route)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = bot.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(bot.id)
    expect(view.name).toBe(bot.name)
    expect(view.route).toBe(bot.route)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
