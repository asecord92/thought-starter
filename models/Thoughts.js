const {Schema, model, Types} = require('mongoose');
const { formatDate } = require('../utils/dateFormat');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => formatDate(createdAtVal)
        //add getter
    }
})

const ThoughtsSchema = new Schema({
    thoughtText: {
        type: String, 
        required: true,
        minlength: 1,
        maxlength: 280

    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => formatDate(createdAtVal)
        //TODO: create util to format TimeStamp
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

//TODO: create virtual that retrieves the length of thoughts reaction array.
ThoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});
const Thoughts = model('Thoughts', ThoughtsSchema);
module.exports = Thoughts