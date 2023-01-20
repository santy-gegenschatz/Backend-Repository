const { Router } = require('express')
const { getUser } = require('../controllers/usersController')
const usersRouter = Router()

// ROUTER URL'S
// Get user info
usersRouter.get('/:id', getUser)

module.exports = { usersRouter }
