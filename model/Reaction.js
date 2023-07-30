const {Schema, model, Types} = require('mongoose')

const reactionSchema = new Schema({
    reactionId: {
        type: ObjectId,
        default: () => new Types.ObjectId()
    },

    reactionBody: {
        type: String,
        required: true,
        max: 280
    },

    username: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => moment(timestamp).format('MMM Do, YYYY [at] hh:mm a'),
    }

})
