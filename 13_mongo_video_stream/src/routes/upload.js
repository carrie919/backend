// importing express.Router() to process req
let router = require('express').Router();  

// import mongodb to access servet
let mongodb = require('mongodb');
let fs = require('fs');
let path = require('path');

// importing config
let connectionDetails = require('../../config/database');

router.get('/upload', async (req, res) => {
    // connect to database
    try {
        mongodb.MongoClient.connect(connectionDetails.mongoUrl, connectionDetails.optionsObj, async (error, client) => {
            if (error) {
                res.json(error);
                return;
            }
            console.log(`...connection established to database  >>... ${connectionDetails.mongoUrl}`);
            // connect database
            const db = client.db('test_video_stream');
            // GridFSBucket divide large file into chunks, can be used to upload each chunk to a document
            const bucket = new mongodb.GridFSBucket(db);
            //opening upload stream
            const uploadStream = bucket.openUploadStream('JENNIE SOLO');
            // have to read file from filesystem to upload
            const readStream = fs.createReadStream(path.join(__dirname, '../../public/JENNIE SOLO.mp4'));
            // pipe data read into upload stream
            readStream.pipe(uploadStream);
            res.status(200).send("Done...");
            // wait to close connection
            
        });
    } catch (error) {
        console.error(error);
    }
});

module.exports = router