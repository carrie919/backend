// require services so... handel directed requests with appropriate feature of service
const services = require('../services/cruc_ops');
/*
below methods are defined in services
    createAndSavePerson -- takes an object(has name,age,email as properties) as a argument, saves that obj as doc on
                           database and returns doc saved
    fetchOne -- takes a string as argu/\ment and returns doc(string matches the value of specific property) on database
    fetchAll -- returns all docs on database
    findAndUpdate -- takes string(str matches the value of specific property),obj(contains properties and their new values)
                     as arguments returns updated doc
    removeById -- takes a string as argument removes doc(string matches _id property) and returns removed doc
*/

// register user and respond with doc created on database
exports.registerUser = function (req, res) {
    services.createAndSavePerson(req.body, function (err, data) {
        if (!data) {
            console.log("Missing `done()` argument");
            return next({ message: "Missing callback argument" });
        }
        // data is object
        console.log(data);
        services.fetchOne(data.uid, function (err, pers) {
            // pers is array
            if (err) return next(err);
            res.json(pers);
        });
    });
};

// fetch all users
exports.fetchUsers = function (req, res) {
    services.fetchAll(function (err, data) {
        if (err) return next(err);
        res.json(data);
        // data is array
    });
};

// fetch user with specific user id
exports.fetchUser = function (req, res) {
    console.log(req.params.uid);
    services.fetchOne(req.params.uid, function (err, personFound) {
        // personfound is array
        if (err) return next(err);
        res.json(personFound);
    });
};

// update user details
exports.updateUser = function (req, res) {
    services.findAndUpdate(req.params.uid, req.body, function (err, updatedDoc) {
        // updateddoc is object
        if (err) return next(err);
        if (!updatedDoc) {
            console.log("Missing `done()` argument");
            return next({ message: "Missing callback argument" });
        }
        services.fetchOne(updatedDoc.uid, function (err, pers) {
            // pers is array
            if (err) return next(err);
            res.json(pers[0]);
        });
    });
};

// delete user
exports.deleteUser = function (req, res) {
    services.fetchOne(req.params.uid, function (err, personFound) {
        // personFound is array
        if (err) return next(err);
        if (!personFound) {
            console.log("Missing `done()` argument");
            return next({ message: "Missing callback argument" });
        }
        services.removeById(personFound[0]._id, function (err, removedDoc) {
            // removedDoc is object
            if (err) return next(err);
            res.json(removedDoc);
        });
    });
};