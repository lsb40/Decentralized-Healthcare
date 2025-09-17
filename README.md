# DecentraHealth - Decentralized Healthcare Consulting Platform

A comprehensive full-stack web application for healthcare consulting, enabling clients to post challenges and receive anonymous bids from verified consultants. Built with React (frontend) and Node.js (backend), the platform emphasizes trust, anonymity, transparency, and secure communication in the healthcare consulting ecosystem.

## Live Demo

You can try the deployed version of DecentraHealth here:  
👉 [https://decentralized-healthcare.vercel.app](https://decentralized-healthcare.vercel.app)

## Features

### Core Functionality
**Challenge Management**: Healthcare clients can post detailed consulting challenges with budget, description, and deadlines
**Bidding System**: Consultants can view open challenges and submit competitive bids with proposals, pricing, and timelines
**Real-time Chat**: Secure communication system for each challenge with role-based access
**User Profiles**: Comprehensive profile management with alias customization and role-based permissions
**Status Tracking**: Real-time challenge status updates (Open/Closed) with manual control
**Anonymous Bidding**: Privacy-focused bidding system with consultant aliases

### Technical Features
**Firebase Authentication**: Secure user registration and login with role-based access control
**Real-time Communication**: Socket.io powered chat system with instant message delivery
**Data Persistence**: LocalStorage for client-side data with Firebase Firestore for chat messages
**Responsive Design**: Mobile-first approach with modern UI components
**Role-based Access**: Granular permissions for clients and consultants
**Cross-platform**: Works seamlessly on desktop and mobile browsers

## Architecture

```
Decentralized Healthcare/
├── frontend/         # React.js application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── App.js         # Main application component
│   │   ├── firebase.js    # Firebase configuration
│   │   ├── Chat.js        # Real-time chat component
│   │   ├── Profile.js     # User profile management
│   │   └── utils.js       # Utility functions
│   ├── public/            # Static assets
│   └── build/             # Production build
├── server/           # Node.js/Express API server
│   ├── index.js      # Socket.io server configuration
│   └── package.json  # Server dependencies
└── README.md         # Project documentation
```

## Technology Stack

### Frontend
**React 19.1.0**: Modern JavaScript library for building user interfaces
**React Router 7.6.3**: Client-side routing and navigation
**Firebase 11.10.0**: Authentication and real-time database services
**Socket.io Client 4.8.1**: Real-time bidirectional communication
**CSS Modules**: Scoped styling and component isolation
**LocalStorage API**: Client-side data persistence for challenges and bids

### Backend
**Node.js**: JavaScript runtime environment
**Express.js 5.1.0**: Web application framework
**Socket.io 4.8.1**: Real-time communication server
**CORS 2.8.5**: Cross-origin resource sharing
**Firebase Admin SDK**: Server-side Firebase integration

### Database & Storage
**Firebase Firestore**: NoSQL cloud database for chat messages
**Firebase Authentication**: User management and security
**LocalStorage**: Client-side data persistence for challenges and bids

## Quick Start

### Prerequisites
- Node.js 18+
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Git
- Firebase project setup

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/decentralized-healthcare.git
   cd decentralized-healthcare
   ```

2. **Start the backend server**
   ```bash
   cd server
   npm install
   node index.js
   ```

3. **Start the frontend development server**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000

### Production Deployment

The application can be deployed on various platforms:

**Frontend Deployment Options:**
- Vercel: Static site hosting
- Netlify: JAMstack deployment
- Firebase Hosting: Integrated with Firebase services

**Backend Deployment Options:**
- Heroku: Container-based deployment
- Railway: Modern deployment platform
- DigitalOcean: VPS hosting

## API Endpoints

### Authentication
- **POST** `/auth/register` - User registration with role selection
- **POST** `/auth/login` - User authentication
- **POST** `/auth/logout` - User session termination

### Challenge Management
- **GET** `/challenges` - Retrieve all open challenges
- **POST** `/challenges` - Create new challenge (Client only)
- **GET** `/challenges/:id` - Get specific challenge details
- **PUT** `/challenges/:id/status` - Update challenge status

### Bidding System
- **GET** `/challenges/:id/bids` - View all bids for a challenge
- **POST** `/challenges/:id/bids` - Submit new bid (Consultant only)
- **PUT** `/bids/:id/select` - Select winning bid (Client only)

### Real-time Communication
- **WebSocket** `/socket.io/` - Real-time chat connection
- **POST** `/chat/:projectId/messages` - Send chat message
- **GET** `/chat/:projectId/messages` - Retrieve chat history

### User Management
- **GET** `/profile` - Get user profile information
- **PUT** `/profile` - Update user profile
- **GET** `/profile/alias` - Get user alias

## Development

### Project Structure
**Frontend Architecture**: Single-page application with component-based architecture
**Backend Architecture**: RESTful API with WebSocket support for real-time features
**Data Flow**: Client-side storage with Firebase synchronization for chat
**Security**: Firebase authentication with role-based access control

### Key Components

**Authentication System**: Firebase-based user management with role differentiation
**Challenge Management**: CRUD operations for healthcare consulting challenges
**Bidding Interface**: Anonymous bidding system with proposal management
**Real-time Chat**: Socket.io powered communication with message persistence
**Profile Management**: User alias customization and role-based permissions
**Responsive UI**: Mobile-optimized interface with modern design patterns

### Data Models

**Challenge Model**:
```javascript
{
  id: Number,
  title: String,
  description: String,
  budget: Number,
  deadline: Date,
  status: String, // "Open" | "Closed"
  createdBy: String // Client alias
}
```

**Bid Model**:
```javascript
{
  id: Number,
  challengeId: Number,
  submittedBy: String, // Consultant alias
  proposalText: String,
  amount: Number,
  eta: String,
  timestamp: Date
}
```

**User Model**:
```javascript
{
  uid: String, // Firebase UID
  email: String,
  role: String, // "client" | "consultant"
  alias: String,
  displayName: String
}
```

## Testing

The application includes comprehensive testing coverage:

**Manual Testing**: Complete user flow testing for all features
**Cross-browser Compatibility**: Chrome, Firefox, Safari, Edge
**Mobile Responsiveness**: iOS and Android browser testing
**Authentication Testing**: Login/logout flows and role-based access
**Real-time Features**: Chat functionality and WebSocket connections
**Data Validation**: Input sanitization and error handling

## Security

**Firebase Authentication**: Secure user management with email/password
**Role-based Access Control**: Granular permissions for clients and consultants
**Input Validation**: Client and server-side data validation
**CORS Configuration**: Secure cross-origin requests
**Data Isolation**: User-specific data storage and access
**Anonymous Bidding**: Privacy protection for consultant identities

## Performance

**Optimized Loading**: Minimal dependencies and efficient code splitting
**Responsive Design**: Fast rendering across all devices
**Real-time Updates**: Efficient WebSocket communication
**Data Caching**: LocalStorage for improved performance
**Component Optimization**: React best practices for rendering efficiency

## Future Enhancements

**Database Integration**: PostgreSQL for production data storage
**Advanced Analytics**: Challenge and bid analytics dashboard
**Mobile App**: Native iOS and Android applications
**Payment Integration**: Stripe/PayPal for secure transactions
**Document Management**: File upload and sharing capabilities
**Notification System**: Email and push notifications
**Rating System**: Consultant and client feedback mechanisms
**Advanced Search**: Filtering and search capabilities
**API Documentation**: Swagger/OpenAPI documentation
**Docker Support**: Containerization for easy deployment

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow React best practices and component patterns
- Maintain consistent code formatting
- Write comprehensive tests for new features
- Update documentation for API changes
- Ensure mobile responsiveness for UI changes

## Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation for common solutions

---

**DecentraHealth** - Revolutionizing healthcare consulting through decentralized, transparent, and secure collaboration.
