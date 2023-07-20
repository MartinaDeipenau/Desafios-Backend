import 'dotenv/config'
import mongoose from 'mongoose'

// Configuration mongoose
mongoose
    .connect(process.env.URL_MONGOOSE)
    .then(() => console.log('DB is connected'))
    .catch((error) => {
        console.log('Error connecting to MongoDB')
    })