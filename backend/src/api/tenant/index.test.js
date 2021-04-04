import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Tenant } from '.'

const app = () => express(apiRoot, routes)

let tenant

beforeEach(async () => {
  tenant = await Tenant.create({})
})

test('POST /tenants 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, name: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
})

test('POST /tenants 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /tenants 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /tenants 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /tenants/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${tenant.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(tenant.id)
})

test('GET /tenants/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${tenant.id}`)
  expect(status).toBe(401)
})

test('GET /tenants/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /tenants/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${tenant.id}`)
    .send({ access_token: masterKey, name: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(tenant.id)
  expect(body.name).toEqual('test')
})

test('PUT /tenants/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${tenant.id}`)
  expect(status).toBe(401)
})

test('PUT /tenants/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, name: 'test' })
  expect(status).toBe(404)
})

test('DELETE /tenants/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${tenant.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /tenants/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${tenant.id}`)
  expect(status).toBe(401)
})

test('DELETE /tenants/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
