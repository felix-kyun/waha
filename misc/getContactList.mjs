import { fetchContacts } from "../requests/contacts.request.mjs";

export async function getContactList() {
  const contactsMap = new Map();
  const contacts = await fetchContacts();

  contactsMap.forEach(({ id, shortName }) => {
    contacts.set(id, shortName);
  });

  return contacts;
}
