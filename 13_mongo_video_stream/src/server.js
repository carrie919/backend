let express = require('express'); //require express
let path = require('path');

// import routes to direct requests
let uploadRoute = require('./routes/upload');
let downloadRoute = require('./routes/stream');

// abstraction over node
let app = express();

// console basic info of requests
app.use(function(req, res, next){
    console.log(`${req.method}         ${req.path}           ${req.ip}`);
    next();
});

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '../public/song.html'));
    console.log("wergvcssdfg");
});

// requests reach appropriate end points
app.use(uploadRoute);
app.use(downloadRoute);

// listening on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is listening on port: ${PORT}`);
});