import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Bot } from '.'

const app = () => express(apiRoot, routes)

let bot

beforeEach(async () => {
  bot = await Bot.create({})
})

test('POST /bots 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, name: 'test', route: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.route).toEqual('test')
})

test('POST /bots 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /bots 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /bots 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /bots/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${bot.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(bot.id)
})

test('GET /bots/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${bot.id}`)
  expect(status).toBe(401)
})

test('GET /bots/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /bots/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${bot.id}`)
    .send({ access_token: masterKey, name: 'test', route: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(bot.id)
  expect(body.name).toEqual('test')
  expect(body.route).toEqual('test')
})

test('PUT /bots/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${bot.id}`)
  expect(status).toBe(401)
})

test('PUT /bots/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, name: 'test', route: 'test' })
  expect(status).toBe(404)
})

test('DELETE /bots/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${bot.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /bots/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${bot.id}`)
  expect(status).toBe(401)
})

test('DELETE /bots/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
