const express = require("express")
const M = require("./users/user-model")



const server = express()

server.use(express.json())

server.get("/", (req, res) => {
    res.status(200).json({api: "up"})
})

server.get("/users", (req, res) => {
    M.getAll()
        .then(user => {
            res.status(200).json(user)
        }) .catch (err => {
            res.status(500).json(err)
        })
})

server.post("/users", async (req, res) => {
    M.insert(req.body)
        .then(user => {
            res.status(201).json(user)
        }) .catch (err => {
            res.status(500).json(err)
        })
})

server.delete("/users/:id", async (req, res) => {
    M.remove(req.params.id)
        .then(user => {
            res.status(200).json({ message: `User deleted`})
        }) .catch (err => {
            res.status(500).json(err)
        })
})

module.exports = server