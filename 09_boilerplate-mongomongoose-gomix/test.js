const mongoose = require('mongoose');
const schema = mongoose.Schema;

/*
mongoose.connect('mongodb://127.0.0.1:27017/?compressors=zlib&gssapiServiceName=mongodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
*/
// require('dotenv').config();

// creating person schema
const testSchema = new schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String]
});
// creating person model so further dowh i can use this model create an instance of document
const testPerson = mongoose.model("Person", testSchema);

// create an instance of document
var person01 = new testPerson({
    name: "shiva kumar",
    age: 34,
    favoriteFoods: ["dal", "chapati"]
});
console.log(person01.__proto__.__proto__.$__save);
console.log(testPerson);
// console.log(testSchema);