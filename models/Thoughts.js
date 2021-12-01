const {Schema, model, Types} = require('mongoose');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
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
        default: Date.now
        //TODO: create util to format TimeStamp
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [ReactionSchema]
})

//TODO: create virtual that retrieves the length of thoughts reaction array.

const Thoughts = model('Thoughts', ThoughtsSchema);
module.exports = Thoughts