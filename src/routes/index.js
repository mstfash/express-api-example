import express from 'express'
import getAuthRouter from './users'
import getPostsRouter from './posts'

function getRouter() {
  const router = express.Router()
  router.use('/auth', getAuthRouter())
  router.use('/posts', getPostsRouter())
  return router
}

export default getRouter
