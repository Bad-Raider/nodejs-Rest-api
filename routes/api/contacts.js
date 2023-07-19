const express = require('express');
const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  // removeContact,
  // updateContact,
} = require("../../models/contactctsUpdate.js");


router.get('/', async (req, res, next) => {
  res.json( await listContacts());
})

router.get('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  res.json(await getContactById(id));
})

router.post('/', async (req, res, next) => {

  res.json({ message: 'template message' })
})

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

module.exports = router
