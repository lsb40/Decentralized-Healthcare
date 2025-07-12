// src/ChallengeDetail.js
import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function ChallengeDetail({ challenges, bids, alias, role, onSelectWinner, setChallenges }) {
  const { id } = useParams();
  const challengeId = Number(id);
  const challenge = challenges.find((ch) => ch.id === challengeId);
  const relatedBids = bids.filter((b) => b.challengeId === challengeId);

  // Track winner id locally if no global state update function is passed
  const [winner, setWinner] = useState(challenge?.winner || null);

  if (!challenge) return <p>Challenge not found.</p>;

  const handleSelectWinner = (bid) => {
    if (onSelectWinner) {
      onSelectWinner(challengeId, bid);
    }
    setWinner(bid);
  };

  const handleCloseChallenge = () => {
    const updatedChallenges = challenges.map(ch =>
      ch.id === challenge.id ? { ...ch, status: "Closed" } : ch
    );
    setChallenges(updatedChallenges);
    localStorage.setItem("challenges", JSON.stringify(updatedChallenges));
  };

  return (
    <div className="container card">
      <h2>{challenge.title}</h2>
      <p>{challenge.description}</p>
      <p><strong>Status:</strong> {challenge.status}</p>
      <p><strong>Budget:</strong> ${challenge.budget}</p>
      <p><strong>Deadline:</strong> {challenge.deadline}</p>

      {role === "client" && challenge.status === "Open" && (
        <button onClick={handleCloseChallenge} style={{ marginBottom: "20px" }}>
          Close Challenge
        </button>
      )}

      <h3>Bids</h3>
      {relatedBids.length === 0 ? (
        <p>No bids yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {relatedBids.map((bid, i) => (
            <li key={i} className="card" style={{ marginBottom: "10px" }}>
              <p><strong>{bid.submittedBy}</strong></p>
              <p>{bid.proposalText}</p>
              <p>Amount: ${bid.amount} — ETA: {bid.eta}</p>
              <p><em>{bid.timestamp}</em></p>
              {role === "client" && !winner && (
                <button onClick={() => handleSelectWinner(bid)}>Select as Winner</button>
              )}
              {winner && winner === bid && (
                <p style={{ color: "green", fontWeight: "bold" }}>Winner!</p>
              )}
            </li>
          ))}
        </ul>
      )}

      {winner && (
        <div style={{ marginTop: "20px" }}>
          <h3>Winner Information</h3>
          <p><strong>{winner.submittedBy}</strong></p>
          <p>Amount: ${winner.amount}</p>
          <p>ETA: {winner.eta}</p>
          <p>{winner.proposalText}</p>
        </div>
      )}
    </div>
  );
}
