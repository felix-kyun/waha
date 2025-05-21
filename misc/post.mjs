import { SERVER_URL } from "./config.mjs";

export async function post(endpoint, payload) {
  const response = await fetch(`${SERVER_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Failed to post to ${endpoint}: ${response.statusText}`);
  }

  return await response.json();
}
