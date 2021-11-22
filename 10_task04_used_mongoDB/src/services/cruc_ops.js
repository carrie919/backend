// require mongoose ( think mongoose like this --> abstaction on mongodb -- like -- express is abstaction on node)
// (mongoose makes queries to mongoDB)(knex makes queries to mySQL)
const mongoose = require('mongoose');

// importing user so .. could use model as interface to database to create an instance of doc
// model is wraper on schema(definition for doc)
const Person = require('../models/users_models');

// connect to database to do operations
const db = require('../../config/dblink');
mongoose.connect(db.mongoUrl, db.linkObj);

/*
below are methods on model given by moogoose
	.save()
	.find()
	.findOneAndUpdate()
	.findByIdAndRemove()
*/

// create an instance of document
module.exports.createAndSavePerson = (obj, done) => {
	var myPerson01 = new Person({
		uid: obj.uid,
		name: obj.name,
		age: obj.age,
		email: obj.email
	});
	myPerson01.save(function (err, data) {
		if (err) return console.error(err);
		done(null, data);
	});
};

module.exports.fetchOne = (u_id, done) => {
	Person.find({ uid: u_id }, function (err, personFound) {
		// after searching for `{ uid: u_id }`
		if (err) return console.log(err);
		done(null, personFound);
	});
};

module.exports.fetchAll = (done) => {
	Person.find({}, function (err, data) {
		if (err) return console.log(err);
		done(null, data);
	});
};

module.exports.findAndUpdate = (user_id, obj, done) => {
	Person.findOneAndUpdate({ uid: user_id }, {
		name: obj.name,
		age: obj.age,
		email: obj.email
	}, { new: true }, function (err, updatedDoc) {
		if (err) return console.log(err);
		done(null, updatedDoc);
	});
};

module.exports.removeById = (personId, done) => {
	Person.findByIdAndRemove(personId, (err, removedDoc) => {
		if (err) return console.log(err);
		done(null, removedDoc);
	});
};