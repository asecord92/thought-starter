const {Schema, model} = require('mongoose');

const UserSchema = new Schema ({

    //TODO figure out how unique works
    userName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String, 
        require: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    thoughs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }
    ],
    //shot in the dark, will have to see if this works
    friends: [this]
})

//TODO: Set up virtual 'friendCount' to retrieve length of users friends array

const User = model('User', UserSchema);

module.exports = User;