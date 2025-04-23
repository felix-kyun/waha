const contacts = new Map();
const raw = await fetch("http://localhost:3000/api/contacts/all");
const contactsData = await raw.json();
contactsData.forEach(({ id, shortName }) => {
  contacts.set(id, shortName);
});

export function messageHandler({ body, from }) {
  console.log(`${contacts.get(from)}: ${body}`);
}
