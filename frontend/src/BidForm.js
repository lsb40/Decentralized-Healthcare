import React, { useState } from "react";

export default function BidForm({ challengeId, onSubmitBid }) {
  const [amount, setAmount] = useState("");
  const [proposal, setProposal] = useState("");
  const [eta, setEta] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !proposal || !eta) return alert("Fill out all fields!");
    onSubmitBid({ amount, proposal, eta });
    setAmount("");
    setProposal("");
    setEta("");
  };

  return (
    <form onSubmit={handleSubmit} className="card" style={{ padding: 16, marginTop: 16 }}>
      <h3>Submit a Bid</h3>
      <input
        type="number"
        placeholder="Bid Amount ($)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ display: "block", marginBottom: 8, width: "100%" }}
      />
      <textarea
        placeholder="Proposal text"
        value={proposal}
        onChange={(e) => setProposal(e.target.value)}
        style={{ display: "block", marginBottom: 8, width: "100%" }}
        rows={3}
      />
      <input
        type="text"
        placeholder="ETA (e.g. 5 days)"
        value={eta}
        onChange={(e) => setEta(e.target.value)}
        style={{ display: "block", marginBottom: 8, width: "100%" }}
      />
      <button type="submit">Submit Bid</button>
    </form>
  );
}
