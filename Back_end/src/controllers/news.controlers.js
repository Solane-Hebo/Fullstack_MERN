import mongoose from 'mongoose'
import News from '../models/news.model.js'
import asyncHandler from 'express-async-handler'

export const createNewsArticle = asyncHandler( async (req,  res, next) => {
    const { title, content} = req.body
    const author = req.user._id 

    if(!title && !content){
        return res.status(400).json({message: "Title and content are required"})
    }
    
    const newsArticle = await News.create({ title, content, author })

    res.status(201).json(newsArticle)


})

// hämta alla inlägg
export const getNewsArticles = asyncHandler(async (req, res) =>{
    const newsArticles = await News.find()
    .populate("author", "name").exec()

    res.status(200).json(newsArticles)
})

// hämta en article
export const getNewsArticle = asyncHandler(async(req, res) => {
const {id} = req.params

// hantera fell meddelande för id
if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "invalid id" })
}

const newsArticle = await News.findById(id).populate("author", "name").exec()

if(!newsArticle) {
    return res.status(404).json({ message:"News article not found" })
}

res.status(200).json(newsArticle)

})

// uppdate

export const updateNewsArticle = asyncHandler(async (req, res) =>{
    const {id} = req.params
    const { title, content } = req.body

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "invalid id" })
    }

    const toUpdate = {}
    if (title) toUpdate.title = title
    if(content) toUpdate.content = content


    if(Object.keys(toUpdate).length === 0){
       res.status(400).json({message:"No changes provided"})
    }
     
    
    const updateNewsArticle = await News.findByIdAndUpdate(id, toUpdate, { new: true}) 
    if(!updateNewsArticle) {
        return res.status(400).json({message: `News article is not found`})
    }

    res.status(200).json(updateNewsArticle)
     
})

// delete
export const deleteNewsArticle = asyncHandler(async(req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "invalid id" })
    }

    const newsArticle = await News.findByIdAndDelete(id).exec()
    if(!newsArticle) {
        return res.status(400).json({message: `News article is not found`})
    }

    res.sendStatus(204)
})

