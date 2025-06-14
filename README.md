⚡ ChargeUp — EV Charging Station Manager
A full-stack web app for managing EV charging stations. Users can register, login, and perform CRUD operations on charging stations with a map view.

🚀 Features
✅ Register & Login (JWT based)

✅ Create, update, delete charging stations

✅ View all stations with filter support

✅ View chargers on a Leaflet-based map

✅ Mobile-responsive modern UI

🧩 Tech Stack
Frontend: Vue 3 + Vite + Leaflet

Backend: Node.js + Express + MongoDB

Auth: JWT

Deployment: Vercel (frontend), Render (backend)

🛠️ Getting Started
1. Clone the Repository
git clone https://github.com/your-username/chargeup-app.git
cd chargeup-app

2. Backend Setup
cd backend
npm install

3. Environment Variables (backend/.env)
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret_key

4. Start the server
npm run dev
Server runs on: http://localhost:5000

💻 Frontend Setup
cd frontend
npm install

🌐 Environment Variables (frontend/.env)
VITE_API_BASE_URL=https://your-backend-url.onrender.com
Replace with your actual Render backend URL after deployment.

▶️ Run development server
npm run dev
Frontend runs on: http://localhost:5173

📦 Build for Production
cd frontend
npm run build

It will output to the /dist folder, which Vercel uses for deployment.

☁️ Deploy Instructions
🟣 Backend on Render
Go to https://render.com

Create a new Web Service

Connect your GitHub repo or upload manually

Set:

Build Command: npm install

Start Command: node server.js

Add Environment Variables (same as .env)

Deploy and copy your public Render URL (e.g. https://charging-station-app-zn3m.onrender.com)


⚪ Frontend on Vercel
Go to https://vercel.com

Create a new project

Choose your frontend folder (frontend)

Set:

Framework: Vite

Output Directory: dist

Build Command: npm run build

Add VITE_API_BASE_URL under Environment Variables (must point to your Render backend)

Deploy and get your frontend URL

⚠️ Common Issues
CORS Errors: Make sure origin in backend/server.js is set to your Vercel domain

"Cannot GET /api/auth/login": Check your Express routes and deploy logs on Render

Form not submitting / Map empty: Check if you're logged in and token is stored in localStorage

🧠 Tips for Development
✅ Always use services/api.js to make API requests

✅ Handle token-based auth headers using localStorage

✅ Use .env files to separate dev/prod URLs