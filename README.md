\# 🚨 CivicHeroAI



An AI-powered civic issue reporting platform that enables citizens to report, track, and verify community problems using Artificial Intelligence, geolocation, image uploads, and community participation.



Developed as a solo hackathon project by \*\*Pushplata Pal\*\*.



\---



\## 🌟 Problem Statement



Citizens often struggle to report local civic issues such as potholes, broken street lights, water leakages, and waste management problems efficiently. Traditional complaint systems are slow, lack transparency, and do not encourage community participation.



CivicHeroAI addresses these challenges through AI-driven issue categorization, community verification, and real-time visualization.



\---



\## ✨ Features



\### 🤖 AI Issue Categorization



\* Automatically detects issue category using Gemini AI

\* Assigns severity levels (Low, Medium, High)



\### 💡 AI Resolution Suggestions



\* Generates intelligent recommendations for resolving reported issues



\### 📸 Image Upload Support



\* Citizens can upload photos as evidence



\### 📍 Current Location Detection



\* Uses browser geolocation APIs

\* Automatically captures user coordinates



\### 🗺️ Interactive Community Map



\* Displays reported issues on a live map

\* Shows the user's current location



\### 👍 Community Verification System



\* Citizens can upvote and verify issues



\### 📊 Analytics Dashboard



\* Visual representation of issue statistics

\* Category-wise analysis using charts



\### 🏆 Community Leaderboard



\* Encourages community engagement and participation



\### 🔮 Predictive Insights



\* AI-driven insights into community problem patterns



\### 🛠️ Admin Dashboard



\* Monitor and manage reported issues



\---



\## 🏗️ System Architecture



```text

Frontend (React + Vite)

&#x20;       ↓

REST APIs (Express.js)

&#x20;       ↓

MongoDB Database

&#x20;       ↓

Gemini AI Integration

```



\---



\## 🛠️ Tech Stack



\### Frontend



\* React.js

\* Vite

\* Axios

\* React Leaflet

\* Recharts



\### Backend



\* Node.js

\* Express.js

\* Multer

\* Gemini AI SDK



\### Database



\* MongoDB Atlas



\### Deployment



\* Vercel (Frontend)

\* Render (Backend)



\---



\## 📂 Project Structure



```text

CivicHeroAI/

│

├── client/

│   ├── src/

│   ├── public/

│   └── package.json

│

├── server/

│   ├── models/

│   ├── routes/

│   ├── uploads/

│   └── server.js

│

└── README.md

```



\---



\## ⚙️ Installation \& Setup



\### Clone Repository



```bash

git clone https://github.com/PushplataPal/CivicHeroAI.git

cd CivicHeroAI

```



\### Backend Setup



```bash

cd server

npm install

npm run dev

```



Create a `.env` file:



```env

MONGO\_URI=YOUR\_MONGODB\_CONNECTION\_STRING

GEMINI\_API\_KEY=YOUR\_GEMINI\_API\_KEY

PORT=5000

```



\### Frontend Setup



```bash

cd client

npm install

npm run dev

```



\---



\## 🌐 Live Demo



\### Frontend



Add your Vercel deployment URL here.



\### Backend API



https://civichero-ai-backend.onrender.com



\### GitHub Repository



https://github.com/PushplataPal/CivicHeroAI



\---



\## 🚀 Future Scope



\* Mobile Application Support

\* Government Department Integration

\* Real-time Notifications

\* AI-based Priority Prediction

\* Multilingual Support

\* Reward System for Active Citizens

\* Advanced Data Analytics



\## 📜 License



This project is developed for educational and hackathon purposes.



