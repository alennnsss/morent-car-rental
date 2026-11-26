// Reels cover (1080x1920). Key content sits inside 440–1480 px so the
// profile grid crops (4:5 and 1:1, both centred) keep it intact.
import React from "react";
import { AbsoluteFill } from "remotion";
import { carRect } from "./layout";
import { Background, HeroCar } from "./motion/elements";
import { C, FONT } from "./theme";
import { CarCard, GTR, Logo } from "./ui/morent";

const Hook: React.FC = () => (
  <>
    <Background glowY={1130} />
    <div
      style={{
        position: "absolute",
        left: 0,
        width: 1080,
        top: 520,
        textAlign: "center",
        fontFamily: FONT,
        fontWeight: 800,
        letterSpacing: "-0.03em",
        lineHeight: 0.92,
        color: C.white,
      }}
    >
      <div style={{ fontSize: 130 }}>WHERE TO</div>
      <div style={{ fontSize: 236, color: C.sky }}>NEXT?</div>
    </div>
    <div
      style={{
        position: "absolute",
        left: 60,
        top: 1222,
        width: 960,
        height: 4,
        background: "linear-gradient(90deg, rgba(84,166,255,0), rgba(170,210,255,0.85), rgba(84,166,255,0))",
        boxShadow: "0 0 30px 6px rgba(84,166,255,0.3)",
      }}
    />
    <HeroCar rect={carRect(540, 1130, 900)} />
    <Logo size={64} style={{ position: "absolute", left: 0, width: 1080, top: 1420, textAlign: "center" }} />
  </>
);

const Product: React.FC = () => (
  <>
    <Background glowY={1050} glow={0.8} />
    <div
      style={{
        position: "absolute",
        left: 0,
        width: 1080,
        top: 470,
        textAlign: "center",
        fontFamily: FONT,
        fontWeight: 800,
        fontSize: 104,
        letterSpacing: "-0.03em",
        lineHeight: 1.02,
        color: C.white,
      }}
    >
      <div>
        FIND<span style={{ color: C.sky }}>.</span> CHOOSE<span style={{ color: C.sky }}>.</span>
      </div>
      <div>
        BOOK<span style={{ color: C.sky }}>.</span> DRIVE<span style={{ color: C.sky }}>.</span>
      </div>
    </div>
    <div style={{ position: "absolute", left: 125, top: 760, width: 377, height: 260, scale: "2.2", transformOrigin: "0 0" }}>
      <CarCard
        car={GTR}
        heart={1}
        style={{ left: 0, top: 0, boxShadow: "0 12px 40px rgba(0,0,0,0.45)" }}
      />
    </div>
    <Logo size={64} color={C.white} style={{ position: "absolute", left: 0, width: 1080, top: 1384, textAlign: "center" }} />
  </>
);

export const Cover: React.FC<{ variant: "hook" | "product" }> = ({ variant }) => (
  <AbsoluteFill style={{ background: C.night }}>{variant === "hook" ? <Hook /> : <Product />}</AbsoluteFill>
);
