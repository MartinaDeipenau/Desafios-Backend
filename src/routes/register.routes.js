import { Router } from 'express'
import { userModel } from '../models/user.js'

const registerRouter = Router()

registerRouter.get('/', async (req, res) => {
    res.render('register')
})

registerRouter.post('/', async (req, res) => {
    try {
        const newUser = req.body
        const user = new userModel(newUser)
        await user.save()

        res.send('User created')

        res.redirect('login')
    } catch {
       ; (error) => {
            console.log(error)
            res.status(500).send('Error in session')
        }
    }
})

export default registerRouter