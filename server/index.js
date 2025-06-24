import express from "express";
import fs from "node:fs";
import "dotenv/config.js";
import { execSync } from "node:child_process";
import youtubeDl from "youtube-dl-exec";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;
const GIF_FOLDER = "./server/gif";
const VIDEO_FOLDER = "./server/video";

if (!fs.existsSync(GIF_FOLDER)) {
    fs.mkdirSync(GIF_FOLDER);
}

if (!fs.existsSync(VIDEO_FOLDER)) {
    fs.mkdirSync(VIDEO_FOLDER);
}

app.use(cors());
app.use(express.json());

app.post("/url", async (req, res) => {
    const url = req.body.url.split("&").shift();
    const pathToVideo = `${VIDEO_FOLDER}/output.mp4`;
    if (fs.existsSync(pathToVideo)) {
        fs.rmSync(pathToVideo);
    }
    await youtubeDl(url, {
        output: pathToVideo,
        /**
         * Download a video from YT in 480p without audio
         */
        format: "bv*[height<=480][ext=mp4]",
    });
    res.sendStatus(200).end();
});

app.post("/gif", (req, res) => {
    const { init, duration } = req.body;
    const gifPath = `${GIF_FOLDER}/output.gif`;
    const videoPath = `${VIDEO_FOLDER}/output.mp4`;
    execSync(
        `ffmpeg -y -ss ${init} -t ${duration} -i ${videoPath} -vf "fps=30,scale=520:-1:flags=lanczos" ${gifPath}`,
    );
    res.sendFile("/server/gif/output.gif", { root: "." });
});

app.get("/video", (req, res) => {
    const path = `${VIDEO_FOLDER}/output.mp4`;

    fs.stat(path, (err, stats) => {
        if (err) {
            console.error("Error accessing video file", err);
            return res.sendStatus(404);
        }

        const range = req.headers.range;
        if (!range) {
            // If there's no header range, send the whole video
            res.writeHead(200, {
                "Content-Length": stats.size,
                "Content-Type": "video/mp4",
            });
            fs.createReadStream(path).pipe(res);
            return;
        }

        const CHUNK_SIZE = 10 ** 6; // 1MB per block
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, stats.size - 1);

        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${stats.size}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };

        res.writeHead(206, headers); // 206 = Partial Content
        fs.createReadStream(path, { start, end }).pipe(res);
    });
});

app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`);
});
