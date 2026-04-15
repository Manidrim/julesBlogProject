const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;
let app;
let Article;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  // Need to handle session store which also connects to mongo
  // We override the MONGODB_URI env var BEFORE requiring app
  process.env.MONGODB_URI = uri;

  app = require('../app');
  Article = require('../models/article');

  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Public Routes', () => {
  beforeEach(async () => {
    await Article.deleteMany({});
    await Article.create({
      title: 'Published Article',
      content: 'Content',
      published: true
    });
    await Article.create({
      title: 'Draft Article',
      content: 'Content',
      published: false
    });
  });

  it('GET / should return published articles', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Published Article');
    expect(res.text).not.toContain('Draft Article');
  });

  it('GET /articles/:id should return a published article', async () => {
    const article = await Article.findOne({ published: true });
    const res = await request(app).get(`/articles/${article._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Published Article');
  });

  it('GET /articles/:id should return 404 for draft article', async () => {
    const article = await Article.findOne({ published: false });
    const res = await request(app).get(`/articles/${article._id}`);
    expect(res.statusCode).toEqual(404);
  });
});

describe('Auth Routes', () => {
  it('GET /auth/login should return 200', async () => {
    const res = await request(app).get('/auth/login');
    expect(res.statusCode).toEqual(200);
  });
});
