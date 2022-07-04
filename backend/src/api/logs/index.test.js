import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Logs } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, logs

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  logs = await Logs.create({})
})

test('POST /logs 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, request: 'test', response: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.request).toEqual('test')
  expect(body.response).toEqual('test')
})

test('POST /logs 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /logs 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /logs 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /logs 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /logs 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /logs/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${logs.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(logs.id)
})

test('GET /logs/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${logs.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /logs/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${logs.id}`)
  expect(status).toBe(401)
})

test('GET /logs/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /logs/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${logs.id}`)
    .send({ access_token: adminSession, request: 'test', response: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(logs.id)
  expect(body.request).toEqual('test')
  expect(body.response).toEqual('test')
})

test('PUT /logs/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${logs.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /logs/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${logs.id}`)
  expect(status).toBe(401)
})

test('PUT /logs/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, request: 'test', response: 'test' })
  expect(status).toBe(404)
})

test('DELETE /logs/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${logs.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /logs/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${logs.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /logs/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${logs.id}`)
  expect(status).toBe(401)
})

test('DELETE /logs/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
