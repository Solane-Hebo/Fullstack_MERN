import asyncHandler from "express-async-handler";
import Thread from "../models/thread.model.js";
import mongoose from "mongoose";

export const createThread = asyncHandler( async (req, res, next) => {
const { title, content } = req.body

if(!title || !content) {
    return res.status(400).json({message: 'Title and content are required'})
    }

    const thread = await Thread.create({title, content})
    res.status(201).json(thread)
})

export const getThreads = asyncHandler( async (req, res, next) => {
    const threads = await Thread.find()
    .populate('comments')

    res.status(201).json(threads)
})

export const uppdateThread = asyncHandler(async (req, res, next)=>{
    const { id } = req.params
    const {title, content} = req.body

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({message: 'Invalid id'})
    }

    const toUpdate = {}
    if(title) toUpdate.title = title
    if(content) toUpdate.content = content

    if(Object.keys(toUpdate).length === 0) {
        return res.status(400).json({message: 'No changes provided'})
    }

    // Todo: ändra queryn så att man bara kan ta bort sina egna trådar
    const thread = await Thread.findByIdAndUpdate(id, toUpdate, {new: true}).exec()
      if(!thread) {
        return res.status(404).json({message: 'Thread not found'})
      }

      res.status(200).json(thread)


})


export const deleteThread = asyncHandler(async (req, res, next)=>{
    const { id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message: 'Invalid id'})
    }

    const thread = await Thread.findByIdAndDelete(id).exec()
    if(!thread) {
        return res.status(404).json({message: 'Threadd not found'})
    }

    res.sendStatus(204)
})

