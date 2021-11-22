const mongoose = require('mongoose');
const schema = mongoose.Schema;

mongoose.connect('mongodb://127.0.0.1:27017/?compressors=zlib&gssapiServiceName=mongodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
require('dotenv').config();

// creating person schema
const personSchema = new schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});
// creating person model so further dowh i can use this model create an instance of document
const Person = mongoose.model("Person", personSchema);

// create an instance of document
const createAndSavePerson = (done) => {
  var myPerson01 = new Person({
    name: "shiva kumar",
    age: 34,
    favoriteFoods: ["dal", "chapati"]
  });
  myPerson01.save(function(err, data){
    if(err){
      return console.error(err);
    }
    done(null, data);
  });
};

/** 4) Create many People with `Model.create()` */
var arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];

const createManyPeople = function(arrayOfPeople, done) {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, personFound){
    if(err) return console.log(err);
    done(null, personFound);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, personFound){
    if(err) return console.log(err);
    done(null, personFound);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, function(err, personFound){
    if(err) return console.log(err);
    done(null, personFound);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id: personId}, function(err, updatedDoc){
    if(err) return console.log(err);

    //updating foods
    Person.favoriteFoods.push(foodToAdd);

    //saving updated doc
    Person.save(function(err, data){
      if(err) return console.log(err);
      done(null, updatedDoc);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, function(err, updatedDoc){
    if(err) return console.log(err);
    done(null, updatedDoc);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedDoc) => {
    if(err) return console.log(err);
    done(null, removedDoc);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, response) => {
    if(err) return console.log(err);
    done(null, response);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ age: 55 })
  .sort({ name: -1 })
  .limit(5)
  .select({ favoriteFoods: 0 })
  .exec(function(error, people) {
    //do something here
    if(err) return console.log(err);
    done(null, response);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
