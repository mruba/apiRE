import request from 'supertest-as-promised'
import express from '../../services/express'
import routes from '.'

const app = () => express(routes)

const user = { id: 'ernesto.calderon@fsanpablo.com' }
const product = { id: '000000000004520052' }
const cart = { id: 'adri.baes@gmail.com' }
const category = { id: '040010002' }
const limit = 30

test('GET /recommendation 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /recommendation/users/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/users/${user.id}?limit=${limit}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(body.length).toBe(limit)
})

test('GET /recommendation/products/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/products/${product.id}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(body.length >= 1).toBe(true)
})

test('GET /recommendation/carts/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/carts/${cart.id}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(body.length >= 1).toBe(true)
})

test('GET /recommendation/categories/:cid/users/:uid 200', async () => {
  const { status, body } = await request(app())
  .get(`/categories/${category.id}/users/${user.id}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(body.length >= 1).toBe(true)
})
