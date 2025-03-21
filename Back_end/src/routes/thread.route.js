import express from 'express'
import { createThread, deleteThread, getThreads, uppdateThread } from '../controllers/thread.controller.js'
import { createComment, deleteComment } from '../controllers/comment.controller.js'
import { verifyToken } from '../middleware/auth.middleware.js'

const router = express.Router()

// router.get('/', createThread)
// router.post('/', getThreads)

router.route('/')
 .get(getThreads)
 .post(createThread)

 router.route('/:id')
 .put(uppdateThread)
 .patch(uppdateThread)
 .delete(deleteThread)

 router.route('/:threadId/comment')
 .post(createComment)

//  router.route('/:threadId/comment/:id')
//   .delete(deleteComment)
//    .post(createComment)



export default router