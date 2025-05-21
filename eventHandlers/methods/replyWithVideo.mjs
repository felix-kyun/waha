import { post } from "../../misc/post.mjs";
import { fileToBase64 } from "../misc/fileToBase64.mjs";
import { downloadVideo } from "../misc/yt-dlp.mjs";

export async function replyWithVideo({ body, from, id }) {
  console.log("sending video");

  const videoPath = await downloadVideo(body);
  const encodedVideo = await fileToBase64(videoPath);

  const reply = {
    session: "default",
    chatId: from,
    reply_to: id,
    asNote: false,
    caption: "Downloaded Video",
    file: {
      filename: "video.mp4",
      mimetype: "video/mp4",
      data: encodedVideo,
    },
  };

  post("sendVideo", reply);
  console.log("Video sent successfully");
}
