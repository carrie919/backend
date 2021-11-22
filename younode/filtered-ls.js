const fs = require('fs');

let path = process.argv[2];
let filter = process.argv[3];
fs.readdir(path, (err, list) => {
    if(err){
        return console.log(err);
    }else{
        for(let i = 0; i < list.length; i++){
            if(list[i].split('.')[1] === filter){
                console.log(list[i]);
            }
        }
    }
});