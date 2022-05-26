import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Bid } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, bid

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  bid = await Bid.create({ user })
})

test('POST /bids 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, wallet: 'test', minimalBid: 'test', maximalBid: 'test', outbidAmount: 'test', expirationTime: 'test', assets: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.wallet).toEqual('test')
  expect(body.minimalBid).toEqual('test')
  expect(body.maximalBid).toEqual('test')
  expect(body.outbidAmount).toEqual('test')
  expect(body.expirationTime).toEqual('test')
  expect(body.assets).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /bids 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /bids 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].user).toEqual('object')
})

test('GET /bids 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /bids/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${bid.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(bid.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /bids/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${bid.id}`)
  expect(status).toBe(401)
})

test('GET /bids/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /bids/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${bid.id}`)
    .send({ access_token: userSession, wallet: 'test', minimalBid: 'test', maximalBid: 'test', outbidAmount: 'test', expirationTime: 'test', assets: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(bid.id)
  expect(body.wallet).toEqual('test')
  expect(body.minimalBid).toEqual('test')
  expect(body.maximalBid).toEqual('test')
  expect(body.outbidAmount).toEqual('test')
  expect(body.expirationTime).toEqual('test')
  expect(body.assets).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /bids/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${bid.id}`)
    .send({ access_token: anotherSession, wallet: 'test', minimalBid: 'test', maximalBid: 'test', outbidAmount: 'test', expirationTime: 'test', assets: 'test' })
  expect(status).toBe(401)
})

test('PUT /bids/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${bid.id}`)
  expect(status).toBe(401)
})

test('PUT /bids/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, wallet: 'test', minimalBid: 'test', maximalBid: 'test', outbidAmount: 'test', expirationTime: 'test', assets: 'test' })
  expect(status).toBe(404)
})

test('DELETE /bids/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${bid.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /bids/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${bid.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /bids/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${bid.id}`)
  expect(status).toBe(401)
})

test('DELETE /bids/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
