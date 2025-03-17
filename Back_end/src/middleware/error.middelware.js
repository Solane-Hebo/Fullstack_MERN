export const notFound = (req, res, next) =>{
const error = new Error(`Not Found - ${req.originalUrl}`)
res.status(404)
next(error)
}
export const errorHandler = (err, req, res, next) => {
    console.log(`Error: ${err.message}`)

    const statusCode = res.statusCode === 200 ? 500: res.statusCode

    res.status(statusCode).json({
        message: err.message,
        // stack: err.stack //den här ska man inte skicka till alla de är risk för haker kan komma in // skicker i utvecklings mljö
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    })
}
