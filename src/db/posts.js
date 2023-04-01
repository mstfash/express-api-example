import _ from 'lodash'

let posts = []

async function query(queryObj) {
  return _.filter(posts, queryObj)
}

async function readById(id) {
  return _.find(posts, { id })
}

async function readManyById(ids) {
  return _.filter(posts, (b) => ids.includes(b.id))
}

async function insertMany(manyposts) {
  posts = [...posts, ...manyposts]
}

async function insert(post) {
  posts = [...posts, post]
}

async function remove(id) {
  posts = posts.filter((li) => li.id !== id)
}

async function update(postId, updates) {
  const post = await readById(postId)
  if (!postId) {
    return null
  }
  const updatedPost = {
    ...post,
    ...updates,
  }
  posts[posts.indexOf(post)] = updatedPost
  return updatedPost
}

async function drop() {
  posts = []
}

export {
  readById,
  readManyById,
  insertMany,
  query,
  insert,
  remove,
  update,
  drop,
}
