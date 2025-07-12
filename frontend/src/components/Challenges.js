import React from "react";

const mockChallenges = [
  { id: 1, title: "Reduce Hospital Wait Times", description: "Develop a solution to reduce wait times in ER.", budget: 5000 },
  { id: 2, title: "Improve Patient Records Privacy", description: "Create an encrypted records system.", budget: 8000 },
  { id: 3, title: "Optimize Appointment Scheduling", description: "Build a smart scheduling tool.", budget: 4000 },
];

export default function Challenges() {
  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Open Challenges</h2>
      <ul>
        {mockChallenges.map((ch) => (
          <li key={ch.id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10, borderRadius: 5 }}>
            <h3>{ch.title}</h3>
            <p>{ch.description}</p>
            <p><strong>Budget:</strong> ${ch.budget}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
