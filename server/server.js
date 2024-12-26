import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import * as Sentry from '@sentry/node'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import { clerkWebhooks } from './controllers/webhooks.js'
dotenv.config()


//initialize app
const app = express()

const PORT = process.env.PORT || 5000

Sentry.setupExpressErrorHandler(app);

//connect to database
connectDB()

//middleware
app.use(express.json())
app.use(cors())


//routes
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });

app.post('/webhooks', clerkWebhooks)


app.listen(PORT, () => {
    console.log(` server is listening on port ${PORT}`)
})