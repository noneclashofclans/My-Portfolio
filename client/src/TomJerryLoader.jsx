import { useState, useEffect, useRef } from "react";

export const TJ_DARK_CSS = `
/* ── TOM & JERRY DARK THEME ──────────────────────────────────────────────── */
/* Palette
   --tj-cream    : #F5EDD6  (Tom's fur / warm paper)
   --tj-brick    : #C0392B  (classic chase red)
   --tj-amber    : #E8A020  (Jerry's warm brown / gold)
   --tj-teal     : #1A7F8E  (kitchen floor / pool blue-green)
   --tj-charcoal : #1A1A1E  (deep night bg)
   --tj-shadow   : #0E0E11  (deepest shadow)
   --tj-muted    : #2D2D35  (cards / panels)
   --tj-panel    : #23232B  (slightly lighter panels)
   --tj-smoke    : #3A3A45  (borders / dividers)
   --tj-dust     : #9A9198  (muted text)
   --tj-chalk    : #EDE8DE  (bright text)
*/

:root {
  --tj-cream    : #F5EDD6;
  --tj-brick    : #C0392B;
  --tj-amber    : #E8A020;
  --tj-teal     : #1A7F8E;
  --tj-charcoal : #1A1A1E;
  --tj-shadow   : #0E0E11;
  --tj-muted    : #2D2D35;
  --tj-panel    : #23232B;
  --tj-smoke    : #3A3A45;
  --tj-dust     : #9A9198;
  --tj-chalk    : #EDE8DE;
}

/* ── RESET ─────────────────────────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ── BODY / ROOT ────────────────────────────────────────────────────────────── */
body {
  background: var(--tj-charcoal);
  color: var(--tj-chalk);
  font-family: 'Courier New', Courier, monospace;
  overflow-x: hidden;
}
.app-root { background: var(--tj-charcoal); min-height: 100vh; }

/* ── NAVBAR ─────────────────────────────────────────────────────────────────── */
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  display: flex; align-items: center; justify-content: space-between;
  padding: 1rem 2.5rem;
  transition: background 0.35s, backdrop-filter 0.35s, border-color 0.35s;
}
.navbar--glass {
  background: rgba(14,14,17,0.82);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--tj-smoke);
}
.navbar__logo { display: flex; align-items: center; gap: 6px; font-size: 1.35rem; font-weight: 700; letter-spacing: -0.5px; }
.logo-text { color: var(--tj-chalk); }
.logo-accent { color: var(--tj-amber); }
.logo-jp { font-size: 0.9rem; color: var(--tj-dust); margin-left: 4px; }
.kinetic-tilt { transition: transform 0.2s; }
.kinetic-tilt:hover { transform: rotate(-3deg) scale(1.05); }

.navbar__links { display: flex; gap: 2rem; list-style: none; }
.navbar__links a {
  color: var(--tj-dust); text-decoration: none; font-size: 0.85rem;
  letter-spacing: 1.5px; text-transform: uppercase;
  position: relative; padding-bottom: 3px; transition: color 0.2s;
}
.navbar__links a::after {
  content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 1.5px;
  background: var(--tj-amber); transition: width 0.25s;
}
.navbar__links a:hover, .navbar__links a.active { color: var(--tj-chalk); }
.navbar__links a:hover::after, .navbar__links a.active::after { width: 100%; }

.navbar__burger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
.navbar__burger span { display: block; width: 24px; height: 2px; background: var(--tj-dust); transition: all 0.25s; border-radius: 2px; }
@media (max-width: 768px) {
  .navbar__burger { display: flex; }
  .navbar__links { position: fixed; top: 0; right: -100%; flex-direction: column; gap: 2.5rem; background: var(--tj-shadow); width: 70%; height: 100vh; padding: 5rem 2rem; transition: right 0.3s; }
  .navbar__links--open { right: 0; }
}

/* ── PARTICLES CANVAS ──────────────────────────────────────────────────────── */
.particles-canvas { position: absolute; inset: 0; pointer-events: none; z-index: 0; }

/* ── HERO ───────────────────────────────────────────────────────────────────── */
.hero {
  position: relative; min-height: 100vh; display: flex; align-items: center;
  justify-content: space-between; gap: 2rem;
  padding: 6rem 2.5rem 4rem; overflow: hidden;
  background: radial-gradient(ellipse 120% 80% at 0% 50%, rgba(26,127,142,0.08) 0%, transparent 60%),
              radial-gradient(ellipse 80% 60% at 100% 20%, rgba(192,57,43,0.07) 0%, transparent 55%),
              var(--tj-charcoal);
}
.hero__warp-grid {
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
}
.hero__content { position: relative; z-index: 2; max-width: 560px; }
.hero__workspace-anchor { position: relative; z-index: 2; flex-shrink: 0; }

/* ── JP SCENE / DECORATIONS ─────────────────────────────────────────────────── */
.jp-scene-hero { position: absolute; inset: 0; pointer-events: none; z-index: 1; overflow: hidden; }
.torii-hero { position: absolute; right: 3%; top: 10%; width: 90px; opacity: 0.25; }
.bamboo-hero-l { position: absolute; left: 0; bottom: 0; width: 40px; opacity: 0.18; }
.bamboo-hero-r { position: absolute; right: 1%; bottom: 0; width: 36px; opacity: 0.14; }
.sakura-overlay { position: absolute; right: 5%; top: 5%; width: 35%; opacity: 0.4; }
.jp-section-deco { position: absolute; top: 3rem; pointer-events: none; opacity: 0.1; z-index: 0; }
.house-deco--l { left: 0; width: 80px; }
.house-deco--r { right: 0; width: 80px; }

/* ── AMBIENT GLOWS ──────────────────────────────────────────────────────────── */
.animated-ambient-glow {
  position: absolute; border-radius: 50%; filter: blur(80px);
  opacity: 0.12; pointer-events: none; z-index: 0; animation: ambientDrift 8s ease-in-out infinite alternate;
}
.glow-pos-1 { width: 500px; height: 500px; background: var(--tj-teal); top: -100px; left: -150px; }
.glow-pos-2 { width: 400px; height: 400px; background: var(--tj-brick); bottom: -100px; right: -100px; animation-delay: -3s; }
@keyframes ambientDrift { from { transform: translate(0,0) scale(1); } to { transform: translate(40px, 30px) scale(1.1); } }

/* ── JP SEAL ────────────────────────────────────────────────────────────────── */
.jp-seal {
  display: inline-flex; align-items: center; justify-content: center;
  width: 48px; height: 48px; border: 1.5px solid var(--tj-brick);
  border-radius: 50%; margin-bottom: 1.2rem;
  background: rgba(192,57,43,0.08);
  color: var(--tj-brick); font-size: 1.4rem;
}

/* ── HERO NAME ──────────────────────────────────────────────────────────────── */
.hero__name {
  font-size: clamp(1.6rem, 6vw, 4.5rem); font-weight: 800; line-height: 1.05;
  letter-spacing: -2px; margin-bottom: 1rem; color: var(--tj-chalk);
  display: block;
}
.kinetic-letter {
  display: inline-block; opacity: 0; transform: translateY(28px) rotate(6deg);
  transition: opacity 0.35s, transform 0.45s cubic-bezier(.22,.8,.4,1.2);
}
.kinetic-letter--in { opacity: 1; transform: none; }
.kinetic-letter.space { width: 0.35em; }

/* ── TYPEWRITER ─────────────────────────────────────────────────────────────── */
.hero__role-box {
  font-family: 'Courier New', monospace;
  font-size: clamp(0.9rem, 2vw, 1.2rem);
  color: var(--tj-amber); letter-spacing: 2px;
  margin-bottom: 1.2rem; text-transform: uppercase;
}
.cursor-blink { animation: cursorBlink 0.9s step-end infinite; }
@keyframes cursorBlink { 0%,100%{opacity:1} 50%{opacity:0} }

/* ── HERO BIO ───────────────────────────────────────────────────────────────── */
.hero__bio {
  font-size: 1rem; line-height: 1.75; color: var(--tj-dust);
  max-width: 420px; margin-bottom: 2rem;
}
.fade-pull-up { animation: fadePullUp 0.9s 1.2s both; }
@keyframes fadePullUp { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform:none; } }

/* ── HERO BUTTONS ───────────────────────────────────────────────────────────── */
.hero__actions { display: flex; gap: 1rem; flex-wrap: wrap; }
.neon-trace-btn {
  position: relative; display: inline-block; padding: 0.75rem 1.8rem;
  background: transparent; border: 1px solid var(--tj-amber);
  color: var(--tj-amber); text-decoration: none; font-size: 0.85rem;
  letter-spacing: 1.5px; text-transform: uppercase; overflow: hidden;
  transition: color 0.2s; border-radius: 2px;
}
.neon-trace-btn::before {
  content:''; position:absolute; inset:0; background: var(--tj-amber);
  transform: translateX(-101%); transition: transform 0.28s cubic-bezier(.4,0,.2,1);
}
.neon-trace-btn:hover { color: var(--tj-shadow); }
.neon-trace-btn:hover::before { transform: none; }
.btn-inner { position: relative; z-index: 1; }
.sleek-ghost-btn {
  display: inline-block; padding: 0.75rem 1.8rem; background: transparent;
  border: 1px solid var(--tj-smoke); color: var(--tj-dust); text-decoration: none;
  font-size: 0.85rem; letter-spacing: 1.5px; text-transform: uppercase;
  transition: border-color 0.2s, color 0.2s; border-radius: 2px;
}
.sleek-ghost-btn:hover { border-color: var(--tj-dust); color: var(--tj-chalk); }

/* ── SECTIONS ───────────────────────────────────────────────────────────────── */
.section { position: relative; padding: 6rem 2.5rem; overflow: hidden; }
.section__inner { max-width: 900px; margin: 0 auto; transition: opacity 0.6s, transform 0.6s; width: 100%; box-sizing: border-box; }
.hidden-pull-down { opacity: 0; transform: translateY(48px); }
.elastic-pull-up { opacity: 1; transform: none; }

.section__heading {
  font-size: clamp(1.7rem, 3.5vw, 2.6rem); font-weight: 700; letter-spacing: -1px;
  margin-bottom: 2.5rem; color: var(--tj-chalk);
}
.heading-dot { color: var(--tj-brick); }
.jp-heading-label { font-size: 0.8em; color: var(--tj-dust); margin-left: 0.5rem; font-weight: 400; }

/* ── INK BRUSH DIVIDER ──────────────────────────────────────────────────────── */
.ink-brush-divider {
  display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;
  color: var(--tj-dust);
}
.ink-stroke-svg { flex: 1; height: 24px; }
.ink-kanji { font-size: 1.2rem; color: var(--tj-smoke); flex-shrink: 0; }

/* ── GLASS PANEL ────────────────────────────────────────────────────────────── */
.glass-panel {
  background: rgba(35,35,43,0.7);
  border: 1px solid var(--tj-smoke);
  backdrop-filter: blur(12px);
}

/* ── SPINNING TRACE CARD ────────────────────────────────────────────────────── */
.spinning-trace-card { position: relative; border-radius: 8px; overflow: hidden; }
.spinning-trace-card::before {
  content:''; position:absolute; inset:-1px; z-index:0; border-radius:9px;
  background: conic-gradient(from var(--a,0deg), transparent 60%, var(--tj-amber) 80%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s;
  animation: spinTrace 3s linear infinite;
}
.spinning-trace-card:hover::before { opacity: 1; }
@keyframes spinTrace { to { --a: 360deg; } }
@property --a { syntax:'<angle>'; inherits:false; initial-value:0deg; }
.spinning-trace-card__inner { position: relative; z-index: 1; border-radius: 7px; padding: 1.5rem; }

/* ── SKILLS GRID ────────────────────────────────────────────────────────────── */
.skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.2rem; }
.skill-category-title { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 2px; color: var(--tj-amber); margin-bottom: 0.9rem; }
.skill-pills-wrapper { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.kinetic-pill {
  padding: 0.28rem 0.75rem; background: var(--tj-muted); border: 1px solid var(--tj-smoke);
  border-radius: 2px; font-size: 0.78rem; color: var(--tj-dust); letter-spacing: 0.5px;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}
.kinetic-pill:hover { background: rgba(232,160,32,0.12); color: var(--tj-amber); border-color: var(--tj-amber); }

/* ── FLOAT LAYERS ───────────────────────────────────────────────────────────── */
.float-layer-slow { animation: floatSlow 6s ease-in-out infinite alternate; }
.float-layer-medium { animation: floatSlow 4s ease-in-out infinite alternate; animation-delay: -1s; }
.float-layer-fast { animation: floatSlow 2.5s ease-in-out infinite alternate; }
.float-layer-1 { animation: floatSlow 5s ease-in-out infinite alternate; }
.float-layer-2 { animation: floatSlow 7s ease-in-out infinite alternate; animation-delay: -2s; }
.float-layer-3 { animation: floatSlow 3.5s ease-in-out infinite alternate; animation-delay: -0.5s; }
@keyframes floatSlow { from { transform: translateY(0); } to { transform: translateY(-6px); } }

/* ── PROJECTS GRID ──────────────────────────────────────────────────────────── */
.projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px,1fr)); gap: 1.5rem; }
.project-card-inner { position: relative; overflow: hidden; }
.project-accent-glow {
  position: absolute; top: -30px; right: -30px; width: 120px; height: 120px;
  border-radius: 50%; filter: blur(50px); opacity: 0.18; pointer-events: none;
  transition: opacity 0.3s;
}
.project-card-wrap:hover .project-accent-glow { opacity: 0.32; }
.project-meta-tag { font-size: 0.72rem; letter-spacing: 2px; text-transform: uppercase; color: var(--tj-dust); }
.project-title { font-size: 1.2rem; font-weight: 700; color: var(--tj-chalk); margin: 0.5rem 0 0.7rem; letter-spacing: -0.5px; }
.project-description { font-size: 0.85rem; color: var(--tj-dust); line-height: 1.7; margin-bottom: 1rem; }
.project-tech-stack { display: flex; flex-wrap: wrap; gap: 0.35rem; }
.tech-badge {
  padding: 0.22rem 0.6rem; border: 1px solid; border-radius: 2px;
  font-size: 0.72rem; letter-spacing: 0.5px;
  border-color: var(--tech-color, var(--tj-smoke));
  color: var(--tech-color, var(--tj-dust));
  background: rgba(255,255,255,0.03);
}

/* ── TIMELINE ───────────────────────────────────────────────────────────────── */
.timeline-sub-heading {
  font-size: 0.78rem; text-transform: uppercase; letter-spacing: 2.5px;
  color: var(--tj-dust); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;
}
.timeline-sub-icon { font-size: 1rem; }
.kinetic-timeline { display: flex; flex-direction: column; gap: 0; padding-left: 1.5rem; border-left: 1px solid var(--tj-smoke); }
.timeline-node { position: relative; padding: 0 0 2.5rem 2.5rem; }
.timeline-neon-indicator { position: absolute; left: -9px; top: 4px; }
.neon-core {
  display: block; width: 16px; height: 16px; border-radius: 50%;
  background: var(--tj-muted); border: 2px solid var(--tj-smoke);
}
.neon-core--active { background: var(--tj-amber); border-color: var(--tj-amber); box-shadow: 0 0 8px var(--tj-amber); }
.neon-core--edu { background: var(--tj-teal); border-color: var(--tj-teal); }
.timeline-neon-indicator--edu .neon-core { background: var(--tj-teal); border-color: var(--tj-teal); }
.timeline-content-panel { border-radius: 6px; padding: 1.2rem 1.4rem; }
.active-badge { font-size: 0.72rem; letter-spacing: 1.5px; color: var(--tj-amber); margin-bottom: 0.5rem; text-transform: uppercase; }
.timeline-header-block { display: flex; justify-content: space-between; align-items: baseline; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.4rem; }
.timeline-role-title { font-size: 1rem; font-weight: 600; color: var(--tj-chalk); }
.timeline-timeframe { font-size: 0.78rem; color: var(--tj-dust); }
.timeline-timeframe--edu { color: var(--tj-teal); }
.timeline-org-identifier { font-size: 0.82rem; color: var(--tj-dust); margin-bottom: 0.7rem; }
.timeline-bullet-matrix { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.35rem; }
.timeline-bullet-matrix li { font-size: 0.83rem; color: var(--tj-dust); padding-left: 1rem; position: relative; line-height: 1.6; }
.timeline-bullet-matrix li::before { content: '›'; position: absolute; left: 0; color: var(--tj-amber); }
.edu-detail-badge {
  display: inline-block; padding: 0.2rem 0.6rem; font-size: 0.75rem;
  background: rgba(26,127,142,0.12); border: 1px solid rgba(26,127,142,0.3);
  color: var(--tj-teal); border-radius: 2px; margin-top: 0.4rem;
}

/* ── CONTACT ────────────────────────────────────────────────────────────────── */
.contact-section {
  background: radial-gradient(ellipse 70% 50% at 50% 100%, rgba(26,127,142,0.07), transparent);
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
.contact-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
}
.contact-glass-box {
  position: relative;
  max-width: 560px;
  width: 100%;
  min-width: 0;
  border-radius: 10px;
  padding: 3rem 2.5rem;
  text-align: center;
  overflow: hidden;
  box-sizing: border-box;
}
.contact-ambient-core {
  position: absolute; top: -80px; left: 50%; transform: translateX(-50%);
  width: 250px; height: 250px; border-radius: 50%;
  background: var(--tj-teal); filter: blur(80px); opacity: 0.07; pointer-events: none;
}
.contact-lead { font-size: 0.9rem; color: var(--tj-dust); line-height: 1.7; margin: 0.5rem 0 2rem; }
.contact-nodes { display: flex; flex-direction: column; gap: 0.75rem; }
.contact-node-link {
  display: flex; align-items: center; gap: 1rem;
  padding: 0.9rem 1.2rem; background: var(--tj-muted); border: 1px solid var(--tj-smoke);
  border-radius: 4px; text-decoration: none; color: var(--tj-dust);
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}
.contact-node-link:hover { border-color: var(--tj-amber); color: var(--tj-chalk); background: rgba(232,160,32,0.06); }
.node-icon { font-size: 1rem; font-weight: 700; color: var(--tj-amber); min-width: 24px; }
.node-label { flex: 1; font-size: 0.85rem; letter-spacing: 1px; text-transform: uppercase; text-align: left; }
.node-arrow { font-size: 0.9rem; }

/* ── VOXEL / WORKSPACE ──────────────────────────────────────────────────────── */
.voxel-scene-wrapper { width: 380px; }
.desk-scene { position: relative; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
.desk { width: 320px; }
.desk-top { position: relative; display: flex; align-items: flex-end; gap: 8px; padding: 10px 12px 0; }
.desk-front { height: 14px; background: #3a3024; border-radius: 0 0 4px 4px; }
.desk-leg { position: absolute; bottom: -30px; width: 12px; height: 30px; background: #2e2518; border-radius: 2px; }
.desk-leg--l { left: 20px; }
.desk-leg--r { right: 20px; }

/* monitor */
.monitor { display: flex; flex-direction: column; align-items: center; }
.monitor-screen { width: 160px; height: 100px; border-radius: 4px; padding: 6px; overflow: hidden; position: relative; }
.monitor-stand { width: 8px; height: 20px; background: #555; }
.monitor-base { width: 50px; height: 6px; background: #444; border-radius: 4px; }
.screen-lines { font-size: 6.5px; line-height: 1.6; font-family: monospace; }
.sl--cyan { color: #5ef; }
.sl--white { color: #ddd; }
.sl--violet { color: var(--tj-amber); }
.sl--gold { color: var(--tj-brick); }
.sl--muted { color: #888; }
.sl--indent { margin-left: 10px; display: inline-block; }
.animated-code-scroll { animation: codeScroll 8s linear infinite; }
@keyframes codeScroll { 0% { transform: translateY(0); } 100% { transform: translateY(-60%); } }

/* keyboard */
.keyboard {
  display: flex; flex-wrap: wrap; gap: 2px; width: 90px; padding: 4px;
  background: #2a2a32; border: 1px solid #3f3f4d; border-radius: 3px;
}
.key {
  width: 9px; height: 8px; border-radius: 1px;
  background: #3a3a47; animation: rgbKey 3s ease-in-out infinite alternate;
}
@keyframes rgbKey {
  0%  { background: #3a3a47; }
  33% { background: rgba(192,57,43,0.5); }
  66% { background: rgba(26,127,142,0.5); }
  100%{ background: rgba(232,160,32,0.5); }
}
.rgb-glow { box-shadow: 0 0 8px rgba(232,160,32,0.15); }
.mouse { width: 18px; height: 26px; background: #2a2a32; border: 1px solid #3f3f4d; border-radius: 10px; }

/* server */
.voxel-server { display: flex; flex-direction: column; gap: 2px; cursor: pointer; }
.server-unit { background: #1e1e28; border: 1px solid #333; border-radius: 3px; padding: 4px; }
.led-grid { display: flex; gap: 3px; }
.led { width: 6px; height: 6px; border-radius: 50%; display: inline-block; }
.led--cyan { background: var(--tj-teal); }
.led--violet { background: #7c6fa0; }
.led--gold { background: var(--tj-amber); }
.led--red-warn { background: var(--tj-brick); }
.led--pulse { background: #5ef; animation: ledPulse 1.2s ease-in-out infinite; }
.led--pulse-fast { background: var(--tj-amber); animation: ledPulse 0.5s ease-in-out infinite; }
.led--blink { background: #7c6fa0; animation: ledBlink 0.8s step-end infinite; }
@keyframes ledPulse { 0%,100%{opacity:0.3} 50%{opacity:1} }
@keyframes ledBlink { 0%,100%{opacity:1} 50%{opacity:0} }
.server-data-stream { display: flex; gap: 4px; }
.byte { font-size: 7px; color: var(--tj-teal); font-family: monospace; animation: byteFlip 1.5s ease-in-out infinite; }
@keyframes byteFlip { 0%,100%{opacity:0.4} 50%{opacity:1} }

/* coffee mug */
.coffee-mug { position: absolute; right: 12px; top: -28px; width: 22px; height: 24px; background: var(--tj-brick); border-radius: 3px 3px 4px 4px; }
.mug-handle { position: absolute; right: -8px; top: 5px; width: 8px; height: 10px; border: 2px solid var(--tj-brick); border-radius: 0 50% 50% 0; }
.mug-steam { position: absolute; top: -12px; width: 3px; height: 10px; background: rgba(255,255,255,0.15); border-radius: 50%; animation: steamRise 2s ease-in-out infinite; }
.mug-steam--1 { left: 4px; animation-delay: 0s; }
.mug-steam--2 { left: 10px; animation-delay: 0.7s; }
@keyframes steamRise { 0%{transform:translateY(0) scaleX(1);opacity:0.5} 100%{transform:translateY(-12px) scaleX(1.5);opacity:0} }

/* tux */
.voxel-tux { cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 2px; position: relative; }
.tux-head { width: 22px; height: 22px; background: #222; border-radius: 50%; position: relative; display: flex; align-items: center; justify-content: center; }
.tux-eye { width: 4px; height: 4px; background: white; border-radius: 50%; position: absolute; top: 6px; }
.tux-eye--l { left: 4px; }
.tux-eye--r { right: 4px; }
.tux-beak { width: 6px; height: 4px; background: var(--tj-amber); border-radius: 0 0 50% 50%; margin-top: 12px; }
.tux-body { width: 28px; height: 26px; background: #222; border-radius: 4px; position: relative; display: flex; justify-content: center; }
.tux-belly { width: 16px; height: 16px; background: #f0f0f0; border-radius: 50%; margin-top: 3px; }
.tux-wing { position: absolute; top: 5px; width: 8px; height: 14px; background: #333; border-radius: 50%; }
.tux-wing--l { left: -5px; transform: rotate(10deg); }
.tux-wing--r { right: -5px; transform: rotate(-10deg); }
.tux-foot { width: 12px; height: 6px; background: var(--tj-amber); border-radius: 0 0 4px 4px; }
.tux--hack { animation: tuxHack 0.15s step-end infinite; }
@keyframes tuxHack { 0%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
.tux--spin { animation: tuxSpin 0.5s linear infinite; }
@keyframes tuxSpin { to{transform:rotate(360deg)} }
.tux-cmd-bubble {
  position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%);
  background: var(--tj-shadow); border: 1px solid var(--tj-amber);
  border-radius: 4px; padding: 3px 7px; font-size: 7px; white-space: nowrap;
  color: var(--tj-amber);
}
.pulse-fast { animation: pulseOpacity 0.4s ease-in-out infinite alternate; }
@keyframes pulseOpacity { from{opacity:0.6} to{opacity:1} }

/* dog */
.voxel-dog { cursor: pointer; position: absolute; left: -30px; top: -40px; z-index: 3; }
.dog-body { position: relative; width: 52px; height: 72px; transform-style: preserve-3d; }
.dog-head { width: 40px; height: 34px; background: #c8a87a; border-radius: 6px 6px 3px 3px; position: absolute; top: 0; left: 6px; }
.dog-ear { position: absolute; top: -8px; width: 14px; height: 16px; background: #a07850; border-radius: 50% 50% 0 0; }
.dog-ear--l { left: 0; transform: rotate(-8deg); }
.dog-ear--r { right: 0; transform: rotate(8deg); }
.dog-eye { position: absolute; top: 9px; width: 7px; height: 7px; background: #1a1008; border-radius: 50%; }
.dog-eye--l { left: 6px; }
.dog-eye--r { right: 6px; }
.dog-nose { position: absolute; bottom: 6px; left: 50%; transform: translateX(-50%); width: 8px; height: 5px; background: #7a3a2a; border-radius: 50%; }
.dog-mouth { position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%); width: 10px; height: 4px; border-bottom: 2px solid #7a3a2a; border-radius: 0 0 50% 50%; }
.dog-torso { width: 36px; height: 28px; background: #c8a87a; border-radius: 4px; position: absolute; top: 36px; left: 8px; }
.dog-collar { width: 36px; height: 6px; background: var(--tj-brick); border-radius: 2px; position: absolute; top: 0; }
.dog-belly { width: 24px; height: 16px; background: #e0c89e; border-radius: 50%; position: absolute; bottom: 2px; left: 6px; }
.dog-tail { width: 8px; height: 22px; background: #a07850; border-radius: 50%; position: absolute; top: 30px; right: 0; transform-origin: bottom; animation: tailWag 0.8s ease-in-out infinite alternate; }
@keyframes tailWag { from{transform:rotate(-25deg)} to{transform:rotate(25deg)} }
.dog-leg { width: 10px; height: 18px; background: #a07850; border-radius: 3px; position: absolute; top: 56px; }
.dog-leg--fl { left: 6px; animation: legWalk 0.5s ease-in-out infinite alternate; }
.dog-leg--fr { left: 18px; animation: legWalk 0.5s ease-in-out infinite alternate; animation-delay: -0.25s; }
.dog-leg--bl { right: 16px; animation: legWalk 0.5s ease-in-out infinite alternate; animation-delay: -0.1s; }
.dog-leg--br { right: 4px; animation: legWalk 0.5s ease-in-out infinite alternate; animation-delay: -0.35s; }
@keyframes legWalk { from{transform:rotate(-10deg)} to{transform:rotate(10deg)} }

/* dog states */
.dog--jump .dog-body { animation: dogJump 0.6s ease-out infinite; }
@keyframes dogJump { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-24px) rotate(5deg)} }
.dog--fly .dog-body { animation: dogFly 1.5s ease-in-out infinite; }
@keyframes dogFly { 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(-18px) rotate(15deg)} }

/* crash pieces */
.crash-piece {
  position: absolute; border-radius: 2px; z-index: 10;
  animation: crashFly 2.5s cubic-bezier(.2,.8,.4,1) forwards;
  top: 20px; left: 20px;
}
@keyframes crashFly {
  0%{transform:translate(0,0) rotate(0)} 100%{transform:translate(var(--tx),var(--ty)) rotate(var(--tr)); opacity:0}
}

/* glass button */
.glass-btn {
  padding: 0.4rem 0.9rem; background: rgba(35,35,43,0.7); border: 1px solid var(--tj-smoke);
  color: var(--tj-dust); font-size: 0.75rem; letter-spacing: 1px; cursor: pointer;
  border-radius: 3px; text-transform: uppercase; transition: all 0.2s;
  font-family: inherit;
}
.glass-btn:hover { border-color: var(--tj-amber); color: var(--tj-amber); background: rgba(232,160,32,0.08); }
.glass-btn--cyan:hover { border-color: var(--tj-teal); color: var(--tj-teal); background: rgba(26,127,142,0.08); }
.glass-btn--danger:hover { border-color: var(--tj-brick); color: var(--tj-brick); background: rgba(192,57,43,0.08); }
.voxel-controls { display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: center; margin-top: 0.5rem; }
.bounce-up { animation: bounceUp 0.8s 1.5s both; }
@keyframes bounceUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:none} }

/* face stuff */
.dog-face { position: absolute; }
.dog-face--back { background: #b0926a; }
.dog-face--left,.dog-face--right { background: #a07850; }
.dog-face--top { background: #d4b082; }
.dog-face--bottom { background: #906840; }

/* cherry blossom animations */
.cherry-blossom-cluster { animation: blossomSway 3s ease-in-out infinite; }
@keyframes blossomSway { 0%,100%{transform:rotate(-3deg)} 50%{transform:rotate(3deg)} }
.falling-petal { animation: petalFall 4s ease-in infinite; }
.petal-1 { animation-delay: 0s; animation-duration: 5s; }
.petal-2 { animation-delay: 1.2s; animation-duration: 4.5s; }
.petal-3 { animation-delay: 0.5s; animation-duration: 6s; }
.petal-4 { animation-delay: 2s; animation-duration: 5.5s; }
@keyframes petalFall { 0%{transform:translateY(-20px) rotate(0);opacity:0.8} 100%{transform:translateY(80px) rotate(180deg);opacity:0} }

/* jp house */
.jp-house, .jp-torii, .jp-bamboo { display: block; }

/* ── FOOTER ─────────────────────────────────────────────────────────────────── */
.footer-glass {
  position: relative; padding: 3rem 2rem; text-align: center;
  border-top: 1px solid var(--tj-smoke); overflow: hidden;
  background: var(--tj-shadow);
}
.jp-footer-bamboo { position: absolute; left: 0; bottom: 0; opacity: 0.08; }
.bamboo-footer { width: 50px; }
.footer-brand { font-size: 0.85rem; color: var(--tj-dust); margin-bottom: 0.5rem; }
.highlight-cyan { color: var(--tj-teal); }
.footer-jp-proverb { font-size: 0.8rem; color: var(--tj-smoke); margin-bottom: 0.4rem; font-style: italic; }
.footer-system-status { font-size: 0.72rem; color: var(--tj-amber); letter-spacing: 1.5px; text-transform: uppercase; }

/* ── RESPONSIVE ─────────────────────────────────────────────────────────────── */

@media (max-width: 1024px) {
  .hero { flex-direction: column; align-items: flex-start; padding: 5rem 2rem 3rem; gap: 3rem; }
  .hero__content { max-width: 100%; }
  .hero__workspace-anchor { width: 100%; display: flex; justify-content: center; }
  .voxel-scene-wrapper { width: 100%; max-width: 380px; }
  .torii-hero { width: 60px; opacity: 0.15; }
  .bamboo-hero-l, .bamboo-hero-r { width: 28px; opacity: 0.12; }
  .sakura-overlay { width: 45%; opacity: 0.3; }
}

@media (max-width: 768px) {
  .section { padding: 4rem 1.25rem; }
  .section__inner { width: 100%; }
  .section__heading { font-size: 1.5rem; margin-bottom: 1.75rem; }

  .hero { padding: 4.5rem 1.25rem 2.5rem; gap: 2rem; }
  .hero__name { letter-spacing: -1px; }
  .hero__bio { font-size: 0.9rem; }
  .hero__actions { flex-direction: column; gap: 0.75rem; }
  .neon-trace-btn, .sleek-ghost-btn { width: 100%; text-align: center; }

  .skills-grid { grid-template-columns: 1fr 1fr; gap: 0.85rem; }
  .projects-grid { grid-template-columns: 1fr; gap: 1.2rem; }

  .kinetic-timeline { padding-left: 1.1rem; }
  .timeline-node { padding: 0 0 2rem 1.8rem; }
  .timeline-header-block { flex-direction: column; gap: 0.2rem; align-items: flex-start; }
  .timeline-role-title { font-size: 0.95rem; }
  .timeline-content-panel { padding: 1rem 1.1rem; }
  .timeline-bullet-matrix li { font-size: 0.8rem; }

  .contact-section { display: none; }

  .footer-glass { padding: 2rem 1.25rem; }
  .footer-jp-proverb { font-size: 0.72rem; }
  .navbar { padding: 0.85rem 1.25rem; }

  .voxel-scene-wrapper { transform: scale(0.82); transform-origin: top center; }
  .desk-scene { gap: 0.5rem; }
}

@media (max-width: 480px) {
  .hero { padding: 4rem 1rem 2rem; }
  .section { padding: 3rem 1rem; }
  .section__heading { font-size: 1.3rem; }
  .hero__name { font-size: clamp(1.4rem, 8vw, 2rem); letter-spacing: -0.5px; }
  .hero__role-box { font-size: 0.72rem; letter-spacing: 1px; }
  .hero__bio { font-size: 0.82rem; }
  .contact-section { display: none; }

  .skills-grid { grid-template-columns: 1fr; }
  .spinning-trace-card__inner { padding: 1.1rem; }

  .contact-section { padding: 2.5rem 1rem 3.5rem; }
  .contact-glass-box { max-width: 100% !important; width: 100% !important; padding: 1.5rem 1rem; }
  .contact-lead { font-size: 0.82rem; }
  .contact-node-link { padding: 0.75rem 0.85rem; gap: 0.6rem; }
  .node-label { font-size: 0.72rem; letter-spacing: 0px; }

  .timeline-org-identifier { font-size: 0.78rem; }
  .voxel-scene-wrapper { transform: scale(0.7); transform-origin: top center; }
  .footer-jp-proverb { display: none; }
}

@media (max-width: 360px) {
  .section { padding: 2.5rem 0.85rem; }
  .contact-glass-box { padding: 1.25rem 0.85rem; }
  .contact-node-link { flex-wrap: wrap; }
  .node-label { font-size: 0.7rem; }
}
`;


