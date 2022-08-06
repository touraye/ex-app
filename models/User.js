const mongoose = require( 'mongoose' )

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    role: {
      type: String,
      default: 'user',
      enum: ['admin', 'user'],
    },
    status: {
      type: String,
      default: 'active',
      enum: ['active', 'suspend'],
    },
  },
  { timestamps: true }
)

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the hashPassword should not be revealed
    delete returnedObject.hashPassword
  },
})

module.exports = mongoose.model('User', schema)