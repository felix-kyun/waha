import { post } from "../misc/post.mjs";

export async function replyWithText(content, { id, from }) {
  const payload = {
    session: "default",
    chatId: from,
    reply_to: id,
    text: content,
  };

  return await post("sendText", payload);
}
