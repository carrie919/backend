let mongoose = require('mongoose');
let schema = mongoose.Schema;

const mongoUrl = 'mongodb://127.0.0.1:27017/?compressors=zlib&gssapiServiceName=mongodb';
const mongoObj = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose.connect(mongoUrl, mongoObj);

let customerSchema = new schema({
    name : {type: String, required: true},
    email : {type: String, required: true, unique: true}
});

module.exports = mongoose.model('customer', customerSchema);