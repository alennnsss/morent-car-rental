"""Original soundtrack for the Morent reel, synthesized from scratch (no samples).

120 BPM, D minor. Event times match the Remotion timeline (frame / 30).
Writes public/audio/soundtrack_raw.wav; loudness is normalised with ffmpeg afterwards.
"""
import wave
import numpy as np

SR = 48000
DUR = 18.0
N = int(SR * DUR)
rng = np.random.default_rng(7)  # fixed seed: the mix is reproducible
L = np.zeros(N)
R = np.zeros(N)


def t_(sec):
    return np.arange(int(SR * sec)) / SR


def frame(f):
    return f / 30.0


def add(sig, at, gain=1.0, pan=0.0):
    """Mix a mono signal at time `at` (s), pan -1..1 (scalar or array)."""
    i = int(at * SR)
    if i >= N:
        return
    sig = sig[: N - i]
    p = np.broadcast_to(np.asarray(pan, dtype=float), sig.shape) if np.ndim(pan) else np.full(sig.shape, pan)
    L[i : i + len(sig)] += sig * gain * np.sqrt((1 - p) / 2)
    R[i : i + len(sig)] += sig * gain * np.sqrt((1 + p) / 2)


def onepole_lp(x, cutoff):
    """One-pole low-pass; cutoff may be an array (time-varying)."""
    c = np.broadcast_to(np.asarray(cutoff, dtype=float), x.shape)
    a = 1 - np.exp(-2 * np.pi * c / SR)
    y = np.empty_like(x)
    s = 0.0
    for n in range(len(x)):
        s += a[n] * (x[n] - s)
        y[n] = s
    return y


def bandish(x, lo, hi):
    return onepole_lp(x, hi) - onepole_lp(x, lo)


def env(n, a, d):
    """Attack (s) then exponential decay with time constant d (s)."""
    t = np.arange(n) / SR
    e = np.exp(-np.maximum(t - a, 0) / d)
    e[t < a] = t[t < a] / max(a, 1e-4)
    return e


def note(name):
    names = {"C": -9, "C#": -8, "D": -7, "D#": -6, "E": -5, "F": -4, "F#": -3, "G": -2, "G#": -1, "A": 0, "A#": 1, "B": 2}
    n, o = name[:-1], int(name[-1])
    return 440.0 * 2 ** ((names[n] + 12 * (o - 4)) / 12)


# ---------- building blocks ----------
def kick(length=0.45, f0=120, f1=42, gain=1.0):
    t = t_(length)
    f = f1 + (f0 - f1) * np.exp(-t / 0.04)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t / 0.16) * gain


def boom(length=2.2):
    t = t_(length)
    f = 30 + 50 * np.exp(-t / 0.15)
    sub = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.7)
    nz = onepole_lp(rng.standard_normal(len(t)), 900) * np.exp(-t / 0.08) * 0.5
    return sub + nz


def whoosh(length, f_from, f_to, gain=1.0):
    n = int(SR * length)
    t = np.arange(n) / n
    cut = f_from * (f_to / f_from) ** t
    nz = rng.standard_normal(n)
    sig = onepole_lp(nz, cut) - onepole_lp(nz, cut * 0.35)
    shape = np.sin(np.pi * t) ** 1.6
    return sig * shape * gain


def tick(freq=2400, length=0.05, gain=0.5):
    t = t_(length)
    body = np.sin(2 * np.pi * freq * t) * np.exp(-t / 0.008)
    click = rng.standard_normal(len(t)) * np.exp(-t / 0.002) * 0.4
    return (body + click) * gain


def bell(freq, length=1.2, gain=0.4):
    t = t_(length)
    s = np.sin(2 * np.pi * freq * t) + 0.35 * np.sin(2 * np.pi * freq * 2.01 * t) + 0.12 * np.sin(2 * np.pi * freq * 3.98 * t)
    return s * env(len(t), 0.003, 0.35) * gain


def engine(length, rpm_from, rpm_to, gain=1.0):
    """Low engine growl: pulse train at firing frequency, low-passed, with rough AM."""
    n = int(SR * length)
    t = np.arange(n) / n
    f = rpm_from + (rpm_to - rpm_from) * (t ** 1.4)
    ph = np.cumsum(f) / SR
    saw = 2 * (ph % 1) - 1
    sub = np.sin(2 * np.pi * ph * 0.5)
    rough = 1 + 0.25 * np.sin(2 * np.pi * np.cumsum(f * 0.25) / SR)
    sig = onepole_lp(saw * rough, 380 + 900 * t) * 1.4 + 0.6 * sub
    shape = np.minimum(1, t * 6) * np.minimum(1, (1 - t) * 4)
    return sig * shape * gain


# ---------- music bed: 120 BPM, D minor, from the first match cut ----------
BEAT = 0.5
MUSIC_IN = frame(50)
bars_chords = [["D3", "F3", "A3"], ["A#2", "D3", "F3"], ["G2", "A#2", "D3"], ["A2", "C#3", "E3"]]
pad = np.zeros(N)
t_all = np.arange(N) / SR
for i in range(int((DUR - MUSIC_IN) / (BEAT * 8)) + 1):
    start = MUSIC_IN + i * BEAT * 8
    chord = bars_chords[i % 4]
    seg = t_(BEAT * 8 + 0.6)
    s = np.zeros(len(seg))
    for nm in chord:
        f = note(nm)
        for det in (-0.12, 0.0, 0.11):
            s += np.sin(2 * np.pi * f * (1 + det / 100) * seg + rng.uniform(0, 6.28))
            s += 0.3 * np.sin(2 * np.pi * 2 * f * (1 + det / 100) * seg)
    s *= np.minimum(1, seg / 0.4) * np.minimum(1, (seg[-1] - seg) / 0.6)
    j = int(start * SR)
    if j < N:
        pad[j : j + len(s)] += s[: N - j] * 0.035
