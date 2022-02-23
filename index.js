const express = require('express');
const fs = require('fs');
const app = express();

const public = 'public';
const videoDir = 'vid';

const publicPath = `./${public}/`
const videoPath = `${publicPath}${videoDir}/`;

const isDir = path => fs.statSync(path).isDirectory();
app.use(express.static(public))
app.get('/videos.json', (req, res) => {
    // :3
    let videos = fs.readdirSync(videoPath).filter(path => isDir(videoPath + path)).map(path => ([
        path, // path
        fs.readdirSync(videoPath + path).length // frames
    ])).sort((a, b) => parseInt(a[0])-parseInt(b[0]))
    //videos = [["18", 14]];
    res.json(
        {
            videos: videos,
            path: videoDir
        }
    );
})
app.listen(3000, () => console.log('Listening'))