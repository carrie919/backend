const http = require('http');

let site = process.argv[2];

http.get(site, (res) => {
    //res.setEncoding('utf-8');
    let rawData = [];
    res.on("error", (err) => {
        console.error(err);
    }).on("data", (chunk) => {
        rawData.push(chunk);
    }).on("end", ()=>{
        rawData = Buffer.concat(rawData).toString();
        //rawData = rawData.toString();
        console.log(rawData.length);
        console.log(rawData);
    });
});