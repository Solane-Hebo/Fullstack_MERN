//app.js ska hantera route
import express from 'express'

import { errorHandler, notFound } from './middleware/error.middelware.js'
import newsRoute from './routes/news.route.js'
import threadRoutes from './routes/thread.route.js'
import commentRoutes from './routes/comment.route.js'
import userRoutes from './routes/user.route.js'
import { verifyToken } from './middleware/auth.middleware.js'


const app = express()

// CRAD function

//Model View Controller
app.use(express.json())


app.use('/api/news', newsRoute)
app.use('/api/threads', verifyToken, threadRoutes)   //added token
app.use('/api/comments', commentRoutes)
app.use('/api/auth', userRoutes)






app.use (notFound) // notFoud
app.use (errorHandler) // errorHandler



export default app

