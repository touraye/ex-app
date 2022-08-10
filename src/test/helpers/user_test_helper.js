const User = require('../../models/User')

const initialUsers = [
  {
    username: 'teller10',
    role: 'admin',
    password: '1234567',
  },
  {
    username: 'teller20',
    role: 'user',
    password: '1234567',
  },
]

const nonExistingId = async () => {
  const user = new User({
    username: 'testeruser',
    role: 'user',
    password: '1234567',
  })
  await user.save()
  await user.remove()

  return user._id.toString()
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {
  initialUsers,
  nonExistingId,
  usersInDb,
}
