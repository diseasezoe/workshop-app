"use client";

import { useState, useEffect } from "react";
import { castVote, useCurrentLevel, useResetNonce } from "../lib/use-votes";
import { workshopTopics, Topic } from "../lib/workshop-data";

const SESSION_ID = "future-2026";

function VoteButton({ topic, index, voted, disabled, onVote }: {
  topic: Topic;
  index: number;
  voted: boolean;
  disabled: boolean;
  onVote: () => void;
}) {
  return (
    <button
      onClick={onVote}
      disabled={disabled}
      className={`w-full p-6 transition-all active:scale-[0.98] text-left ${
        voted ? "" : disabled ? "opacity-40" : "hover:-translate-y-0.5"
      }`}
      style={{
        background: voted ? topic.accent : "#F0F0F6",
        border: `1px solid ${voted ? topic.accent : "#D0D0D9"}`,
        borderRadius: "20px",
      }}
    >
      <div className="flex items-center gap-4">
        <span
          className="text-xs font-bold uppercase tracking-widest shrink-0"
          style={{ color: voted ? "rgba(255,255,255,0.75)" : topic.accent }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex-1">
          <h3
            className="text-base font-extrabold tracking-display leading-tight mb-1"
            style={{ color: voted ? "#FFFFFF" : "#1F1F1F" }}
          >
            {topic.title}
          </h3>
          <p
            className="text-xs leading-snug"
            style={{ color: voted ? "rgba(255,255,255,0.85)" : "#85859C" }}
          >
            {topic.subtitle}
          </p>
        </div>
        {voted && (
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "#FFFFFF" }}
          >
            <svg className="w-4 h-4" fill="none" stroke={topic.accent} strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
    </button>
  );
}

export default function VotePage() {
  const currentLevel = useCurrentLevel(SESSION_ID);
  const resetNonce = useResetNonce(SESSION_ID);
  const [votedFor, setVotedFor] = useState<string | null>(null);

  const storageKey = (level: string, nonce: number) =>
    `vote-${SESSION_ID}-${level}-${nonce}`;

  useEffect(() => {
    const stored = localStorage.getItem(storageKey(currentLevel, resetNonce));
    setVotedFor(stored);
  }, [currentLevel, resetNonce]);

  const activeTopic = currentLevel !== "root"
    ? workshopTopics.find((t) => t.id === currentLevel)
    : null;

  const handleVote = async (topicId: string) => {
    if (votedFor) return;
    setVotedFor(topicId);
    localStorage.setItem(storageKey(currentLevel, resetNonce), topicId);
    await castVote(SESSION_ID, topicId);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FFFFFF" }}>
      <header className="px-5 py-5" style={{ borderBottom: "1px solid #D0D0D9" }}>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#D42E4D" }}>
            Workshop
          </span>
          <span className="w-0.5 h-0.5 rounded-full" style={{ background: "#85859C" }} />
          <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "#85859C" }}>
            Future 2026
          </span>
        </div>
        <h1 className="text-xl font-extrabold tracking-display leading-tight" style={{ color: "#1F1F1F" }}>
          Jak reálně používáme AI
        </h1>
      </header>

      <div className="flex-1 p-5 flex flex-col">
        {activeTopic ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-5">
            <span
              className="inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 pill"
              style={{
                color: activeTopic.accent,
                background: "#FFFFFF",
                border: `1px solid ${activeTopic.accent}40`,
              }}
            >
              Teď jede téma
            </span>
            <h2
              className="text-3xl font-extrabold tracking-display leading-tight"
              style={{ color: "#1F1F1F" }}
            >
              {activeTopic.title}
            </h2>
            <p className="text-sm leading-snug max-w-xs" style={{ color: "#85859C" }}>
              {activeTopic.subtitle}
            </p>
            <div
              className="inline-flex items-center gap-2.5 px-5 py-3 pill mt-2"
              style={{ border: "1px solid #D0D0D9", background: "#FFFFFF" }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: "#1B9174", animation: "pulse-glow 2s infinite" }}
              />
              <span className="text-sm font-semibold" style={{ color: "#1F1F1F" }}>
                Sleduj prezentaci na obrazovce
              </span>
            </div>
          </div>
        ) : (
          <>
            <p className="text-sm mb-5 font-semibold" style={{ color: "#1F1F1F" }}>
              {votedFor ? "Díky za hlas" : "Vyber téma, které tě zajímá"}
            </p>

            <div className="space-y-3 flex-1">
              {workshopTopics.map((topic, i) => (
                <VoteButton
                  key={topic.id}
                  topic={topic}
                  index={i}
                  voted={votedFor === topic.id}
                  disabled={!!votedFor && votedFor !== topic.id}
                  onVote={() => handleVote(topic.id)}
                />
              ))}
            </div>

            {votedFor && (
              <div className="mt-6 text-center">
                <div
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 pill"
                  style={{ border: "1px solid #D0D0D9", background: "#FFFFFF" }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: "#1B9174", animation: "pulse-glow 2s infinite" }}
                  />
                  <span className="text-sm font-semibold" style={{ color: "#1F1F1F" }}>
                    Sleduj výsledky na obrazovce
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
