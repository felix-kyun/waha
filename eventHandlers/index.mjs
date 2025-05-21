import { messageHandler } from "./message.any.mjs";

export async function eventHandler(e) {
  const data = JSON.parse(e.data);
  const { event, me, payload, environment } = data;

  switch (event) {
    case "message.any":
      messageHandler(payload);
      break;
  }
}
