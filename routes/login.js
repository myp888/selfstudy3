
//this is not yet final
//Login handle 
 const PocketBase = require('pocketbase/cjs')
 const pb = new PocketBase('http://127.0.0.1:8090');

  async function userLogin() {
  try {
   // for admins - const authData = await pb.admins.authWithPassword('myp888@yahoo.com', '1234567890');
    const authUser = await pb.collection('users').authWithPassword(
    'gsfpc@yahoo.com',
    '1234567890',
     );
      } catch (error) {
    console.error('Error logging in:(create user)', error);
    } 

    // after the above you can also access the auth data from the authStore
    //res.send('Logged in successfully!');
    console.log(pb.authStore.isValid);
    console.log(pb.authStore.token);
    console.log(pb.authStore.model.id);
    
   
    // to logout -> pb.authStore.clear();
};