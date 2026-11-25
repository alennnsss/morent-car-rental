// Scene 5 — DRIVE. (global 395–540). The car grows out of the summary,
// drives off, the four chapter words stack up, a blue hit, MORENT + CTA.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { END_CAR, THUMB, THUMB_CAR, T, toVideo } from "../layout";
import { EASE, EASE_IN, EASE_IO, SPRING, mixRect, rectStyle, tw } from "../motion/ease";
import { HeroCar } from "../motion/elements";
import { C, FONT } from "../theme";

const WORDS = ["FIND", "CHOOSE", "BOOK", "DRIVE"];
const STACK_AT = 444;
const COLLAPSE = 466;
const FILL = 468;

const StackWord: React.FC<{ word: string; i: number; f: number }> = ({ word, i, f }) => {
  const at = STACK_AT + i * 5;
  const y = tw(f, at, at + 12, 110, 0);
  return (
    <div style={{ height: 120, overflow: "hidden", display: "flex", justifyContent: "center" }}>
      <span style={{ display: "inline-block", translate: `0 ${y}%` }}>
        {word}
        <span style={{ color: C.sky }}>.</span>
      </span>
    </div>
  );
};

export const S5Drive: React.FC = () => {
  const g = useCurrentFrame() + T.s5; // work in global frames

  // car: summary thumbnail -> hero
  const grow = tw(g, 395, 417, 0, 1, EASE_IO);
  const car = mixRect(toVideo(THUMB_CAR), END_CAR, grow);
  const thumbBox = mixRect(toVideo(THUMB), { x: 140, y: 880, w: 800, h: 360 }, grow);
  const drive = tw(g, 425, 452, 0, 1500, EASE_IN);
  const driveBlur = tw(g, 436, 452, 0, 9);
  const squat = g < 425 ? 0 : tw(g, 425, 432, 0, -0.6, EASE) * tw(g, 432, 446, 1, 0);
  const streak = tw(g, 428, 452, 0, 1) * tw(g, 452, 466, 1, 0);

  // stacked words
  const collapse = tw(g, COLLAPSE, COLLAPSE + 6, 0, 1, EASE_IN);

  // blue hit + logo
  const fillR = tw(g, FILL, FILL + 10, 0, 1250, EASE_IO);
  const shrink = tw(g, 488, 506, 0, 1, EASE_IO);
  const logoColor = tw(g, 500, 512, 0, 1);
  const tag = tw(g, 498, 514, 0, 1);
  const btn = tw(g, 504, 520, 0, 1, SPRING);
  const url = tw(g, 508, 522, 0, 1);

  const logoLetters = "MORENT".split("");
  const blueR = fillR * (1 - shrink);

  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      {/* blue box of the summary thumbnail opening up and dissolving */}
      {grow < 1 ? (
        <div style={{ ...rectStyle(thumbBox), background: C.blue, borderRadius: 18, opacity: Math.max(0, 1 - grow * 2.2) }} />
      ) : null}

      {/* light streak behind the leaving car */}
      <div
        style={{
          position: "absolute",
          left: END_CAR.x + 60 + drive * 0.2,
          top: END_CAR.y + END_CAR.h * 0.55,
          width: drive * 0.8,
          height: 4,
          background: "linear-gradient(90deg, rgba(84,166,255,0), rgba(160,205,255,0.9))",
          boxShadow: "0 0 30px 6px rgba(84,166,255,0.35)",
          opacity: streak,
        }}
      />
      {g < 455 ? (
        <HeroCar
          rect={{ ...car, x: car.x + drive }}
          reflection={grow}
          blur={driveBlur}
          rotate={squat}
        />
      ) : null}

      {/* FIND. CHOOSE. BOOK. DRIVE. */}
      {g >= STACK_AT && g < FILL + 10 ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 700,
            width: 1080,
            fontWeight: 800,
            fontSize: 112,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            color: C.white,
            transformOrigin: "50% 240px",
            scale: `${1 - collapse * 0.2} ${1 - collapse * 0.92}`,
            opacity: 1 - tw(g, COLLAPSE + 3, COLLAPSE + 8, 0, 1),
          }}
        >
          {WORDS.map((w, i) => (
            <StackWord key={w} word={w} i={i} f={g} />
          ))}
        </div>
      ) : null}

      {/* brand-blue hit that retracts into the logo */}
      {blueR > 0 ? (
        <div
          style={{
            position: "absolute",
            left: 540 - blueR,
            top: 940 - blueR,
            width: blueR * 2,
            height: blueR * 2,
            borderRadius: "50%",
            background: C.blue,
          }}
        />
      ) : null}

      {g >= 472 ? (
        <>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 760,
              width: 1080,
              height: 190,
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 176,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              color: logoColor > 0 ? `rgb(${255 + (53 - 255) * logoColor}, ${255 + (99 - 255) * logoColor}, ${255 + (233 - 255) * logoColor})` : C.white,
              translate: `0 ${tw(g, 490, 512, 0, -90, EASE_IO)}px`,
            }}
          >
            {logoLetters.map((ch, i) => (
              <span key={i} style={{ display: "inline-block", translate: `0 ${tw(g, 474 + i * 2, 488 + i * 2, 115, 0)}%` }}>
                {ch}
              </span>
            ))}
          </div>
          <div
            style={{
              position: "absolute",
              left: 0,
              width: 1080,
              top: 900,
              textAlign: "center",
              fontSize: 54,
              fontWeight: 600,
              color: C.white,
              letterSpacing: "-0.01em",
              opacity: tag,
              translate: `0 ${(1 - tag) * 30}px`,
            }}
          >
            The Best Platform for Car Rental
          </div>
          <div style={{ position: "absolute", left: 0, width: 1080, top: 1040, display: "flex", justifyContent: "center" }}>
            <div
              style={{
                background: C.blue,
                color: C.white,
                fontSize: 46,
                fontWeight: 600,
                padding: "30px 76px",
                borderRadius: 10,
                scale: String(btn),
                opacity: Math.min(1, btn * 2),
              }}
            >
              Rent Now
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              left: 0,
              width: 1080,
              top: 1210,
              textAlign: "center",
              fontSize: 36,
              fontWeight: 500,
              color: C.muted,
              opacity: url,
              translate: `0 ${(1 - url) * 16}px`,
            }}
          >
            morent-car-rental.vercel.app
          </div>
        </>
      ) : null}
    </AbsoluteFill>
  );
};

