import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Asset } from '.'

const app = () => express(apiRoot, routes)

let userSession, asset

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  asset = await Asset.create({})
})

test('POST /assets 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, name: 'test', srcCollection: 'test', provider: 'test', apikey: 'test', asset: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.srcCollection).toEqual('test')
  expect(body.provider).toEqual('test')
  expect(body.apikey).toEqual('test')
  expect(body.asset).toEqual('test')
})

test('POST /assets 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /assets 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /assets 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /assets/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${asset.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(asset.id)
})

test('GET /assets/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${asset.id}`)
  expect(status).toBe(401)
})

test('GET /assets/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /assets/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${asset.id}`)
    .send({ access_token: userSession, name: 'test', srcCollection: 'test', provider: 'test', apikey: 'test', asset: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(asset.id)
  expect(body.name).toEqual('test')
  expect(body.srcCollection).toEqual('test')
  expect(body.provider).toEqual('test')
  expect(body.apikey).toEqual('test')
  expect(body.asset).toEqual('test')
})

test('PUT /assets/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${asset.id}`)
  expect(status).toBe(401)
})

test('PUT /assets/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: userSession, name: 'test', srcCollection: 'test', provider: 'test', apikey: 'test', asset: 'test' })
  expect(status).toBe(404)
})

test('DELETE /assets/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${asset.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /assets/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${asset.id}`)
  expect(status).toBe(401)
})

test('DELETE /assets/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})
