// Morent UI rebuilt from the site's Vue components (mobile layout, site pixels).
import React from "react";
import { Img } from "remotion";
import { C, FONT, icon, img } from "../theme";

const base: React.CSSProperties = { fontFamily: FONT, color: C.ink, boxSizing: "border-box" };

export const Card: React.FC<{ style?: React.CSSProperties; children?: React.ReactNode }> = ({ style, children }) => (
  <div style={{ ...base, position: "absolute", background: C.white, borderRadius: 10, ...style }}>{children}</div>
);

export const Button: React.FC<{ label: string; press?: number; style?: React.CSSProperties; light?: boolean }> = ({
  label,
  press = 0,
  style,
  light,
}) => (
  <div
    style={{
      ...base,
      background: light ? C.sky : C.blue,
      color: C.white,
      fontSize: 14,
      fontWeight: 500,
      height: 40,
      padding: "0 20px",
      borderRadius: 4,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      whiteSpace: "nowrap",
      scale: String(1 - press * 0.06),
      ...style,
    }}
  >
    {label}
  </div>
);

export const Logo: React.FC<{ size?: number; color?: string; style?: React.CSSProperties }> = ({
  size = 26,
  color = C.blue,
  style,
}) => (
  <div style={{ ...base, fontSize: size, fontWeight: 700, color, letterSpacing: "-0.01em", ...style }}>MORENT</div>
);

export const Header: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div
    style={{
      ...base,
      position: "absolute",
      left: 0,
      top: 0,
      width: 409,
      height: 128,
      background: C.white,
      borderBottom: `1px solid #EEF1F6`,
      ...style,
    }}
  >
    <Logo style={{ position: "absolute", left: 20, top: 20 }} />
    <div
      style={{
        position: "absolute",
        right: 64,
        top: 16,
        width: 40,
        height: 40,
        borderRadius: 20,
        border: `1px solid ${C.line}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Img src={icon("people.png")} style={{ width: 18, height: 18, opacity: 0.6 }} />
    </div>
    <div style={{ position: "absolute", right: 20, top: 18, fontSize: 13, fontWeight: 700, textAlign: "center" }}>
      <Img src={icon("translate.png")} style={{ width: 14, height: 14, display: "block", margin: "0 auto" }} />
      EN
    </div>
    <SearchBar style={{ left: 16, top: 72 }} />
  </div>
);

export const SearchBar: React.FC<{ style?: React.CSSProperties; text?: string }> = ({ style, text }) => (
  <div
    style={{
      ...base,
      position: "absolute",
      width: 377,
      height: 44,
      borderRadius: 70,
      border: `1px solid ${C.blue}`,
      background: C.white,
      display: "flex",
      alignItems: "center",
      padding: "0 16px",
      gap: 12,
      ...style,
    }}
  >
    <Img src={icon("search-button.png")} style={{ width: 20, height: 18 }} />
    <div style={{ flex: 1, fontSize: 14, color: text ? C.ink : "#596780", opacity: text ? 1 : 0.8 }}>
      {text ?? "Search something here"}
    </div>
    <Img src={icon("option-button.png")} style={{ width: 20, height: 16 }} />
  </div>
);

export const HeroBanner: React.FC<{ textIn?: number; style?: React.CSSProperties }> = ({ textIn = 1, style }) => {
  const line = (i: number): React.CSSProperties => {
    const t = Math.min(1, Math.max(0, textIn * 3 - i * 0.6));
    return { opacity: t, translate: `0 ${(1 - t) * 14}px` };
  };
  return (
    <div
      style={{
        ...base,
        position: "absolute",
        width: 377,
        height: 220,
        borderRadius: 10,
        background: C.blue,
        padding: 18,
        color: C.white,
        overflow: "hidden",
        ...style,
      }}
    >
      <div style={{ fontSize: 22, fontWeight: 600, lineHeight: 1.3, width: 260, ...line(0) }}>
        Easy way to rent a car at a low price
      </div>
      <div style={{ fontSize: 12, lineHeight: 1.5, marginTop: 8, width: 240, opacity: 0.9, ...line(1) }}>
        Providing cheap car rental services and safe and comfortable facilities.
      </div>
      <Button label="Rental Car" light style={{ position: "absolute", left: 18, top: 132, height: 34, fontSize: 13, ...line(2) }} />
    </div>
  );
};

export const Checkbox: React.FC<{ checked: number; style?: React.CSSProperties }> = ({ checked, style }) => (
  <div
    style={{
      width: 18,
      height: 18,
      borderRadius: 4,
      border: `1.5px solid ${checked > 0.5 ? C.blue : C.line}`,
      background: checked > 0 ? C.blue : C.white,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      scale: String(0.8 + 0.2 * Math.min(1, checked) + (checked > 1 ? (checked - 1) * 0.15 : 0)),
      ...style,
    }}
  >
    <svg width="12" height="12" viewBox="0 0 12 12">
      <path
        d="M2 6.3l2.6 2.5L10 3.4"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="12"
        strokeDashoffset={12 * (1 - Math.min(1, checked))}
      />
    </svg>
  </div>
);

export const Field: React.FC<{
  label: string;
  value?: string;
  placeholder: string;
  focus?: number;
  style?: React.CSSProperties;
  chevron?: boolean;
}> = ({ label, value, placeholder, focus = 0, style, chevron }) => (
  <div style={{ ...base, position: "absolute", ...style }}>
    <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{label}</div>
    <div
      style={{
        height: 40,
        borderRadius: 6,
        background: C.page,
        border: `1.5px solid ${focus > 0 ? `rgba(53,99,233,${focus})` : "#E3E9F1"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 12px",
        fontSize: 14,
        color: value ? C.ink : C.muted,
        fontWeight: value ? 600 : 400,
      }}
    >
      <span>{value ?? placeholder}</span>
      {chevron ? (
        <svg width="12" height="8" viewBox="0 0 12 8">
          <path d="M1 1.5l5 5 5-5" fill="none" stroke={C.muted} strokeWidth="1.5" />
        </svg>
      ) : null}
    </div>
  </div>
);

