import request from 'supertest-as-promised'
import express from '../../services/express'
import routes from '.'

const app = () => express(routes)

test('GET /healt-checks 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(typeof body).toBe('object')
  expect(body.status).toBe('ok')
})
