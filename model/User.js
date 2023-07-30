const {Schema, model, Types} = require('mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },

    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true,
        validate: {
          validator: (value) => {
            return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)
          },
          message: 'Oops! It seems like the email entered is not in a valid format.',
        },
      },

      thought: [
        {
            type: Types.ObjectId,
            ref: 'Thought'
        }
      ],

      friend
    })

    const User = model('User', userSchema)

    module.exports = User


