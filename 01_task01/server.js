var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {

    if (req.method === "POST") {
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            // at this point, `body` has the entire request body stored in it as a string
            // saving data recieved
            fs.writeFile("data.txt", `${body}`, err => {
                if (err) {
                    console.log("error occured");
                }
            });
            //loging body on console
            console.log(body);
        });
        // set response header
        res.writeHead(200, { 'Content-Type': 'text/html' });
        // set response content    
        res.write('<html><body><p>This is home Page.</p></body></html>');
        res.end();
    }

});

server..listen(6006);

console.log('Node.js web server at port 3000 is running..')