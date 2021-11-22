const router = require('express').Router();
const fs = require('fs');
let path = require('path');

router.get('/video', (req, res) => {

    if (!req.headers.range) {
        res.status(400).send('range header is missing');
    } else {
        let range = req.headers.range; // range is something like-- bytes=<start>-<end>
        //let videoPath = path.join(__dirname, '../../public/Adele Hello.mp4');
        let videoPath = "D:/movies/GOT/Season02/EP01.mkv";
        let videoSize = fs.statSync(videoPath).size;
        let chunkSize = 10 ** 7; // 1 mb
        let parts = range.replace(/bytes=/, "").split("-"); // obtain [<start>, <end>] from bytes=<start>-<end>
        let start = parseInt(parts[0], 10);
        let end = parts[1] ? parseInt(parts[1], 10) : Math.min(start + chunkSize, videoSize - 1);
        let data = "";  // to collect data

        // making headers info to send
        let head = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": end - start + 1,
            "Content-Type": "Video/mp4"
        }
        // logging requset range header
        console.log(`...requesting part of video ---- ${req.headers.range}`);

        // creating strean
        let videoStream = fs.createReadStream(videoPath, { start, end });

        videoStream.on('open', () => {
            res.writeHead(206, head);
            videoStream.pipe(res);
        });

        videoStream.on('data', function (chunk) {
            data += chunk;
        });

        videoStream.on('end', async function () {
            await console.log(data.length);
        });

        videoStream.on('error', function (err) {
            console.log(err.stack);
        });

    }
});
module.exports = router;