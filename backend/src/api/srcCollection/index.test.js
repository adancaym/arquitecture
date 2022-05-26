import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { SrcCollection } from '.'

const app = () => express(apiRoot, routes)

let userSession, srcCollection

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  srcCollection = await SrcCollection.create({})
})

test('POST /srcCollections 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, name: 'test', provider: 'test', apikey: 'test', srcCollection: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.provider).toEqual('test')
  expect(body.apikey).toEqual('test')
  expect(body.srcCollection).toEqual('test')
})

test('POST /srcCollections 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /srcCollections 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /srcCollections 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /srcCollections/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${srcCollection.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(srcCollection.id)
})

test('GET /srcCollections/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${srcCollection.id}`)
  expect(status).toBe(401)
})

test('GET /srcCollections/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /srcCollections/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${srcCollection.id}`)
    .send({ access_token: userSession, name: 'test', provider: 'test', apikey: 'test', srcCollection: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(srcCollection.id)
  expect(body.name).toEqual('test')
  expect(body.provider).toEqual('test')
  expect(body.apikey).toEqual('test')
  expect(body.srcCollection).toEqual('test')
})

test('PUT /srcCollections/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${srcCollection.id}`)
  expect(status).toBe(401)
})

test('PUT /srcCollections/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: userSession, name: 'test', provider: 'test', apikey: 'test', srcCollection: 'test' })
  expect(status).toBe(404)
})

test('DELETE /srcCollections/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${srcCollection.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /srcCollections/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${srcCollection.id}`)
  expect(status).toBe(401)
})

test('DELETE /srcCollections/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})
