require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user');

const db = process.env.MONGODB_URI;

if (!db) {
  console.error('Error: MONGODB_URI environment variable is not set.');
  process.exit(1);
}

mongoose.connect(db)
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
