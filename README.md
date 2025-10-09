AI Video Engineer - Frontend

React web interface for AI video generation system.

Project Structure

ai-video-engineer-frontend/
- public/ (HTML and assets)
- src/
  - components/ (React components: Auth, Forms, Dashboard)
  - contexts/ (Socket.io connection)
  - App.js (main app)
  - index.js (entry point)
- package.json (dependencies)
- .env.example (sample config)
- README.md (this file)

Quick Start - Local Testing

Step 1: Clone Repository
  git clone https://github.com/princeflexzy0/ai-video-engineer-frontend.git
  cd ai-video-engineer-frontend

Step 2: Install Dependencies
  npm install

Step 3: Setup Environment Variables
  cp .env.example .env
  
  For local testing with local backend:
  echo "REACT_APP_BACKEND_URL=http://localhost:10000" > .env
  
  For production with live backend:
  echo "REACT_APP_BACKEND_URL=https://ai-video-engineer-backend.onrender.com" > .env

Step 4: Run the App
  npm start

App opens at: http://localhost:3000

Testing the App

1. Login with mock credentials:
   Email: test@example.com
   Password: password123

2. Navigate to dashboard
3. Enter a video script
4. Select template
5. Click "Generate Video"
6. Watch real-time progress updates!

Features

- Mock authentication system
- Protected dashboard routes
- Script input with templates
- Real-time progress tracking via Socket.io
- Video library/history
- Responsive design

Backend Connection

The frontend connects to backend at the URL specified in .env file.

To change backend URL, edit:
- src/components/Forms/AutoUploadForm.js
- src/contexts/SocketContext.js

Look for: const BACKEND_URL = '...'

Deploy to GitHub Pages

  npm run build
  npm run deploy

Deploy to Netlify

  npm install -g netlify-cli
  netlify login
  netlify deploy --prod

Deploy to Vercel

  npm install -g vercel
  vercel --prod

Tech Stack

React, Socket.io Client, React Router

Related Projects

Backend: https://github.com/princeflexzy0/ai-video-engineer-backend

Built with love by AI Video Engineer Team
