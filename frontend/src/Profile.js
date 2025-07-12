// import React from "react";
// import { auth } from "./firebase";

// export default function Profile({ alias, role, onLogout }) {
//   const user = auth.currentUser;

//   return (
//     <div className="container card">
//       <h2>User Profile</h2>
//       <p><strong>Alias:</strong> {alias}</p>
//       <p><strong>Email:</strong> {user?.email}</p>
//       <p><strong>Role:</strong> {role}</p>
//       <button onClick={onLogout} style={{ marginTop: 20 }}>
//         Logout
//       </button>
//     </div>
//   );
// }


// src/Profile.js
import React, { useState, useEffect } from "react";
import { auth } from "./firebase";

export default function Profile({ alias, role, onLogout }) {
  const [displayName, setDisplayName] = useState(alias || "");
  const [editing, setEditing] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    // On load, try to get displayName from Firebase user profile if available
    if (auth.currentUser && auth.currentUser.displayName) {
      setDisplayName(auth.currentUser.displayName);
    }
  }, []);

  const handleSave = async () => {
    if (!auth.currentUser) return;
    try {
      await auth.currentUser.updateProfile({ displayName });
      setStatusMsg("Profile updated!");
      setEditing(false);
      localStorage.setItem("userAlias", displayName);
    } catch (err) {
      setStatusMsg("Error updating profile: " + err.message);
    }
  };

  return (
    <div className="container card" style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>User Profile</h2>
      <p>
        <strong>Role:</strong> {role}
      </p>

      <label>
        Display Name:
        {editing ? (
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        ) : (
          <span style={{ marginLeft: 8 }}>{displayName}</span>
        )}
      </label>

      <div style={{ marginTop: 15 }}>
        {editing ? (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEditing(false)} style={{ marginLeft: 10 }}>
              Cancel
            </button>
          </>
        ) : (
          <button onClick={() => setEditing(true)}>Edit</button>
        )}
      </div>

      {statusMsg && <p style={{ marginTop: 10 }}>{statusMsg}</p>}

      <button onClick={onLogout} style={{ marginTop: 20 }}>
        Logout
      </button>
    </div>
  );
}
