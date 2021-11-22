const express = require('express');
const socket = require('socket.io');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`server is listening on port: ${PORT}`);
});
const io = socket(server);

app.use(function middleware(req, res, next) {
    // Do something
    console.log(`${req.method}  ${req.path} - ${req.ip}`);
    // Call the next function in line:
    next();
});
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res, next) => {
    res.status(200).sendFile(path.join(__dirname, "../public/UI02.html"));
});

io.on("connection", function(socket){
    console.log("made a socket connection");
    socket.on("entering chat", (name) => {
        io.emit("start", name);
    });
    socket.on("disconnect", () =>{
        console.log("client disconnected");
    });
    socket.on("chat message", (obj) =>{
        io.emit("chat message", obj);
    });
});