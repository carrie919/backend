const router = require('express').Router();

// import controller to process requests 
const op = require('../controllers/user_controller');
/*
below are methods defined in controller.js to manage responses
    fetchUsers --- list all users
    fetchUser --- fetch details of specific user
    registerUser --- register user
    updateUser --- update user details
    deleteUser --- delete specific user
*/

// upon request at /users/
router.get('/', op.fetchUsers);

// upon request at /users/:uid
router.get('/:uid', op.fetchUser);

// upon request at /users/register
router.post('/register', op.registerUser);

// upon request at /users/:uid/update
router.put('/:uid/update', op.updateUser);

// upon request at /users/delet
router.delete('/:uid/delete', op.deleteUser);

// exporting this router to mount on /users
module.exports = router;
