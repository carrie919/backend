const mongoose = require('mongoose');
const schema = mongoose.Schema;

// creating a schema ie a definition how my user doc would look like
const userSchema = new schema({
    uid: {type: String, required: true},
    name: {type: String, required: true},
    age: {type: Number, required: true},
    email: {type: String, required: true}
});

// creating person model so further i can use this model create an instance of document
module.exports = mongoose.model('User', userSchema);

