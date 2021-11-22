var express = require('express');
var bodyParser = require('body-parser');
var port = 3000;

var app = express();

app.use(bodyParser.json());
app.post("/name", function(req, res){
    console.log(req.headers);
    console.log(req.body);
    res.json(req.body);
});
app.get("/", (req,res) =>{
    res.sendFile(__dirname + "/views/index.html");
})


app.listen(port, () => {
    console.log(`index.js is listening at http://localhost:${port}`);
});