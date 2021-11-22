'use strict'

const fs = require('fs');

let buf = fs.readFileSync(process.argv[2]);

let newLines = buf.toString().split('\n').length - 1;

console.log(newLines);