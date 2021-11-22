const express = require('express');
const bodyParser = require('body-parser');

// require routes
const userRoutes = require('./routes/user_routes');

// abstraction
const app = express();

// parse request
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// console request basic details
app.use((req, res, next) => {
    console.log(`${req.method} ---  ${req.path} --- ${req.ip}`);
    console.log(JSON.parse(JSON.stringify(req.body)));
    next();
});

// direct requests to appropriate routes
app.use('/users', userRoutes);

// handiling bad requests
app.use((req, res, next) => {
    res.status(400).send('resource not found');
});

// listening to requests async
var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server is listening on port: ${port}`);
}).on('error', err => {
    console.log('ERROR: ', err)
});