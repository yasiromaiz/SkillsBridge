# SkillBridge - Industry Internship Matching Platform

A comprehensive platform connecting students with internship opportunities using AI-powered recommendations and RAG-based chatbot assistance.

## Features

- 🎯 **Student Portal** - Browse and apply for internships
- 🏢 **Company Dashboard** - Post and manage internship positions
- 💬 **AI Chatbot** - Get personalized career guidance
- 📊 **Smart Recommendations** - AI-powered internship matching
- 🔐 **Secure Authentication** - JWT-based user authentication
- 📱 **Responsive Design** - Works on desktop and mobile

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios
- React Icons

### Backend
- Node.js / Express.js
- MongoDB Atlas
- JWT Authentication
- Bcrypt for password hashing

### AI/ML
- Python RAG System
- OLLAMA for LLM
- Langchain for RAG pipeline

## Project Structure

```
GPREC_Hackathon/IDEA_Sprint_Project/
├── FRONTEND/          # React application
│   ├── src/
│   │   ├── pages/    # Page components
│   │   ├── components/
│   │   └── App.js
│   └── package.json
├── BACKEND/           # Express API server
│   ├── models/       # MongoDB schemas
│   ├── routes/       # API routes
│   ├── server.js
│   └── package.json
├── AI/               # Python RAG system
│   ├── rag_chatbot/
│   ├── FIASS_STORE/
│   └── DATA/
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB Atlas account
- Python (v3.8+) for AI system

### Backend Setup

1. Navigate to backend directory:
```bash
cd BACKEND
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with:
```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
PORT=5000
OLLAMA_API_URL=http://localhost:11434
```

4. Start backend:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd FRONTEND
```

2. Install dependencies:
```bash
npm install
```

3. Start frontend:
```bash
npm start
```

Frontend will run on `http://localhost:3000`

### AI/Chatbot Setup

1. Navigate to AI directory:
```bash
cd AI/rag_chatbot
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Start chatbot service:
```bash
python rag_system.py
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Student Routes
- `GET /api/student/profile/:userId` - Get student profile
- `PUT /api/student/profile/:userId` - Update profile

### Company Routes
- `POST /api/company/internship` - Post internship
- `GET /api/company/applications` - View applications

### Chatbot
- `POST /api/chatbot/ask` - Ask AI assistant

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -m 'Add YourFeature'`
4. Push to branch: `git push origin feature/YourFeature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Authors

- **Yasir Omaiz** - Project Lead

## Support

For support, email yasiromaiz786@gmail.com or open an issue in the repository.

---

Made with ❤️ for the GPREC Hackathon
