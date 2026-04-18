"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { castVote, useVotes, useCurrentLevel } from "../lib/use-votes";
import { workshopTopics, Topic } from "../lib/workshop-data";

const SESSION_ID = "future-2026";

function VoteButton({ topic, voted, onVote, count }: { topic: Topic; voted: boolean; onVote: () => void; count: number }) {
  return (
    <button
      onClick={onVote}
      disabled={voted}
      className={`w-full p-5 rounded-2xl border transition-all active:scale-[0.98] ${
        voted
          ? "border-transparent opacity-60"
          : "border-[var(--border)] hover:border-transparent active:border-transparent"
      }`}
      style={{
        background: voted
          ? `linear-gradient(135deg, ${topic.color}22, ${topic.color}11)`
          : "var(--bg-card)",
        borderColor: voted ? topic.color : undefined,
      }}
    >
      <div className="flex items-center gap-4">
        <span className="text-3xl">{topic.icon}</span>
        <div className="flex-1 text-left">
          <h3 className="text-lg font-bold" style={{ color: voted ? topic.color : "var(--text-primary)" }}>
            {topic.title}
          </h3>
          <p className="text-sm text-text-muted mt-0.5">{topic.subtitle}</p>
        </div>
        {voted && (
          <div className="flex items-center gap-1" style={{ color: topic.color }}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
    </button>
  );
}

export default function VotePage() {
  const votes = useVotes(SESSION_ID);
  const currentLevel = useCurrentLevel(SESSION_ID);
  const [votedFor, setVotedFor] = useState<string | null>(null);
  const [prevLevel, setPrevLevel] = useState<string>("root");

  // Reset vote when presenter changes level
  useEffect(() => {
    if (currentLevel !== prevLevel) {
      setVotedFor(null);
      setPrevLevel(currentLevel);
    }
  }, [currentLevel, prevLevel]);

  const parentTopic = currentLevel !== "root"
    ? workshopTopics.find((t) => t.id === currentLevel)
    : null;

  const currentTopics = parentTopic?.subtopics || workshopTopics;

  const handleVote = async (topicId: string) => {
    if (votedFor) return;
    setVotedFor(topicId);
    await castVote(SESSION_ID, topicId);
  };

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      {/* Header */}
      <header className="px-5 py-4 border-b border-border">
        <h1 className="text-lg font-bold text-text-primary">
          Jak reálně používáme AI
        </h1>
        <p className="text-text-muted text-xs">
          CzechCrunch Future 2026
        </p>
      </header>

      {/* Voting area */}
      <div className="flex-1 p-5 flex flex-col">
        {parentTopic && (
          <div className="mb-4 pb-4 border-b border-border">
            <span className="text-2xl">{parentTopic.icon}</span>
            <h2 className="text-xl font-bold text-text-primary mt-1">{parentTopic.title}</h2>
          </div>
        )}

        <p className="text-text-secondary text-sm mb-5">
          {votedFor ? "Díky za hlas! Čekejte na další kolo." : "Vyberte téma, které vás zajímá:"}
        </p>

        <div className="space-y-3 flex-1">
          {currentTopics.map((topic) => (
            <VoteButton
              key={topic.id}
              topic={topic}
              voted={votedFor === topic.id}
              onVote={() => handleVote(topic.id)}
              count={votes[topic.id] || 0}
            />
          ))}
        </div>

        {votedFor && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-secondary border border-border">
              <div className="w-2 h-2 rounded-full bg-accent-green" style={{ animation: "pulse-glow 2s infinite" }} />
              <span className="text-text-muted text-sm">Sledujte výsledky na obrazovce</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
