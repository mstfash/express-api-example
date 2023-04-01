import cron from 'node-cron'
import * as cronDB from '../db/cron-job'
import * as usersDB from '../db/users'
import * as postsDB from '../db/posts'
import * as mocks from '../mocks'

async function dropDatabases() {
  await usersDB.drop()
  await postsDB.drop()
}

async function seedData() {
  await mocks.generateUsers()
  await mocks.generatePosts()
}

cron.schedule('* * * * *', async () => {
  try {
    const isCronTime = await cronDB.checkCronTime()
    if (isCronTime) {
      console.log('Dropping database...')
      await dropDatabases()
      console.log('Generating users and posts...')
      await seedData()
    }
  } catch (error) {
    console.log(error)
  }
})
