const fs = require('fs');
const readline = require('readline');

const logName = (name) => {
    fs.writeFile("greeting.txt", `hello ${name}`, err => {
        if (err) {
            console.log("error occured");
        }
    });
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('What is your name? ', (name) => {
    rl.close();
    logName(name);
});