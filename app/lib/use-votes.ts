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
  const nonceRef = ref(db, `sessions/${sessionId}/resetNonce`);
  await set(votesRef, null);
  await set(nonceRef, Date.now());
}

export function useResetNonce(sessionId: string) {
  const [nonce, setNonce] = useState<number>(0);

  useEffect(() => {
    const db = getDb();
    const nonceRef = ref(db, `sessions/${sessionId}/resetNonce`);
    const unsubscribe = onValue(nonceRef, (snapshot) => {
      setNonce(snapshot.val() || 0);
    });
    return () => unsubscribe();
  }, [sessionId]);

  return nonce;
}

export type SlideOverride = Partial<{
  title: string;
  body: string;
  kicker: string;
  quote: string;
  quoteAuthor: string;
  bullets: string[];
}>;

export type SlideOverrideMap = Record<string, SlideOverride>;

export function useSlideOverrides(sessionId: string) {
  const [overrides, setOverrides] = useState<SlideOverrideMap>({});

  useEffect(() => {
    const db = getDb();
    const r = ref(db, `sessions/${sessionId}/slideOverrides`);
    const unsub = onValue(r, (snap) => {
      setOverrides(snap.val() || {});
    });
    return () => unsub();
  }, [sessionId]);

  return overrides;
}

export async function saveSlideOverrideField(
  sessionId: string,
  slideKey: string,
  field: keyof SlideOverride,
  value: string | string[] | null
) {
  const db = getDb();
  const r = ref(db, `sessions/${sessionId}/slideOverrides/${slideKey}/${field}`);
  if (value === null || value === "") {
    await set(r, null);
  } else {
    await set(r, value);
  }
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
