import asyncHandler from 'express-async-handler'
import Comment from '../models/comment.model.js'
import Thread from '../models/thread.model.js'
import mongoose from 'mongoose'
import Notification from '../models/notification.model.js'

export const createComment = asyncHandler (async (req, res, next)=> {
    const { content } = req.body
    const user = req.user._id 
    const threadId = req.params.threadId

    if(!content) {
        return res.status(400).json({message: 'Content is required'})
    }

    const comment = await Comment.create({content, thread: threadId, user})

    const thread = await Thread.findById(threadId).exec()

    thread.comments.push(comment._id)
    
    await thread.save()

    if(thread.user.toString() !== req.user._id) {
        await Notification.create({
            recipient: thread.user,
            sender: req.user._id,
            message: 'Commented on your thread',
            thread: thread._id
        })
    }

    res.status(201).json(comment)
})


export const deleteComment = asyncHandler(async (req, res, next)=>{
  const {id}  = req.params

   if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({message: 'Invalid id'})
   }

    // const comment = await Comment.findOneAndDelete({_id: id, user: req.userId})
    const comment = await Comment.findById(id).exec()

    if(!comment) {
        return res.status(404).json({message: 'Comment not found'})
    }

    // TODO Kolla om användaren är admin eller om användaren är den som skapat kommentaren //todo klar
    
    if(comment.user.toString() !== req.user._id && req.user.role !== "admin" && req.user.role !== "moderator") {
        return res.status(403).json({message: 'You are not allowed to delete this comment'})
    }
    

    const thread = await Thread.findById(comment.thread).exec()
    thread.comments.pull(id)

    // thread.comments.pull(comment.filter(commentId => commentId.toString() !== id))
    

    await Comment.deleteOne({_id: id}).exec()
    await thread.save()

    res.sendStatus(204)
})