# DecentraHealth

DecentraHealth is a decentralized web platform that enables healthcare clients to post consulting challenges and receive anonymous bids from verified consultants. The platform emphasizes **trust**, **anonymity**, and **transparency**, and is built with a React frontend and Node.js backend.

## Features

### Authentication
- Firebase Authentication (login/register)
- Role-based access control: Client and Consultant

### Challenges
- Clients can post new consulting challenges with budget, description, and deadline
- Consultants can browse and bid on open challenges
- Challenge status updates: Open / Closed
- Clients can close challenges manually

### Bidding System
- Consultants submit bids with amount, proposal, and estimated time of delivery
- Bids include automatic timestamps
- Clients can view all bids and select a winner
- Winning bid is visually highlighted

### Real-Time Chat
- Role-based chat feature for each challenge
- Secure messaging between clients and consultants
- Messages include aliases and timestamps
- Facilitates negotiation and communication

### User Profile
- Displays user alias, email, and role
- Editable alias
- Logout functionality

## Technologies Used

### Frontend
- React
- React Router
- Firebase Auth
- LocalStorage (temporary state persistence)
- CSS Modules

### Backend
- Node.js (Express)
- Firebase Admin SDK for token verification
- Custom authentication middleware

## Live Demo

You can try the deployed version of DecentraHealth here:  
👉 [https://decentralized-healthcare.vercel.app](https://decentralized-healthcare.vercel.app)
