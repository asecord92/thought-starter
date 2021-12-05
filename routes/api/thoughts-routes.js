const router = require('express').Router();


const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

router.route('/').get(getAllThoughts);

router.route('/:userId').post(addThought);

router
    .route('/:userId/:thoughtId')
    .get(getThoughtById)
    .delete(removeThought)
    .put(updateThought)
    .put(addReaction);

router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

module.exports= router;
