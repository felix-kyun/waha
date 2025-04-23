import blessed from "blessed";
import BlessedContrib from "blessed-contrib";
import { fetchContacts } from "./misc/fetchContacts.mjs";

const state = {};

const screen = blessed.screen({
  smartCSR: true,
  title: "whatui",
});

const grid = new BlessedContrib.grid({
  screen: screen,
  rows: 1,
  cols: 16,
});

const ContactsView = grid.set(0, 0, 1, 3, blessed.list);
const ChatView = grid.set(0, 3, 1, 13, blessed.list);
const DebugView = grid.set(1, 0, 1, 16, blessed.log);

// get contacts
state.contacts = await fetchContacts();
state.selectedContact = state.contacts[0];

const render = () => {
  ContactsView.setItems(Array.from(state.contacts.values()));
  ChatView.setItems(["Hello", "World"]);
  screen.render();
};

render();
