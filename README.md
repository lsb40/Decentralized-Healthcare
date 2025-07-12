# DecentraHealth

A decentralized web platform for healthcare clients to post consulting challenges and receive anonymous bids from verified consultants. Built with React (frontend) and Node.js (backend), the platform emphasizes trust, anonymity, and transparency.

## Features

### 🔐 Authentication
- Firebase authentication (login/register)
- Role-based access: `Client` and `Consultant`

### 📣 Challenges
- Clients can post challenges with budget, description, and deadlines
- Consultants can view open challenges and submit bids
- Status indicator (Open / Closed)
- Clients can close challenges manually

### 📝 Bidding
- Consultants place detailed bids with amount, proposal, ETA
- Timestamps automatically recorded on bids
- Clients can view and select a winning bid
- Winner highlighted in the UI

### 💬 Chat System
- Role-based chat feature per challenge
- Messages stored with alias + timestamps
- Enables communication between clients and consultants

### 👤 Profile
- User alias, email, and role shown
- Edit alias feature
- Logout button

## Technologies

### Frontend
- React
- React Router
- Firebase Auth
- LocalStorage (temporary data persistence)
- CSS Modules

### Backend
- Node.js (Express)
- Firebase Admin SDK (for token verification)
- Custom middleware

## Link
- https://decentralized-healthcare.vercel.app/

