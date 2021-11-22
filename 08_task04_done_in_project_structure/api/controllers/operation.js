const addUser = require('../../models/insert.js');
const changeDetails = require('../../models/update.js');
const cutUser = require('../../models/delete.js');
const viewUser = require('../../models/fetch.js');


exports.registerUser = function(req, res){
    addUser.insert(req.body);
    res.send("registered successfully");
}
    
exports.updateUser = function(req, res){
    changeDetails.update(req.body, req.params);
    res.send("updated successfully");
};

exports.deleteUser = function(req, res){
    cutUser.delete(req.params);
    res.send("deleted")
};

exports.fetchUser = function(req, res){
    console.log(req.params);
    var userObj = viewUser.fetch(req.params);
    userObj.then(function(results){
        console.log(results);
        res.json(results[0]);
    });
};

exports.fetchAllUsers = function(req, res){
    var usersList = viewUser.allUsers();
    usersList.then(function(results){
        res.json(results);
    });
}