import { faker } from '@faker-js/faker'
import * as usersDB from '../db/users'
import * as postsDB from '../db/posts'
import {
  getSaltAndHash,
  userToJSON,
} from '../routes/middlewares/auth-middleware'
import { generateUUID } from '../utils/helper'
import * as cronDB from '../db/cron-job'

// generate 5 users from faker
export const generateUsers = async () => {
  const users = [
    {
      username: 'momo',
      id: generateUUID(),
      ...getSaltAndHash('Asd123++'),
    },
  ]
  for (let i = 0; i < 5; i++) {
    users.push({
      username: faker.internet.userName(),
      id: generateUUID(),
      ...getSaltAndHash(faker.internet.password()),
    })
  }
  // insert users in userDB
  await usersDB.insertMany(users)
  console.log('users generated')
  return users
}

export const generatePosts = async () => {
  const users = await usersDB.query({})
  const posts = []
  for (let i = 0; i < users.length; i++) {
    const user = users[i]
    // generate 5 posts for each user
    for (let j = 0; j < 5; j++) {
      posts.push({
        id: posts.length + 1,
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraph(),
        authorId: user.id,
        author: userToJSON(user),
      })
    }
  }

  // insert posts in postDB
  await postsDB.insertMany(posts)
  await cronDB.setCronTime()
  console.log('posts generated')

  return posts
}
