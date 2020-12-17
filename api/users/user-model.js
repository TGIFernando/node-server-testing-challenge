const db = require("../../data/dbConfig")

module.exports = {
    insert,
    getAll,
    remove
}

function getAll() {
    return db('users')
}

async function insert(user) {
    const [id] = await db("users").insert(user)
    return db("users").where({id}).first()
} 

function remove(id) {
    return db('users').where({id}).del()
}