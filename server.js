const app = require('./app');
const mongoose = require('mongoose');

// DB Config
const db = process.env.MONGODB_URI;

if (!db) {
  console.error('Error: MONGODB_URI environment variable is not set.');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(db)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