export const Stars: React.FC<{ lit: number; size?: number }> = ({ lit, size = 16 }) => (
  <div style={{ display: "flex", gap: 3 }}>
    {[0, 1, 2, 3, 4].map((i) => {
      const on = Math.min(1, Math.max(0, lit - i));
      const filled = i < 4; // site shows 4 of 5 stars
      return (
        <div key={i} style={{ position: "relative", width: size, height: size }}>
          <Img src={icon("star-empty.png")} style={{ position: "absolute", width: size, height: size }} />
          {filled ? (
            <Img
              src={icon("star.png")}
              style={{ position: "absolute", width: size, height: size, opacity: on, scale: String(0.6 + 0.4 * on) }}
            />
          ) : null}
        </div>
      );
    })}
  </div>
);

export type CarData = {
  name: string;
  type: string;
  image: string;
  imageRatio: number;
  fuel: string;
  capacity: string;
  price: number;
};

export const GTR: CarData = {
  name: "Nissan GT - R",
  type: "Sport",
  image: img("nissan.png"),
  imageRatio: 216 / 680,
  fuel: "80L",
  capacity: "2 People",
  price: 80,
};

export const KOENIGSEGG: CarData = {
  name: "Koenigsegg",
  type: "Sport",
  image: img("korvette.png"),
  imageRatio: 330 / 670,
  fuel: "90L",
  capacity: "2 People",
  price: 99,
};

export const SpecIcon: React.FC<{ src: string; label: string }> = ({ src, label }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: C.muted, whiteSpace: "nowrap" }}>
    <Img src={icon(src)} style={{ width: 20, height: 19, opacity: 0.75 }} />
    {label}
  </div>
);

// Mobile car card: title + heart, type, image | specs, price + Rent Now
export const CarCard: React.FC<{
  car: CarData;
  heart?: number;
  press?: number;
  hideImage?: boolean;
  style?: React.CSSProperties;
}> = ({ car, heart = 0, press = 0, hideImage, style }) => (
  <Card style={{ width: 377, height: 260, padding: 16, ...style }}>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ fontSize: 18, fontWeight: 700 }}>{car.name}</div>
      <div style={{ position: "relative", width: 18, height: 18 }}>
        <Img src={icon("heart-white.png")} style={{ position: "absolute", width: 18, height: 16, opacity: 1 - heart }} />
        <Img
          src={icon("heart-red.png")}
          style={{
            position: "absolute",
            width: 18,
            height: 16,
            opacity: Math.min(1, heart),
            scale: String(heart > 0 ? 0.4 + 0.6 * Math.min(1.25, heart) : 0.4),
          }}
        />
      </div>
    </div>
    <div style={{ fontSize: 14, color: C.muted, marginTop: 4 }}>{car.type}</div>
    <div style={{ position: "absolute", left: 16, top: 56, width: 189, height: 120, display: "flex", alignItems: "center" }}>
      {hideImage ? null : <Img src={car.image} style={{ width: 189, height: 189 * car.imageRatio }} />}
    </div>
    <div style={{ position: "absolute", left: 230, top: 66, display: "flex", flexDirection: "column", gap: 14 }}>
      <SpecIcon src="fuel.png" label={car.fuel} />
      <SpecIcon src="manual.png" label="Manual" />
      <SpecIcon src="people.png" label={car.capacity} />
    </div>
    <div style={{ position: "absolute", left: 16, right: 16, top: 200, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
        <span style={{ fontSize: 20, fontWeight: 700 }}>${car.price}.00/</span>
        <span style={{ fontSize: 14, color: C.muted }}>day</span>
      </div>
      <Button label="Rent Now" press={press} style={{ height: 44 }} />
    </div>
  </Card>
);

export const Chip: React.FC<{ label: string; style?: React.CSSProperties }> = ({ label, style }) => (
  <div
    style={{
      ...base,
      height: 32,
      padding: "0 12px",
      borderRadius: 16,
      background: C.blue,
      color: C.white,
      fontSize: 13,
      fontWeight: 600,
      display: "flex",
      alignItems: "center",
      gap: 8,
      ...style,
    }}
  >
    {label}
    <span style={{ opacity: 0.7, fontSize: 12 }}>✕</span>
  </div>
);
