import { fileToBase64 } from "./fileToBase64.mjs";
import { downloadVideo } from "./yt-dlp.mjs";

const contacts = new Map();
const raw = await fetch("http://localhost:3000/api/contacts/all");
const contactsData = await raw.json();
contactsData.forEach(({ id, shortName }) => {
  contacts.set(id, shortName);
});

export async function messageHandler({ body, from, id }) {
  if (checkUrl(body)) {
    const videoPath = await downloadVideo(body);
    const encodedVideo = await fileToBase64(videoPath);

    const reply = {
      session: "default",
      chatId: from,
      reply_to: id,
      caption: "Downloaded Video",
      file: {
        filename: "video.mp4",
        mimetype: "video/mp4",
        data: encodedVideo,
      },
    };

    console.log("sending video");

    const response = await fetch("http://localhost:3000/api/sendVideo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reply),
    });

    if (!response.ok) {
      console.error("Error sending video:", response.statusText);
    } else {
      console.log("Video sent successfully");
    }
  } else {
    console.log(`${contacts.get(from)}: ${body}`);
  }
}

function checkUrl(url) {
  return url.includes("https://");
}
