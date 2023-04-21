const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// Configure middleware to parse request body as URL-encoded data
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  const title = 'Sign In';
  const header = 'Sign In';
  const footer = 'Thanks for visiting my website!';
  res.render('signin', { title, header, footer });
  console.log("/ signin access trigerred.");
});


router.post('/', (req, res) => {
    // Retrieve form data from request body (this is not json data)
    const d_email = req.body.email;
    const d_username = req.body.username;
    const d_password = req.body.password;
    const d_confirm_password = req.body.confirm_password;
   
    console.log(d_email);
    console.log(d_username);
    console.log(d_password);
    console.log(d_confirm_password);

  // Handle form submission for signing in - to do ->separate this
const PocketBase = require('pocketbase/cjs')
const pb = new PocketBase('http://127.0.0.1:8090');
pb.collection('users').create({
  email:           d_email,
  password:        d_password,
  passwordConfirm: d_confirm_password,
  name:            d_username,
});

  res.send('Signed in successfully!');
});

module.exports = router;

