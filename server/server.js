import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import * as Sentry from '@sentry/node'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import { clerkWebhooks } from './controllers/webhooks.js'
dotenv.config()
import companyRouter from './routes/company.routes.js'
import jobRouter from './routes/job.routes.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/user.routes.js'
import {clerkMiddleware} from '@clerk/express'


//initialize app
const app = express()

const PORT = process.env.PORT || 5000

Sentry.setupExpressErrorHandler(app);

//connect to database
await connectDB()
await connectCloudinary()

//middleware
app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())


//routes
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });

app.post('/webhooks', clerkWebhooks)
app.use('/api/company', companyRouter)
app.use('/api/jobs', jobRouter)
app.use('/api/users', userRouter)


app.listen(PORT, () => {
    console.log(` server is listening on port ${PORT}`)
})