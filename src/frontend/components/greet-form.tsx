"use client";

import { useState } from "react";

export function GreetForm() {
  const [name, setName] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGreet = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/greet?name=${encodeURIComponent(name)}`);
      const data = await res.json();
      setResult(data.message || data.error || "");
    } catch (err) {
      setResult("Error fetching greeting");
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-semibold text-zinc-950">Greeting Form</h1>
      
      <div className="mt-6 flex flex-col gap-4">
        <label htmlFor="name-input" className="text-sm font-medium text-zinc-700">
          Your Name
        </label>
        <input
          id="name-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-zinc-950 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={handleGreet}
          disabled={loading}
          className="inline-flex justify-center rounded-full bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Get greeting"}
        </button>
      </div>

      {result && (
        <p className="mt-6 text-base text-zinc-800" data-testid="greet-result">
          {result}
        </p>
      )}
    </article>
  );
}