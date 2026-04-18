"use client";

import { useState, useEffect } from "react";
import { useVotes, resetVotes, navigateToLevel, useCurrentLevel } from "./lib/use-votes";
import { workshopTopics, Topic } from "./lib/workshop-data";
import { QRCodeSVG } from "qrcode.react";

const SESSION_ID = "future-2026";

function TopicCard({ topic, count, total, index, onClick }: {
  topic: Topic;
  count: number;
  total: number;
  index: number;
  onClick: () => void;
}) {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <button
      onClick={onClick}
      className="animate-slide-up w-full text-left rounded-2xl p-6 border-2 transition-all hover:scale-[1.02] active:scale-[0.98] card-shadow hover:card-shadow-hover cursor-pointer"
      style={{
        animationDelay: `${index * 0.1}s`,
        background: topic.bgColor,
        borderColor: topic.borderColor,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-4xl animate-float" style={{ animationDelay: `${index * 0.5}s` }}>{topic.icon}</span>
        <div
          className="px-3 py-1 rounded-full text-sm font-bold text-white"
          style={{ background: topic.color }}
        >
          {percentage.toFixed(0)}%
        </div>
      </div>

      <h3 className="text-xl font-bold text-text-primary mb-1">{topic.title}</h3>
      <p className="text-sm text-text-muted mb-4">{topic.subtitle}</p>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: `${topic.borderColor}88` }}>
          <div
            className="vote-bar h-full rounded-full"
            style={{
              width: `${percentage}%`,
              background: topic.color,
            }}
          />
        </div>
        <span className="text-lg font-bold animate-count" key={count} style={{ color: topic.color }}>
          {count}
        </span>
      </div>
    </button>
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
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {selectedTopic && (
            <button
              onClick={handleBack}
              className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center card-shadow hover:card-shadow-hover transition-all text-text-muted hover:text-text-primary"
            >
              ←
            </button>
          )}
          <div>
            <h1 className="text-2xl font-bold text-text-primary">
              Jak reálně používáme AI
            </h1>
            <p className="text-text-muted text-sm">
              Denisa & Matyáš — CzechCrunch Future 2026
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-border card-shadow">
            <div className="w-2 h-2 rounded-full bg-accent-green" style={{ animation: "pulse-glow 2s infinite" }} />
            <span className="text-text-secondary text-sm font-semibold">{totalVotes} hlasů</span>
          </div>
          <button
            onClick={handleReset}
            className="px-4 py-2.5 rounded-xl bg-white border border-border text-text-muted hover:text-accent-red hover:border-red-200 transition-all text-sm card-shadow"
          >
            Reset
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex gap-6 px-8 pb-8" style={{ height: "calc(100vh - 80px)" }}>
        {/* Left: voting cards */}
        <div className="flex-1 flex flex-col justify-center">
          {selectedTopic && (
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-3xl">{selectedTopic.icon}</span>
                <h2 className="text-3xl font-bold text-text-primary">{selectedTopic.title}</h2>
              </div>
              <p className="text-text-muted ml-12">{selectedTopic.subtitle}</p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-5">
            {currentTopics.map((topic, i) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                count={votes[topic.id] || 0}
                total={totalVotes}
                index={i}
                onClick={() => handleSelectTopic(topic)}
              />
            ))}
          </div>
        </div>

        {/* Right: QR sidebar */}
        <div className="w-72 flex flex-col items-center justify-center">
          <div className="bg-white rounded-2xl border border-border p-6 card-shadow flex flex-col items-center">
            <p className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-4">Hlasujte zde</p>
            {voteUrl && (
              <div className="bg-bg-primary p-3 rounded-xl">
                <QRCodeSVG value={voteUrl} size={180} />
              </div>
            )}
            <p className="text-text-muted text-xs mt-4 text-center leading-relaxed">
              Naskenujte QR kód<br />a vyberte téma
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
