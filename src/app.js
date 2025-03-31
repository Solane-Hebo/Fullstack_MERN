//app.js ska hantera route
import express from 'express'

import { errorHandler, notFound } from './middleware/error.middelware.js'
import newsRoute from './routes/news.route.js'
import threadRoutes from './routes/thread.route.js'
import commentRoutes from './routes/comment.route.js'
import userRoutes from './routes/user.route.js'
import { verifyToken } from './middleware/auth.middleware.js'
import cors from 'cors'


const app = express()

const whitelist = ["http://localhost:5173", "http://localhost:6565", 'www.minhemsida.com']


app.use(cors(
    {origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        }else { 
            callback(new error('Not allow hey colors'))
        }
    } 
        
    }))


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

