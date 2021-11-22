const fs = require('fs');

let newLines = 0;

fs.readFile(process.argv[2], function callback(err, content){
    if(err){
        console.log(err);
    }else{
        newLines = content.toString().split('\n').length - 1;
        console.log(newLines);
    }
});
