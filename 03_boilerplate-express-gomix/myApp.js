var express = require('express');
var bodyParser = require('body-parser');
var app = express();

console.log("Hello World");
app.use(function middleware(req, res, next) {
    // Do something
    console.log(`${req.method}  ${req.path} - ${req.ip}`);
    // Call the next function in line:
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", function(req, res){
    //res.send("Hello Express");
    res.sendFile(__dirname + "/views/index.html");
});
app.use("/public", express.static(__dirname + "/public"));
app.get("/now", function(req, res, next){
    req.time = "10:30";
    next();
},function(req, res){
    res.json({time: req.time});
});
app.get("/:word/echo", function(req, res){
    res.json({"echo": req.params.word});
});
app.post("/name", function(req, res) {
    // Handle the data in the request
    var string = req.body.first + " " + req.body.last;
    console.log(JSON.stringify(req.body));
    res.json({ name: string });
});
app.get("/json", function(req, res){
    var response = "Hello Json";
    if(process.env.MESSAGE_STYLE === "uppercase"){
        res.json({"message": response.toUpperCase()});
    }else{
    res.json({"message": response});
    }
});

module.exports = app;