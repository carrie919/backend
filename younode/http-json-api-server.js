const http = require('http');
const url = require('url');

let server =  http.createServer(function(req, res){
    let url = new URL(req.url, 'http://example.com');
    if(url.pathname === '/api/parsetime'){
        let isoStr = url.searchParams.get('iso');
        let date = new Date(isoStr);
        let resObj = {
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(resObj));
        res.end();
    }else if(url.pathname === '/api/unixtime'){
        let isoStr = url.searchParams.get('iso');
        let date = new Date(isoStr);
        let resObj = {
            unixtime: date.getTime()
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(resObj));
        res.end();
    }else{
        res.writeHead(400, { 'Content-Type': 'application/plain' });
        res.write("invalid path");
    }

});

/*
'use strict'
    const http = require('http')

    function parsetime (time) {
      return {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds()
      }
    }

    function unixtime (time) {
      return { unixtime: time.getTime() }
    }

    const server = http.createServer(function (req, res) {
      const parsedUrl = new URL(req.url, 'http://example.com')
      const time = new Date(parsedUrl.searchParams.get('iso'))
      let result

      if (/^\/api\/parsetime/.test(req.url)) {
        result = parsetime(time)
      } else if (/^\/api\/unixtime/.test(req.url)) {
        result = unixtime(time)
      }

      if (result) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(result))
      } else {
        res.writeHead(404)
        res.end()
      }
    })
    server.listen(Number(process.argv[2]))
*/

server.listen(process.argv[2]);