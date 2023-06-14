import { Router } from 'express'
import { userModel } from '../models/user.js'

const sessionRouter = Router()

sessionRouter.get('/login', async (req, res) => {
    res.render('login')
})

sessionRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email, password }).lean()

        if (!user) {
            res.send('Error')
        }
        req.session.user = user
        res.redirect('api/products')
    } catch {
        ; (error) => {
            console.error(error)
            res.status(500).send('Error login')
        }
    }
})

sessionRouter.get('/logout', async (req, res) => {
    try {
        req.session.destroy()
        res.redirect('login')
    } catch {
        ; (error) => console.error(error)
        res.status(500).send('Error logout')
    }
})

export default sessionRouter