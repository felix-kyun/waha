export async function fetchContacts() {
  const contacts = new Map();
  // const raw = await fetch("http://localhost:3000/api/contacts/all");
  // const contactsData = await raw.json();
  const contactsData = [
    { id: "1", shortName: "Alice" },
    { id: "2", shortName: "Bob" },
    { id: "3", shortName: "Charlie" },
  ];
  contactsData.forEach(({ id, shortName }) => {
    contacts.set(id, shortName);
  });
  return contacts;
}
