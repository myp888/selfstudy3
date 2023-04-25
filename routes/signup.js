

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// Configure middleware to parse request body as URL-encoded data
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  const title = 'Sign Up';
  const header = 'Sign Up';
  const footer = 'Thanks for visiting my website!';
  res.render('signup', { title, header, footer });
  console.log("/ signup access trigerred.");
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

    //Subscribe or signup handle 
    const PocketBase = require('pocketbase/cjs')
    const pb = new PocketBase('http://127.0.0.1:8090');

      async function signupUser() {
      try {

        //Login handle
        require('dotenv').config();
        //const PocketBase = require('pocketbase/cjs')
        //const pb = new PocketBase('http://127.0.0.1:8090');
        //const authData = await pb.admins.authWithPassword('myp888@yahoo.com', '1234567890');
        const authData = await pb.admins.authWithPassword(process.env.ACCOUNT_TO_CREATE_NEW_USER,
         process.env.ACCOUNT_TO_CREATE_NEW_USER_PASSWORD,);
        // const authUser = await pb.collection('users').authWithPassword(
        // 'gsfpc@yahoo.com',
        // '1234567890',
        //  );
        } catch (error) {
        console.error('Error logging in:(create user)', error);
      } 
  
      // after the above you can also access the auth data from the authStore
      //res.send('Logged in successfully!');
      console.log(pb.authStore.isValid);
      console.log(pb.authStore.token);
      console.log(pb.authStore.model.id);  
      // to logout -> pb.authStore.clear();


    // Handle form submission for signing up 
   // const PocketBase = require('pocketbase/cjs')
   // const pb = new PocketBase('http://127.0.0.1:8090');
 
   async function createUser() {
    try {
   const newRecord = await pb.collection('users').create({
      email: d_email,
      password: d_password,
      passwordConfirm: d_confirm_password,
      name: d_username,
    });

    res.send('User created successfully');
    console.log('User created successfully:', newRecord);
    console.log(pb.authStore.model.email);
    pb.authStore.clear(); //logout

   } catch (error) {
      console.error('Error creating user:', error);
      res.send('Error encountered');
      }
  }
 createUser(); 
  };
  
signupUser();
});


module.exports = router;