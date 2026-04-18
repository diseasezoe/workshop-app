"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useVotes, resetVotes, navigateToLevel, useCurrentLevel } from "./lib/use-votes";
import { workshopTopics, Topic } from "./lib/workshop-data";
import { QRCodeSVG } from "qrcode.react";

const SESSION_ID = "future-2026";

function VoteBar({ topic, count, total, index }: { topic: Topic; count: number; total: number; index: number }) {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <div className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{topic.icon}</span>
          <div>
            <h3 className="text-xl font-bold text-text-primary">{topic.title}</h3>
            <p className="text-sm text-text-muted">{topic.subtitle}</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-3xl font-bold animate-count" key={count} style={{ color: topic.color }}>
            {count}
          </span>
          <span className="text-text-muted text-sm ml-1">hlasů</span>
        </div>
      </div>
      <div className="w-full h-4 bg-bg-secondary rounded-full overflow-hidden border border-border">
        <div
          className="vote-bar h-full rounded-full"
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(90deg, ${topic.color}, ${topic.color}88)`,
          }}
        />
      </div>
    </div>
  );
}

export default function PresenterDashboard() {
  const votes = useVotes(SESSION_ID);
  const currentLevel = useCurrentLevel(SESSION_ID);
  const [voteUrl, setVoteUrl] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  useEffect(() => {
    setVoteUrl(`${window.location.origin}/vote`);
  }, []);

  const currentTopics = selectedTopic?.subtopics || workshopTopics;
  const totalVotes = currentTopics.reduce((sum, t) => sum + (votes[t.id] || 0), 0);

  const handleReset = async () => {
    await resetVotes(SESSION_ID);
  };

  const handleSelectTopic = async (topic: Topic) => {
    if (topic.subtopics && topic.subtopics.length > 0) {
      setSelectedTopic(topic);
      await resetVotes(SESSION_ID);
      await navigateToLevel(SESSION_ID, topic.id);
    }
  };

  const handleBack = async () => {
    setSelectedTopic(null);
    await resetVotes(SESSION_ID);
    await navigateToLevel(SESSION_ID, "root");
  };

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      {/* Header */}
      <header className="px-8 py-6 border-b border-border flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Jak reálně používáme AI
          </h1>
          <p className="text-text-muted text-sm">
            Denisa & Matyáš — CzechCrunch Future 2026
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-secondary border border-border">
            <div className="w-2 h-2 rounded-full bg-accent-green" style={{ animation: "pulse-glow 2s infinite" }} />
            <span className="text-text-secondary text-sm font-medium">{totalVotes} hlasů</span>
          </div>
          {selectedTopic && (
            <button
              onClick={handleBack}
              className="px-4 py-2 rounded-lg bg-bg-secondary border border-border text-text-secondary hover:text-text-primary hover:bg-bg-card-hover transition-colors text-sm"
            >
              ← Zpět
            </button>
          )}
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-lg bg-bg-secondary border border-border text-text-muted hover:text-accent-red hover:border-accent-red/30 transition-colors text-sm"
          >
            Reset
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex">
        {/* Voting results */}
        <div className="flex-1 p-8 flex flex-col justify-center">
          {selectedTopic && (
            <div className="mb-8">
              <span className="text-4xl mb-2 block">{selectedTopic.icon}</span>
              <h2 className="text-3xl font-bold text-text-primary">{selectedTopic.title}</h2>
              <p className="text-text-muted mt-1">{selectedTopic.subtitle}</p>
            </div>
          )}

          <div className="space-y-8 max-w-3xl">
            {currentTopics.map((topic, i) => (
              <button
                key={topic.id}
                onClick={() => handleSelectTopic(topic)}
                className="w-full text-left cursor-pointer hover:opacity-90 transition-opacity"
                disabled={!topic.subtopics || topic.subtopics.length === 0}
              >
                <VoteBar
                  topic={topic}
                  count={votes[topic.id] || 0}
                  total={totalVotes}
                  index={i}
                />
              </button>
            ))}
          </div>
        </div>

        {/* QR Code sidebar */}
        <div className="w-80 border-l border-border flex flex-col items-center justify-center p-8 bg-bg-secondary">
          <p className="text-text-muted text-sm font-medium mb-4 uppercase tracking-wider">Hlasujte</p>
          {voteUrl && (
            <div className="bg-white p-4 rounded-2xl">
              <QRCodeSVG value={voteUrl} size={200} />
            </div>
          )}
          <p className="text-text-muted text-xs mt-4 text-center">
            Naskenujte QR kód<br />a vyberte téma
          </p>
        </div>
      </div>
    </div>
  );
}
