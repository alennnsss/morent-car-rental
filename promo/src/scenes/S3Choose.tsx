// Scene 3 — CHOOSE. (global 140–292). Real catalog filter, then real car cards.
import React from "react";
import { useCurrentFrame } from "remotion";
import { CARD_H, FOCUS_SCALE, LIST_SCROLL } from "../layout";
import { EASE, EASE_IO, SPRING, tw } from "../motion/ease";
import { C, FONT } from "../theme";
import { Card, CarCard, Checkbox, Chip, GTR, KOENIGSEGG } from "../ui/morent";

const TYPES: [string, number][] = [
  ["Sport", 10],
  ["SUV", 12],
  ["MPV", 16],
  ["Sedan", 20],
  ["Coupe", 14],
  ["Hatchback", 14],
];
const CAPACITY: [string, number][] = [
  ["2 People", 10],
  ["6 People", 12],
];

const Label: React.FC<{ top: number; children: React.ReactNode; o: number }> = ({ top, children, o }) => (
  <div
    style={{
      position: "absolute",
      left: 20,
      top,
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: "0.2em",
      color: C.muted,
      opacity: o,
    }}
  >
    {children}
  </div>
);

export const S3Choose: React.FC = () => {
  const f = useCurrentFrame(); // local, 0 = global 140
  const enter = tw(f, 0, 18, 420, 0, EASE);

  const row = (i: number) => tw(f, 6 + i * 2, 18 + i * 2, 0, 1);
  const sport = tw(f, 26, 40, 0, 1, SPRING);
  const two = tw(f, 36, 50, 0, 1, SPRING);
  const dim = tw(f, 42, 56, 1, 0.35);

  const filterOut = tw(f, 56, 68, 0, 1, EASE_IO);
  const chips = tw(f, 64, 78, 0, 1);
  const koenig = tw(f, 68, 84, 0, 1);
  const gtr = tw(f, 73, 90, 0, 1);
  const scroll = tw(f, 84, 112, 0, -LIST_SCROLL, EASE_IO);
  const focus = tw(f, 100, 114, 0, 1, EASE_IO);
  const heart = tw(f, 112, 128, 0, 1, SPRING);
  const press = tw(f, 126, 129, 0, 1) * tw(f, 129, 136, 1, 0);
  const leave = tw(f, 132, 150, 1, 0);

  const ripple = f >= 128 && f < 146;
  const rr = tw(f, 128, 146, 4, 42);
  const ro = tw(f, 128, 146, 0.7, 0);

  return (
    <div style={{ position: "absolute", inset: 0, translate: `0 ${enter}px`, fontFamily: FONT }}>
      {/* filter panel from the catalog sidebar */}
      <Card
        style={{
          left: 16,
          top: 24,
          width: 377,
          height: 424,
          opacity: 1 - Math.min(1, filterOut * 1.6),
          scale: String(1 - 0.05 * filterOut),
          translate: `0 ${-30 * filterOut}px`,
        }}
      >
        <Label top={20} o={row(0)}>
          TYPE
        </Label>
        {TYPES.map(([name, n], i) => (
          <div
            key={name}
            style={{
              position: "absolute",
              left: 20,
              top: 48 + i * 32,
              display: "flex",
              alignItems: "center",
              gap: 10,
              opacity: row(i + 1) * (i === 0 ? 1 : dim),
              translate: `${(1 - row(i + 1)) * 20}px 0`,
            }}
          >
            <Checkbox checked={i === 0 ? sport : 0} />
            <span style={{ fontSize: 17, color: "#596780", fontWeight: i === 0 && sport > 0.5 ? 600 : 400 }}>{name}</span>
            <span style={{ fontSize: 13, color: C.muted }}>{n}</span>
          </div>
        ))}
        <Label top={252} o={row(7)}>
          CAPACITY
        </Label>
        {CAPACITY.map(([name, n], i) => (
          <div
            key={name}
            style={{
              position: "absolute",
              left: 20,
              top: 280 + i * 32,
              display: "flex",
              alignItems: "center",
              gap: 10,
              opacity: row(i + 8) * (i === 0 ? 1 : dim),
              translate: `${(1 - row(i + 8)) * 20}px 0`,
            }}
          >
            <Checkbox checked={i === 0 ? two : 0} />
            <span style={{ fontSize: 17, color: "#596780", fontWeight: i === 0 && two > 0.5 ? 600 : 400 }}>{name}</span>
            <span style={{ fontSize: 13, color: C.muted }}>{n}</span>
          </div>
        ))}
        <Label top={356} o={row(10) * dim}>
          PRICE
        </Label>
        <div style={{ position: "absolute", left: 20, top: 386, width: 300, opacity: row(11) * dim }}>
          <div style={{ height: 6, borderRadius: 3, background: C.blue }} />
          <div
            style={{
              position: "absolute",
              right: -8,
              top: -6,
              width: 18,
              height: 18,
              borderRadius: 9,
              background: C.blue,
              border: "3px solid white",
              boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
            }}
          />
          <div style={{ fontSize: 14, marginTop: 10, color: C.ink }}>Max. $100.00</div>
        </div>
      </Card>

      {/* results: chips + cards, scrolled to the GT-R */}
      <div style={{ position: "absolute", inset: 0, translate: `0 ${scroll}px`, opacity: leave }}>
        <div
          style={{
            position: "absolute",
            left: 16,
            top: 24,
            width: 377,
            display: "flex",
            gap: 8,
            alignItems: "center",
            opacity: chips,
            translate: `0 ${(1 - chips) * 16}px`,
          }}
        >
          <Chip label="Sport" />
          <Chip label="2 People" />
          <div style={{ marginLeft: "auto", fontSize: 14, fontWeight: 500, color: C.muted }}>2 Cars</div>
        </div>
        <CarCard
          car={KOENIGSEGG}
          style={{
            left: 16,
            top: 76,
            opacity: koenig * (1 - 0.6 * focus),
            translate: `0 ${(1 - koenig) * 80}px`,
            filter: focus > 0.01 ? `blur(${focus * 5}px)` : undefined,
          }}
        />
      </div>
      {f < 132 ? (
        <div style={{ position: "absolute", inset: 0, translate: `0 ${scroll}px` }}>
          <CarCard
            car={GTR}
            heart={heart}
            press={press}
            style={{
              left: 16,
              top: 76 + CARD_H + 18,
              opacity: gtr,
              translate: `0 ${(1 - gtr) * 80}px`,
              scale: String(1 + (FOCUS_SCALE - 1) * focus),
              boxShadow: `0 ${18 * focus}px ${40 * focus}px rgba(0,0,0,${0.35 * focus})`,
            }}
          />
          {ripple ? (
            <div
              style={{
                position: "absolute",
                left: 331 - rr,
                top: 580.6 - rr, // Rent Now centre in the focused card
                width: rr * 2,
                height: rr * 2,
                borderRadius: "50%",
                border: `2px solid ${C.sky}`,
                opacity: ro,
              }}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
