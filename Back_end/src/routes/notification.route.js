import express from 'express'
import {verifyToken} from '../middleware/auth.middleware.js'
import { getNotifications, readNotification } from '../controllers/notifications.controller.js'

const router = express.Router()

router.get('/', verifyToken, getNotifications)
router.put('/:id', verifyToken, readNotification)
router.patch('/:id', verifyToken, readNotification)
export default router