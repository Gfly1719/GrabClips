const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: [process.env.FRONTEND_URL || 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key_change_this_in_production';

// Mock database
const users = [];
const videos = [];
const streams = [];
const conversations = [];
const messages = [];

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// =====================
// AUTH ROUTES
// =====================

app.post('/api/auth/signup', async (req, res) => {
  const { username, email, phoneNumber, password } = req.body;

  if (!username || !password || (!email && !phoneNumber)) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const existingUser = users.find(u => u.email === email || u.phoneNumber === phoneNumber);
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {
    id: Date.now().toString(),
    username,
    email,
    phoneNumber,
    password: hashedPassword,
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + username,
    bio: '',
    followers: 0,
    following: 0,
    videos: [],
    createdAt: new Date()
  };

  users.push(user);

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);
  res.status(201).json({ token, user: { ...user, password: undefined } });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, phoneNumber, password } = req.body;

  if (!password || (!email && !phoneNumber)) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const user = users.find(u => u.email === email || u.phoneNumber === phoneNumber);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);
  res.json({ token, user: { ...user, password: undefined } });
});

// =====================
// USER ROUTES
// =====================

app.get('/api/users/:userId', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.params.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({ ...user, password: undefined });
});

app.post('/api/users/:userId/follow', authenticateToken, (req, res) => {
  const targetUser = users.find(u => u.id === req.params.userId);
  if (!targetUser) {
    return res.status(404).json({ message: 'User not found' });
  }
  targetUser.followers += 1;
  res.json({ message: 'Followed successfully' });
});

// =====================
// VIDEO ROUTES
// =====================

app.get('/api/videos/feed', authenticateToken, (req, res) => {
  res.json(videos);
});

app.post('/api/videos/:videoId/like', authenticateToken, (req, res) => {
  const video = videos.find(v => v.id === req.params.videoId);
  if (!video) {
    return res.status(404).json({ message: 'Video not found' });
  }
  video.likes = (video.likes || 0) + 1;
  res.json({ likes: video.likes });
});

app.post('/api/videos/:videoId/comments', authenticateToken, (req, res) => {
  const { text } = req.body;
  const video = videos.find(v => v.id === req.params.videoId);
  if (!video) {
    return res.status(404).json({ message: 'Video not found' });
  }
  const comment = { id: Date.now().toString(), userId: req.user.id, text, createdAt: new Date() };
  video.comments = video.comments || [];
  video.comments.push(comment);
  res.status(201).json(comment);
});

// =====================
// STREAM ROUTES
// =====================

app.post('/api/streams/start', authenticateToken, (req, res) => {
  const { title, description } = req.body;
  const stream = {
    id: Date.now().toString(),
    creatorId: req.user.id,
    title,
    description,
    viewerCount: 0,
    thumbnail: 'https://via.placeholder.com/300x400?text=' + encodeURIComponent(title),
    createdAt: new Date()
  };
  streams.push(stream);
  res.status(201).json(stream);
});

app.get('/api/streams/live', authenticateToken, (req, res) => {
  res.json(streams);
});

app.post('/api/streams/stop', authenticateToken, (req, res) => {
  const index = streams.findIndex(s => s.creatorId === req.user.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Stream not found' });
  }
  streams.splice(index, 1);
  res.json({ message: 'Stream stopped' });
});

// =====================
// MESSAGE ROUTES
// =====================

app.get('/api/messages/conversations', authenticateToken, (req, res) => {
  const userConversations = conversations.filter(c => c.participantIds.includes(req.user.id));
  res.json(userConversations);
});

app.post('/api/messages/:conversationId', authenticateToken, (req, res) => {
  const { text } = req.body;
  const message = {
    id: Date.now().toString(),
    conversationId: req.params.conversationId,
    senderId: req.user.id,
    text,
    createdAt: new Date()
  };
  messages.push(message);
  res.status(201).json(message);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'GrabClips API is running!' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 GrabClips Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
