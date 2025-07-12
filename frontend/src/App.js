// src/App.js

import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";

import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import Chat from "./Chat"; // your Chat component
import Profile from "./Profile"; // new Profile component
import { generateAlias } from "./utils"; // new utils file
import "./App.css";
import ChallengeDetail from "./ChallengeDetail";


function Home({ loggedIn, alias, role, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("consultant");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      let userCredential;
      if (isRegistering) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      const user = userCredential.user;
      onLogin(user.uid, selectedRole);
      localStorage.setItem("userRole", selectedRole);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!loggedIn) {
    return (
      <div className="container card">
        <h1>{isRegistering ? "Register" : "Login"}</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="consultant">Consultant</option>
            <option value="client">Client</option>
          </select>
          <button type="submit">{isRegistering ? "Register" : "Login"}</button>
        </form>
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          style={{ marginTop: 10 }}
        >
          {isRegistering
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ textAlign: "center", marginTop: 40 }}>
      <h2>Welcome, {alias}!</h2>
      <p>
        You are logged in as a <strong>{role}</strong>.
      </p>
    </div>
  );
}

function Navbar({ loggedIn, role, onLogout }) {
  return (
    <nav>
      <Link to="/">Home</Link>
      {loggedIn && role === "client" && <Link to="/create-challenge">Post Challenge</Link>}
      {loggedIn && <Link to="/challenges">Challenges</Link>}
      {loggedIn && <Link to="/profile">Profile</Link>}
      {loggedIn && (
        <button onClick={onLogout} style={{ marginLeft: 10 }}>
          Logout
        </button>
      )}
    </nav>
  );
}

function RequireRole({ loggedIn, role, allowedRoles, children }) {
  if (!loggedIn) {
    return <Navigate to="/" />;
  }
  if (!allowedRoles.includes(role)) {
    return (
      <p style={{ padding: 20, color: "red" }}>
        Access denied. You do not have permission to view this page.
      </p>
    );
  }
  return children;
}

