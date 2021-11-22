const major = require('./my-module');

major(process.argv[2], process.argv[3], (err, data) => {
    if(err) return console.log("error occured");
    else{
        data.forEach((ele)=>{console.log(ele)});
    }
});