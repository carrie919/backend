var express = require('express');
var todo = require('../controllers/operation.js');
var router = express.Router();
var knex = require('../../config/query_builder');

router.post('/register', todo.registerUser);

router.put('/:User_id/update', todo.updateUser);

router.delete('/:User_id/delete', todo.deleteUser);

router.get('/:User_id/fetch', todo.fetchUser);

router.get('/', todo.fetchAllUsers);

module.exports = router;