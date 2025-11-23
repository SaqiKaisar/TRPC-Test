import { useState } from "react";
import { trpc } from "../trpc/client";

export function Hello() {
  const [name, setName] = useState("");
  const [submitEmail, setSubmitEmail] = useState("");
  const [fetchEmail, setFetchEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit() {
    if (!submitEmail) {
      setMessage("Email for submit is empty");
      return;
    }

    const res = await trpc.user.hello.mutate({
      name,
      email: submitEmail,
    });

    setMessage(res.message);
  }

  async function handleFetch() {
    if (!fetchEmail) {
      setMessage("Email for fetch is empty");
      return;
    }

    const res = await trpc.user.fetch.query({ email: fetchEmail });
    setMessage(res.message);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* --- Submit Section --- */}
      <div style={{ padding: "20px" }}>
        <h2>tRPC Test</h2>

        <input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <input
          placeholder="Submit email"
          value={submitEmail}
          onChange={(e) => setSubmitEmail(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <button onClick={handleSubmit}>Send</button>
      </div>

      {/* --- Fetch Section --- */}
      <div style={{ padding: "20px" }}>
        <input
          placeholder="Fetch email"
          value={fetchEmail}
          onChange={(e) => setFetchEmail(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <button onClick={handleFetch}>Fetch</button>
      </div>

      {message && (
        <p
          style={{
            marginTop: "15px",
            fontWeight: "bold",
            marginLeft: "20px",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
