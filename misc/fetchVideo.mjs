import YTDlpWrap from "yt-dlp-wrap";
import { exec } from "child_process";
import { promisify } from "util";
import { fileExists } from "./fileExists.mjs";

const execPromise = promisify(exec);
const ytdlp = new YTDlpWrap.default("/usr/bin/yt-dlp");

export const downloadVideo = async (url) => {
  const fileName = url.split("/").pop();
  const output = `./downloads/output/${fileName}.mp4`;

  // if file is already downloaded, return
  if (await fileExists(output)) {
    return output;
  }

  try {
    // download the video using yt-dlp
    await ytdlp.execPromise([
      url,
      "-S res,ext:mp4",
      "-o",
      `./downloads/${fileName}.%(ext)s`,
    ]);

    // fix the codec as required by waha.js
    const { stdout, stderr } = await execPromise(
      `ffmpeg -i ./downloads/${fileName}.mp4 -c:v libx264 -map 0 -movflags +faststart ./downloads/output/${fileName}.mp4`,
    );

    if (stderr) {
      console.error("Error fixing codec:", stderr);
      return null;
    }
  } catch (err) {
    console.error("Error downloading video:", err);
    return null;
  }

  return output;
};
