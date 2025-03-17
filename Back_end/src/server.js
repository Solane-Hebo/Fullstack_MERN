//sever.js kommer att sköta 
import app from './app.js'
import mongoose from 'mongoose'

const PORT = process.env.PORT || 9999
//coppla mot mongoDB
const MONGO_URI =process.env.MONGO_URI

//fördelan med async är att outomatic returnerar promises 
const dbConnect = async () => {
    try {
        const mongo = await mongoose.connect(MONGO_URI)
        console.log(`MongoDB Connected: ${mongo.connection.host}`)
    } catch (error) {
        console.log(`MongoDB Connection Error: ${err.message}`)
        process.exit(1)
        
    }

}
//starter server fanction
const startServer = async() => {
    try {
        //har tar vi in app
        await dbConnect()
        app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
    } catch (error) {
        // error.message ger oss vad som har gott fell
        //process.exit commer att avsluta våran serven
        console.log(`Failed to start server:, ${error.message}`)
        process.exit(1)
        
    }
}

startServer()