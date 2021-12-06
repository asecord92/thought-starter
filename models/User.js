const {Schema, model} = require('mongoose');

const UserSchema = new Schema ({

    //TODO figure out how unique works
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String, 
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }
    ],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }]

},
{
    toJSON: {
        virtuals:true
    },
    id: false
});

//TODO: Set up virtual 'friendCount' to retrieve length of users friends array
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});
const User = model('User', UserSchema);

module.exports = User;