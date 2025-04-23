import { eventHandler } from "./eventHandler.mjs";

const baseUrl = "ws://localhost:3000/ws";
const session = "*";
const events = ["session.status", "message"];

const query = new URLSearchParams({
  session,
  events: events.join(","),
});

const wsUrl = `${baseUrl}?${query.toString()}`;

const ws = new WebSocket(wsUrl);

ws.onopen = () => {
  console.log("WebSocket connection opened", wsUrl);
};

ws.onclose = () => {
  console.log("WebSocket connection closed");
};

ws.onmessage = eventHandler;

ws.onerror = (error) => {
  console.error("WebSocket Error:", error);
};
