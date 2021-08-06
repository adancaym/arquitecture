import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { File } from '.'

const app = () => express(apiRoot, routes)

let userSession, file

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  file = await File.create({})
})

test('POST /files 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, file: 'test', ext: 'test', name: 'test', size: 'test', mime: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.file).toEqual('test')
  expect(body.ext).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.size).toEqual('test')
  expect(body.mime).toEqual('test')
})

test('POST /files 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /files 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /files 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /files/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${file.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(file.id)
})

test('GET /files/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${file.id}`)
  expect(status).toBe(401)
})

test('GET /files/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /files/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${file.id}`)
    .send({ access_token: userSession, file: 'test', ext: 'test', name: 'test', size: 'test', mime: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(file.id)
  expect(body.file).toEqual('test')
  expect(body.ext).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.size).toEqual('test')
  expect(body.mime).toEqual('test')
})

test('PUT /files/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${file.id}`)
  expect(status).toBe(401)
})

test('PUT /files/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: userSession, file: 'test', ext: 'test', name: 'test', size: 'test', mime: 'test' })
  expect(status).toBe(404)
})

test('DELETE /files/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${file.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /files/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${file.id}`)
  expect(status).toBe(401)
})

test('DELETE /files/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})
