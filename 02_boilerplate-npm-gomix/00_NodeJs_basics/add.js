function sub(a, b) {
    return a - b;
}
exports.add = (a, b) => a + b;
exports.subtract = sub;

console.log("i am from add.js -- hello world");

process.argv[2] = "alpha"
console.log(process.argv);
console.log(process.stdout);