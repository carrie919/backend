var myObj = require("./add.js");

console.log("i am from frist.js -- hello world!");

console.log(myObj.add(10,20));
console.log(myObj.subtract(30,20));

exports.myFunction = () => {
    console.log("i am from /frist/mufun -- hello world");
};