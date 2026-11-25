import React from "react";
import { AbsoluteFill, Img, useCurrentFrame } from "remotion";
import { C, FONT, img } from "../theme";
import { EASE, EASE_IO, Rect, SPRING, rectStyle, tw } from "./ease";

// Night background: deep navy with a soft Morent-blue glow and fine grain.
export const Background: React.FC<{ glowX?: number; glowY?: number; glow?: number }> = ({
  glowX = 540,
  glowY = 1060,
  glow = 1,
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${C.night} 0%, ${C.night2} 55%, ${C.night} 100%)` }}>
      <AbsoluteFill
        style={{
          opacity: 0.55 * glow,
          background: `radial-gradient(ellipse 620px 520px at ${glowX}px ${glowY}px, rgba(53,99,233,0.55), rgba(53,99,233,0) 70%)`,
        }}
      />
      <AbsoluteFill style={{ opacity: 0.05, mixBlendMode: "overlay" }}>
        <svg width="1080" height="1920">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={frame % 6} />
          </filter>
          <rect width="1080" height="1920" filter="url(#grain)" />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// The real GT-R photo from the site, with a floor reflection and contact shadow.
export const HeroCar: React.FC<{
  rect: Rect;
  reflection?: number;
  rotate?: number;
  blur?: number;
  reveal?: number; // 0..1 left-to-right light reveal
  style?: React.CSSProperties;
}> = ({ rect, reflection = 1, rotate = 0, blur = 0, reveal = 1, style }) => {
  const edge = reveal * 130 - 15;
  const mask = reveal >= 1 ? undefined : `linear-gradient(90deg, black ${edge - 15}%, transparent ${edge + 15}%)`;
  return (
    <div style={{ ...rectStyle(rect), ...style }}>
      <div
        style={{
          position: "absolute",
          left: "8%",
          right: "8%",
          bottom: "-4%",
          height: "14%",
          borderRadius: "50%",
          background: "rgba(0,0,0,0.75)",
          filter: `blur(${rect.w * 0.02}px)`,
          opacity: reflection,
        }}
      />
      <Img
        src={img("nissan.png")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          rotate: `${rotate}deg`,
          transformOrigin: "50% 95%",
          filter: blur > 0.05 ? `blur(${blur}px)` : undefined,
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
      />
      <Img
        src={img("nissan.png")}
        style={{
          position: "absolute",
          left: 0,
          top: "100%",
          width: "100%",
          height: "100%",
          scale: "1 -1",
          opacity: 0.16 * reflection,
          filter: `blur(${2 + blur}px)`,
          WebkitMaskImage: `linear-gradient(0deg, transparent 55%, black 100%)`,
          maskImage: `linear-gradient(0deg, transparent 55%, black 100%)`,
        }}
      />
    </div>
  );
};

// Chapter word that rolls letter by letter: FIND. -> CHOOSE. -> BOOK. -> DRIVE.
const CHAPTERS = [
  { text: "FIND", at: 66 },
  { text: "CHOOSE", at: 148 },
  { text: "BOOK", at: 280 },
  { text: "DRIVE", at: 405 },
];
const CHAPTER_EXIT = 440;

const RollWord: React.FC<{ text: string; enter: number; exit: number | null; f: number }> = ({ text, enter, exit, f }) => {
  const letters = text.split("");
  const dotAt = enter + letters.length * 1.5 + 3;
  const dot = tw(f, dotAt, dotAt + 14, 0, 1, SPRING);
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
      {letters.map((ch, i) => {
        const tin = tw(f, enter + i * 1.5, enter + i * 1.5 + 14, 115, 0);
        const tout = exit === null ? 0 : tw(f, exit + i * 1.2, exit + i * 1.2 + 10, 0, -115, EASE_IO);
        return (
          <span key={i} style={{ display: "inline-block", translate: `0 ${tin + tout}%` }}>
            {ch}
          </span>
        );
      })}
      <span
        style={{
          display: "inline-block",
          color: C.sky,
          scale: String(dot),
          translate: `0 ${exit === null ? 0 : tw(f, exit + letters.length * 1.2, exit + letters.length * 1.2 + 10, 0, -115, EASE_IO)}%`,
        }}
      >
        .
      </span>
    </div>
  );
};

export const ChapterTitle: React.FC = () => {
  const f = useCurrentFrame();
  const fade = tw(f, CHAPTER_EXIT, CHAPTER_EXIT + 10, 1, 0);
  const blur = tw(f, CHAPTER_EXIT, CHAPTER_EXIT + 10, 0, 14);
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 250,
        width: 1080,
        height: 180,
        overflow: "hidden",
        fontFamily: FONT,
        fontWeight: 800,
        fontSize: 150,
        letterSpacing: "-0.03em",
        lineHeight: 1,
        color: C.white,
        opacity: fade,
        filter: blur > 0.1 ? `blur(${blur}px)` : undefined,
      }}
    >
      {CHAPTERS.map((c, i) => {
        const next = CHAPTERS[i + 1];
        if (f < c.at - 1) return null;
        if (next && f > next.at + 16) return null;
        return <RollWord key={c.text} text={c.text} enter={c.at} exit={next ? next.at - 4 : null} f={f} />;
      })}
    </div>
  );
};

// Tap feedback ring (no cursor arrow, like a finger on a phone)
export const Ripple: React.FC<{ x: number; y: number; at: number; f: number; color?: string }> = ({
  x,
  y,
  at,
  f,
  color = C.blue,
}) => {
  if (f < at || f > at + 18) return null;
  const r = tw(f, at, at + 18, 10, 90);
  const o = tw(f, at, at + 18, 0.6, 0, EASE);
  return (
    <div
      style={{
        position: "absolute",
        left: x - r,
        top: y - r,
        width: r * 2,
        height: r * 2,
        borderRadius: "50%",
        border: `4px solid ${color}`,
        opacity: o,
      }}
    />
  );
};
