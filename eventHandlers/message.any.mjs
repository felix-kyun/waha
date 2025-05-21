import { isMediaUrl } from "../misc/isMediaUrl.mjs";
import { replyWithVideo } from "./methods/replyWithVideo.mjs";

const contacts = new Map();
const raw = await fetch("http://localhost:3000/api/contacts/all");
const contactsData = await raw.json();
contactsData.forEach(({ id, shortName }) => {
  contacts.set(id, shortName);
});

export async function messageHandler(payload) {
  const { body, from, id } = payload;

  if (isMediaUrl(body)) {
    replyWithVideo(payload);
  } else {
    console.log(`${contacts.get(from)}: ${body}`);
  }
}
