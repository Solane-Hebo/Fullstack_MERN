import mongoose from "mongoose";
import ROLES from "../constant/roles.js";


const userSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true},
    role: {
        type: String,
        enum: [...Object.values(ROLES)], // vi änvender de har som ary//['admin', 'moderator', 'resideny']
        default: ROLES.RESIDENT

    }, 
    // isVerified: { type: Boolean, default: false}
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

export default User 