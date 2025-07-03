import express from "express";
import fs from "node:fs";
import "dotenv/config.js";
import { execSync } from "node:child_process";
import youtubeDl from "youtube-dl-exec";
import cors from "cors";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const app = express();
const FILENAME = fileURLToPath(import.meta.url);
const DIRNAME = dirname(FILENAME);
const PORT = process.env.PORT;
const GIF_FOLDER = join(DIRNAME, "gif");
const VIDEO_FOLDER = join(DIRNAME, "video");

if (!fs.existsSync(GIF_FOLDER)) {
  fs.mkdirSync(GIF_FOLDER);
}

if (!fs.existsSync(VIDEO_FOLDER)) {
  fs.mkdirSync(VIDEO_FOLDER);
}

app.use(cors());
app.use(express.json());
app.use(express.static(join(DIRNAME, "public")));

app.post("/url", async (req, res) => {
  try {
    const YOUTUBE_URL_REGEX =
      /^https:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+/;
    let url = req.body.url;
    if (typeof url !== "string" || !YOUTUBE_URL_REGEX.test(url)) {
      return res.status(400).send("Invalid URL");
    }
    url = url.split("&").shift();
    const videoId = url.split("v=")[1];
    const fileName = videoId + ".mp4";
    const pathToVideo = join(VIDEO_FOLDER, fileName);

    await youtubeDl(url, {
      output: pathToVideo,
      format: "bv*[height<=480][ext=mp4]",
    });

    res.send(200);
  } catch (e) {
    return res.status(500).send("Internal server error");
  }
});

app.post("/gif", (req, res) => {
  const { init, duration, videoId } = req.body;
  const gifFile = videoId + ".gif";
  const videoFile = videoId + ".mp4";
  const gifPath = join(GIF_FOLDER, gifFile);
  const videoPath = join(VIDEO_FOLDER, videoFile);
  execSync(
    `ffmpeg -y -ss ${init} -t ${duration} -i ${videoPath} -vf "fps=30,scale=520:-1:flags=lanczos" ${gifPath}`
  );
  res.sendFile(gifPath);
});

app.get("/video", (req, res) => {
  const id = req.query.id;
  const videoPath = join(VIDEO_FOLDER, id + ".mp4");

  fs.stat(videoPath, (err, stats) => {
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
      fs.createReadStream(videoPath).pipe(res);
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
    fs.createReadStream(videoPath, { start, end }).pipe(res);
  });
});

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
