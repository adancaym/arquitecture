import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Photo } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, photo

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  photo = await Photo.create({ user })
})

test('POST /photos 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, uri: 'test', principal: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.uri).toEqual('test')
  expect(body.principal).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /photos 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /photos 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /photos 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /photos/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${photo.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(photo.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /photos/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${photo.id}`)
  expect(status).toBe(401)
})

test('GET /photos/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /photos/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${photo.id}`)
    .send({ access_token: userSession, uri: 'test', principal: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(photo.id)
  expect(body.uri).toEqual('test')
  expect(body.principal).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /photos/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${photo.id}`)
    .send({ access_token: anotherSession, uri: 'test', principal: 'test' })
  expect(status).toBe(401)
})

test('PUT /photos/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${photo.id}`)
  expect(status).toBe(401)
})

test('PUT /photos/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, uri: 'test', principal: 'test' })
  expect(status).toBe(404)
})

test('DELETE /photos/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${photo.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /photos/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${photo.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /photos/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${photo.id}`)
  expect(status).toBe(401)
})

test('DELETE /photos/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
