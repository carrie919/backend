const express = require('express');
const videoRoute = require('./routes/videoRoute');
let path = require('path');

let app = express();

app.use((req, res, next) => {
    console.log(`${req.method}       ${req.path}       ${req.ip}`);
    next();
});

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '../public/song.html'));
    console.log("wergvcssdfg");
});

app.use(videoRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('hello');
    console.log(`server is listening on port: ${PORT}`);
});