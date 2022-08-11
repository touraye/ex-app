/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../../app')

const api = supertest(app)
const User = require('../../models/User')
const {
  initialUsers,
  nonExistingId,
  usersInDb,
} = require('../helpers/user_test_helper.js')

beforeEach(async () => {
  await User.deleteMany({})

  await User.insertMany(initialUsers)
})

describe('when there is initially some users saved', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all users are returned', async () => {
    const response = await api.get('/api/users')

    expect(response.body).toHaveLength(initialUsers.length)
  })

  test('a specific role is within the returned users', async () => {
    const response = await api.get('/api/users')

    const roles = response.body.map((user) => user.role)
    expect(roles).toContain('user')
  })

  test('there are two user', async () => {
    const response = await api.get('/api/users')

    expect(response.body).toHaveLength(2)
  })
})

describe('viewing specific user', () => {
  test('first user is superAdmin', async () => {
    const response = await api.get('/api/users')

    expect(response.body[0].role).toBe('superAdmin')
  })

  test('user without username is not added', async () => {
    const newUser = {
      name: 'mariama',
      password: '1234',
      role: 'user',
      status: 'active',
    }

    await api.post('/api/users').send(newUser).expect(400)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(initialUsers.length)
  })
})

describe('adding of a new user', () => {
  test('a valid user can be added', async () => {
    const newUser = {
      username: 'rockman1',
      name: 'rock man',
      password: '1234',
      role: 'user',
      status: 'active',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(initialUsers.length + 1)
    const users = usersAtEnd.map((user) => user.username)
    expect(users).toContain('rockman1')
  })
})

test('user can be deleted by id', async () => {
  const newUser = {
    username: 'rockman1',
    name: 'rock man',
    password: '1234',
    role: 'user',
    status: 'active',
  }

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const userToBeDeleted = response.body
  await api.delete(`/api/users/${userToBeDeleted.id}`).expect(204)

  const currentUser = await usersInDb()
  expect(currentUser).toHaveLength(initialUsers.length)
})

test('user can be updated', async () => {
  const users = await usersInDb()
  const user = users[0]
  user.role = 'admin'

  await api.put(`/api/users/${user.id}`).send(user).expect(200)

  const currentUsers = await usersInDb()
  const currentUser = currentUsers.filter((u) => u.id === user.id)[0]
  expect(currentUser.role).toBe(user.role)
})

afterAll(() => {
  mongoose.connection.close()
})
