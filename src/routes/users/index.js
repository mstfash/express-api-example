import express from 'express'
import authController from './auth-controller'
import { authMiddleware } from '../middlewares/auth-middleware'

function getAuthRouter() {
  const router = express.Router()
  router.post('/register', authController.register)
  router.post('/login', authController.login)
  router.get('/me', authMiddleware, authController.me)
  return router
}

export default getAuthRouter
