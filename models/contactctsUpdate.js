const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "./contacts.json");
const { nanoid } = require("nanoid");


const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const allContacts = JSON.parse(data);
    console.log(allContacts);
    return allContacts;
  } catch (error) {
    console.log(error);
  }
};


const getContactById = async (contactId) => {
  try {
    const stringId = String(contactId);
    const allContacts = await listContacts();
    const contact = allContacts.find(c => c.id === stringId);
    return contact || null;
  } catch (error) {
  console.log(error);   
  }
}

const addContact = async (body) => {
  try {
    const data = await listContacts();
    
      const contact = {
      id: nanoid(),
      ...body
    }
    data.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return contact;
  } catch (error) {
    console.log(error);
  }
};

// const removeContact = async (contactId) => {
//   try {
//     const stringId = String(contactId);
//     const arr = await listContacts();
//     const index = arr.findIndex(el => el.id === stringId);
//     if (index === -1) {
//       return null
//     };
//     const removedElement = arr.splice(index, 1);
//     await fs.writeFile(contactsPath, JSON.stringify(arr, null, 2))
//     return removedElement;
//   } catch (error) {
//     console.log(error);
//   }
// };




// const updateContact = async (contactId, body) => {}


module.exports = {
  listContacts,
  getContactById,
  // removeContact,
  addContact,
  // updateContact,
};