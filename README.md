# GrabClips 🎬

A full-stack short-video social media application similar to TikTok, built with React, Express, and Node.js.

## Features

✅ **User Authentication** - Sign up/Login with email or phone number
✅ **Video Feed** - TikTok-style vertical scrolling feed
✅ **Interactive Videos** - Like, comment, and share videos
✅ **User Profiles** - View profiles and follow other users
✅ **Messaging** - Direct messaging between users
✅ **Live Streaming** - Go live and broadcast to viewers
✅ **Dark Theme** - Beautiful dark-themed UI
✅ **Mobile Responsive** - Works on all devices

## Tech Stack

**Frontend:**
- React 18.2.0
- React Router DOM 6.11.0
- Vite 4.3.9
- Axios for API calls
- CSS3 with CSS Variables

**Backend:**
- Express.js 4.18.2
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled for cross-origin requests
- dotenv for environment variables

## Project Structure

```
GrabClips/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   ├── styles/           # CSS files
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/                    # Express Backend
│   ├── index.js              # Main server file
│   ├── package.json
│   └── .env.example
├── package.json              # Root package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Gfly1719/GrabClips.git
   cd GrabClips
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   ```bash
   cd server
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## Deployment

### Deploy Backend (Render.com)

1. Push code to GitHub
2. Go to [Render.com](https://render.com)
3. Create new Web Service
4. Connect your GitHub repo
5. Set environment variables
6. Deploy!

### Deploy Frontend (Vercel)

1. Push code to GitHub
2. Go to [Vercel.com](https://vercel.com)
3. Import your repository
4. Set build command: `npm run build`
5. Set output directory: `dist`
6. Deploy!

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/:userId` - Get user profile
- `POST /api/users/:userId/follow` - Follow user

### Videos
- `GET /api/videos/feed` - Get video feed
- `POST /api/videos/:videoId/like` - Like video
- `POST /api/videos/:videoId/comments` - Comment on video

### Streams
- `POST /api/streams/start` - Start live stream
- `GET /api/streams/live` - Get live streams
- `POST /api/streams/stop` - Stop live stream

### Messages
- `GET /api/messages/conversations` - Get conversations
- `POST /api/messages/:conversationId` - Send message

## Environment Variables

Create a `.env` file in the server directory:

```
PORT=5000
JWT_SECRET=your_secret_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## Usage

1. **Sign Up** - Create account with email/phone and password
2. **Browse Feed** - Scroll through videos from other users
3. **Interact** - Like, comment, and share videos
4. **Follow Users** - Click follow on user profiles
5. **Message** - Send direct messages to users
6. **Go Live** - Stream yourself to viewers

## Features Coming Soon

- 🔐 Two-factor authentication
- 🎵 Music/audio library for videos
- 🏆 Trending/discovery algorithm
- 💰 Monetization for creators
- 📱 Native mobile apps (React Native)
- 🌐 Multi-language support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial use.

## Author

**Gfly1719** - Full Stack Developer

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Made with ❤️ by Gfly1719**
