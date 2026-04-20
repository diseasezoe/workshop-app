"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  useVotes,
  resetVotes,
  navigateToLevel,
  useCurrentLevel,
  useSlideOverrides,
  saveSlideOverrideField,
  SlideOverride,
} from "./lib/use-votes";
import { workshopTopics, Topic, TopicPath, Slide, Workflow, CodeBlock } from "./lib/workshop-data";
import { QRCodeSVG } from "qrcode.react";

const SESSION_ID = "future-2026";

function TopicRow({ topic, count, total, index, onClick }: {
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
      className="animate-slide-up w-full text-left px-8 py-7 transition-all hover:-translate-y-0.5 cursor-pointer"
      style={{
        animationDelay: `${index * 0.08}s`,
        background: "#F0F0F6",
        border: "1px solid #D0D0D9",
        borderRadius: "20px",
      }}
    >
      <div className="flex items-center gap-8">
        <span
          className="text-xs font-bold uppercase tracking-widest w-8 shrink-0"
          style={{ color: topic.accent }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="flex-1 min-w-0">
          <h3 className="text-2xl font-extrabold tracking-display leading-tight mb-1" style={{ color: "#1F1F1F" }}>
            {topic.title}
          </h3>
          <p className="text-sm leading-snug" style={{ color: "#85859C" }}>
            {topic.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-5 w-72 shrink-0">
          <div className="flex-1 h-1.5 overflow-hidden pill" style={{ background: "#D0D0D9" }}>
            <div
              className="vote-bar h-full pill"
              style={{ width: `${percentage}%`, background: topic.accent }}
            />
          </div>
          <div className="flex items-baseline gap-1.5 shrink-0">
            <span
              className="text-3xl font-extrabold animate-count tabular-nums"
              key={count}
              style={{ color: "#1F1F1F" }}
            >
              {count}
            </span>
            <span className="text-xs font-semibold tabular-nums" style={{ color: "#85859C" }}>
              {percentage.toFixed(0)}%
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

function PathHub({ topic, onSelectPath }: {
  topic: Topic;
  onSelectPath: (path: TopicPath) => void;
}) {
  if (!topic.paths) return null;

  const count = topic.paths.length;
  const cols = count <= 2 ? 2 : count <= 4 ? 2 : count <= 6 ? 3 : count <= 9 ? 3 : 5;
  const isCompact = count > 4;

  return (
    <div className="flex-1 min-h-0 flex flex-col justify-center px-10 py-6 overflow-hidden">
      <div className="flex items-center gap-3 mb-2">
        <span className="w-2 h-2 rounded-full" style={{ background: topic.accent }} />
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: topic.accent }}>
          {isCompact ? "Přehled" : "Zvol cestu"}
        </span>
      </div>
      <h2
        className={`font-extrabold tracking-display leading-tight mb-5 max-w-4xl ${
          isCompact ? "text-2xl" : "text-4xl"
        }`}
        style={{ color: "#1F1F1F" }}
      >
        {topic.subtitle}
      </h2>

      <div
        className="grid gap-3 max-w-full"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {topic.paths.map((path, i) => (
          <button
            key={path.id}
            onClick={() => onSelectPath(path)}
            className={`animate-slide-up text-left transition-all hover:-translate-y-0.5 cursor-pointer ${
              isCompact ? "p-5" : "p-8"
            }`}
            style={{
              animationDelay: `${i * 0.04}s`,
              background: "#F0F0F6",
              border: "1px solid #D0D0D9",
              borderRadius: "16px",
            }}
          >
            <span
              className="inline-block text-[10px] font-bold uppercase tracking-widest mb-2"
              style={{ color: topic.accent }}
            >
              {path.kicker}
            </span>
            <h3
              className={`font-extrabold tracking-display leading-tight mb-2 ${
                isCompact ? "text-base" : "text-2xl"
              }`}
              style={{ color: "#1F1F1F" }}
            >
              {path.title}
            </h3>
            {path.description && (
              <p
                className={`leading-snug ${isCompact ? "text-xs" : "text-sm"}`}
                style={{ color: "#85859C" }}
              >
                {path.description}
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function WorkflowDiagram({ workflow, accent }: { workflow: Workflow; accent: string }) {
  return (
    <div className="max-w-5xl">
      <ol className="flex flex-col gap-1.5">
        {workflow.steps.map((step, i) => (
          <li key={i} className="flex items-stretch gap-3">
            <div className="flex flex-col items-center shrink-0">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold tabular-nums"
                style={{
                  background: step.highlight ? accent : "#FFFFFF",
                  color: step.highlight ? "#FFFFFF" : "#1F1F1F",
                  border: `1px solid ${step.highlight ? accent : "#D0D0D9"}`,
                }}
              >
                {i + 1}
              </div>
              {i < workflow.steps.length - 1 && (
                <div className="w-px flex-1 mt-0.5" style={{ background: "#D0D0D9" }} />
              )}
            </div>
            <div
              className="flex-1 flex items-center justify-between gap-4 px-4 py-2"
              style={{
                background: step.highlight ? `${accent}10` : "#FFFFFF",
                border: `1px solid ${step.highlight ? accent : "#D0D0D9"}`,
                borderRadius: "10px",
              }}
            >
              <span className="text-sm font-semibold leading-snug" style={{ color: "#1F1F1F" }}>
                {step.title}
              </span>
              {step.duration && (
                <span
                  className="text-[10px] font-bold uppercase tracking-widest tabular-nums shrink-0"
                  style={{ color: step.highlight ? accent : "#85859C" }}
                >
                  {step.duration}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>

      <div
        className="mt-3 inline-flex items-center gap-3 px-4 py-2 pill"
        style={{ background: accent, color: "#FFFFFF" }}
      >
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-75">Celkem</span>
        <span className="text-xs font-bold">{workflow.total}</span>
      </div>
    </div>
  );
}

function slideKey(topicId: string, pathId: string | undefined, idx: number) {
  return pathId ? `${topicId}__${pathId}__${idx}` : `${topicId}__${idx}`;
}

function applyOverride(slide: Slide, ov: SlideOverride | undefined): Slide {
  if (!ov) return slide;
  const merged: Slide = { ...slide };
  if (ov.title !== undefined) merged.title = ov.title;
  if (ov.body !== undefined) merged.body = ov.body;
  if (ov.kicker !== undefined) merged.kicker = ov.kicker;
  if (ov.quote !== undefined) merged.quote = ov.quote;
  if (ov.quoteAuthor !== undefined) merged.quoteAuthor = ov.quoteAuthor;
  if (ov.bullets !== undefined) merged.bullets = ov.bullets;
  return merged;
}

function Editable({
  value,
  editable,
  onSave,
  className,
  style,
  as: Tag = "span",
  placeholder,
}: {
  value: string;
  editable: boolean;
  onSave: (newValue: string) => void;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof React.JSX.IntrinsicElements;
  placeholder?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (ref.current && ref.current.textContent !== value) {
      ref.current.textContent = value;
    }
  }, [value]);

  const editableStyle: React.CSSProperties = editable
    ? {
        outline: "1.5px dashed rgba(212,46,77,0.45)",
        outlineOffset: "4px",
        borderRadius: "4px",
        cursor: "text",
        ...style,
      }
    : style || {};

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    if (!editable) return;
    const newVal = (e.currentTarget.textContent ?? "").trim();
    if (newVal !== value) onSave(newVal);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    e.stopPropagation();
    if (e.key === "Escape") {
      e.preventDefault();
      (e.currentTarget as HTMLElement).blur();
    }
  };

  return React.createElement(
    Tag,
    {
      ref: ref as unknown as React.RefObject<HTMLElement>,
      contentEditable: editable,
      suppressContentEditableWarning: true,
      onBlur: handleBlur,
      onKeyDown: handleKeyDown,
      "data-placeholder": placeholder,
      className,
      style: editableStyle,
    },
    value
  );
}

function LethalTrifectaGraphic({ accent }: { accent: string }) {
  const items = [
    { label: "Privátní data", sub: "Email, faktury, databáze, přístupy" },
    { label: "Nedůvěryhodný obsah", sub: "Mail, web, dokument od kohokoliv" },
    { label: "Odeslání ven", sub: "API call, zpráva, upload" },
  ];

  return (
    <div className="max-w-4xl mt-2 flex items-center gap-8">
      <svg viewBox="0 0 220 200" className="shrink-0" style={{ width: "200px", height: "180px" }}>
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L0,8 L8,4 z" fill={accent} />
          </marker>
        </defs>
        {/* Triangle sides */}
        <path d="M110 20 L30 170 L190 170 Z" fill="none" stroke={accent} strokeWidth="2" strokeLinejoin="round" />
        {/* Vertex dots */}
        <circle cx="110" cy="20" r="7" fill={accent} />
        <circle cx="30" cy="170" r="7" fill={accent} />
        <circle cx="190" cy="170" r="7" fill={accent} />
        {/* Skull-ish danger center */}
        <circle cx="110" cy="120" r="24" fill={accent} opacity="0.08" />
        <text
          x="110"
          y="128"
          textAnchor="middle"
          fontSize="22"
          fontWeight="800"
          fill={accent}
        >
          !
        </text>
      </svg>

      <ol className="flex-1 flex flex-col gap-3">
        {items.map((it, i) => (
          <li
            key={i}
            className="flex items-center gap-4 px-5 py-3"
            style={{
              background: "#FFFFFF",
              border: "1px solid #D0D0D9",
              borderRadius: "12px",
            }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold tabular-nums shrink-0"
              style={{ background: accent, color: "#FFFFFF" }}
            >
              {i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-base font-extrabold tracking-display" style={{ color: "#1F1F1F" }}>
                {it.label}
              </div>
              <div className="text-xs font-medium" style={{ color: "#85859C" }}>
                {it.sub}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function CodeCompare({ bad, good }: { bad: CodeBlock; good: CodeBlock }) {
  const block = (b: CodeBlock) => {
    const isBad = b.tone === "bad";
    const color = isBad ? "#D42E4D" : "#1B9174";
    return (
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full" style={{ background: color }} />
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color }}>
            {b.label}
          </span>
        </div>
        <pre
          className="px-4 py-3 text-sm font-mono overflow-x-auto"
          style={{
            background: "#FFFFFF",
            border: `1px solid ${color}30`,
            borderLeft: `3px solid ${color}`,
            borderRadius: "10px",
            color: "#1F1F1F",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            lineHeight: "1.6",
          }}
        >
          <code>{b.code}</code>
        </pre>
      </div>
    );
  };

  return (
    <div className="mt-2 flex gap-4 max-w-5xl">
      {block(bad)}
      {block(good)}
    </div>
  );
}

function ScreenshotsRow({ shots }: { shots: { src: string; caption: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : Math.max(0, i - 1))),
    []
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : Math.min(shots.length - 1, i + 1))),
    [shots.length]
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        close();
      } else if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        e.stopPropagation();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        e.stopPropagation();
        prev();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [isOpen, close, next, prev]);

  const isSingle = shots.length === 1;
  const tileHeight = isSingle ? "50vh" : "38vh";

  return (
    <>
      <div
        className="grid gap-4 mt-2"
        style={{ gridTemplateColumns: `repeat(${shots.length}, minmax(0, 1fr))` }}
      >
        {shots.map((s, i) => (
          <button
            key={i}
            onClick={() => setOpenIndex(i)}
            className="flex flex-col min-w-0 text-left group cursor-zoom-in"
          >
            <div
              className="overflow-hidden flex items-center justify-center transition-all group-hover:-translate-y-0.5"
              style={{
                background: "#FFFFFF",
                border: "1px solid #D0D0D9",
                borderRadius: "12px",
                height: tileHeight,
              }}
            >
              <Image
                src={s.src}
                alt={s.caption}
                width={2400}
                height={1600}
                className="w-full h-full object-contain"
              />
            </div>
            <p
              className="text-[11px] font-bold uppercase tracking-widest mt-2 text-center transition-colors group-hover:text-[#1F1F1F]"
              style={{ color: "#85859C" }}
            >
              {s.caption}
            </p>
          </button>
        ))}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 animate-slide-up"
          style={{ background: "rgba(31, 31, 31, 0.92)", backdropFilter: "blur(8px)" }}
          onClick={close}
        >
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <span
                className="px-4 py-2 pill text-xs font-bold uppercase tracking-widest tabular-nums"
                style={{ background: "#FFFFFF", color: "#1F1F1F" }}
              >
                {String(openIndex + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}
              </span>
              <span className="text-sm font-semibold text-white/90">
                {shots[openIndex].caption}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              className="w-12 h-12 pill flex items-center justify-center transition-all hover:scale-105"
              style={{ background: "#FFFFFF", border: "1px solid #D0D0D9", color: "#1F1F1F" }}
              title="Zavřít (Esc)"
            >
              <span className="text-lg">×</span>
            </button>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            disabled={openIndex === 0}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 pill flex items-center justify-center transition-all hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed z-10"
            style={{ background: "#FFFFFF", border: "1px solid #D0D0D9", color: "#1F1F1F" }}
          >
            <span className="text-lg">←</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            disabled={openIndex === shots.length - 1}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 pill flex items-center justify-center transition-all hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed z-10"
            style={{ background: "#FFFFFF", border: "1px solid #D0D0D9", color: "#1F1F1F" }}
          >
            <span className="text-lg">→</span>
          </button>

          <div
            className="absolute inset-0 overflow-auto flex items-start justify-center"
            style={{ padding: "96px 96px 48px" }}
            onClick={close}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={shots[openIndex].src}
              alt={shots[openIndex].caption}
              onClick={(e) => e.stopPropagation()}
              className="block cursor-default"
              style={{
                maxWidth: "100%",
                width: "auto",
                height: "auto",
                background: "#FFFFFF",
                borderRadius: "16px",
                border: "1px solid #D0D0D9",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

function SlideView({ topic, slide, slideIndex, total, pathKicker, editMode, onEdit }: {
  topic: Topic;
  slide: Slide;
  slideIndex: number;
  total: number;
  pathKicker?: string;
  editMode: boolean;
  onEdit: (field: keyof SlideOverride, value: string | string[] | null) => void;
}) {
  return (
    <div
      key={`${pathKicker}-${slideIndex}`}
      className="animate-slide-up flex-1 min-h-0 flex flex-col justify-center px-10 py-8 overflow-hidden"
      style={{
        background: "#F0F0F6",
        border: "1px solid #D0D0D9",
        borderRadius: "20px",
      }}
    >
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <span className="w-2 h-2 rounded-full" style={{ background: topic.accent }} />
        {pathKicker && (
          <>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: topic.accent }}>
              {pathKicker}
            </span>
            <span className="w-1 h-1 rounded-full" style={{ background: "#85859C" }} />
          </>
        )}
        {(slide.kicker || editMode) && (
          <Editable
            value={slide.kicker || ""}
            editable={editMode}
            onSave={(v) => onEdit("kicker", v || null)}
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: topic.accent }}
          />
        )}
        <span className="w-1 h-1 rounded-full" style={{ background: "#85859C" }} />
        <span className="text-xs font-semibold uppercase tracking-widest tabular-nums" style={{ color: "#85859C" }}>
          {String(slideIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <Editable
        as="h2"
        value={slide.title}
        editable={editMode}
        onSave={(v) => onEdit("title", v)}
        className="text-4xl font-extrabold tracking-display leading-[1.05] mb-5 max-w-5xl"
        style={{ color: "#1F1F1F" }}
      />

      {(slide.body || editMode) && (
        <Editable
          as="p"
          value={slide.body || ""}
          editable={editMode}
          onSave={(v) => onEdit("body", v || null)}
          className="text-lg font-medium leading-relaxed max-w-4xl mb-4"
          style={{ color: "#1F1F1F" }}
        />
      )}

      {slide.bullets && (
        <ul className="space-y-3 max-w-4xl">
          {slide.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3 text-lg font-medium" style={{ color: "#1F1F1F" }}>
              <span className="mt-2 w-2 h-2 shrink-0 rounded-full" style={{ background: topic.accent }} />
              <Editable
                value={b}
                editable={editMode}
                onSave={(v) => {
                  const next = [...(slide.bullets || [])];
                  next[i] = v;
                  onEdit("bullets", next);
                }}
              />
            </li>
          ))}
        </ul>
      )}

      {slide.bulletsDetailed && (
        <ul className="space-y-4 max-w-5xl">
          {slide.bulletsDetailed.map((b, i) => (
            <li key={i} className="flex items-start gap-4">
              <span
                className="mt-1.5 w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-xs font-bold tabular-nums"
                style={{ background: topic.accent, color: "#FFFFFF" }}
              >
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-base font-bold leading-snug mb-1" style={{ color: "#1F1F1F" }}>
                  {b.text}
                </div>
                <div className="text-sm leading-snug" style={{ color: "#85859C" }}>
                  {b.example}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {slide.stats && (
        <div className="grid grid-cols-4 gap-4 max-w-5xl mt-2">
          {slide.stats.map((s, i) => (
            <div
              key={i}
              className="p-5"
              style={{
                background: "#FFFFFF",
                border: "1px solid #D0D0D9",
                borderRadius: "14px",
              }}
            >
              <div
                className="text-3xl font-extrabold tracking-display mb-1 tabular-nums"
                style={{ color: topic.accent }}
              >
                {s.value}
              </div>
              <div className="text-xs font-semibold" style={{ color: "#85859C" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {slide.quote && (
        <blockquote className="mt-2 pl-5 max-w-4xl" style={{ borderLeft: `3px solid ${topic.accent}` }}>
          <Editable
            as="p"
            value={slide.quote || ""}
            editable={editMode}
            onSave={(v) => onEdit("quote", v || null)}
            className="text-xl font-semibold leading-snug italic"
            style={{ color: "#1F1F1F" }}
          />
          {(slide.quoteAuthor || editMode) && (
            <Editable
              as="cite"
              value={slide.quoteAuthor || ""}
              editable={editMode}
              onSave={(v) => onEdit("quoteAuthor", v || null)}
              className="block text-xs font-semibold uppercase tracking-widest mt-2 not-italic"
              style={{ color: "#85859C" }}
            />
          )}
        </blockquote>
      )}

      {slide.embed && (
        <div className="w-full flex-1 min-h-0 flex items-center justify-center">
          <iframe
            src={slide.embed}
            className="border-0"
            style={{
              width: "min(62vh, 100%)",
              height: "62vh",
              borderRadius: "16px",
              background: "#FAF5EC",
            }}
            title={slide.title}
          />
        </div>
      )}

      {slide.image && (
        <div className="w-full flex gap-6 min-h-0">
          <div className="flex-1 flex flex-col min-w-0">
            <Image
              src={slide.image}
              alt={slide.imageCaption || slide.title}
              width={2400}
              height={1600}
              className="w-full h-auto max-h-[55vh] object-contain"
            />
            {slide.imageCaption && (
              <p className="text-xs font-semibold mt-2" style={{ color: "#85859C" }}>
                {slide.imageCaption}
              </p>
            )}
          </div>
          {slide.imageLegend && slide.imageLegend.length > 0 && (
            <div className="w-80 shrink-0 flex flex-col justify-center">
              <span
                className="text-[10px] font-bold uppercase tracking-widest mb-3"
                style={{ color: "#85859C" }}
              >
                Co je na obrázku
              </span>
              <ul className="space-y-3">
                {slide.imageLegend.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm font-medium leading-snug"
                    style={{ color: "#1F1F1F" }}
                  >
                    <span
                      className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold tabular-nums mt-0.5"
                      style={{ background: topic.accent, color: "#FFFFFF" }}
                    >
                      {i + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {slide.workflow && <WorkflowDiagram workflow={slide.workflow} accent={topic.accent} />}

      {slide.trifecta && <LethalTrifectaGraphic accent={topic.accent} />}

      {slide.codeCompare && <CodeCompare bad={slide.codeCompare.bad} good={slide.codeCompare.good} />}

      {slide.screenshots && <ScreenshotsRow shots={slide.screenshots} />}
    </div>
  );
}

export default function PresenterDashboard() {
  const votes = useVotes(SESSION_ID);
  const currentLevel = useCurrentLevel(SESSION_ID);
  const overrides = useSlideOverrides(SESSION_ID);
  const [voteUrl, setVoteUrl] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedPath, setSelectedPath] = useState<TopicPath | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [flatMode, setFlatMode] = useState(false);

  const flatInfo = React.useMemo(() => {
    if (!selectedTopic?.paths) return [];
    const entries: Array<{ slide: Slide; pathId: string; pathKicker: string; localIdx: number; pathIdx: number }> = [];
    selectedTopic.paths.forEach((path, pathIdx) => {
      path.slides.forEach((slide, i) => {
        entries.push({ slide, pathId: path.id, pathKicker: path.kicker, localIdx: i, pathIdx });
      });
    });
    return entries;
  }, [selectedTopic]);

  useEffect(() => {
    setVoteUrl(`${window.location.origin}/vote`);
  }, []);

  useEffect(() => {
    if (currentLevel === "root") {
      setSelectedTopic(null);
      setSelectedPath(null);
      setFlatMode(false);
      setSlideIndex(0);
    } else {
      const t = workshopTopics.find((t) => t.id === currentLevel);
      if (t) {
        setSelectedTopic(t);
        setSelectedPath(null);
        setFlatMode(false);
        setSlideIndex(0);
      }
    }
  }, [currentLevel]);

  const totalVotes = workshopTopics.reduce((sum, t) => sum + (votes[t.id] || 0), 0);

  const handleReset = async () => {
    await resetVotes(SESSION_ID);
  };

  const handleSelectTopic = async (topic: Topic) => {
    setSelectedTopic(topic);
    setSelectedPath(null);
    setFlatMode(false);
    setSlideIndex(0);
    await navigateToLevel(SESSION_ID, topic.id);
  };

  const handleBack = async () => {
    if (selectedPath || flatMode) {
      setSelectedPath(null);
      setFlatMode(false);
      setSlideIndex(0);
    } else {
      setSelectedTopic(null);
      setSelectedPath(null);
      setFlatMode(false);
      setSlideIndex(0);
      await navigateToLevel(SESSION_ID, "root");
    }
  };

  const activeSlides: Slide[] | undefined = flatMode
    ? flatInfo.map((e) => e.slide)
    : selectedPath
    ? selectedPath.slides
    : selectedTopic?.slides;
  const slideCount = activeSlides?.length || 0;
  const rawSlide = activeSlides?.[slideIndex];
  const currentFlatEntry = flatMode ? flatInfo[slideIndex] : undefined;
  const currentPathKicker = flatMode ? currentFlatEntry?.pathKicker : selectedPath?.kicker;
  const currentSlideKey = selectedTopic
    ? flatMode
      ? slideKey(selectedTopic.id, currentFlatEntry?.pathId, currentFlatEntry?.localIdx ?? 0)
      : slideKey(selectedTopic.id, selectedPath?.id, slideIndex)
    : "";
  const slide = rawSlide ? applyOverride(rawSlide, overrides[currentSlideKey]) : undefined;

  const handleEdit = useCallback(
    (field: keyof SlideOverride, value: string | string[] | null) => {
      if (!currentSlideKey) return;
      saveSlideOverrideField(SESSION_ID, currentSlideKey, field, value);
    },
    [currentSlideKey]
  );

  const prevSlide = useCallback(() => {
    setSlideIndex((i) => Math.max(0, i - 1));
  }, []);

  const nextSlide = useCallback(() => {
    setSlideIndex((i) => Math.min(slideCount - 1, i + 1));
  }, [slideCount]);

  const showHub = !!selectedTopic?.paths && !selectedPath && !flatMode;
  const showSlides = !!activeSlides && !!slide;

  useEffect(() => {
    if (!selectedTopic) return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const inEditable =
        !!t && (t.isContentEditable || t.tagName === "INPUT" || t.tagName === "TEXTAREA");
      if (inEditable || editMode) return;

      if (showSlides) {
        if (e.key === "ArrowRight" || e.key === " ") {
          e.preventDefault();
          nextSlide();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          prevSlide();
        }
      }
      if (e.key === "Escape") {
        e.preventDefault();
        handleBack();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedTopic, showSlides, nextSlide, prevSlide, editMode]);

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: "#FFFFFF" }}>
      <header
        className="px-10 py-5 flex items-center justify-between shrink-0"
        style={{ borderBottom: "1px solid #D0D0D9" }}
      >
        <div className="flex items-center gap-5">
          {selectedTopic && (
            <button
              onClick={handleBack}
              className="w-11 h-11 pill flex items-center justify-center transition-colors hover:bg-[#F0F0F6]"
              style={{ border: "1px solid #D0D0D9", color: "#1F1F1F" }}
              title="Zpět (Esc)"
            >
              <span className="text-lg">←</span>
            </button>
          )}
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#D42E4D" }}>
                Workshop
              </span>
              <span className="w-1 h-1 rounded-full" style={{ background: "#85859C" }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#85859C" }}>
                CzechCrunch Future 2026
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-display" style={{ color: "#1F1F1F" }}>
              {selectedTopic ? selectedTopic.title : "Jak reálně používáme AI"}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!selectedTopic && (
            <div
              className="flex items-center gap-2.5 px-5 py-2.5 pill"
              style={{ border: "1px solid #D0D0D9", background: "#FFFFFF" }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: "#1B9174", animation: "pulse-glow 2s infinite" }}
              />
              <span className="text-sm font-bold tabular-nums" style={{ color: "#1F1F1F" }}>
                {totalVotes} hlasů
              </span>
            </div>
          )}
          {selectedTopic && showSlides && (
            <button
              onClick={() => setEditMode((v) => !v)}
              className="px-5 py-2.5 pill text-sm font-semibold transition-colors"
              style={{
                border: `1px solid ${editMode ? "#D2452D" : "#D0D0D9"}`,
                background: editMode ? "#D2452D" : "#FFFFFF",
                color: editMode ? "#FFFFFF" : "#1F1F1F",
              }}
              title="Zapni pro úpravu textů (kicker, nadpis, odstavec, bullety, quote)"
            >
              {editMode ? "✓ Editace" : "Edit"}
            </button>
          )}
          <button
            onClick={handleReset}
            className="px-5 py-2.5 pill text-sm font-semibold transition-colors hover:text-[#D42E4D]"
            style={{ border: "1px solid #D0D0D9", background: "#FFFFFF", color: "#1F1F1F" }}
          >
            Reset
          </button>
        </div>
      </header>

      {!selectedTopic ? (
        <div className="flex gap-8 px-10 py-10 flex-1">
          <div className="w-80 flex flex-col items-center justify-center shrink-0">
            <div
              className="p-8 flex flex-col items-center w-full"
              style={{ background: "#F0F0F6", borderRadius: "20px", border: "1px solid #D0D0D9" }}
            >
              <span className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "#D42E4D" }}>
                Hlasujte zde
              </span>
              {voteUrl && (
                <div
                  className="p-4"
                  style={{ background: "#FFFFFF", border: "1px solid #D0D0D9", borderRadius: "16px" }}
                >
                  <QRCodeSVG value={voteUrl} size={200} fgColor="#1F1F1F" />
                </div>
              )}
              <p className="text-sm mt-5 text-center font-medium leading-relaxed" style={{ color: "#1F1F1F" }}>
                Naskenuj QR kód
                <br />
                <span style={{ color: "#85859C" }}>a vyber téma</span>
              </p>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <div className="flex flex-col gap-4">
              {workshopTopics.map((topic, i) => (
                <TopicRow
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
        </div>
      ) : showHub ? (
        <div className="flex-1 flex flex-col p-10">
          <PathHub
            topic={selectedTopic}
            onSelectPath={(p) => {
              const startIdx = flatInfo.findIndex((e) => e.pathId === p.id);
              setFlatMode(true);
              setSlideIndex(startIdx >= 0 ? startIdx : 0);
            }}
          />
        </div>
      ) : showSlides ? (
        <div className="flex-1 min-h-0 flex flex-col px-10 py-6 gap-4">
          <SlideView
            topic={selectedTopic}
            slide={slide!}
            slideIndex={slideIndex}
            total={slideCount}
            pathKicker={currentPathKicker}
            editMode={editMode}
            onEdit={handleEdit}
          />

          <div className="flex items-center justify-between shrink-0">
            <button
              onClick={prevSlide}
              disabled={slideIndex === 0}
              className="w-11 h-11 pill flex items-center justify-center transition-all hover:bg-[#F0F0F6] disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ border: "1px solid #D0D0D9", color: "#1F1F1F" }}
            >
              <span className="text-xl">←</span>
            </button>

            {flatMode && selectedTopic.paths ? (
              <div className="flex gap-1.5 items-center">
                {selectedTopic.paths.map((p, pi) => {
                  const isActive = currentFlatEntry?.pathIdx === pi;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        const idx = flatInfo.findIndex((e) => e.pathId === p.id);
                        if (idx >= 0) setSlideIndex(idx);
                      }}
                      className="h-1.5 pill transition-all"
                      title={p.title}
                      style={{
                        width: isActive ? "32px" : "8px",
                        background: isActive ? selectedTopic.accent : "#D0D0D9",
                      }}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2">
                {Array.from({ length: slideCount }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlideIndex(i)}
                    className="h-1.5 pill transition-all"
                    style={{
                      width: i === slideIndex ? "32px" : "8px",
                      background: i === slideIndex ? selectedTopic.accent : "#D0D0D9",
                    }}
                  />
                ))}
              </div>
            )}

            <button
              onClick={nextSlide}
              disabled={slideIndex === slideCount - 1}
              className="w-11 h-11 pill flex items-center justify-center transition-all hover:bg-[#F0F0F6] disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ border: "1px solid #D0D0D9", color: "#1F1F1F" }}
            >
              <span className="text-xl">→</span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
