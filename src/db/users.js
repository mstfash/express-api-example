import _ from 'lodash'
import { generateUUID } from '../utils/helper'

let users = []

async function query(queryObj) {
  return _.filter(users, queryObj)
}

async function readById(id) {
  return _.find(users, { id })
}

async function readByUsername(username) {
  return (await query({ username }))[0]
}

async function insertMany(manyUsers) {
  users = [...users, ...manyUsers]
}

async function insert(user) {
  const newUser = { id: generateUUID(), ...user }
  users = [...users, newUser]
  return newUser
}

async function drop() {
  users = []
}

export { readById, readByUsername, insertMany, insert, query, drop }
