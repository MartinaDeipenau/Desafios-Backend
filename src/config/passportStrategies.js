import 'dotenv/config'
import passport from 'passport'
import { Strategy as GitHubStrategy } from 'passport-github2'
import { userModel } from '../models/user.js'

passport.use(
    'github',
    new GitHubStrategy(
        {
            clientID: 'Iv1.00e76cd60a4f4244',
            clientSecret: process.env.GITHUB_SECRET,
            callbackURL: "http://localhost:4000/api/register/github",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // console.log(profile)
                const user = await userModel.findOne({ email: profile._json.email })
                if (!user) {
                    const newUser = new userModel({
                        first_name: profile._json.name.split(' ')[0],
                        last_name: profile._json.name.split(' ')[1] ?? '',
                        age: 0,
                        email: profile._json.email,
                        password: 'Github',
                    })
                    const newUserDB = await userModel.create(newUser)
                    return done(null, newUserDB)
                } else {
                    return done(null, user)
                }
            } catch (error) {
                return done('Error', +error)
            }
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userModel.findById(id)
        done(null, user)
    } catch (error) {
        done(error)
    }
})