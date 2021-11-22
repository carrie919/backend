let express = require('express');
let app = express();
let bodyParser = require('body-parser');

let personRoute = require('./routes/person');
let customerRoute = require('./routes/customer');

app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(`${req.method} -- ${req.path} -- ${req.ip}`);
    next();
});
app.use(express.static('public'));
app.use(personRoute);
app.use(customerRoute);

app.use((req, res, next) => {
    res.status(400).send('resource not found');
});

// handle error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.sendFile("C:/Users/Karthick/Desktop/Backend/11_rest_api_using_node_express_mongo/public/500.html"); 
});

const PORT = process.env.PORT || 3000 ;
app.listen(PORT, () => {
    console.log(`server is listening on port: ${PORT}`);
}).on('error', err => {
    console.log('ERROR: ', err)
})