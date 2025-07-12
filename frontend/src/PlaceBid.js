// src/PlaceBid.js
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PlaceBid({ challenges, onPlaceBid, alias }) {
  const { id } = useParams();
  const challengeId = Number(id);
  const challenge = challenges.find((ch) => ch.id === challengeId);

  const [proposalText, setProposalText] = useState("");
  const [amount, setAmount] = useState("");
  const [eta, setEta] = useState("");
  const navigate = useNavigate();

  if (!challenge) return <p>Challenge not found.</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    const timestamp = new Date().toLocaleString(); // Add current date/time string
    onPlaceBid({ challengeId, submittedBy: alias, proposalText, amount, eta, timestamp });
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
