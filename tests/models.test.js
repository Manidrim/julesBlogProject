const mongoose = require('mongoose');
const User = require('../models/user');
const Article = require('../models/article');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('User Model', () => {
  it('should create and save a user correctly', async () => {
    const userData = { username: 'testuser', password: 'password123' };
    const validUser = new User(userData);
    const savedUser = await validUser.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(userData.username);
    expect(savedUser.password).not.toBe(userData.password); // Should be hashed
  });

  it('should check password correctly', async () => {
    const userData = { username: 'testuser2', password: 'password123' };
    const user = new User(userData);
    await user.save();

    const isMatch = await user.matchPassword('password123');
    expect(isMatch).toBe(true);

    const isNotMatch = await user.matchPassword('wrongpassword');
    expect(isNotMatch).toBe(false);
  });
});

describe('Article Model', () => {
  it('should create and save an article correctly', async () => {
    const articleData = { title: 'Test Article', content: 'Test Content', published: true };
    const validArticle = new Article(articleData);
    const savedArticle = await validArticle.save();

    expect(savedArticle._id).toBeDefined();
    expect(savedArticle.title).toBe(articleData.title);
    expect(savedArticle.content).toBe(articleData.content);
    expect(savedArticle.published).toBe(true);
  });
});
