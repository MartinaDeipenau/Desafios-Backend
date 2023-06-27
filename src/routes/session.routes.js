import { Router } from 'express'
import { login, logout } from '../controllers/session.controller.js'


const sessionRouter = Router()

// Login

sessionRouter.get('/login', async (req, res) => {
    res.render('login')
})

sessionRouter.post('/login', login)


// Logout

sessionRouter.get('/logout', logout)

export default sessionRouter