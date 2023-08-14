import express from 'express'
import './config/configDB.js'
import 'dotenv/config' // Para poder implementar dotenv
import { Server } from 'socket.io'
import { engine } from 'express-handlebars'

import productsRouters from './routes/product.routes.js'
import cartsRouters from './routes/carts.routes.js'
import messagesRouters from './routes/messages.routes.js'
import sessionRouters from './routes/session.routes.js'
import registerRouter from './routes/register.routes.js'
import loggerRoutes from './routes/loggerTest.routes.js'
import mockingProductsRouter from './testing/routes/mockingProducts.routes.js'

import * as path from 'path'
import { __dirname, __filename } from '../path.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import initializePassport from './config/passportStrategies.js'
import errorHandler from '../src/middleware/errors.js'

import { loggerDev } from './utils/loggerWinston.js'

import { loggerMiddleware } from './middleware/logger.js'



// Configuration express

const app = express()
const PORT = 4000

// Configuration cookies

app.use(cookieParser(process.env.SIGNED_COOKIES))

// Configuration session

app.use(
    session({
        store: MongoStore.create({
            mongoUrl: process.env.URL_MONGOOSE,
            mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
            ttl: 210 // Segundos
        }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    }))

// Configuration passport

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

// Configuration handlebars

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'src', 'views'))

// Middleware

app.use(express.json()) // Me permite ejecutar json en la app
app.use(express.urlencoded({ extended: true })) // Me permite poder realizar consultas en (req.query)
app.use(express.static(path.join(__dirname, 'public')))
app.use(loggerMiddleware)

app.get('/', (req, res)=> {
    res.render('home', {title: 'Pagina de inicio'})
})

const myServer = app.listen(PORT, () => {
    loggerDev.info(`Server on port ${PORT}`)
})

// Server Io

const io = new Server(myServer)

app.use((req, res, next) => {
    req.io = io
    return next()
})

// Routes
app.use('/', express.static(__dirname + '/public'))
app.use('/api/products', productsRouters)
app.use('/api/carts', cartsRouters)
app.use('/api/messages', messagesRouters)
app.use('/api/session', sessionRouters)
app.use('/api/register', registerRouter)
app.use('/api/mockingproducts', mockingProductsRouter)
app.use('/api/loggerTest', loggerRoutes)


// Custom error handler
app.use(errorHandler)

