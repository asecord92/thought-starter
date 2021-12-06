const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');


router
    .route('/')
    .get(getAllUsers)
    .post(addUser);

router 
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);
router.route('/:id/friends').post(addFriend);
router.route('/:id/friends/:friendId').delete(removeFriend);
module.exports = router;