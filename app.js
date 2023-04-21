const express = require('express');
const app = express();

// Set view engine
app.set('view engine', 'ejs');

// Serve static files from the public folder
app.use(express.static('public'));

// Route for the homepage
const indexRoute = require('./routes/index');
app.use('/', indexRoute);

// Route for the signin page
const signinRoute = require('./routes/signin');
app.use('/signin', signinRoute);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
