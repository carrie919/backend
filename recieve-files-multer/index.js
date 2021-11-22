const express = require('express');

// multer is use to handel content type of multipart/form
// recieved File or files are in field 'file' or 'files' which are added by multer
const multer = require('multer');

// cors adds header 
// that header informs browser that orign(endpoint request originated) can or canot access response
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

const app = express();

const upload = multer({ dest: "public/" });


app.use(cors(corsOptions));
app.use(function middleware(req, res, next) {
    // Do something
    console.log(`${req.method}  ${req.path} - ${req.ip}`);
    // Call the next function in line:
    next();
});

app.post('/upload',
    upload.single('myFile'),
    (req, res) => {
    console.log(req.file)
    res.json({
        recivedFile: req.file
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`index.js is listening at http://localhost:${PORT}`);
});