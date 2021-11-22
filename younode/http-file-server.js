const http = require("http");
const fs = require("fs");

let server = http.createServer((req, res) => {
    let fileSream = fs.createReadStream(process.argv[3]);
    res.writeHead(200, { 'content-type': 'text/plain' });
    fileSream.pipe(res);
});

server.listen(process.argv[2]);