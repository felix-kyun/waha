import YTDlpWrap from "yt-dlp-wrap";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

const ytdlp = new YTDlpWrap.default("/usr/bin/yt-dlp");

export const downloadVideo = async (url) => {
  const fileName = url.split("/").pop();

  console.log("Downloading video:", url);
  try {
    const result = await ytdlp.execPromise([
      url,
      "-S res,ext:mp4",
      "-o",
      `./downloads/${fileName}.%(ext)s`,
    ]);

    // fix the codec
    console.log("Fixing codec...");
    const { stdout, stderr } = await execPromise(
      `ffmpeg -i ./downloads/${fileName}.mp4 -c:v libx264 -map 0 -movflags +faststart ./downloads/output/${fileName}.mp4`,
    );

    console.log("stdout:", stdout);
    console.error("stderr:", stderr);

    console.log("Video downloaded and codec fixed successfully.");
  } catch (err) {
    console.error("Error downloading video:", err);
    return null;
  }

  return `./downloads/output/${fileName}.mp4`;
};
