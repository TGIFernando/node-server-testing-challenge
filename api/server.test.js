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
        it('responds with 201 CREATED', async () => {
            const res = await request(server).post('/users').send(Fern)
            expect(res.status).toBe(201)
        })
        it('responds with a user', async () => {
            const res = await request(server).post('/users').send(Mogi)
            expect(res.body.name).toBe("Morgan")
        })
    })

    describe('[DELETE] /users/:id', () => {
        it('responds with 200 DELETED', async () => {
            await request(server).post('/users').send(Fern)
            const res = await request(server).delete('/users/1')
            expect(res.status).toBe(200)
        })
        it('respons with User deleted', async () => {
            await request(server).post('/users').send(Fern)
            const res = await request(server).delete('/users/1')
            expect(res.body.message).toBe("User deleted")
        })
    })
})