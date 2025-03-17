// namn.typ.filändelse
//news.model.js sköter schema med mongoose
import mongoose from "mongoose"


//definera hur mitt schema ska se ut //noSQL
const newsSchema = new mongoose.Schema({
// _id: mongoose.Schema.Types.ObjectId 
// title: String, vi kan ha bara den här om vi vill
// man kan se i mongoose.se hemsida om man vill
title: {type: String, required: true},
content: {type: String, required: true},

// kan skapa andra argumet med ,
// createdAt: {type: Date, default: Date.now()} //de har kan skapas outomatis
}, {timestamps: true})
// { timestamps: true } is used when defining a schema to automatically add createdAt and updatedAt fields to documents.

//Model
const News = mongoose.model('News', newsSchema)
//News -> news
// User -> users

// de här ska skötas i controllers så vi gör export defoult stellät
// const newArticle = News.create({
//     title: 'hej',
//     content: 'sfdghjhgh'
// })

export default News