var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var port = 3000;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer().array());
app.post("/", function(req, res){
    console.log(req.headers);
    console.log(req.body); //this gives [Object: null prototype] along with body.. which isnot expected
    const obj = JSON.parse(JSON.stringify(req.body));
    console.log(obj); //justify above un expected not error
    res.json(req.body);
});

app.listen(port, () => {
    console.log(`index.js is listening at http://localhost:${port}`);
});