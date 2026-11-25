import React from "react";
import { AbsoluteFill, Img, Sequence, useCurrentFrame } from "remotion";
import { BANNER_CAR, HERO_CAR, PANEL, S, T, toVideo } from "./layout";
import { EASE, EASE_IO, mixRect, rectStyle, tw } from "./motion/ease";
import { Background, ChapterTitle } from "./motion/elements";
import { S1Hook } from "./scenes/S1Hook";
import { S2Find } from "./scenes/S2Find";
import { S3Choose } from "./scenes/S3Choose";
import { S4Book } from "./scenes/S4Book";
import { S5Drive } from "./scenes/S5Drive";
import { C, img } from "./theme";

// Glow follows the hero object: car -> panel -> car
const Backdrop: React.FC = () => {
  const f = useCurrentFrame();
  const toPanel = tw(f, 50, 80, 0, 1, EASE_IO) * tw(f, 395, 420, 1, 0, EASE_IO);
  return <Background glowY={1060 - 80 * toPanel} glow={1 - 0.35 * toPanel} />;
};

// The GT-R travels from the opening shot into the hero banner
const LandingCar: React.FC = () => {
  const f = useCurrentFrame(); // local, 0 = global 50
  const t = tw(f, 0, T.handoff, 0, 1, EASE_IO);
  const r = mixRect(HERO_CAR, toVideo(BANNER_CAR), t);
  return <Img src={img("nissan.png")} style={rectStyle(r)} />;
};

// The Morent page: a light sheet holding the real UI, scaled from site px
const Panel: React.FC = () => {
  const f = useCurrentFrame(); // local, 0 = global 50
  const bg = tw(f, 16, 26, 0, 1);
  const recede = tw(f, T.s5 - 50, T.s5 - 50 + 22, 0, 1, EASE);
  return (
    <div
      style={{
        position: "absolute",
        left: PANEL.x,
        top: PANEL.y - 60,
        width: PANEL.w,
        height: 1920 - PANEL.y + 120,
        borderRadius: 40,
        overflow: "hidden",
        background: `rgba(246,247,249,${bg})`,
        boxShadow: `0 40px 120px rgba(0,0,0,${0.5 * bg})`,
        opacity: 1 - recede,
        scale: String(1 - 0.1 * recede),
        filter: recede > 0.01 ? `blur(${recede * 14}px)` : undefined,
        WebkitMaskImage: "linear-gradient(180deg, transparent 0px, black 56px)",
        maskImage: "linear-gradient(180deg, transparent 0px, black 56px)",
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 60, width: PANEL.w / S, height: 1400, scale: String(S), transformOrigin: "0 0" }}>
        <Sequence from={0} durationInFrames={106} layout="none">
          <S2Find />
        </Sequence>
        <Sequence from={T.s3 - 50} durationInFrames={152} layout="none">
          <S3Choose />
        </Sequence>
        <Sequence from={T.s4 - 50} durationInFrames={145} layout="none">
          <S4Book />
        </Sequence>
      </div>
    </div>
  );
};

export const Reel: React.FC = () => (
  <AbsoluteFill style={{ background: C.night }}>
    <Backdrop />
    <Sequence from={0} durationInFrames={T.s1End} layout="none">
      <S1Hook />
    </Sequence>
    <Sequence from={T.panelIn} durationInFrames={T.s5 - T.panelIn + 24} layout="none">
      <Panel />
    </Sequence>
    <Sequence from={T.panelIn} durationInFrames={T.handoff} layout="none">
      <LandingCar />
    </Sequence>
    <ChapterTitle />
    <Sequence from={T.s5} durationInFrames={T.end - T.s5} layout="none">
      <S5Drive />
    </Sequence>
  </AbsoluteFill>
);
