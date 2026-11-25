// Scene 4 — BOOK. (global 272–417). Card opens into the detail page,
// then the real 4-step checkout with the Rental Summary.
import React from "react";
import { Img, useCurrentFrame } from "remotion";
import { CARD_H, FOCUS_SCALE, GALLERY, GALLERY_CAR, GTR_CARD, INFO, THUMB, THUMB_CAR } from "../layout";
import { EASE, EASE_IO, Rect, mixRect, rectStyle, tw } from "../motion/ease";
import { C, FONT, img } from "../theme";
import { Button, Card, Stars } from "../ui/morent";

const scaleAbout = (r: Rect, cx: number, cy: number, s: number): Rect => ({
  x: cx + (r.x - cx) * s,
  y: cy + (r.y - cy) * s,
  w: r.w * s,
  h: r.h * s,
});

const CX = GTR_CARD.x + GTR_CARD.w / 2;
const CY = GTR_CARD.y + CARD_H / 2;
const FROM_CARD = scaleAbout(GTR_CARD, CX, CY, FOCUS_SCALE);
const FROM_IMG = scaleAbout({ x: 32, y: GTR_CARD.y + 86, w: 189, h: 60 }, CX, CY, FOCUS_SCALE);

const STEPS = [
  ["Billing Info", "Please enter your billing info"],
  ["Rental Info", "Please enter your rental date"],
  ["Payment Method", "Please enter your payment method"],
  ["Confirmation", "Just few clicks and your rental is ready!"],
];
const TICKS = [73, 88, 103, 118];

const Row: React.FC<{ k: string; v: string; top: number; o: number }> = ({ k, v, top, o }) => (
  <div
    style={{
      position: "absolute",
      left: 20,
      right: 20,
      top,
      display: "flex",
      justifyContent: "space-between",
      fontSize: 15,
      opacity: o,
    }}
  >
    <span style={{ color: C.muted }}>{k}</span>
    <span style={{ color: C.ink, fontWeight: 600 }}>{v}</span>
  </div>
);

const Spec: React.FC<{ k: string; v: string; x: number; y: number; o: number }> = ({ k, v, x, y, o }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: 150,
      display: "flex",
      justifyContent: "space-between",
      fontSize: 14,
      opacity: o,
      translate: `${(1 - o) * -12}px 0`,
    }}
  >
    <span style={{ color: C.muted }}>{k}</span>
    <span style={{ color: C.slate, fontWeight: 600 }}>{v}</span>
  </div>
);

