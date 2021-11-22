let router = require('express').Router();
let mongodb = require('mongodb');

let connectionDetails = require('../../config/database');

router.get('/video', async (req, res) => {
    try {
        mongodb.MongoClient.connect(connectionDetails.mongoUrl, connectionDetails.optionsObj, async(error, client) => {
            if (error) {
                res.json(error);
                return;
            }
            // auditing request
            if (!req.headers.range) {
                res.status(400).send("Requires Range header");
            } else {
                // pinging database
                await client.db("admin").command({ ping: 1 });
                console.log(`...connection established to database  >>... ${connectionDetails.mongoUrl}`);
                // choose database
                const db = client.db('test_video_stream');
                // fetch file
                db.collection('fs.files').findOne({"filename" : "JENNIE SOLO"}, (error, video) => {
                    if (!video) {
                        res.status(404).send("no video uploaded");
                        return;
                    }
                    // Create response headers
                    const videoSize = video.length;
                    const range = req.headers.range;
                    const start = Number(range.replace(/\D/g, ""));
                    const end = videoSize - 1;

                    const contentLength = end - start + 1;
                    const headers = {
                        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
                        "Accept-Ranges": "bytes",
                        "Content-Length": contentLength,
                        "Content-Type": "video/mp4",
                    };

                    // HTTP Status 206 for Partial Content
                    res.writeHead(206, headers);

                    // Get the bucket and download stream from GridFS
                    const bucket = new mongodb.GridFSBucket(db);
                    const downloadStream = bucket.openDownloadStreamByName('JENNIE SOLO', {start});

                    // Finally pipe video to response
                    downloadStream.pipe(res);
                });
            }
        });
    } catch (error) {
        console.error(error);
    }

});

module.exports = router;