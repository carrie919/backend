const http = require('http');
let site = process.argv[2];
http.get(site, (res) => {
    let { statusCode } = res;
    res.setEncoding('utf-8');
    if(statusCode !== 200){
        return console.log("request failed\n" + `status code: ${statusCode}`);
    }else{
        res.on("error", (err) => {
            console.error(err);
        }).on("data", (chunk)=>{
            console.log(chunk)
        })
    }
});