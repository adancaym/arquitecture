import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Menu } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, menu

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  menu = await Menu.create({})
})

test('POST /menus 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, name: 'test', menus: 'test', color: 'test', icon: 'test', path: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.menus).toEqual('test')
  expect(body.color).toEqual('test')
  expect(body.icon).toEqual('test')
  expect(body.path).toEqual('test')
})

test('POST /menus 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /menus 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /menus 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /menus 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /menus 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /menus/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${menu.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(menu.id)
})

test('GET /menus/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${menu.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /menus/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${menu.id}`)
  expect(status).toBe(401)
})

test('GET /menus/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /menus/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${menu.id}`)
    .send({ access_token: adminSession, name: 'test', menus: 'test', color: 'test', icon: 'test', path: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(menu.id)
  expect(body.name).toEqual('test')
  expect(body.menus).toEqual('test')
  expect(body.color).toEqual('test')
  expect(body.icon).toEqual('test')
  expect(body.path).toEqual('test')
})

test('PUT /menus/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${menu.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /menus/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${menu.id}`)
  expect(status).toBe(401)
})

test('PUT /menus/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, name: 'test', menus: 'test', color: 'test', icon: 'test', path: 'test' })
  expect(status).toBe(404)
})

test('DELETE /menus/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${menu.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /menus/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${menu.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /menus/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${menu.id}`)
  expect(status).toBe(401)
})

test('DELETE /menus/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
