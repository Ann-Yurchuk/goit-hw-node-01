const { program } = require("commander");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

program
  .name("myCli")
  .description("A simple CLI to manage your contacts")
  .version("1.0.0");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const { action, id, name, email, phone } = program.opts();

(async () => {
  if (action === "list") {
    const result = await listContacts();
    console.table(result);
  }

  if (action === "get") {
    const result = await getContactById(id);
    if (!result) {
      throw new Error(`Task by id=${id} not found`);
    }
    console.table(result);
  }

  if (action === "add") {
    const result = await addContact(name, email, phone);
    console.table(result);
  }

  if (action === "remove") {
    const result = await removeContact(id);
    console.table(result);
  }
})();
