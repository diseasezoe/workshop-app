"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#F2F2F2" }}
    >
      <div
        className="w-full max-w-sm p-10 flex flex-col gap-6"
        style={{ background: "#FAF5EC", border: "1px solid #D8D8D8", borderRadius: "20px" }}
      >
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#D2452D" }}>
            Workshop
          </span>
          <h1 className="text-2xl font-extrabold mt-1" style={{ color: "#1F1F1F" }}>
            CzechCrunch Future 2026
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Heslo"
            autoFocus
            className="w-full px-4 py-3 text-sm font-medium outline-none"
            style={{
              background: "#FFFFFF",
              border: `1px solid ${error ? "#D2452D" : "#D8D8D8"}`,
              borderRadius: "12px",
              color: "#1F1F1F",
            }}
          />
          {error && (
            <p className="text-xs font-semibold" style={{ color: "#D2452D" }}>
              Špatné heslo
            </p>
          )}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 text-sm font-bold uppercase tracking-widest transition-opacity disabled:opacity-40"
            style={{ background: "#D2452D", color: "#FFFFFF", borderRadius: "12px" }}
          >
            {loading ? "..." : "Vstoupit"}
          </button>
        </form>
      </div>
    </div>
  );
}