/* ═══════════════════════════════════════════════════════════════════════════
   TOM & JERRY CHASE LOADER COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

export function TomJerryLoader({ onDone }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    tom: { x: -120, y: 0, frame: 0, legAngle: 0, tailAngle: 0, whiskerFlap: 0, eyeBlink: 0, blinkTimer: 0 },
    jerry: { x: -200, y: 0, frame: 0, legAngle: 0, earAngle: 0, tailCurl: 0, eyeBlink: 0, blinkTimer: 0 },
    stars: [],
    dustClouds: [],
    progress: 0,
    phase: "chase",   // chase | slide | done
    slideTimer: 0,
    tick: 0,
    bgOffset: 0,
    frying_pan_visible: false,
    pan_angle: 0,
    pan_x: 0,
    pan_y: 0,
    swinging: false,
    swing_timer: 0,
    tom_stunned: false,
    stun_timer: 0,
    stun_stars: [],
    scene: 0,
  });
  const rafRef = useRef(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.width;
    const H = () => canvas.height;

    // ── DRAWING HELPERS ────────────────────────────────────────────────────
    function drawTom(x, y, legA, tailA, blinkState, stunned, panSwing) {
      ctx.save();
      ctx.translate(x, y);

      // shadow
      ctx.save();
      ctx.scale(1, 0.25);
      ctx.beginPath();
      ctx.ellipse(0, 10, 30, 10, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.fill();
      ctx.restore();

      // Body
      ctx.fillStyle = "#6B7A8D";
      ctx.beginPath();
      ctx.ellipse(0, -28, 22, 28, 0, 0, Math.PI * 2);
      ctx.fill();

      // Belly
      ctx.fillStyle = "#C8CBD4";
      ctx.beginPath();
      ctx.ellipse(2, -24, 13, 18, 0, 0, Math.PI * 2);
      ctx.fill();

      // Tail
      ctx.save();
      ctx.translate(22, -10);
      ctx.rotate(tailA);
      ctx.strokeStyle = "#6B7A8D";
      ctx.lineWidth = 7;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(20, -10, 30, 10, 15, 25);
      ctx.stroke();
      // tail tip white
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.ellipse(15, 25, 5, 7, 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Legs
      const legOffsets = [[-14, 0], [-6, 2], [4, 0], [12, 2]];
      legOffsets.forEach(([ox, phase], i) => {
        ctx.save();
        ctx.translate(ox, -5);
        ctx.rotate(legA * (i % 2 === 0 ? 1 : -1));
        ctx.fillStyle = "#6B7A8D";
        ctx.beginPath();
        ctx.roundRect(-5, 0, 10, 22, [0, 0, 4, 4]);
        ctx.fill();
        // foot
        ctx.fillStyle = "#4a5568";
        ctx.beginPath();
        ctx.ellipse(0, 22, 8, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Arms
      ctx.save();
      ctx.translate(-18, -32);
      ctx.rotate(legA * 0.5);
      ctx.fillStyle = "#6B7A8D";
      ctx.beginPath();
      ctx.roundRect(-4, 0, 8, 18, 4);
      ctx.fill();
      ctx.restore();
      ctx.save();
      ctx.translate(18, -32);
      ctx.rotate(-legA * 0.5);
      ctx.fillStyle = "#6B7A8D";
      ctx.beginPath();
      ctx.roundRect(-4, 0, 8, 18, 4);
      ctx.fill();

      // Frying pan in right arm
      if (panSwing) {
        ctx.save();
        ctx.rotate(-0.8 + Math.sin(stateRef.current.pan_angle) * 0.6);
        ctx.translate(0, 12);
        // handle
        ctx.fillStyle = "#8B4513";
        ctx.beginPath();
        ctx.roundRect(-3, 0, 6, 22, 3);
        ctx.fill();
        // pan
        ctx.fillStyle = "#444";
        ctx.beginPath();
        ctx.ellipse(0, 20, 16, 14, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#666";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      }
      ctx.restore();

      // Head
      ctx.save();
      ctx.translate(0, -58);
      // head shape
      ctx.fillStyle = "#6B7A8D";
      ctx.beginPath();
      ctx.ellipse(0, 0, 25, 22, 0, 0, Math.PI * 2);
      ctx.fill();

      // Ears
      [[-22, -8], [22, -8]].forEach(([ex, ey]) => {
        ctx.fillStyle = "#6B7A8D";
        ctx.beginPath();
        ctx.ellipse(ex, ey, 10, 13, ex < 0 ? -0.3 : 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#F9A8C4";
        ctx.beginPath();
        ctx.ellipse(ex, ey, 5, 7, ex < 0 ? -0.3 : 0.3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Cheeks (white muzzle)
      ctx.fillStyle = "#E8E4DC";
      ctx.beginPath();
      ctx.ellipse(0, 5, 16, 12, 0, 0, Math.PI * 2);
      ctx.fill();

      // Eyes
      if (!blinkState) {
        [[-10, -6], [10, -6]].forEach(([ex, ey]) => {
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.ellipse(ex, ey, 8, 9, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#1a1a2e";
          ctx.beginPath();
          ctx.ellipse(ex + 1, ey + 1, 5, 6, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.ellipse(ex - 1, ey - 1, 2, 2, 0, 0, Math.PI * 2);
          ctx.fill();
        });
      } else {
        ctx.strokeStyle = "#1a1a2e";
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(-17, -6); ctx.lineTo(-5, -5);
        ctx.moveTo(5, -5); ctx.lineTo(17, -6);
        ctx.stroke();
      }

      // Nose
      ctx.fillStyle = "#c0392b";
      ctx.beginPath();
      ctx.ellipse(0, 3, 5, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Whiskers
      ctx.strokeStyle = "rgba(255,255,255,0.6)";
      ctx.lineWidth = 1;
      [[-1, -1], [0, 0], [1, 1]].forEach(([dx, dy], i) => {
        ctx.beginPath();
        ctx.moveTo(-5, 5 + dy);
        ctx.lineTo(-28, 1 + i * 4 + dy);
        ctx.moveTo(5, 5 + dy);
        ctx.lineTo(28, 1 + i * 4 + dy);
        ctx.stroke();
      });

      // Stun stars
      if (stunned) {
        stateRef.current.stun_stars.forEach((s, i) => {
          ctx.save();
          ctx.translate(s.x, s.y - 30);
          ctx.rotate(s.a);
          ctx.fillStyle = "#FFD700";
          ctx.font = "bold 14px sans-serif";
          ctx.fillText("★", -5, 0);
          ctx.restore();
        });
      }

      ctx.restore(); // head
      ctx.restore(); // main
    }

    function drawJerry(x, y, legA, earA, blinkState, tailCurl) {
      ctx.save();
      ctx.translate(x, y);

      // shadow
      ctx.save();
      ctx.scale(1, 0.25);
      ctx.beginPath();
      ctx.ellipse(0, 8, 18, 7, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.22)";
      ctx.fill();
      ctx.restore();

      // Tail
      ctx.save();
      ctx.translate(14, -8);
      ctx.strokeStyle = "#C8A060";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(18, -5 + tailCurl * 10, 20, 10 + tailCurl * 5, 8, 18);
      ctx.stroke();
      ctx.restore();

      // Body
      ctx.fillStyle = "#C8A060";
      ctx.beginPath();
      ctx.ellipse(0, -18, 15, 20, 0, 0, Math.PI * 2);
      ctx.fill();

      // Belly
      ctx.fillStyle = "#F5DEB3";
      ctx.beginPath();
      ctx.ellipse(1, -16, 8, 13, 0, 0, Math.PI * 2);
      ctx.fill();

      // Legs
      [[-8, 0], [8, 2]].forEach(([ox, delay], i) => {
        ctx.save();
        ctx.translate(ox, -4);
        ctx.rotate(legA * (i === 0 ? 1 : -1));
        ctx.fillStyle = "#C8A060";
        ctx.beginPath();
        ctx.roundRect(-4, 0, 8, 16, [0, 0, 3, 3]);
        ctx.fill();
        ctx.fillStyle = "#a0805a";
        ctx.beginPath();
        ctx.ellipse(0, 16, 6, 4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Arms
      [[-13, -22, 0.5], [13, -22, -0.5]].forEach(([ax, ay, r]) => {
        ctx.save();
        ctx.translate(ax, ay);
        ctx.rotate(legA * r);
        ctx.fillStyle = "#C8A060";
        ctx.beginPath();
        ctx.roundRect(-3, 0, 6, 12, 3);
        ctx.fill();
        ctx.restore();
      });

      // Head
      ctx.save();
      ctx.translate(0, -40);
      ctx.fillStyle = "#C8A060";
      ctx.beginPath();
      ctx.ellipse(0, 0, 17, 16, 0, 0, Math.PI * 2);
      ctx.fill();

      // Ears
      [[-14, -10, earA], [14, -10, -earA]].forEach(([ex, ey, rot]) => {
        ctx.save();
        ctx.translate(ex, ey);
        ctx.rotate(rot);
        ctx.fillStyle = "#C8A060";
        ctx.beginPath();
        ctx.ellipse(0, 0, 7, 10, ex < 0 ? -0.2 : 0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#F9A8C4";
        ctx.beginPath();
        ctx.ellipse(0, 0, 4, 6, ex < 0 ? -0.2 : 0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Muzzle
      ctx.fillStyle = "#F5DEB3";
      ctx.beginPath();
      ctx.ellipse(0, 4, 10, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Eyes
      if (!blinkState) {
        [[-7, -3], [7, -3]].forEach(([ex, ey]) => {
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.ellipse(ex, ey, 5.5, 6, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#1a1a2e";
          ctx.beginPath();
          ctx.ellipse(ex + 0.5, ey + 0.5, 3.5, 4, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.ellipse(ex - 0.5, ey - 0.5, 1.5, 1.5, 0, 0, Math.PI * 2);
          ctx.fill();
        });
      } else {
        ctx.strokeStyle = "#1a1a2e";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(-12, -3); ctx.lineTo(-3, -3);
        ctx.moveTo(3, -3); ctx.lineTo(12, -3);
        ctx.stroke();
      }

      // Nose
      ctx.fillStyle = "#c0392b";
      ctx.beginPath();
      ctx.ellipse(0, 2, 3, 2.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Whiskers
      ctx.strokeStyle = "rgba(200,180,150,0.7)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(-4, 4); ctx.lineTo(-18, 2);
      ctx.moveTo(-4, 6); ctx.lineTo(-18, 7);
      ctx.moveTo(4, 4); ctx.lineTo(18, 2);
      ctx.moveTo(4, 6); ctx.lineTo(18, 7);
      ctx.stroke();

      // Mouth smirk
      ctx.strokeStyle = "#7a4a2a";
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-4, 8);
      ctx.quadraticCurveTo(0, 12, 4, 8);
      ctx.stroke();

      ctx.restore(); // head
      ctx.restore(); // main
    }

    function drawDustCloud(x, y, size, alpha) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = "#D4B896";
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        ctx.beginPath();
        ctx.ellipse(x + Math.cos(angle) * size * 0.5, y + Math.sin(angle) * size * 0.4, size * 0.5, size * 0.45, angle, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    function drawBackground(offset) {
      const w = W(), h = H();
      // Sky gradient
      const sky = ctx.createLinearGradient(0, 0, 0, h * 0.7);
      sky.addColorStop(0, "#0a0a12");
      sky.addColorStop(1, "#1A1A1E");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

      // Moon
      ctx.fillStyle = "#F5EDD6";
      ctx.beginPath();
      ctx.ellipse(w * 0.85, h * 0.12, 35, 35, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#0a0a12";
      ctx.beginPath();
      ctx.ellipse(w * 0.85 + 10, h * 0.12 - 8, 28, 28, 0, 0, Math.PI * 2);
      ctx.fill();

      // Stars in sky
      ctx.fillStyle = "rgba(245,237,214,0.7)";
      for (let i = 0; i < 30; i++) {
        const sx = ((i * 137.5 + offset * 0.1) % w);
        const sy = (i * 53) % (h * 0.5);
        const ss = 0.5 + (i % 3) * 0.5;
        ctx.beginPath();
        ctx.ellipse(sx, sy, ss, ss, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Ground — teal kitchen floor tiles
      const groundY = h * 0.72;
      ctx.fillStyle = "#12262A";
      ctx.fillRect(0, groundY, w, h - groundY);

      // Tile grid
      const tileSize = 52;
      ctx.strokeStyle = "rgba(26,127,142,0.3)";
      ctx.lineWidth = 0.8;
      for (let tx = (-offset * 0.5) % tileSize; tx < w; tx += tileSize) {
        ctx.beginPath(); ctx.moveTo(tx, groundY); ctx.lineTo(tx, h); ctx.stroke();
      }
      for (let ty = groundY; ty < h; ty += tileSize * 0.5) {
        ctx.beginPath(); ctx.moveTo(0, ty); ctx.lineTo(w, ty); ctx.stroke();
      }

      // Baseboards / wall trim
      ctx.fillStyle = "#8B4513";
      ctx.fillRect(0, groundY - 8, w, 8);
      ctx.fillStyle = "#A0522D";
      ctx.fillRect(0, groundY - 8, w, 3);

      // Scrolling background furniture silhouettes
      const furnitureX = ((-offset * 0.3) % (w + 200)) - 100;
      // Sofa silhouette
      ctx.fillStyle = "#1e1e28";
      ctx.beginPath();
      ctx.roundRect(furnitureX, groundY - 70, 140, 70, [8, 8, 0, 0]);
      ctx.fill();
      ctx.beginPath();
      ctx.roundRect(furnitureX - 10, groundY - 90, 30, 90, [4, 4, 0, 0]);
      ctx.fill();
      ctx.beginPath();
      ctx.roundRect(furnitureX + 120, groundY - 90, 30, 90, [4, 4, 0, 0]);
      ctx.fill();

      // Table
      ctx.fillStyle = "#1e1e28";
      ctx.beginPath();
      ctx.roundRect(furnitureX + 220, groundY - 80, 90, 14, 4);
      ctx.fill();
      ctx.fillRect(furnitureX + 230, groundY - 66, 8, 66);
      ctx.fillRect(furnitureX + 292, groundY - 66, 8, 66);
    }

    function drawProgressBar(prog) {
      const w = W(), h = H();
      const barW = Math.min(w * 0.7, 480);
      const barH = 6;
      const bx = (w - barW) / 2;
      const by = h * 0.88;

      // Track
      ctx.fillStyle = "#2D2D35";
      ctx.beginPath();
      ctx.roundRect(bx, by, barW, barH, 3);
      ctx.fill();

      // Fill
      const fillGrad = ctx.createLinearGradient(bx, 0, bx + barW, 0);
      fillGrad.addColorStop(0, "#C0392B");
      fillGrad.addColorStop(0.5, "#E8A020");
      fillGrad.addColorStop(1, "#1A7F8E");
      ctx.fillStyle = fillGrad;
      ctx.beginPath();
      ctx.roundRect(bx, by, barW * prog, barH, 3);
      ctx.fill();

      // Shine flicker
      ctx.fillStyle = "rgba(255,255,255,0.25)";
      ctx.beginPath();
      ctx.roundRect(bx, by, barW * prog, barH / 2, 3);
      ctx.fill();

      // Label
      ctx.fillStyle = "#9A9198";
      ctx.font = "12px 'Courier New', monospace";
      ctx.textAlign = "center";
      ctx.fillText(`${Math.round(prog * 100)}%`, w / 2, by - 10);

      // Title text
      ctx.fillStyle = "#F5EDD6";
      ctx.font = "bold 18px 'Courier New', monospace";
      ctx.fillText("LOADING...", w / 2, h * 0.82);

      ctx.fillStyle = "#9A9198";
      ctx.font = "11px 'Courier New', monospace";
      const hints = ["Jerry always wins.", "No cats were harmed.", "MERN stack incoming.", "Kernel booting..."];
      const hintIdx = Math.floor(prog * hints.length);
      ctx.fillText(hints[Math.min(hintIdx, hints.length - 1)], w / 2, h * 0.95);
      ctx.textAlign = "left";
    }

    // ── ANIMATION LOOP ────────────────────────────────────────────────────
    function loop() {
      const s = stateRef.current;
      const w = W(), h = H();
      const groundY = h * 0.72;
      s.tick++;

      // Leg animation
      s.tom.legAngle = Math.sin(s.tick * 0.28) * 0.55;
      s.tom.tailAngle = Math.sin(s.tick * 0.18) * 0.4;
      s.jerry.legAngle = Math.sin(s.tick * 0.35) * 0.6;
      s.jerry.earAngle = Math.sin(s.tick * 0.2) * 0.18;
      s.jerry.tailCurl = Math.sin(s.tick * 0.15) * 0.5 + 0.5;

      // Eye blinking
      s.tom.blinkTimer++;
      if (s.tom.blinkTimer > 90) { s.tom.eyeBlink = 1; if (s.tom.blinkTimer > 95) { s.tom.eyeBlink = 0; s.tom.blinkTimer = 0; } }
      s.jerry.blinkTimer++;
      if (s.jerry.blinkTimer > 80) { s.jerry.eyeBlink = 1; if (s.jerry.blinkTimer > 84) { s.jerry.eyeBlink = 0; s.jerry.blinkTimer = 0; } }

      // Character movement
      s.bgOffset += 3;
      const jerryTarget = w * 0.45;
      const tomTarget = w * 0.62;

      if (s.phase === "chase") {
        if (s.jerry.x < jerryTarget) s.jerry.x += 6;
        if (s.tom.x < tomTarget) s.tom.x += 5.5;

        s.progress = Math.min(s.progress + 0.004, 1);
        setProgress(s.progress);

        // Spawn dust clouds behind Tom
        if (s.tick % 6 === 0) {
          s.dustClouds.push({ x: s.tom.x + 20, y: groundY - 5, size: 18 + Math.random() * 12, life: 1.0 });
        }

        // Swing frying pan
        s.pan_angle += 0.2;
        s.frying_pan_visible = true;

        // Stun stars
        if (s.stun_timer > 0) {
          s.stun_timer--;
          s.stun_stars.forEach(st => { st.a += 0.15; st.x = Math.cos(st.baseA + s.tick * 0.1) * 30; st.y = Math.sin(st.baseA + s.tick * 0.1) * 15; });
        }

        // Progress done → slide out
        if (s.progress >= 1) { s.phase = "slide"; }
      }

      if (s.phase === "slide") {
        s.slideTimer++;
        s.jerry.x += 9;
        s.tom.x += 7;
        if (s.slideTimer > 60) { s.phase = "done"; }
      }

      // Decay dust clouds
      s.dustClouds = s.dustClouds.filter(d => d.life > 0.02).map(d => ({ ...d, life: d.life - 0.035, size: d.size + 0.5, x: d.x - 1.5 }));

      // Clear
      ctx.clearRect(0, 0, w, h);
      drawBackground(s.bgOffset);

      // Draw dust clouds
      s.dustClouds.forEach(d => drawDustCloud(d.x, d.y, d.size, d.life * 0.5));

      // Draw characters at ground level
      const tomY = groundY - 5 + Math.abs(Math.sin(s.tick * 0.28)) * -8;
      const jerryY = groundY + Math.abs(Math.sin(s.tick * 0.35)) * -10;

      drawJerry(s.jerry.x, jerryY, s.jerry.legAngle, s.jerry.earAngle, s.jerry.eyeBlink === 1, s.jerry.tailCurl);
      drawTom(s.tom.x, tomY, s.tom.legAngle, s.tom.tailAngle, s.tom.eyeBlink === 1, s.stun_timer > 0, s.frying_pan_visible);

      // Speed lines (zooming effect)
      ctx.save();
      ctx.globalAlpha = 0.06;
      ctx.strokeStyle = "#F5EDD6";
      ctx.lineWidth = 1;
      for (let i = 0; i < 12; i++) {
        const ly = groundY * 0.15 + (i * groundY * 0.06);
        const speed = 1 - i * 0.05;
        const lx = w - ((s.bgOffset * speed * 2.5 + i * 80) % (w + 400));
        ctx.beginPath();
        ctx.moveTo(lx, ly);
        ctx.lineTo(lx + 60 + i * 8, ly);
        ctx.stroke();
      }
      ctx.restore();

      drawProgressBar(s.progress);

      if (s.phase === "done") {
        setFadeOut(true);
        setTimeout(onDone, 700);
        return;
      }

      rafRef.current = requestAnimationFrame(loop);
    }

    // Init stun stars positions
    stateRef.current.stun_stars = Array.from({ length: 5 }, (_, i) => ({
      baseA: (i / 5) * Math.PI * 2, x: 0, y: 0, a: 0
    }));

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [onDone]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#0a0a12",
      opacity: fadeOut ? 0 : 1,
      transition: "opacity 0.65s ease-out",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <style>{`
        @keyframes tj-fade-in { from{opacity:0} to{opacity:1} }
        .tj-loader-canvas { animation: tj-fade-in 0.4s ease-out both; }
        .tj-title {
          position:absolute; top:6%; left:50%; transform:translateX(-50%);
          font-family:'Courier New',monospace; font-size:clamp(1rem,3vw,1.5rem);
          letter-spacing:0.3em; text-transform:uppercase;
          color:#F5EDD6; white-space:nowrap;
          text-shadow: 0 0 20px rgba(232,160,32,0.4);
          animation: tj-fade-in 0.8s 0.2s both;
        }
        .tj-title span { color:#E8A020; }
        .tj-subtitle {
          position:absolute; top:14%; left:50%; transform:translateX(-50%);
          font-family:'Courier New',monospace; font-size:clamp(0.65rem,1.5vw,0.8rem);
          letter-spacing:0.2em; text-transform:uppercase; color:#9A9198; white-space:nowrap;
          animation: tj-fade-in 0.8s 0.5s both;
        }
      `}</style>
      <div className="tj-title">Tom <span>&</span> Jerry Chase</div>
      <div className="tj-subtitle">rishit.dev is booting up</div>
      <canvas
        ref={canvasRef}
        className="tj-loader-canvas"
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}