import express from 'express'
import News from '../models/news.model.js'
import { createNewsArticle, deleteNewsArticle, getNewsArticle, getNewsArticles, updateNewsArticle } from '../controllers/news.controlers.js'
import { verifyRoles, verifyToken } from '../middleware/auth.middleware.js'
import ROLES from '../constants/roles.js'

const router = express.Router()

//CRUD ***
// controllen communicerar med modellen så ska vi klppa ut den
router.post('/', verifyToken, verifyRoles(ROLES.ADMIN, ROLES.MODERATOR), createNewsArticle) //CREATE   //added token

router.get('/',getNewsArticles) //READ
router.get('/:id',getNewsArticle) //READ //parametern

router.put('/:id', verifyToken, verifyRoles(ROLES.ADMIN, ROLES.MODERATOR), updateNewsArticle) //UPDATE
router.patch('/:id', verifyToken, verifyRoles(ROLES.ADMIN, ROLES.MODERATOR), updateNewsArticle) //UPDATE

router.delete('/:id', verifyToken, deleteNewsArticle) //DELETE //added token



export default router