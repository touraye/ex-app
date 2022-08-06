const transactionRouter = require('express').Router()
const Transaction = require('../models/Transaction')
const User = require( '../models/User' )

// @get Transactions
transactionRouter.get( '/', async ( req, res ) => {
  const userFromToken = req.user
  const foundUser = await User.findById(userFromToken)

  if (foundUser.status === 'suspend') {
    return res.status(401).json({
      error: 'unauthorized',
    })
  }

  const transactions = await Transaction.find().populate('user', { username: 1 })

  res.status(200).json(transactions)
})

// @get Transaction
transactionRouter.get( '/:id', async ( req, res ) => {
  const userFromToken = req.user

  const foundUser = await User.findById(userFromToken)

  if (foundUser.status === 'suspend') {
    return res.status(401).json({
      error: 'unauthorized',
    })
  }

  const transaction = await Transaction.findById(req.params.id).populate('user', { username: 1 })

  if (!transaction) {
    return res.status(404).json({
      error: 'transaction doesn\'t exist',
    })
  }

  res.status(200).json(transaction)
})

// @post Transaction
transactionRouter.post('/', async (req, res) => {
  const body = req.body
  const userFromToken = req.user

  const foundUser = await User.findById( userFromToken )

  if (foundUser.status === 'suspend') {
    return res.status(401).json({
      error: 'unauthorized',
    })
  }

  if (body === undefined) {
    return res.status(400).json({
      error: 'content missing',
    })
  }

  const newTransaction = new Transaction({
    name: body.name,
    type: body.type,
    amount: body.amount,
    user: foundUser._id,
  })

  const createdTransaction = await newTransaction.save()

  res.status(200).json(createdTransaction)
})

// @ delete Transaction
transactionRouter.delete( '/:id', async ( req, res ) => {
  const userFromToken = req.user
  const foundUser = await User.findById( userFromToken )
  const transaction = await Transaction.findById(req.params.id)

  if (foundUser.status === 'suspend') {
    return res.status(401).json({
      error: 'unauthorized user',
    })
  }

  if (foundUser._id.toString() !== transaction.user.toString()) {
    return res.status(401).json({
      error: 'unauthorized',
    })
  }


  if (!transaction) {
    return res.status(404).json({
      error: 'transaction doesn\'t exist',
    })
  }

  await Transaction.findByIdAndRemove(req.params.id)

  res.status(204).end()
})

// @ delete Transaction
transactionRouter.put('/:id', async (req, res) => {
  const body = req.body
  const userFromToken = req.user
  const foundUser = await User.findById(userFromToken)
  const transaction = await Transaction.findById(req.params.id)

  if (foundUser.status === 'suspend') {
    return res.status(401).json({
      error: 'unauthorized user',
    })
  }

  if (foundUser._id.toString() !== transaction.user.toString()) {
    return res.status(401).json({
      error: 'unauthorized',
    })
  }

  if (!transaction) {
    return res.status(404).json({
      error: 'transaction doesn\'t exist',
    })
  }

  const newTransaction = {
    name: body.name,
    type: body.type,
    amount: body.amount,
  }

  const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, newTransaction, {
    new: true,
  })

  res.status(200).json(updatedTransaction)
})

module.exports = transactionRouter
