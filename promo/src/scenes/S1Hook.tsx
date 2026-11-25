// Scene 1 — Hook (0–64): light sweep reveals the GT-R, "WHERE TO / NEXT?"
import React from "react";
import { AbsoluteFill, Easing, useCurrentFrame } from "remotion";
import { HERO_CAR } from "../layout";
import { EASE_IO, tw } from "../motion/ease";
import { HeroCar } from "../motion/elements";
import { C, FONT } from "../theme";

const BRAKE = Easing.bezier(0.12, 0.9, 0.25, 1);

const Line: React.FC<{ top: number; height: number; children: React.ReactNode }> = ({ top, height, children }) => (
  <div
    style={{
      position: "absolute",
      left: 0,
      top,
      width: 1080,
      height,
      overflow: "hidden",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end",
    }}
  >
    {children}
  </div>
);

const Word: React.FC<{ at: number; f: number; children: React.ReactNode; style?: React.CSSProperties; punch?: boolean }> = ({
  at,
  f,
  children,
  style,
  punch,
}) => (
  <span
    style={{
      display: "inline-block",
      translate: `0 ${tw(f, at, at + 12, 110, 0)}%`,
      scale: punch ? String(tw(f, at + 4, at + 18, 1.08, 1, EASE_IO)) : undefined,
      ...style,
    }}
  >
    {children}
  </span>
);

export const S1Hook: React.FC = () => {
  const f = useCurrentFrame();

  const carX = tw(f, 2, 32, -1000, 0, BRAKE);
  const blur = tw(f, 2, 24, 7, 0);
  const rotate = f < 30 ? tw(f, 20, 30, 0, 0.7) : tw(f, 30, 46, 0.7, 0, EASE_IO);
  const reveal = tw(f, 0, 20, 0, 1, Easing.linear);

  const beamX = tw(f, 0, 18, -500, 1500, Easing.bezier(0.3, 0, 0.6, 1));
  const beamO = tw(f, 0, 4, 0, 1) * tw(f, 12, 22, 1, 0);

  const push = tw(f, 24, 64, 1, 1.05, Easing.linear);
  const textOut = tw(f, 48, 62, 0, 1, EASE_IO);

  return (
    <AbsoluteFill>
      {/* headlight sweep */}
      <div
        style={{
          position: "absolute",
          left: beamX - 500,
          top: HERO_CAR.y + HERO_CAR.h * 0.35,
          width: 1000,
          height: 6,
          borderRadius: 3,
          background: "linear-gradient(90deg, rgba(84,166,255,0), rgba(220,235,255,0.95), rgba(84,166,255,0))",
          boxShadow: "0 0 40px 10px rgba(84,166,255,0.35)",
          opacity: beamO,
        }}
      />
      {f < 50 ? (
        <HeroCar
          rect={{ ...HERO_CAR, x: HERO_CAR.x + carX }}
          blur={blur}
          rotate={rotate}
          reveal={reveal}
          reflection={tw(f, 6, 26, 0, 1)}
        />
      ) : null}

      <AbsoluteFill
        style={{
          fontFamily: FONT,
          fontWeight: 800,
          color: C.white,
          letterSpacing: "-0.03em",
          lineHeight: 0.92,
          scale: String(push),
          opacity: 1 - textOut,
          translate: `0 ${-70 * textOut}px`,
          filter: textOut > 0.01 ? `blur(${textOut * 14}px)` : undefined,
        }}
      >
        <Line top={420} height={140}>
          <Word at={6} f={f} style={{ fontSize: 130, marginRight: 34 }}>
            WHERE
          </Word>
          <Word at={11} f={f} style={{ fontSize: 130 }}>
            TO
          </Word>
        </Line>
        <Line top={560} height={230}>
          <Word at={18} f={f} punch style={{ fontSize: 236, color: C.sky }}>
            NEXT?
          </Word>
        </Line>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
