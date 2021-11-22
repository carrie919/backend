const http = require('http');

let count = 0;

let id2 = { end: false, res: null };
let id3 = { end: false, res: null };
let id4 = { end: false, res: null };

function test(site, id) {
    http.get(site, function (res) {
        //res.setEncoding('utf-8');
        let rawData = [];
        res.on("error", (err) => {
            console.error(err);
        }).on("data", (chunk) => {
            rawData.push(chunk);
        }).on("end", () => {
            rawData = Buffer.concat(rawData).toString();
            id.res = rawData;
            id.end = true;
            count = count + 1;

            if(count === 3){
                return logger();
            }
        });
    });
}

test(process.argv[2], id2);
test(process.argv[3], id3);
test(process.argv[4], id4);

function logger () {
    console.log(id2.res);
    console.log(id3.res);
    console.log(id4.res);
}