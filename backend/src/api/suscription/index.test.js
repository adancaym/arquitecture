import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Suscription } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, suscription

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  suscription = await Suscription.create({})
})

test('POST /suscriptions 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, name: 'test', validity: 'test', price: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.validity).toEqual('test')
  expect(body.price).toEqual('test')
})

test('POST /suscriptions 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /suscriptions 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /suscriptions 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /suscriptions 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /suscriptions 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /suscriptions/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${suscription.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(suscription.id)
})

test('GET /suscriptions/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${suscription.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /suscriptions/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${suscription.id}`)
  expect(status).toBe(401)
})

test('GET /suscriptions/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /suscriptions/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${suscription.id}`)
    .send({ access_token: adminSession, name: 'test', validity: 'test', price: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(suscription.id)
  expect(body.name).toEqual('test')
  expect(body.validity).toEqual('test')
  expect(body.price).toEqual('test')
})

test('PUT /suscriptions/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${suscription.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /suscriptions/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${suscription.id}`)
  expect(status).toBe(401)
})

test('PUT /suscriptions/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, name: 'test', validity: 'test', price: 'test' })
  expect(status).toBe(404)
})

test('DELETE /suscriptions/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${suscription.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /suscriptions/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${suscription.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /suscriptions/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${suscription.id}`)
  expect(status).toBe(401)
})

test('DELETE /suscriptions/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
