const mongoose = require('mongoose');
const schema = mongoose.Schema;
const db = require('../../config');

mongoose.connect(db.databaseUrl, db.Obj);

let messageSchema = new schema({
    name: {type: String, required: true},
    message: {type: String, required: true}
})

module.exports = mongoose.model("message", messageSchema);