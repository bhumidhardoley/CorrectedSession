import mongoose from "mongoose";
import { Types } from "mongoose";


export interface PostShape {
    title: string,
    author: mongoose.Types.ObjectId,
    body: string,
    date: Date
}

const PostSchema: mongoose.Schema<PostShape> = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    body: {
        type:String,
        required: true
    },
    date: {
        type:Date,
        default : Date.now
    }
},{timestamps: true})


export const Post = mongoose.models.Post || mongoose.model('Post',PostSchema)