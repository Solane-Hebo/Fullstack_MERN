import mongoose from "mongoose";
import Thread from "./thread.model.js";

const commentSchema = new mongoose.Schema({
    content: {type: String, required: true},
    // user
    thread: {type: mongoose.Schema.Types.ObjectId, ref:'Thread', required: true}
}, {timestamps: true})

const Comment = mongoose.model('Comment', commentSchema)
export default Comment