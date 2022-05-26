import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Message } from '.'

const app = () => express(apiRoot, routes)

let userSession, message

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  message = await Message.create({})
})

test('POST /messages 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, to: 'test', from: 'test', message: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.to).toEqual('test')
  expect(body.from).toEqual('test')
  expect(body.message).toEqual('test')
})

test('POST /messages 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /messages 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /messages 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /messages/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${message.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(message.id)
})

test('GET /messages/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${message.id}`)
  expect(status).toBe(401)
})

test('GET /messages/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /messages/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${message.id}`)
    .send({ access_token: userSession, to: 'test', from: 'test', message: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(message.id)
  expect(body.to).toEqual('test')
  expect(body.from).toEqual('test')
  expect(body.message).toEqual('test')
})

test('PUT /messages/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${message.id}`)
  expect(status).toBe(401)
})

test('PUT /messages/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: userSession, to: 'test', from: 'test', message: 'test' })
  expect(status).toBe(404)
})

test('DELETE /messages/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${message.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /messages/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${message.id}`)
  expect(status).toBe(401)
})

test('DELETE /messages/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})
