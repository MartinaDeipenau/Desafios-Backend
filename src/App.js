import express from 'express'
import mongoose, { mongo } from 'mongoose'
import 'dotenv/config' // Para poder implementar dotenv
import { Server } from 'socket.io'
import { engine } from 'express-handlebars'
import productsRouters from './routes/product.routes.js'
import cartsRouters from './routes/carts.routes.js'
import messagesRouters from './routes/messages.routes.js'
import sessionRouters from './routes/session.routes.js'
import registerRouter from './routes/register.routes.js'
import * as path from 'path'
import { __dirname, __filename } from './path.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import passport from 'passport'


// Configuration express

const app = express()
const PORT = 4000

// Configuration cookies

app.use(cookieParser(process.env.SIGNED_COOKIES))

// Middleware

app.use(express.json()) // Me permite ejecutar json en la app
app.use(express.urlencoded({ extended: true })) // Me permite poder realizar consultas en (req.query)

// Configuration session

app.use(
    session({
        store: MongoStore.create({
            mongoUrl: process.env.URL_MONGOOSE,
            mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
            ttl: 210 // Segundos
        }),
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        // cookie: { secure: true }
    }))

// Configuration mongoose
mongoose
    .connect(process.env.URL_MONGOOSE)
    .then(() => console.log('DB is connected'))
    .catch((error) => {
        console.log('Error connecting to MongoDB')
    })

// Configuration handlebars

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))

const myServer = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
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