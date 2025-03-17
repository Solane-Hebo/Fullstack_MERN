import express from 'express'
import News from '../models/news.model.js'
import { createNewsArticle, deleteNewsArticle, getNewsArticle, getNewsArticles, updateNewsArticle } from '../controllers/news.controlers.js'

const router = express.Router()

// vi behöver inte skriva api/news för att vi har redan i app.js

// den har ochså behöver ändras
// router.get('/',(req, res) => {
    //     res.send('Alla nyheter')
    // })
    // router.get('/:id',(req, res) => {
        //     res.send('hämta en nyhet')
        // })

        //CRUD ***
        // controllen communicerar med modellen så ska vi klppa ut den
router.post('/', createNewsArticle) //CREATE

router.get('/',getNewsArticles) //READ
router.get('/:id',getNewsArticle) //READ //parametern

router.put('/:id',updateNewsArticle) //UPDATE
router.patch('/:id', updateNewsArticle) //UPDATE

router.delete('/:id',deleteNewsArticle) //DELETE

// router.post('/', async (req, res) => {
//    const newsArticle = await News.create({
//     title: 'First Article',
//     content: 'niku jhbukj kklj'
//    })
//    res.json(newsArticle)
// })


export default router