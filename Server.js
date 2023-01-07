const express = require('express');
const mongodb = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const connectDB = require("./db/connect");
const userauth = require("./db/model")

// Signup route
app.post('/signup', async(req, res) => {
  const { email, password } = req.body;
  // Other user data can be added here
  const userData = {
    email: email,
    password: password
  };
  
  // Encrypt the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  userData.password = hashedPassword;
  // Connect to the database
  try {
      await connectDB();
      // Insert the user data into the collection
      await userauth.create(userData);
      res.send("User Registered Sucessfully")
    }
    catch{
        res.send("User not registered")
    }
  });

app.get('/',(req,res) =>{
    res.send("Hello Noder");
})
// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const passwordMatch = await bcrypt.hash(password, 10);
try{
  // Connect to the database
  await connectDB();
  const record = await userauth.find({email: `${email}`});
  if(record){
    const passwordMatch = await bcrypt.compare(password, record[0].password);
    if (passwordMatch) {
        res.send('Successfully logged in.');
      } else {
        res.status(401).send('Incorrect email or password.');
      }
    } else {
      res.status(401).send('Incorrect email or password.');
    }
}
catch{
    res.send("Error connecting to the database");
}
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
