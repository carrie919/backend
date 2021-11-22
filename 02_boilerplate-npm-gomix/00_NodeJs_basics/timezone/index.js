const add = require("moment-timezone");

add.tz.setDefault("Asia/Kolkata");

let targetTimezone;

if(process.argv.length != 3){
    console.log("usage: node <script> <timezone>");
    process.exit(1);
}
else{
    targetTimezone = process.argv[2];
}

console.log(`timezone of ${targetTimezone} is ${add().tz(targetTimezone).format()}`);
console.log(process.argv);