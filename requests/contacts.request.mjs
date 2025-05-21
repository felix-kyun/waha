import { SERVER_URL } from "../misc/config.mjs";

export async function fetchContacts() {
  const raw = await fetch(`${SERVER_URL}/contacts/all`);
  if (!raw.ok) {
    throw new Error("Failed to fetch contacts");
  }

  return await raw.json();
}
