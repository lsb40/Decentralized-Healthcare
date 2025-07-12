import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: 10, borderBottom: "1px solid #ccc", marginBottom: 20 }}>
      <Link to="/" style={{ marginRight: 20 }}>
        Home
      </Link>
      <Link to="/challenges">Challenges</Link>
    </nav>
  );
}
