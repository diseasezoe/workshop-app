"use client";

import { useState, useEffect } from "react";
import { castVote, useVotes, useCurrentLevel } from "../lib/use-votes";
import { workshopTopics, Topic } from "../lib/workshop-data";

const SESSION_ID = "future-2026";

function VoteButton({ topic, voted, onVote }: { topic: Topic; voted: boolean; onVote: () => void }) {
  return (
    <button
      onClick={onVote}
      disabled={voted}
      className={`w-full p-5 rounded-2xl border-2 transition-all active:scale-[0.97] card-shadow ${
        voted ? "scale-[0.98]" : "hover:scale-[1.01] hover:card-shadow-hover"
      }`}
      style={{
        background: topic.bgColor,
        borderColor: voted ? topic.color : topic.borderColor,
      }}
    >
      <div className="flex items-center gap-4">
        <span className="text-3xl">{topic.icon}</span>
        <div className="flex-1 text-left">
          <h3 className="text-base font-bold" style={{ color: topic.color }}>
            {topic.title}
          </h3>
          <p className="text-xs text-text-muted mt-0.5">{topic.subtitle}</p>
        </div>
        {voted && (
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white"
            style={{ background: topic.color }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
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
      <header className="px-5 py-4 bg-white border-b border-border">
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
          <div className="mb-4 pb-4 border-b border-border flex items-center gap-3">
            <span className="text-2xl">{parentTopic.icon}</span>
            <div>
              <h2 className="text-lg font-bold text-text-primary">{parentTopic.title}</h2>
              <p className="text-xs text-text-muted">{parentTopic.subtitle}</p>
            </div>
          </div>
        )}

        <p className="text-text-secondary text-sm mb-4 font-medium">
          {votedFor ? "✨ Díky za hlas!" : "Vyberte téma, které vás zajímá:"}
        </p>

        <div className="space-y-3 flex-1">
          {currentTopics.map((topic) => (
            <VoteButton
              key={topic.id}
              topic={topic}
              voted={votedFor === topic.id}
              onVote={() => handleVote(topic.id)}
            />
          ))}
        </div>

        {votedFor && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-border card-shadow">
              <div className="w-2 h-2 rounded-full bg-accent-green" style={{ animation: "pulse-glow 2s infinite" }} />
              <span className="text-text-muted text-sm">Sledujte výsledky na obrazovce</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
