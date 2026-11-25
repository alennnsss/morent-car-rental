import type { Rect } from "./motion/ease";

// The Morent UI is drawn in site pixels (mobile layout, 409px wide)
// and scaled up into a 900px-wide panel in the video.
export const S = 2.2;
export const PANEL = { x: 90, y: 520, w: 900 };
export const SITE_W = PANEL.w / S; // ~409

export const toVideo = (r: Rect): Rect => ({
  x: PANEL.x + r.x * S,
  y: PANEL.y + r.y * S,
  w: r.w * S,
  h: r.h * S,
});

export const toSite = (r: Rect): Rect => ({
  x: (r.x - PANEL.x) / S,
  y: (r.y - PANEL.y) / S,
  w: r.w / S,
  h: r.h / S,
});

export const GTR_RATIO = 216 / 680; // nissan.png from the site
export const carRect = (cx: number, cy: number, w: number): Rect => ({
  x: cx - w / 2,
  y: cy - (w * GTR_RATIO) / 2,
  w,
  h: w * GTR_RATIO,
});

// Global timeline (frames @30fps)
export const T = {
  s1End: 64,
  panelIn: 50, // scene 2 starts, car lands in hero banner
  handoff: 18, // local frame when the hero car joins the panel
  s3: 140,
  s4: 272,
  s5: 395,
  end: 540,
};

// Hero car in the opening shot (video px)
export const HERO_CAR = carRect(540, 1060, 920);

// Scene 2: hero banner car (site px, inside the panel)
export const BANNER = { x: 16, y: 136, w: 377, h: 220 };
export const BANNER_CAR: Rect = {
  x: 131,
  y: 136 + 220 - 250 * GTR_RATIO - 14,
  w: 250,
  h: 250 * GTR_RATIO,
};

// Scene 3: car card list (site px)
export const LIST_SCROLL = 230;
export const CARD_H = 260;
export const GTR_CARD: Rect = { x: 16, y: 354 - LIST_SCROLL, w: 377, h: CARD_H };
export const FOCUS_SCALE = 1.05;

// Scene 4: detail page (site px)
export const GALLERY: Rect = { x: 16, y: 16, w: 377, h: 190 };
export const GALLERY_CAR: Rect = { x: 64.5, y: 16 + 190 - 280 * GTR_RATIO - 14, w: 280, h: 280 * GTR_RATIO };
export const INFO: Rect = { x: 16, y: 302, w: 377, h: 268 };

// Scene 4b: rental summary thumbnail (site px)
export const THUMB: Rect = { x: 36, y: 148, w: 116, h: 80 };
export const THUMB_CAR: Rect = { x: 42, y: 148 + (80 - 104 * GTR_RATIO) / 2, w: 104, h: 104 * GTR_RATIO };

// Closing hero car
export const END_CAR = carRect(540, 1060, 920);
