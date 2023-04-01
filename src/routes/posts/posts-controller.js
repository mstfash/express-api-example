import * as postsDB from '../../db/posts'
import * as usersDB from '../../db/users'
import { userToJSON } from '../middlewares/auth-middleware'

async function setPost(req, res, next) {
  const { id } = req.params
  const post = await postsDB.readById(Number(id))
  if (!post) {
    res.status(404).json({ message: `No post was found with the id of ${id}` })
    return
  }
  req.post = post
  next()
}
async function getPost(req, res) {
  res.json({ post: await expandPostData(req.post) })
}

async function getListOfPosts(req, res) {
  const posts = await postsDB.query({})
  res.json({ posts: await expandPostsMultiple(posts) })
}

async function createPost(req, res) {
  const {
    user: { id: ownerId },
  } = req
  const post = req.body
  const posts = await postsDB.query({})
  const insertedPost = { authorId: ownerId, ...post, id: posts.length + 1 }
  await postsDB.insert(insertedPost)
  res.json({ post: await expandPostData(insertedPost) })
}

async function updatePost(req, res) {
  const updatedPost = await postsDB.update(req.post.id, req.body)
  res.json({ post: await expandPostData(updatedPost) })
}

async function deletePost(req, res) {
  await postsDB.remove(req.post.id)
  res.json({ success: true })
}

async function getPostsByAuthorId(req, res) {
  const { authorId } = req.params
  const posts = await postsDB.query({ authorId })
  res.json({ posts: await expandPostsMultiple(posts) })
}

async function expandPostData(post) {
  const users = await usersDB.query({ id: post.authorId })
  const authorReadData = userToJSON(users[0])
  return { ...post, author: { id: post.authorId, ...authorReadData } }
}

async function expandPostsMultiple(posts) {
  const expandedPosts = []
  for await (const post of posts) {
    expandedPosts.push(await expandPostData(post))
  }
  return expandedPosts
}
const listItemsController = {
  createPost,
  deletePost,
  updatePost,
  setPost,
  getPost,
  getListOfPosts,
  getPostsByAuthorId,
}
export default listItemsController
