import { File } from '.'

let file

beforeEach(async () => {
  file = await File.create({ file: 'test', ext: 'test', name: 'test', size: 'test', mime: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = file.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(file.id)
    expect(view.file).toBe(file.file)
    expect(view.ext).toBe(file.ext)
    expect(view.name).toBe(file.name)
    expect(view.size).toBe(file.size)
    expect(view.mime).toBe(file.mime)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = file.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(file.id)
    expect(view.file).toBe(file.file)
    expect(view.ext).toBe(file.ext)
    expect(view.name).toBe(file.name)
    expect(view.size).toBe(file.size)
    expect(view.mime).toBe(file.mime)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
