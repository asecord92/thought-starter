const {Schema, model} = require('mongoose');

const UserSchema = new Schema ({

    //TODO figure out how unique works
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String, 
        require: true,
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
    //need to figure out friends
});

//TODO: Set up virtual 'friendCount' to retrieve length of users friends array

const User = model('User', UserSchema);

module.exports = User;