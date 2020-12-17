const db = require("../../data/dbConfig")

module.exports = {
    insert,
    getAll

}

function getAll() {
    return db('users')
}

async function insert(user) {
    const [id] = await db("users").insert(user)
    return db("users").where({id}).first()
} 