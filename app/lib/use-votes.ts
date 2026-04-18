"use client";

import { useEffect, useState } from "react";
import { getDb } from "./firebase";
import { ref, onValue, runTransaction, set } from "firebase/database";

export interface VoteState {
  [topicId: string]: number;
}

export function useVotes(sessionId: string) {
  const [votes, setVotes] = useState<VoteState>({});

  useEffect(() => {
    const db = getDb();
    const votesRef = ref(db, `sessions/${sessionId}/votes`);
    const unsubscribe = onValue(votesRef, (snapshot) => {
      const data = snapshot.val();
      setVotes(data || {});
    });
    return () => unsubscribe();
  }, [sessionId]);

  return votes;
}

export async function castVote(sessionId: string, topicId: string) {
  const db = getDb();
  const voteRef = ref(db, `sessions/${sessionId}/votes/${topicId}`);
  await runTransaction(voteRef, (current) => (current || 0) + 1);
}

export async function resetVotes(sessionId: string) {
  const db = getDb();
  const votesRef = ref(db, `sessions/${sessionId}/votes`);
  await set(votesRef, null);
}

export function useCurrentLevel(sessionId: string) {
  const [currentLevel, setCurrentLevel] = useState<string>("root");

  useEffect(() => {
    const db = getDb();
    const levelRef = ref(db, `sessions/${sessionId}/currentLevel`);
    const unsubscribe = onValue(levelRef, (snapshot) => {
      setCurrentLevel(snapshot.val() || "root");
    });
    return () => unsubscribe();
  }, [sessionId]);

  return currentLevel;
}

export async function navigateToLevel(sessionId: string, level: string) {
  const db = getDb();
  const levelRef = ref(db, `sessions/${sessionId}/currentLevel`);
  await set(levelRef, level);
}
