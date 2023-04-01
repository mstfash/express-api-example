import 'dotenv/config'
import express from 'express'
import passport from 'passport'
import bodyParser from 'body-parser'
import 'express-async-errors'
import logger from 'loglevel'
import { UnauthorizedError } from 'express-jwt'
import getRouter from './routes'
import { getLocalStrategy } from './routes/middlewares/auth-middleware'
import { generatePosts, generateUsers } from './mocks'
import './cron-job'

function startServer({ port = process.env.PORT ?? 4000 } = {}) {
  const app = express()

  app.use(bodyParser.json())
  app.use(passport.initialize())

  passport.use(getLocalStrategy())

  app.use('/api', getRouter())
  app.use(errorMiddleware)

  return new Promise((resolve) => {
    const server = app.listen(port, async () => {
      logger.info(`Listening on port ${server.address().port}`)
      await generateUsers()
      await generatePosts()
      const originalClose = server.close.bind(server)
      server.close = () => {
        return new Promise((_resolve) => {
          originalClose(_resolve)
        })
      }
      setupCloseOnExit(server)
      resolve(server)
    })
  })
}

function errorMiddleware(error, req, res, next) {
  if (res.headersSent) {
    next(error)
  } else if (error instanceof UnauthorizedError) {
    res.status(401)
    res.json({ code: error.code, message: error.message })
  } else {
    res.status(500)
    res.json({
      message: error.message,
      // we only add a `stack` property in non-production environments
      ...(process.env.NODE_ENV === 'production'
        ? null
        : { stack: error.stack }),
    })
  }
}

export default errorMiddleware

function setupCloseOnExit(server) {
  // thank you stack overflow
  // https://stackoverflow.com/a/14032965/971592
  async function exitHandler(options = {}) {
    await server
      .close()
      .then(() => {
        logger.info('Server successfully closed')
      })
      .catch((e) => {
        logger.warn('Something went wrong closing the server', e.stack)
      })
    // eslint-disable-next-line no-process-exit
    if (options.exit) process.exit()
  }

  // do something when app is closing
  process.on('exit', exitHandler)

  // catches ctrl+c event
  process.on('SIGINT', exitHandler.bind(null, { exit: true }))

  // catches "kill pid" (for example: nodemon restart)
  process.on('SIGUSR1', exitHandler.bind(null, { exit: true }))
  process.on('SIGUSR2', exitHandler.bind(null, { exit: true }))

  // catches uncaught exceptions
  process.on('uncaughtException', exitHandler.bind(null, { exit: true }))
}

export { startServer }
