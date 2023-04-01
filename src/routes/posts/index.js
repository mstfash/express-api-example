import express from 'express'
import { authMiddleware } from '../middlewares/auth-middleware'
import postsController from './posts-controller'

function getPostsRouter() {
  const router = express.Router()

  router.get('/', postsController.getListOfPosts)

  router.get('/:authorId', postsController.getPostsByAuthorId)

  router.post('/add', authMiddleware, postsController.createPost)

  router.get('/:id', postsController.setPost, postsController.getPost)

  router.put(
    '/:id',
    authMiddleware,
    postsController.setPost,
    postsController.updatePost,
  )

  router.delete(
    '/:id',
    authMiddleware,
    postsController.setPost,
    postsController.deletePost,
  )

  return router
}

export default getPostsRouter
