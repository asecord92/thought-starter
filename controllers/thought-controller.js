const {User, Thoughts} = require('../models');

const thoughtsController = {
    getAllThoughts(req,res){
        Thoughts.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    getThoughtById({params}, res){
        Thoughts.findOne({_id: params.id})
        .then(dbThoughtData => {
            if (!dbThoughtData){
                res.status(404).json({message: 'This thought does not exist!'});
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    addThought({params, body}, res) {
        Thoughts.create(body)
        .then(({_id})=> {
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$push: {thoughts: _id} },
                {new: true}
            );
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message:'No user with this id found!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err=> res.json(err));
    },

    updateThought({params,body}, res){
        Thoughts.findOneAndUpdate({_id: params.id}, body)
        .then(({_id})=> {
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$push: {thoughts: _id} },
                {new: true}
            );
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message:'No user with this id found!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err=> res.json(err));
    },
    removeThought({params},res) {
        Thoughts.findOneAndDelete({_id: params.thoughtId})
        .then(deletedThought => {
            if(!deletedThought) {
                res.status(404).json({message: "No thought with this id found!"})
                return;
            }
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$pull: {comments:params.commentId}},
                {new: true}
            );
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No User with this id found'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err=> rs.json(err));
    },
    addReaction({params, body},res){
        Thoughts.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reaction: body}},
            {new: true}
        )
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: 'No User with this id found'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    removeReaction({params}, res){
        Thoughts.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reaction: {reactionId: params.reactionId}}},
            {new: true}
        )
        .then(dbUserData => rs.json(dbUserData))
        .catch(err => res.json(err));
    }   
}

module.exports = thoughtsController;