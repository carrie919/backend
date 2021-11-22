var express = require('express');
var bodyParser = require('body-parser');

// require routes
var editUser = require('./api/routes/users');

var app = express();

//parse form data in to object
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(multer().array());

//console request and contents of request on server
app.use(function middleware(req, res, next) {
    // Do something
    console.log(`${req.method}  ${req.path} - ${req.ip}`);
    //req contents
    console.log(req.body);
    var res_obj = JSON.parse(JSON.stringify(req.body));
    //console.log(res_obj);
    next();
});

app.use("/users", editUser);

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server is listening on port: ${port}`);
}).on('error', err => {
    console.log('ERROR: ', err)
})