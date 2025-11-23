import { useState } from "react";
import { trpc } from "../trpc/client";

export function Hello() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  async function fetchMessage() {
    const res = await trpc.user.hello.query({ name });
    setMessage(res.message);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>tRPC Test</h2>

      <input
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: "10px" }}
      />

      <button onClick={fetchMessage}>Send</button>

      {message && (
        <p style={{ marginTop: "15px", fontWeight: "bold" }}>{message}</p>
      )}
    </div>
  );
}