pad = onepole_lp(pad, 1400)

bass = np.zeros(N)
roots = ["D2", "A#1", "G1", "A1"]
kicks = np.zeros(N)
duck = np.ones(N)
b = 0
while MUSIC_IN + b * BEAT < DUR - 0.6:
    at = MUSIC_IN + b * BEAT
    j = int(at * SR)
    k = kick(gain=0.55)
    kicks[j : j + len(k)] += k[: N - j]
    d = 1 - 0.55 * np.exp(-t_(0.4) / 0.12)
    duck[j : j + len(d)] = np.minimum(duck[j : j + len(d)], d[: N - j])
    root = note(roots[(b // 8) % 4])
    bt = t_(0.45)
    bn = np.sin(2 * np.pi * root * bt) * env(len(bt), 0.02, 0.18) * 0.22
    bass[j : j + len(bn)] += bn[: N - j]
    if at > frame(66):  # quiet offbeat hats once the product appears
        hj = int((at + BEAT / 2) * SR)
        h = rng.standard_normal(int(0.04 * SR))
        h = (h - onepole_lp(h, 6000)) * np.exp(-t_(0.04) / 0.01) * 0.05
        if hj < N:
            kicks[hj : hj + len(h)] += h[: N - hj]
    b += 1

# one beat of near-silence on the Rent Now press (8.9 s) and fade-out at the end
press_gap = np.ones(N)
gj = int(frame(268) * SR)
gap = np.concatenate([np.linspace(1, 0.35, int(0.05 * SR)), np.full(int(0.4 * SR), 0.35), np.linspace(0.35, 1, int(0.1 * SR))])
press_gap[gj : gj + len(gap)] = gap
fade = np.clip((DUR - t_all) / 1.0, 0, 1)
fade_in = np.clip((t_all - MUSIC_IN) / 0.3, 0, 1)
music = (pad * duck + bass + kicks) * press_gap * fade * fade_in
add(music, 0, gain=0.9)

# ---------- scene 1: hook ----------
add(boom(), 0.0, gain=0.9)
car_pan = np.linspace(-0.8, 0.2, int(SR * 1.0))
add(engine(1.0, 28, 46, gain=0.22), frame(2), pan=car_pan)
add(kick(0.6, 160, 38, gain=0.7), frame(18))
add(whoosh(0.55, 4000, 500, gain=0.35), frame(48))

# ---------- scene 2: FIND ----------
add(tick(1800, gain=0.35), frame(100))          # Pick Up checkbox
add(tick(2600, gain=0.2), frame(108))           # dropdown opens
add(tick(2200, gain=0.25), frame(120))          # Medeu
add(tick(2400, gain=0.22), frame(126))          # date
add(tick(2600, gain=0.22), frame(132))          # time
add(whoosh(0.45, 900, 5000, gain=0.25), frame(140))  # scroll into the catalog

# ---------- scene 3: CHOOSE ----------
add(tick(1900, gain=0.35), frame(166))          # Sport
add(tick(2100, gain=0.35), frame(176))          # 2 People
add(whoosh(0.5, 700, 3500, gain=0.18), frame(224))  # list scroll
pop_t = t_(0.18)
pop = np.sin(2 * np.pi * np.cumsum(900 - 400 * pop_t / 0.18) / SR) * np.exp(-pop_t / 0.05) * 0.35
add(pop, frame(252))                             # heart
add(tick(1200, 0.08, gain=0.6), frame(266))      # Rent Now press
add(kick(0.3, 90, 50, gain=0.35), frame(266))
add(whoosh(0.6, 600, 6000, gain=0.3), frame(270))   # card opens into detail page

# ---------- scene 4: BOOK ----------
for i, (fr, nm) in enumerate(zip([345, 360, 375, 390], ["D5", "F5", "A5", "D6"])):
    add(tick(2600, gain=0.18), frame(fr))
    add(bell(note(nm), gain=0.16 if i < 3 else 0.26), frame(fr))
riser_n = int(SR * 0.8)
rt = np.arange(riser_n) / riser_n
riser = (onepole_lp(rng.standard_normal(riser_n), 600 + 7000 * rt ** 2) * rt ** 2) * 0.35
gl = np.sin(2 * np.pi * np.cumsum(200 + 600 * rt ** 2) / SR) * rt ** 2 * 0.08
add(riser + gl, frame(390))

# ---------- scene 5: DRIVE ----------
drive_pan = np.linspace(0.0, 1.0, int(SR * 1.2))
add(engine(1.2, 40, 120, gain=0.32), frame(420), pan=drive_pan)
add(whoosh(0.7, 2500, 300, gain=0.3), frame(430), pan=0.6)
for fr in (444, 449, 454, 459):
    add(kick(0.35, 140, 45, gain=0.45), frame(fr))
hit = boom(2.6) * 0.9
chord_t = t_(2.6)
ch = sum(np.sin(2 * np.pi * note(nm) * chord_t) for nm in ("D3", "A3", "D4", "F4")) * env(len(chord_t), 0.01, 0.9) * 0.08
add(hit + ch, frame(468))
add(tick(1500, gain=0.25), frame(504))          # CTA button

# ---------- write ----------
mix = np.stack([L, R], axis=1)
mix /= np.max(np.abs(mix)) * 1.12
pcm = (mix * 32767).astype(np.int16)
with wave.open("public/audio/soundtrack_raw.wav", "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print("ok", pcm.shape)