export const S4Book: React.FC = () => {
  const f = useCurrentFrame(); // local, 0 = global 272

  // shared-element morph from the focused GT-R card
  const m = tw(f, 0, 20, 0, 1, EASE_IO);
  const card = mixRect(FROM_CARD, INFO, m);
  const car = mixRect(FROM_IMG, GALLERY_CAR, m);
  const g = tw(f, 4, 22, 0, 1, EASE_IO);
  const gInset = {
    t: (car.y - GALLERY.y) * (1 - g),
    l: (car.x - GALLERY.x) * (1 - g),
    r: (GALLERY.x + GALLERY.w - car.x - car.w) * (1 - g),
    b: (GALLERY.y + GALLERY.h - car.y - car.h) * (1 - g),
  };

  const info = (d: number) => tw(f, 14 + d, 28 + d, 0, 1);
  const thumbs = (i: number) => tw(f, 16 + i * 3, 30 + i * 3, 0, 1);
  const stars = tw(f, 20, 32, 0, 4);
  const parallax = tw(f, 0, 70, 10, -10);

  const scroll = tw(f, 40, 66, 0, -150, EASE_IO) + tw(f, 68, 88, 0, -380, EASE_IO);
  const detailOut = tw(f, 70, 86, 1, 0);

  // checkout + summary
  const sumIn = tw(f, 70, 90, 0, 1);
  const done = TICKS.filter((t) => f >= t).length;
  const step = Math.min(3, done);
  const swap = TICKS.reduce((acc, t) => (f >= t && f < t + 6 ? tw(f, t, t + 6, 0, 1) : acc), 1);
  const safe = tw(f, 108, 124, 0, 1);
  const hideThumbCar = f >= 123; // the closing scene takes the car from here

  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: FONT }}>
      {/* detail page */}
      <div style={{ position: "absolute", inset: 0, translate: `0 ${scroll}px`, opacity: detailOut }}>
        <div
          style={{
            ...rectStyle(GALLERY),
            clipPath: `inset(${gInset.t}px ${gInset.r}px ${gInset.b}px ${gInset.l}px round 10px)`,
            background: C.blue,
            borderRadius: 10,
            padding: 18,
            color: C.white,
            boxSizing: "border-box",
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.3, width: 300, opacity: info(0) }}>
            Sports car with the best design and acceleration
          </div>
          <div style={{ fontSize: 12, lineHeight: 1.5, marginTop: 6, width: 300, opacity: 0.9 * info(4) }}>
            Safety and comfort while driving a futuristic and elegant sports car
          </div>
        </div>
        <Img src={img("nissan.png")} style={{ ...rectStyle(car), zIndex: 1 }} />

        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 16 + i * 128.3,
              top: 218,
              width: 120.3,
              height: 72,
              borderRadius: 10,
              overflow: "hidden",
              background: C.blue,
              opacity: thumbs(i),
              translate: `0 ${(1 - thumbs(i)) * 20}px`,
              outline: i === 0 ? `2px solid ${C.blue}` : undefined,
              outlineOffset: 3,
            }}
          >
            {i === 0 ? (
              <Img src={img("nissan.png")} style={{ position: "absolute", left: 12, top: 24, width: 96, height: 30.5 }} />
            ) : (
              <Img
                src={img(i === 1 ? "salon1.png" : "salon2.png")}
                style={{ position: "absolute", left: -10 + parallax * 0.5, top: -14, width: 140, height: 117 }}
              />
            )}
          </div>
        ))}

        <Card style={{ ...rectStyle(card), padding: 20, overflow: "hidden" }}>
          <div style={{ opacity: info(2) }}>
            <div style={{ fontSize: 26, fontWeight: 700 }}>Nissan GT - R</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
              <Stars lit={stars} size={17} />
              <span style={{ fontSize: 14, color: C.slate }}>440+ Reviewer</span>
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.6, color: C.muted, marginTop: 12, width: 337 }}>
              Nissan GT-R has become the embodiment of Nissan's outstanding performance, inspired by the most unforgiving
              proving ground, the "race track".
            </div>
          </div>
          <Spec k="Type Car" v="Sport" x={20} y={170} o={info(8)} />
          <Spec k="Capacity" v="2 People" x={207} y={170} o={info(10)} />
          <Spec k="Steering" v="Manual" x={20} y={198} o={info(12)} />
          <Spec k="Gasoline" v="80L" x={207} y={198} o={info(14)} />
          <div
            style={{
              position: "absolute",
              left: 20,
              right: 20,
              top: 222,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              opacity: info(18),
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontSize: 24, fontWeight: 700 }}>$80.00/</span>
              <span style={{ fontSize: 14, color: C.muted }}>day</span>
            </div>
            <Button label="Rent Now" />
          </div>
        </Card>
      </div>

      {/* checkout: steps + rental summary */}
      <div style={{ position: "absolute", inset: 0, opacity: sumIn, translate: `0 ${(1 - sumIn) * 300}px` }}>
        <Card style={{ left: 16, top: 8, width: 377, height: 76, padding: "14px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div style={{ opacity: swap, translate: `0 ${(1 - swap) * 8}px` }}>
              <div style={{ fontSize: 17, fontWeight: 700 }}>
                {done === 4 ? "Confirmation ✓" : STEPS[step][0]}
              </div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{STEPS[step][1]}</div>
            </div>
            <div style={{ fontSize: 12, color: C.muted }}>Step {step + 1} of 4</div>
          </div>
          <div style={{ position: "absolute", left: 20, right: 20, top: 62, display: "flex", gap: 6 }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: "#E3E9F1", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${tw(f, TICKS[i] - 6, TICKS[i], 0, 100, EASE)}%`,
                    background: C.blue,
                  }}
                />
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ left: 16, top: 96, width: 377, height: 296 }}>
          <div style={{ position: "absolute", left: 20, top: 18, fontSize: 20, fontWeight: 700 }}>Rental Summary</div>
          <div
            style={{
              ...rectStyle({ x: THUMB.x - 16, y: THUMB.y - 96, w: THUMB.w, h: THUMB.h }),
              background: C.blue,
              borderRadius: 8,
              opacity: hideThumbCar ? 0 : 1,
            }}
          />
          {hideThumbCar ? null : (
            <Img
              src={img("nissan.png")}
              style={rectStyle({ x: THUMB_CAR.x - 16, y: THUMB_CAR.y - 96, w: THUMB_CAR.w, h: THUMB_CAR.h })}
            />
          )}
          <div style={{ position: "absolute", left: 150, top: 62 }}>
            <div style={{ fontSize: 22, fontWeight: 700 }}>Nissan GT - R</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
              <Stars lit={4} size={14} />
              <span style={{ fontSize: 12, color: C.slate }}>440+Reviewer</span>
            </div>
          </div>
          <div style={{ position: "absolute", left: 20, right: 20, top: 148, height: 1, background: "#E3E9F1" }} />
          <Row k="Subtotal" v="$80.00" top={164} o={1} />
          <Row k="Tax" v="$0" top={194} o={1} />
          <div style={{ position: "absolute", left: 20, right: 20, top: 226, height: 1, background: "#E3E9F1" }} />
          <div style={{ position: "absolute", left: 20, top: 240 }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Total Rental Price</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>Overall price and includes rental discount</div>
          </div>
          <div style={{ position: "absolute", right: 20, top: 238, fontSize: 28, fontWeight: 800 }}>$80.00</div>
        </Card>

        <Card
          style={{
            left: 16,
            top: 404,
            width: 377,
            height: 56,
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "0 16px",
            opacity: safe,
            translate: `0 ${(1 - safe) * 24}px`,
          }}
        >
          <Img src={img("safety.png")} style={{ width: 28, height: 28 }} />
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>All your data are safe</div>
            <div style={{ fontSize: 11, color: C.muted }}>We are using the most advanced security.</div>
          </div>
        </Card>
      </div>
    </div>
  );
};
