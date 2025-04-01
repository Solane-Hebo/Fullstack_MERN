import express from 'express'
import { register, login, getUserProfile, updateRole, checkToken } from '../controllers/user.controller.js'
import { verifyRoles, verifyToken } from '../middleware/auth.middleware.js'
import ROLES from '../constants/roles.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)

router.post('/role/:id', verifyToken, verifyRoles(ROLES.ADMIN), updateRole)

router.get('/profile', verifyToken, getUserProfile)
router.get('/check', verifyToken, checkToken)

export default router