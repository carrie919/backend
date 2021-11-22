const http = require("http");

let server = http.createServer((req, res) => {
    console.log(req.method);
    if (req.method !== 'POST') {
        return res.end('send me a POST\n')
    }
    let rawData = [];
    req.on("error", (err) => {
        console.error(err);
    }).on("data", (chunk) => {
        rawData.push(chunk);
    }).on("end", () => {
        let body = Buffer.concat(rawData).toString();
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.write(body.toUpperCase());
        res.end();
    });
});

server.listen(process.argv[2]);

/*
'use strict'
    const http = require('http')
    const map = require('through2-map')

    const server = http.createServer(function (req, res) {
      if (req.method !== 'POST') {
        return res.end('send me a POST\n')
      }

      req.pipe(map(function (chunk) {
        return chunk.toString().toUpperCase()
      })).pipe(res)
    })

    server.listen(Number(process.argv[2]))
*/