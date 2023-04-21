const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const title = 'My Website';
  const header = 'Welcome to my website!';
  const footer = 'Thanks for visiting my website!';
  res.render('index', { title, header, footer });
  console.log("/ root access trigerred.");
});

module.exports = router;