function Challenges({ challenges, role, alias, bids }) {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Open Challenges</h2>
      {challenges.length === 0 && <p>No challenges posted yet.</p>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {challenges.map((ch) => (
          <li key={ch.id} className="card">
            <Link to={`/challenge/${ch.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <h3>{ch.title}</h3>
            </Link>

            <p>{ch.description}</p>
            <p><strong>Status:</strong> {ch.status}</p>
            <p>
              <strong>Budget:</strong> ${ch.budget}
            </p>
            <p>
              <strong>Deadline:</strong> {ch.deadline}
            </p>
            <p>
              <strong>Bids:</strong> {bids.filter((b) => b.challengeId === ch.id).length}
            </p>

            {role === "consultant" && (
              <>
                <button onClick={() => navigate(`/challenges/${ch.id}/bid`)}>
                  Place a Bid
                </button>
                <button
                  style={{ marginLeft: 8 }}
                  onClick={() => navigate(`/challenges/${ch.id}/chat`)}
                >
                  Chat
                </button>
              </>
            )}

            {role === "client" && (
              <>
                <button onClick={() => navigate(`/challenges/${ch.id}/bids`)}>
                  View Bids
                </button>
                <button
                  style={{ marginLeft: 8 }}
                  onClick={() => navigate(`/challenges/${ch.id}/chat`)}
                >
                  Chat
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CreateChallenge({ onAddChallenge }) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [budget, setBudget] = React.useState("");
  const [deadline, setDeadline] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddChallenge({ title, description, budget, deadline, status: "Open" });
    navigate("/challenges");
  };
   

  return (
    <div className="container card">
      <h2>Post a New Challenge</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <input
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          type="number"
          value={budget}
          required
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Budget"
        />
        <input
          type="date"
          value={deadline}
          required
          onChange={(e) => setDeadline(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function PlaceBid({ challenges, onPlaceBid, alias }) {
  const { id } = useParams();
  const challengeId = Number(id);
  const challenge = challenges.find((ch) => ch.id === challengeId);
  const [proposalText, setProposalText] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [eta, setEta] = React.useState("");
  const navigate = useNavigate();

  if (!challenge) return <p>Challenge not found.</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    onPlaceBid({ challengeId, submittedBy: alias, proposalText, amount, eta });
    navigate("/challenges");
  };

  return (
    <div className="container card">
      <h2>Bid on: {challenge.title}</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <textarea
          value={proposalText}
          onChange={(e) => setProposalText(e.target.value)}
          required
          placeholder="Proposal"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          placeholder="Amount (USD)"
        />
        <input
          value={eta}
          onChange={(e) => setEta(e.target.value)}
          required
          placeholder="ETA (e.g., 2 weeks)"
        />
        <button type="submit">Submit Bid</button>
      </form>
    </div>
  );
}

function ViewBids({ bids, challenges }) {
  const { id } = useParams();
  const challengeId = Number(id);
  const challenge = challenges.find((ch) => ch.id === challengeId);
  const relatedBids = bids.filter((b) => b.challengeId === challengeId);

  if (!challenge) return <p>Challenge not found.</p>;

  return (
    <div className="container">
      <h2>Bids for: {challenge.title}</h2>
      {relatedBids.length === 0 ? (
        <p>No bids yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {relatedBids.map((bid, i) => (
            <li key={i} className="card">
              <p><strong>{bid.submittedBy}</strong></p>
              <p>{bid.proposalText}</p>
              <p>
                Amount: ${bid.amount} — ETA: {bid.eta}
              </p>
              <p><em>{bid.timestamp}</em></p>  {/* Add this line here */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [alias, setAlias] = useState("");
  const [role, setRole] = useState("");

  const [challenges, setChallenges] = useState(() =>
    JSON.parse(localStorage.getItem("challenges") || "[]")
  );
  const [bids, setBids] = useState(() =>
    JSON.parse(localStorage.getItem("bids") || "[]")
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const storedRole = localStorage.getItem("userRole");
        let storedAlias = localStorage.getItem("userAlias");
        if (!storedAlias && storedRole) {
          storedAlias = generateAlias(storedRole);
          localStorage.setItem("userAlias", storedAlias);
        }
        setAlias(storedAlias || user.uid);
        if (storedRole) setRole(storedRole);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
        setAlias("");
        setRole("");
        localStorage.removeItem("userAlias");
        localStorage.removeItem("userRole");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = (userId, role) => {
    let storedAlias = localStorage.getItem("userAlias");
    if (!storedAlias) {
      storedAlias = generateAlias(role);
      localStorage.setItem("userAlias", storedAlias);
    }
    setAlias(storedAlias);
    setRole(role);
    setLoggedIn(true);
    localStorage.setItem("userRole", role);
  };

  const handleLogout = () => {
    signOut(auth);
    setAlias("");
    setRole("");
    setLoggedIn(false);
    localStorage.removeItem("userAlias");
    localStorage.removeItem("userRole");
  };

  const handleAddChallenge = (challenge) => {
    const newChallenge = { ...challenge, id: challenges.length + 1 };
    const updated = [...challenges, newChallenge];
    setChallenges(updated);
    localStorage.setItem("challenges", JSON.stringify(updated));
  };

  
  const handlePlaceBid = (bid) => {
    const bidWithTimestamp = { ...bid, timestamp: new Date().toLocaleString() };
    const updated = [...bids, bidWithTimestamp];
    setBids(updated);
    localStorage.setItem("bids", JSON.stringify(updated));
  };
  

  return (
    <Router>
      <Navbar loggedIn={loggedIn} role={role} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              loggedIn={loggedIn}
              alias={alias}
              role={role}
              onLogin={handleLogin}
            />
          }
        />
        <Route
          path="/challenges"
          element={
            <RequireRole
              loggedIn={loggedIn}
              role={role}
              allowedRoles={["client", "consultant"]}
            >
              <Challenges
                challenges={challenges}
                role={role}
                alias={alias}
                bids={bids}
              />
            </RequireRole>
          }
        />
        <Route
          path="/create-challenge"
          element={
            <RequireRole loggedIn={loggedIn} role={role} allowedRoles={["client"]}>
              <CreateChallenge onAddChallenge={handleAddChallenge} />
            </RequireRole>
          }
        />
        <Route
          path="/challenges/:id/bid"
          element={
            <RequireRole
              loggedIn={loggedIn}
              role={role}
              allowedRoles={["consultant"]}
            >
              <PlaceBid
                challenges={challenges}
                onPlaceBid={handlePlaceBid}
                alias={alias}
              />
            </RequireRole>
          }
        />
        <Route
          path="/challenges/:id/bids"
          element={
            <RequireRole loggedIn={loggedIn} role={role} allowedRoles={["client"]}>
              <ViewBids bids={bids} challenges={challenges} />
            </RequireRole>
          }
        />
        <Route
          path="/challenges/:id/chat"
          element={
            <RequireRole
              loggedIn={loggedIn}
              role={role}
              allowedRoles={["client", "consultant"]}
            >
              <Chat projectId={Number(useParams().id)} alias={alias} />
            </RequireRole>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireRole
              loggedIn={loggedIn}
              role={role}
              allowedRoles={["client", "consultant"]}
            >
              <Profile alias={alias} role={role} onLogout={handleLogout} />
            </RequireRole>
          }
        />
        <Route
          path="/challenge/:id"
          element={
            <RequireRole loggedIn={loggedIn} role={role} allowedRoles={["client", "consultant"]}>
              <ChallengeDetail
                challenges={challenges}
                bids={bids}
                alias={alias}
                role={role}
                setChallenges={setChallenges}
              />
            </RequireRole>
          }
        />
      </Routes>
    </Router>
  );
}