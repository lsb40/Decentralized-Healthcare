import React, { useEffect, useRef, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export default function Chat({ projectId, alias }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const q = query(
      collection(db, "chats", String(projectId), "messages"),
      orderBy("timestamp")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() });
      });
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, [projectId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    await addDoc(collection(db, "chats", String(projectId), "messages"), {
      sender: alias,
      text: input.trim(),
      timestamp: serverTimestamp(),
    });
    setInput("");
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="container card" style={{ maxWidth: 600 }}>
      <h2>Chat (Project {projectId})</h2>
      <div
        style={{
          height: 300,
          border: "1px solid #ccc",
          padding: 10,
          overflowY: "auto",
          marginBottom: 10,
          backgroundColor: "#fafafa",
        }}
      >
        {messages.length === 0 && <p>No messages yet.</p>}
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              marginBottom: 10,
              padding: 8,
              borderRadius: 8,
              backgroundColor: msg.sender === alias ? "#d1e7dd" : "#f8d7da",
              alignSelf: msg.sender === alias ? "flex-end" : "flex-start",
              maxWidth: "80%",
            }}
          >
            <strong>{msg.sender}</strong>{" "}
            <small>({formatTime(msg.timestamp)})</small>
            <p style={{ margin: "4px 0 0" }}>{msg.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ display: "flex" }}>
        <input
          type="text"
          value={input}
          placeholder="Type your message..."
          onChange={(e) => setInput(e.target.value)}
          style={{ flexGrow: 1, padding: "8px" }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <button onClick={handleSend} style={{ marginLeft: 8 }}>
          Send
        </button>
      </div>
    </div>
  );
}
