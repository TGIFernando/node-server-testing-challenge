const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')

const Fern = {name: "Fernando"}
const Mogi = {name: "Morgan"}

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async () => {
    await db('users').truncate()
})
afterAll(async () => {
    await db.destroy()
})

describe('endpoints', () => {
    describe('[POST] /users', () => {
        it('responds with 200 OK', async () => {
            const res = await request(server).get('/users')
            expect(res.status).toBe(200)
        })
    })
})