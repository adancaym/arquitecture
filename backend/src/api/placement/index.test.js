import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Placement } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, placement

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  placement = await Placement.create({ user })
})

test('POST /placements 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, asset: 'test', status: 'test', bid: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.asset).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.bid).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /placements 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /placements 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].user).toEqual('object')
})

test('GET /placements 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /placements/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${placement.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(placement.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /placements/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${placement.id}`)
  expect(status).toBe(401)
})

test('GET /placements/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /placements/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${placement.id}`)
    .send({ access_token: userSession, asset: 'test', status: 'test', bid: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(placement.id)
  expect(body.asset).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.bid).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /placements/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${placement.id}`)
    .send({ access_token: anotherSession, asset: 'test', status: 'test', bid: 'test' })
  expect(status).toBe(401)
})

test('PUT /placements/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${placement.id}`)
  expect(status).toBe(401)
})

test('PUT /placements/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, asset: 'test', status: 'test', bid: 'test' })
  expect(status).toBe(404)
})

test('DELETE /placements/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${placement.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /placements/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${placement.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /placements/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${placement.id}`)
  expect(status).toBe(401)
})

test('DELETE /placements/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
