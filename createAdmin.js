require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user');

const db = process.env.MONGODB_URI;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

const username = process.argv[2];
const password = process.argv[3];

if (!username || !password) {
  console.log('Please provide a username and password.');
  console.log('Usage: node createAdmin.js <username> <password>');
  mongoose.disconnect();
  process.exit(1);
}

const newUser = new User({
  username,
  password
});

newUser.save()
  .then(user => {
    console.log(`Admin user '${user.username}' created successfully.`);
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error creating admin user:', err);
    mongoose.disconnect();
  });
