import { Router } from 'express'
import { userModel } from '../models/user.js'
import { hashPassword } from '../utils/bcrypt.js'
import passport from 'passport'

const registerRouter = Router()

registerRouter.get('/', async (req, res) => {
    res.render('register')
})

registerRouter.post('/', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (user) {
            return res.send('User registered with email: ' + user.email)
        }
        const hashPass = await hashPassword(password)

        const newUser = { ...req.body, password: hashPass }

        await userModel.create(newUser)

        res.redirect('session/login')
    } catch {
        ; (error) => {
            console.log(error)
            res.status(500).send('Error in session')
        }
    }
})

registerRouter.get(
    '/github',
    passport.authenticate('github', { scope: ['user:email'] })
)

registerRouter.get(
    '/githubcallback',
    passport.authenticate('github', {
        failureRedirect: '/api/session/login',
    }),
    async (req, res) => {
        req.session.user = req.user
        res.redirect('/api/products')
    }
)

export default registerRouter