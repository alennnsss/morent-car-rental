// Scene 2 — FIND. (global 50–156). Panel content in site px.
// The GT-R lands in the real hero banner, then the Pick Up form fills in.
import React from "react";
import { Img, useCurrentFrame } from "remotion";
import { BANNER, BANNER_CAR, HERO_CAR, T, toSite, toVideo } from "../layout";
import { EASE, EASE_IO, SPRING, mixRect, rectStyle, tw } from "../motion/ease";
import { C, FONT, img } from "../theme";
import { Card, Checkbox, Field, Header, HeroBanner } from "../ui/morent";

const PICK_Y = 372;

const Dropdown: React.FC<{ f: number }> = ({ f }) => {
  const open = tw(f, 58, 64, 0, 1) * tw(f, 70, 75, 1, 0);
  if (open <= 0) return null;
  const hl = tw(f, 63, 67, 0, 1);
  const items = ["Almaly", "Bostandyk", "Medeu"];
  return (
    <div
      style={{
        position: "absolute",
        left: 16,
        top: 120,
        width: 345,
        borderRadius: 8,
        background: C.white,
        boxShadow: "0 12px 30px rgba(26,32,44,0.16)",
        padding: "6px 0",
        fontFamily: FONT,
        opacity: open,
        translate: `0 ${(1 - open) * -8}px`,
        zIndex: 2,
      }}
    >
      <div style={{ fontSize: 11, color: C.muted, padding: "4px 14px", fontWeight: 600, letterSpacing: "0.08em" }}>
        KAZAKHSTAN · ALMATY
      </div>
      {items.map((it) => {
        const active = it === "Medeu";
        return (
          <div
            key={it}
            style={{
              fontSize: 14,
              padding: "8px 14px",
              color: C.ink,
              fontWeight: active ? 600 : 400,
              background: active ? `rgba(53,99,233,${0.1 * hl})` : "transparent",
            }}
          >
            {it}
          </div>
        );
      })}
    </div>
  );
};

export const S2Find: React.FC = () => {
  const f = useCurrentFrame(); // local, 0 = global 50

  // banner grows out of the car
  // the landing car's current rect, in site px; the banner opens around it
  const carNow = toSite(mixRect(HERO_CAR, toVideo(BANNER_CAR), tw(f, 0, T.handoff, 0, 1, EASE_IO)));
  const grow = tw(f, 2, 20, 0, 1, EASE_IO);
  const inset = {
    t: Math.max(0, carNow.y - BANNER.y) * (1 - grow),
    l: Math.max(0, carNow.x - BANNER.x) * (1 - grow),
    r: Math.max(0, BANNER.x + BANNER.w - carNow.x - carNow.w) * (1 - grow),
    b: Math.max(0, BANNER.y + BANNER.h - carNow.y - carNow.h) * (1 - grow),
  };

  const header = tw(f, 10, 28, 0, 1);
  const scroll = tw(f, 40, 60, 0, -150, EASE_IO) + tw(f, 90, 106, 0, -420, EASE_IO);
  const out = tw(f, 92, 106, 1, 0);

  const pick = tw(f, 38, 56, 0, 1);
  const check = tw(f, 50, 64, 0, 1, SPRING);
  const locFocus = tw(f, 56, 60, 0, 1) * tw(f, 72, 78, 1, 0);
  const dateFocus = tw(f, 74, 77, 0, 1) * tw(f, 80, 84, 1, 0);
  const timeFocus = tw(f, 80, 83, 0, 1) * tw(f, 86, 90, 1, 0);

  return (
    <div style={{ position: "absolute", inset: 0, translate: `0 ${scroll}px`, opacity: out }}>
      <Header style={{ opacity: header, translate: `0 ${(1 - header) * -60}px` }} />

      <div
        style={{
          ...rectStyle(BANNER),
          clipPath: `inset(${inset.t}px ${inset.r}px ${inset.b}px ${inset.l}px round 10px)`,
        }}
      >
        <HeroBanner textIn={tw(f, 14, 34, 0, 1, EASE)} style={{ left: 0, top: 0 }} />
      </div>
      {f >= T.handoff ? <Img src={img("nissan.png")} style={rectStyle(BANNER_CAR)} /> : null}

      <Card
        style={{
          left: 16,
          top: PICK_Y,
          width: 377,
          height: 196,
          opacity: pick,
          translate: `0 ${(1 - pick) * 60}px`,
        }}
      >
        <div style={{ position: "absolute", left: 16, top: 16, display: "flex", alignItems: "center", gap: 10 }}>
          <Checkbox checked={check} />
          <div style={{ fontSize: 16, fontWeight: 700 }}>Pick Up</div>
        </div>
        <Field
          label="Locations"
          placeholder="Select a City"
          value={f >= 70 ? "Medeu" : undefined}
          focus={locFocus}
          chevron
          style={{ left: 16, top: 48, width: 345 }}
        />
        <Field
          label="Date"
          placeholder=""
          value={f >= 76 ? "11/28/2026" : undefined}
          focus={dateFocus}
          style={{ left: 16, top: 122, width: 166 }}
        />
        <Field
          label="Time"
          placeholder=""
          value={f >= 82 ? "10:00 AM" : undefined}
          focus={timeFocus}
          style={{ left: 195, top: 122, width: 166 }}
        />
        <Dropdown f={f} />
      </Card>
    </div>
  );
};
