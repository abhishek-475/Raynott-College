const Contact = require('../models/Contact');
const mailer = require('../utils/mailer');

exports.createContact = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);

    // optional email to admin
    if (process.env.EMAIL_USER) {
      mailer.sendMail({
        to: process.env.EMAIL_USER,
        subject: `New contact from ${contact.name}`,
        text: `${contact.message}\n\nFrom: ${contact.email}`
      }).catch(console.error);
    }

    res.status(201).json({ message: 'Message received', contact });
  } catch (err) {
    next(err);
  }
};

exports.getContacts = async (req, res, next) => {
  try {
    const items = await Contact.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
};
