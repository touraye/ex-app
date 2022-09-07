const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/User')

// @get Users
userRouter.get('/', async (req, res) => {
  const users = await User.find()

  res.status(200).json(users)
})

// @get User
userRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return res.status(404).json({
      error: 'user doesn\'t exist',
    })
  }

  res.status(200).json(user)
})

// @post User
userRouter.post('/', async (req, res) => {
  const body = req.body
  const token = req.token
  const userFromToken = req.user

  if (!token) {
    return res.status(400).json({
      error: 'invalid or missing token',
    })
  }

  const user = await User.findById( userFromToken )

  if ( user.role === 'user' ) {
    return res.status( 401 ).json( {
      error: 'unauthorized'
    })
  }

  if (body === undefined) {
    return res.status(400).json({
      error: 'content missing',
    })
  }

  const saltRound = 10
  const hashPassword = await bcrypt.hash(body.password, saltRound)


  const newUser = new User({
    username: body.username,
    password: hashPassword,
    role: body.role,
  })

  const createdUser = await newUser.save()

  res.status(200).json(createdUser)
})

// @ delete User
userRouter.delete('/:id', async (req, res) => {
  const user = await User.findById( req.params.id )
  const userFromToken = req.user

  const foundUser = await User.findById( userFromToken )

  if ( foundUser.role !== 'admin' ) {
    return res.status( 401 ).json( {
      error: 'unauthorized'
    })
  }

  if (!user) {
    return res.status(404).json({
      error: 'user doesn\'t exist',
    })
  }

  await user.remove()

  res.status( 200 ).json( {
    id: req.params.id
  })
})

// @ delete User
userRouter.put('/:id', async (req, res) => {
  const body = req.body
  const token = req.token
  const userFromToken = req.user

  if (!token) {
    return res.status(400).json({
      error: 'invalid or missing token',
    })
  }

  const foundUser = await User.findById( req.params.id )
  if (!foundUser) {
    return res.status(404).json({
      error: 'user doesn\'t exist',
    })
  }

  const saltRound = 10
  let hashPassword

  if ( body.password ) {
    hashPassword = await bcrypt.hash(body.password, saltRound)
  }

  const user = await User.findById(userFromToken)

  if (user.role === 'user' && user._id.toString() !== foundUser._id.toString()) {
    return res.status(401).json({
      error: 'unauthorized',
    })
  } else if (
    user.role === 'user' &&
		user._id.toString() === foundUser._id.toString()
  ) {
    const newUser = {
      password: hashPassword,
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, newUser, {
      new: true,
    })

    res.status(200).json(updatedUser)
  } else {

    const newUser = {
      username: body.username,
      password: hashPassword,
      role: body.role,
      status: body.status,
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, newUser, {
      new: true,
    })

    res.status(200).json(updatedUser)
  }
})

module.exports = userRouter
