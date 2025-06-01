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
    res.sendFile("/server/video/output.mp4", { root: "." });
});

app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`);
});
