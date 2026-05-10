import { useState, useEffect, useRef, useCallback } from "react";
import { TomJerryLoader, TJ_DARK_CSS } from "./TomJerryLoader";
const NAV_LINKS = ["About", "Skills", "Projects", "Experience", "Contact"];

const SKILLS = [
  { category: "Languages", items: ["C++", "JavaScript", "Python", "TypeScript", "MySQL"] },
  { category: "Frontend", items: ["React", "React.js", "Bootstrap", "HTML5", "CSS3"] },
  { category: "Backend", items: ["Node.js", "Express", "REST APIs"] },
  { category: "Tools & Platforms", items: ["Git", "GitHub", "VS Code", "Linux", "Vercel"] }
];

const PROJECTS = [
  {
    name: "Route Optimizer",
    tag: "April 2026",
    desc: "Developed a route planning app with multi-stop waypoint support, per-stop travel time estimates, and a fuel cost calculator based on user-entered vehicle mileage. Integrated route comparison enabling users to evaluate up to 3 alternate routes with distance, time, and cost breakdowns.",
    tech: ["React.js", "Node.js", "Google Maps API", "REST API"],
    accent: "#00b4d8",
  },
  {
    name: "Smart Waste Detection System",
    tag: "Dec 2025",
    desc: "Built a responsive web app integrating Gemini API for AI-powered waste classification with real-time biodegradable/non-biodegradable detection from uploaded images. Implemented n8n workflow automation for admin notifications via email/webhooks with live admin chat support.",
    tech: ["JavaScript", "n8n", "Socket.io", "Gemini API", "REST API"],
    accent: "#c9a84c",
  },
  {
    name: "DevRooms AI",
    tag: "March 2026",
    desc: "Developed a full-stack collaborative developer platform with public/private rooms for real-time discussion on bugs, code optimization, and development. Unified Gemini and ChatGPT APIs into a single interface for multi-model AI querying within one platform.",
    tech: ["MERN Stack", "Socket.io", "Gemini API", "ChatGPT API"],
    accent: "#7c6fa0",
  },
  {
    name: "Ray of Hope - NGO Website",
    tag: "March 2026",
    desc: "Delivered a complete MERN-stack website for NGO 'Ray of Hope' with member management and blood donation tracking. Designed optimized MongoDB schemas for users, members, and donations with real-time query performance.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Bootstrap"],
    accent: "#c0392b",
  },
];

const EXPERIENCE = [
  {
    role: "SDE Intern",
    org: "NALCO (National Aluminium Company Limited), Bhubaneswar",
    period: "Present",
    type: "work",
    active: true,
    points: [
      "Contributing to internal software development and digitization initiatives at NALCO HQ.",
      "Applying full-stack engineering skills to real-world enterprise-grade systems.",
      "Collaborating with senior engineers on backend architecture and API design.",
    ],
  },
  {
    role: "Hackathon Participant",
    org: "Konverge Hackathon",
    period: "2026",
    type: "work",
    points: [
      "Built DevRooms AI — a real-time AI-powered collaborative coding environment.",
      "Designed full-stack architecture under time constraints.",
      "Delivered a polished, working demo to judges.",
    ],
  },

  {
    role: "Hackathon Winner(1st Place)",
    org: "BIS-Nexus Hackathon",
    period: "2024",
    type: "work",
    points: [
      "Built a ML model for waste image classification using Tensorflow.",
      "Designed the frontend and backend of a waste management web app integrating the model using Streamlit.",
      "Delivered a polished, working demo to judges.",
    ],
  },


  {
    role: "Competitive Programmer",
    org: "Self-directed / Online Judges",
    period: "Ongoing",
    type: "work",
    points: [
      "LeetCode max rating 1517 · CodeChef Starters 218 Rank 744 · Codeforces Round 183 Rank 4920.",
      "Solved problems in number theory, binary string manipulation, and graph algorithms.",
      "Writes clean, consolidated C++ solutions with optimal complexity.",
    ],
  },
];

const EDUCATION = [
  {
    degree: "B.Tech – Computer Science & Communication Engineering",
    institution: "KIIT University, Bhubaneswar",
    period: "Aug 2023 – Jul 2027",
    detail: "CGPA: 8.25 / 10.0",
    type: "edu",
  },
  {
    degree: "Senior Secondary (Class XII) – CBSE",
    institution: "CBSE Board",
    period: "2021 – 2023",
    detail: "83.2%",
    type: "edu",
  },
  {
    degree: "Secondary (Class X) – CBSE",
    institution: "CBSE Board",
    period: "2020 – 2021",
    detail: "93.0%",
    type: "edu",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function TypewriterText({ text, speed = 50, startDelay = 0 }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);
  useEffect(() => {
    if (!started || displayed.length >= text.length) return;
    const t = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), speed);
    return () => clearTimeout(t);
  }, [displayed, started, text, speed]);
  return (
    <span className="typewriter-text">
      {displayed}
      <span className="cursor-blink">|</span>
    </span>
  );
}

function FloatingParticles() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouseMove);
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 0.5,
      baseVx: (Math.random() - 0.5) * 0.4,
      baseVy: (Math.random() - 0.5) * 0.4,
      vx: 0, vy: 0,
      hue: [174, 258, 45][Math.floor(Math.random() * 3)],
      alpha: Math.random() * 0.3 + 0.1,
    }));
    let raf;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      particles.forEach((p) => {
        p.vx = p.baseVx; p.vy = p.baseVy;
        const dx = p.x - mx, dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const force = (140 - dist) / 140;
          p.vx += (dx / dist) * force * 4;
          p.vy += (dy / dist) * force * 4;
          p.alpha = 0.8;
        } else {
          p.alpha = Math.max(0.1, p.alpha - 0.008);
        }
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 60%, 50%, ${p.alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="particles-canvas" />;
}

// ─── 3D DOG COMPONENT ───────────────────────────────────────────────
function Dog3D({ dogState, onCycleDog, crashPieces }) {
  const wrapperRef = useRef(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      setRotY(dx * 0.18);
      setRotX(-dy * 0.18);
    };
    const handleLeave = () => { setRotX(0); setRotY(0); };
    window.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const style3d = {
    transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
    transition: "transform 0.08s ease-out",
  };

  return (
    <div ref={wrapperRef} className={`voxel-dog dog--${dogState}`} onClick={onCycleDog} title="Click to interact" style={{ transformStyle: "preserve-3d", perspective: "400px" }}>
      {crashPieces.map((p) => (
        <div key={p.id} className="crash-piece" style={{ width: p.size, height: p.size, background: p.color, "--tx": `${p.x}px`, "--ty": `${p.y}px`, "--tr": `${p.rot}deg` }} />
      ))}
      <div className="dog-body" style={style3d}>
        {/* Back face */}
        <div className="dog-face dog-face--back" />
        {/* Left face */}
        <div className="dog-face dog-face--left" />
        {/* Right face */}
        <div className="dog-face dog-face--right" />
        {/* Bottom face */}
        <div className="dog-face dog-face--bottom" />
        {/* Top face */}
        <div className="dog-face dog-face--top" />
        {/* Front (visible face) */}
        <div className="dog-head">
          <div className="dog-ear dog-ear--l" />
          <div className="dog-ear dog-ear--r" />
          <div className="dog-eye dog-eye--l" />
          <div className="dog-eye dog-eye--r" />
          <div className="dog-nose" />
          <div className="dog-mouth" />
        </div>
        <div className="dog-torso">
          <div className="dog-collar" />
          <div className="dog-belly" />
        </div>
        <div className="dog-tail" />
        <div className="dog-leg dog-leg--fl" />
        <div className="dog-leg dog-leg--fr" />
        <div className="dog-leg dog-leg--bl" />
        <div className="dog-leg dog-leg--br" />
      </div>
    </div>
  );
}

function VoxelWorkspace() {
  const [dogState, setDogState] = useState("sit");
  const [tuxState, setTuxState] = useState("idle");
  const [serverLoad, setServerLoad] = useState("streaming");
  const [crashPieces, setCrashPieces] = useState([]);
  const dogRef = useRef("sit");
  const tuxRef = useRef("idle");

  const triggerCrash = useCallback(() => {
    if (dogRef.current === "crash") return;
    dogRef.current = "crash";
    setDogState("crash");
    setServerLoad("overload");
    const pieces = Array.from({ length: 30 }, (_, i) => ({
      id: i, x: (Math.random() - 0.5) * 300, y: -(Math.random() * 180 + 50),
      rot: Math.random() * 1440 - 720,
      color: ["#8b5e3c","#00b4d8","#c9a84c","#7c6fa0","#c0392b","#ffffff"][i % 6],
      size: Math.random() * 16 + 4,
    }));
    setCrashPieces(pieces);
    setTimeout(() => {
      dogRef.current = "sit"; setDogState("sit"); setServerLoad("streaming"); setCrashPieces([]);
    }, 2800);
  }, []);

  const cycleDogState = useCallback(() => {
    if (dogRef.current === "crash") return;
    const states = ["sit", "jump", "fly"];
    const next = states[(states.indexOf(dogRef.current) + 1) % states.length];
    dogRef.current = next; setDogState(next);
  }, []);

  const triggerTuxAction = useCallback(() => {
    if (tuxRef.current !== "idle") return;
    tuxRef.current = "hack"; setTuxState("hack");
    setTimeout(() => {
      tuxRef.current = "spin"; setTuxState("spin");
      setTimeout(() => { tuxRef.current = "idle"; setTuxState("idle"); }, 2000);
    }, 1500);
  }, []);

  useEffect(() => {
  const style = document.createElement("style");
  style.textContent = TJ_DARK_CSS;
  document.head.appendChild(style);
  return () => document.head.removeChild(style);
}, []);

  return (
    <div className="voxel-scene-wrapper">
      <div className="desk-scene">
        <Dog3D dogState={dogState} onCycleDog={cycleDogState} crashPieces={crashPieces} />
        <div className="desk float-layer-2">
          <div className="desk-top">
            <div className={`voxel-server server--${serverLoad}`} onClick={() => setServerLoad(s => s === "streaming" ? "turbo" : "streaming")}>
              <div className="server-unit">
                <div className="led-grid">
                  <span className="led led--pulse-fast" /><span className="led led--cyan" />
                  <span className="led led--violet" /><span className="led led--blink" />
                </div>
              </div>
              <div className="server-data-stream">
                <span className="byte">01</span><span className="byte">10</span>
              </div>
              <div className="server-unit">
                <div className="led-grid">
                  <span className="led led--gold" /><span className="led led--red-warn" />
                  <span className="led led--pulse" /><span className="led led--cyan" />
                </div>
              </div>
            </div>
            <div className="monitor">
              <div className="monitor-screen glass-panel">
                <div className="screen-lines animated-code-scroll">
                  <span className="sl sl--cyan">import</span> <span className="sl sl--white">{"{ "}genius{" }"}</span> <span className="sl sl--cyan">from</span> <span className="sl sl--violet">'linux'</span>;
                  <br /><br />
                  <span className="sl sl--cyan">const</span> <span className="sl sl--white">dev</span> = <span className="sl sl--gold">{"{"}</span>
                  <br />
                  <span className="sl sl--indent sl--muted">stack:</span> <span className="sl sl--cyan">"MERN"</span>,
                  <br />
                  <span className="sl sl--indent sl--muted">speed:</span> <span className="sl sl--violet">"O(1)"</span>,
                  <br />
                  <span className="sl sl--indent sl--muted">os:</span> <span className="sl sl--gold">"Tumbleweed"</span>
                  <br />
                  <span className="sl sl--gold">{"}"}</span>;
                  <br /><br />
                  <span className="sl sl--violet">dev</span>.<span className="sl sl--white">compile</span>();
                </div>
              </div>
              <div className="monitor-stand" />
              <div className="monitor-base" />
            </div>
            <div className="keyboard rgb-glow">
              {Array.from({ length: 28 }).map((_, i) => (
                <div key={i} className="key" style={{ animationDelay: `${(i * 73) % 2000}ms` }} />
              ))}
            </div>
            <div className="mouse" />
            <div className="coffee-mug float-layer-3">
              <div className="mug-steam mug-steam--1" />
              <div className="mug-steam mug-steam--2" />
              <div className="mug-handle" />
            </div>
            <div className={`voxel-tux tux--${tuxState} float-layer-1`} onClick={triggerTuxAction} title="Execute hack sequence">
              <div className="tux-head">
                <div className="tux-eye tux-eye--l" />
                <div className="tux-eye tux-eye--r" />
                <div className="tux-beak" />
              </div>
              <div className="tux-body">
                <div className="tux-belly" />
                <div className="tux-wing tux-wing--l" />
                <div className="tux-wing tux-wing--r" />
              </div>
              <div className="tux-foot tux-foot--l" />
              <div className="tux-foot tux-foot--r" />
              {tuxState === "hack" && <div className="tux-cmd-bubble pulse-fast">Compiling Kernel...</div>}
            </div>
          </div>
          <div className="desk-front" />
          <div className="desk-leg desk-leg--l" />
          <div className="desk-leg desk-leg--r" />
        </div>
        <div className="voxel-controls bounce-up">
          <button className="glass-btn" onClick={cycleDogState}>⚡ State: Dog</button>
          <button className="glass-btn glass-btn--cyan" onClick={triggerTuxAction}>🐧 Root Tux</button>
          <button className="glass-btn glass-btn--danger" onClick={triggerCrash}>🔥 Kernel Panic</button>
        </div>
      </div>
    </div>
  );
}

// ─── JAPANESE DECORATIONS ───────────────────────────────────────────
function SamuraiHouse({ className = "" }) {
  return (
    <svg className={`jp-house ${className}`} viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
      {/* Main roof */}
      <polygon points="100,10 20,65 180,65" fill="#8B4513" stroke="#6B3410" strokeWidth="1.5" />
      {/* Roof ridge ornament */}
      <rect x="85" y="5" width="30" height="8" rx="3" fill="#6B3410" />
      {/* Roof upswept ends */}
      <path d="M20,65 Q5,58 2,52" fill="none" stroke="#8B4513" strokeWidth="3" strokeLinecap="round" />
      <path d="M180,65 Q195,58 198,52" fill="none" stroke="#8B4513" strokeWidth="3" strokeLinecap="round" />
      {/* Lower roof tier */}
      <polygon points="100,60 30,90 170,90" fill="#A0522D" stroke="#8B4513" strokeWidth="1" />
      <path d="M30,90 Q15,84 12,78" fill="none" stroke="#A0522D" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M170,90 Q185,84 188,78" fill="none" stroke="#A0522D" strokeWidth="2.5" strokeLinecap="round" />
      {/* Body */}
      <rect x="40" y="90" width="120" height="55" fill="#F5E6C8" stroke="#D4A574" strokeWidth="1" />
      {/* Shoji screens grid */}
      <line x1="100" y1="90" x2="100" y2="145" stroke="#D4A574" strokeWidth="1" />
      <line x1="70" y1="90" x2="70" y2="145" stroke="#D4A574" strokeWidth="0.8" />
      <line x1="130" y1="90" x2="130" y2="145" stroke="#D4A574" strokeWidth="0.8" />
      <line x1="40" y1="110" x2="160" y2="110" stroke="#D4A574" strokeWidth="0.8" />
      <line x1="40" y1="125" x2="160" y2="125" stroke="#D4A574" strokeWidth="0.8" />
      {/* Door */}
      <rect x="82" y="118" width="36" height="27" rx="1" fill="#D4A574" stroke="#8B4513" strokeWidth="1" />
      <circle cx="114" cy="131" r="2" fill="#8B4513" />
      {/* Ground */}
      <rect x="30" y="145" width="140" height="6" rx="2" fill="#D4A574" opacity="0.5" />
      {/* Lantern */}
      <rect x="155" y="95" width="10" height="14" rx="2" fill="#F0A500" opacity="0.8" />
      <rect x="153" y="93" width="14" height="3" rx="1" fill="#8B4513" />
      <line x1="160" y1="89" x2="160" y2="93" stroke="#8B4513" strokeWidth="1" />
    </svg>
  );
}

function ToriiGate({ className = "" }) {
  return (
    <svg className={`jp-torii ${className}`} viewBox="0 0 140 180" xmlns="http://www.w3.org/2000/svg">
      {/* Top beam (kasagi) curved */}
      <path d="M5,48 Q70,30 135,48" fill="none" stroke="#C0392B" strokeWidth="14" strokeLinecap="round" />
      {/* Second beam (shimagi) */}
      <line x1="18" y1="65" x2="122" y2="65" stroke="#C0392B" strokeWidth="9" strokeLinecap="round" />
      {/* Connector nuki */}
      <line x1="35" y1="95" x2="105" y2="95" stroke="#C0392B" strokeWidth="6" strokeLinecap="round" />
      {/* Left column */}
      <line x1="35" y1="60" x2="35" y2="175" stroke="#C0392B" strokeWidth="12" strokeLinecap="round" />
      {/* Right column */}
      <line x1="105" y1="60" x2="105" y2="175" stroke="#C0392B" strokeWidth="12" strokeLinecap="round" />
      {/* Column bases */}
      <ellipse cx="35" cy="175" rx="10" ry="5" fill="#9B2335" />
      <ellipse cx="105" cy="175" rx="10" ry="5" fill="#9B2335" />
    </svg>
  );
}

function CherryBlossom({ x = 0, y = 0, size = 1, delay = 0 }) {
  return (
    <g className="cherry-blossom-cluster" style={{ transform: `translate(${x}px, ${y}px) scale(${size})`, animationDelay: `${delay}s` }}>
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <ellipse
          key={i}
          cx={Math.cos((angle * Math.PI) / 180) * 6}
          cy={Math.sin((angle * Math.PI) / 180) * 6}
          rx="5" ry="4"
          transform={`rotate(${angle + 15})`}
          fill="#F9A8C4"
          opacity="0.85"
          style={{ transformOrigin: `${Math.cos((angle * Math.PI) / 180) * 6}px ${Math.sin((angle * Math.PI) / 180) * 6}px` }}
        />
      ))}
      <circle cx="0" cy="0" r="2.5" fill="#F472B6" opacity="0.9" />
    </g>
  );
}

function BambooSection({ className = "" }) {
  return (
    <svg className={`jp-bamboo ${className}`} viewBox="0 0 60 280" xmlns="http://www.w3.org/2000/svg">
      {[0, 55, 115, 170, 225].map((y, i) => (
        <g key={i}>
          <rect x="22" y={y} width="16" height="55" rx="8" fill={i % 2 === 0 ? "#6B8F41" : "#5A7A36"} />
          <ellipse cx="30" cy={y + 55} rx="9" ry="4" fill="#4A6A2A" />
        </g>
      ))}
      {/* Leaves */}
      <path d="M38,60 Q75,45 80,20" fill="none" stroke="#6B8F41" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="79" cy="20" rx="12" ry="5" transform="rotate(-30 79 20)" fill="#8BC44A" opacity="0.9" />
      <path d="M38,130 Q-10,115 -15,90" fill="none" stroke="#6B8F41" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="-14" cy="90" rx="12" ry="5" transform="rotate(30 -14 90)" fill="#8BC44A" opacity="0.9" />
      <path d="M38,200 Q75,185 80,160" fill="none" stroke="#6B8F41" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="79" cy="160" rx="12" ry="5" transform="rotate(-30 79 160)" fill="#8BC44A" opacity="0.9" />
    </svg>
  );
}

function InkBrushDivider() {
  return (
    <div className="ink-brush-divider" aria-hidden="true">
      <svg viewBox="0 0 600 40" xmlns="http://www.w3.org/2000/svg" className="ink-stroke-svg">
        <path
          d="M20,20 Q100,8 200,20 Q300,32 400,18 Q480,8 580,22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.2"
        />
      </svg>
      <span className="ink-kanji" aria-hidden="true">間</span>
    </div>
  );
}

function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`navbar ${scrolled ? "navbar--glass" : ""}`}>
      <div className="navbar__logo kinetic-tilt">
        <span className="logo-text">Rishit</span><span className="logo-accent">.dev</span>
        <span className="logo-jp" aria-hidden="true">莫</span>
      </div>
      <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
        {NAV_LINKS.map((l) => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} className={active === l.toLowerCase() ? "active" : ""} onClick={() => setMenuOpen(false)}>{l}</a>
          </li>
        ))}
      </ul>
      <button className="navbar__burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        <span className={menuOpen ? "open" : ""} />
        <span className={menuOpen ? "open" : ""} />
        <span className={menuOpen ? "open" : ""} />
      </button>
    </nav>
  );
}

function HeroSection() {
  const [letters, setLetters] = useState([]);
  const name = "Rishit Mohanty";
  useEffect(() => {
    name.split("").forEach((_, i) => {
      setTimeout(() => setLetters((prev) => [...prev, i]), 40 * i + 100);
    });
  }, []);
  return (
    <section className="hero" id="about">
      <FloatingParticles />
      <div className="hero__warp-grid" aria-hidden="true" />
      {/* Japanese decorations */}
      <div className="jp-scene-hero" aria-hidden="true">
        <ToriiGate className="torii-hero" />
        <BambooSection className="bamboo-hero-l" />
        <BambooSection className="bamboo-hero-r" />
        <svg className="sakura-overlay" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
          <CherryBlossom x={50} y={60} size={1.4} delay={0} />
          <CherryBlossom x={120} y={30} size={1.0} delay={0.5} />
          <CherryBlossom x={200} y={80} size={1.6} delay={1} />
          <CherryBlossom x={300} y={20} size={1.2} delay={0.3} />
          <CherryBlossom x={350} y={90} size={0.9} delay={0.8} />
          {/* Falling petals */}
          <ellipse cx="80" cy="150" rx="4" ry="3" fill="#F9A8C4" opacity="0.6" className="falling-petal petal-1" />
          <ellipse cx="160" cy="200" rx="3" ry="2" fill="#F472B6" opacity="0.5" className="falling-petal petal-2" />
          <ellipse cx="250" cy="120" rx="4" ry="2.5" fill="#F9A8C4" opacity="0.7" className="falling-petal petal-3" />
          <ellipse cx="320" cy="180" rx="3.5" ry="2" fill="#F472B6" opacity="0.4" className="falling-petal petal-4" />
        </svg>
      </div>
      <div className="animated-ambient-glow glow-pos-1" />
      <div className="animated-ambient-glow glow-pos-2" />
      <div className="hero__content">
        <div className="jp-seal" aria-hidden="true">
          <span>侍</span>
        </div>
        <h1 className="hero__name">
          {name.split("").map((ch, i) => (
            <span key={i} className={`kinetic-letter ${letters.includes(i) ? "kinetic-letter--in" : ""} ${ch === " " ? "space" : ""}`}>
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </h1>
        <div className="hero__role-box">
          <TypewriterText text="MERN Stack Developer." speed={40} startDelay={800} />
        </div>
        <p className="hero__bio fade-pull-up">
          Crafting highly optimized full-stack applications. Obsessed with clean code architecture, open-source ecosystems, and minimal interfaces.
        </p>
        <div className="hero__actions">
          <a href="#projects" className="neon-trace-btn">
            <span className="btn-inner">Explore Build System</span>
          </a>
          <a href="#contact" className="sleek-ghost-btn">Initialize Contact</a>
        </div>
      </div>
      <div className="hero__workspace-anchor">
        <VoxelWorkspace />
      </div>
    </section>
  );
}

function SkillsSection() {
  const [ref, inView] = useInView(0.1);
  return (
    <section className="section" id="skills" ref={ref}>
      <div className="jp-section-deco" aria-hidden="true">
        <SamuraiHouse className="house-deco house-deco--l" />
      </div>
      <div className={`section__inner ${inView ? "elastic-pull-up" : "hidden-pull-down"}`}>
        <InkBrushDivider />
        <h2 className="section__heading">Technical Matrix<span className="heading-dot">.</span> <span className="jp-heading-label" aria-hidden="true">技術</span></h2>
        <div className="skills-grid">
          {SKILLS.map((group, gi) => (
            <div className="spinning-trace-card float-layer-slow" key={group.category} style={{ animationDelay: `${gi * 0.12}s` }}>
              <div className="spinning-trace-card__inner glass-panel">
                <h3 className="skill-category-title">{group.category}</h3>
                <div className="skill-pills-wrapper">
                  {group.items.map((item, ii) => (
                    <span key={item} className="kinetic-pill" style={{ animationDelay: `${gi * 0.1 + ii * 0.05}s` }}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const [ref, inView] = useInView(0.15);
  return (
    <section className="section" id="projects" ref={ref}>
      <div className={`section__inner ${inView ? "elastic-pull-up" : "hidden-pull-down"}`}>
        <InkBrushDivider />
        <h2 className="section__heading">Production Builds<span className="heading-dot">.</span> <span className="jp-heading-label" aria-hidden="true">制作</span></h2>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div className="spinning-trace-card project-card-wrap float-layer-medium" key={p.name} style={{ "--neon-accent": p.accent, animationDelay: `${i * 0.18}s` }}>
              <div className="spinning-trace-card__inner glass-panel project-card-inner">
                <div className="project-accent-glow" style={{ background: p.accent }} />
                <span className="project-meta-tag">{p.tag}</span>
                <h3 className="project-title">{p.name}</h3>
                <p className="project-description">{p.desc}</p>
                <div className="project-tech-stack">
                  {p.tech.map((t) => (
                    <span key={t} className="tech-badge" style={{ "--tech-color": p.accent }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const [ref, inView] = useInView(0.1);
  return (
    <section className="section" id="experience" ref={ref}>
      <div className="jp-section-deco" aria-hidden="true">
        <SamuraiHouse className="house-deco house-deco--r" />
      </div>
      <div className={`section__inner ${inView ? "elastic-pull-up" : "hidden-pull-down"}`}>
        <InkBrushDivider />
        <h2 className="section__heading">Execution Pipeline<span className="heading-dot">.</span> <span className="jp-heading-label" aria-hidden="true">経験</span></h2>
        
        {/* Work Experience */}
        <div className="timeline-sub-heading">
          <span className="timeline-sub-icon">⚙</span> Work Experience
        </div>
        <div className="kinetic-timeline">
          {EXPERIENCE.map((exp, i) => (
            <div className="timeline-node" key={i} style={{ animationDelay: `${i * 0.2}s` }}>
              <div className="timeline-neon-indicator">
                <span className={`neon-core ${exp.active ? "neon-core--active" : ""}`} />
              </div>
              <div className="timeline-content-panel glass-panel float-layer-slow" style={{ animationDelay: `${i * 0.5}s` }}>
                {exp.active && <div className="active-badge">● Currently Active</div>}
                <div className="timeline-header-block">
                  <h3 className="timeline-role-title">{exp.role}</h3>
                  <span className="timeline-timeframe">{exp.period}</span>
                </div>
                <p className="timeline-org-identifier">{exp.org}</p>
                <ul className="timeline-bullet-matrix">
                  {exp.points.map((pt, j) => (
                    <li key={j} style={{ animationDelay: `${i * 0.15 + j * 0.06}s` }}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Education Timeline */}
        <div className="timeline-sub-heading" style={{ marginTop: "60px" }}>
          <span className="timeline-sub-icon">🎓</span> Education <span className="jp-heading-label" style={{ fontSize: "1rem" }} aria-hidden="true">学歴</span>
        </div>
        <div className="kinetic-timeline edu-timeline">
          {EDUCATION.map((edu, i) => (
            <div className="timeline-node" key={i} style={{ animationDelay: `${i * 0.2}s` }}>
              <div className="timeline-neon-indicator timeline-neon-indicator--edu">
                <span className="neon-core neon-core--edu" />
              </div>
              <div className="timeline-content-panel glass-panel float-layer-slow" style={{ animationDelay: `${i * 0.4}s` }}>
                <div className="timeline-header-block">
                  <h3 className="timeline-role-title">{edu.degree}</h3>
                  <span className="timeline-timeframe timeline-timeframe--edu">{edu.period}</span>
                </div>
                <p className="timeline-org-identifier">{edu.institution}</p>
                <div className="edu-detail-badge">{edu.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [ref, inView] = useInView(0.25);
  return (
    <section className="section contact-section" id="contact" ref={ref}>
      <div className={`section__inner contact-wrapper ${inView ? "elastic-pull-up" : "hidden-pull-down"}`}>
        <InkBrushDivider />
        <div className="contact-glass-box glass-panel float-layer-fast">
          <div className="contact-ambient-core" />
          <h2 className="section__heading text-center">Initialize Handshake<span className="heading-dot">.</span> <span className="jp-heading-label" aria-hidden="true">連絡</span></h2>
          <p className="contact-lead">Seeking efficient engineering workflows, full-time targeting, or complex algorithmic collaboration. Communications relay active.</p>
          <div className="contact-nodes">
            <a href="mailto:rishit_dev@yahoo.com" className="contact-node-link">
              <span className="node-icon">✉</span>
              <span className="node-label">System Email</span>
              <span className="node-arrow">↗</span>
            </a>
            <a href="https://www.linkedin.com/in/rishit-mohanty-620bbb284/" target="_blank" rel="noreferrer" className="contact-node-link">
              <span className="node-icon">in</span>
              <span className="node-label">LinkedIn Connection</span>
              <span className="node-arrow">↗</span>
            </a>
            <a href="https://github.com/" target="_blank" rel="noreferrer" className="contact-node-link">
              <span className="node-icon">⌥</span>
              <span className="node-label">GitHub Protocol</span>
              <span className="node-arrow">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer-glass">
      <div className="jp-footer-bamboo" aria-hidden="true">
        <BambooSection className="bamboo-footer" />
      </div>
      <div className="footer-glass__inner">
        <p className="footer-brand">Built by <span className="highlight-cyan">Rishit Mohanty</span></p>
        <p className="footer-jp-proverb" aria-label="Japanese proverb">七転び八起き — Fall seven times, rise eight.</p>
        <p className="footer-system-status">● Core Systems Active | {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}

// ─── ANIME LOADING SCREEN ───────────────────────────────────────────
function AnimeLoader({ onDone }) {
  const [phase, setPhase] = useState(0); // 0=intro, 1=typing, 2=fadeout
  const [typedText, setTypedText] = useState("");
  const [showSakura, setShowSakura] = useState(false);
  const [eyeState, setEyeState] = useState("normal"); // normal, blink, sparkle
  const [progress, setProgress] = useState(0);
  const greeting = "こんにちは！";
  const subtext = "Rishit.dev is loading...";

  useEffect(() => {
    // Phase 0 → show character, then start typing
    const t1 = setTimeout(() => { setPhase(1); setShowSakura(true); }, 600);
    return () => clearTimeout(t1);
  }, []);

  // Typing greeting
  useEffect(() => {
    if (phase !== 1) return;
    if (typedText.length < greeting.length) {
      const t = setTimeout(() => setTypedText(greeting.slice(0, typedText.length + 1)), 120);
      return () => clearTimeout(t);
    }
  }, [phase, typedText]);

  // Progress bar
  useEffect(() => {
    if (phase < 1) return;
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 2;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [phase]);

  // Blinking eyes
  useEffect(() => {
    const blink = () => {
      setEyeState("blink");
      setTimeout(() => setEyeState("normal"), 150);
    };
    const t = setInterval(blink, 2800);
    return () => clearInterval(t);
  }, []);

  // Sparkle on hover
  const handleCharHover = () => {
    setEyeState("sparkle");
    setTimeout(() => setEyeState("normal"), 800);
  };

  // Fade out at 100%
  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => { setPhase(2); setTimeout(onDone, 600); }, 300);
      return () => clearTimeout(t);
    }
  }, [progress, onDone]);

  return (
    <div className={`anime-loader ${phase === 2 ? "anime-loader--out" : ""}`}>
      {/* Washi paper background with subtle grid */}
      <div className="loader-bg-grid" />
      <div className="loader-ambient-l" />
      <div className="loader-ambient-r" />

      {/* Falling sakura petals */}
      {showSakura && Array.from({ length: 18 }).map((_, i) => (
        <div key={i} className="loader-petal" style={{
          left: `${(i * 5.8 + 3) % 100}%`,
          animationDuration: `${3 + (i % 4) * 0.7}s`,
          animationDelay: `${(i * 0.22) % 2.5}s`,
          "--rot": `${(i * 47) % 360}deg`,
          fontSize: `${12 + (i % 3) * 4}px`,
        }}>🌸</div>
      ))}

      {/* Main content card */}
      <div className={`loader-card ${phase >= 1 ? "loader-card--in" : ""}`}>

        {/* Torii arch above character */}
        <svg className="loader-torii-mini" viewBox="0 0 160 90" xmlns="http://www.w3.org/2000/svg">
          <path d="M10,46 Q80,28 150,46" fill="none" stroke="#c0392b" strokeWidth="10" strokeLinecap="round" opacity="0.85"/>
          <line x1="22" y1="58" x2="138" y2="58" stroke="#c0392b" strokeWidth="6" strokeLinecap="round" opacity="0.7"/>
          <line x1="32" y1="52" x2="32" y2="88" stroke="#c0392b" strokeWidth="8" strokeLinecap="round"/>
          <line x1="128" y1="52" x2="128" y2="88" stroke="#c0392b" strokeWidth="8" strokeLinecap="round"/>
        </svg>

        {/* Anime girl character (SVG) */}
        <div
          className="loader-char"
          onMouseEnter={handleCharHover}
          style={{ cursor: "pointer" }}
          title="Hover me!"
        >
          <svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg" className="loader-char-svg">
            {/* Hair back */}
            <ellipse cx="60" cy="55" rx="38" ry="44" fill="#3d1f00" />
            <path d="M22,55 Q10,100 18,140" fill="none" stroke="#3d1f00" strokeWidth="16" strokeLinecap="round"/>
            <path d="M98,55 Q110,100 102,140" fill="none" stroke="#3d1f00" strokeWidth="16" strokeLinecap="round"/>
            {/* Two side hair strands */}
            <path d="M28,80 Q14,110 20,135" fill="none" stroke="#5a2e00" strokeWidth="10" strokeLinecap="round"/>
            <path d="M92,80 Q106,110 100,135" fill="none" stroke="#5a2e00" strokeWidth="10" strokeLinecap="round"/>

            {/* Face */}
            <ellipse cx="60" cy="60" rx="32" ry="34" fill="#FFD9C0"/>

            {/* Hair front / bangs */}
            <path d="M28,42 Q38,20 60,22 Q82,20 92,42 Q80,30 60,32 Q40,30 28,42Z" fill="#3d1f00"/>
            <path d="M28,42 Q30,56 38,58 Q32,44 28,42Z" fill="#4a2500"/>
            <path d="M92,42 Q90,56 82,58 Q88,44 92,42Z" fill="#4a2500"/>

            {/* Ear */}
            <ellipse cx="28" cy="62" rx="6" ry="8" fill="#FFD9C0"/>
            <ellipse cx="92" cy="62" rx="6" ry="8" fill="#FFD9C0"/>

            {/* Eyes */}
            {eyeState === "blink" ? (
              <>
                <path d="M43,58 Q50,56 57,58" fill="none" stroke="#2d1a0e" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M63,58 Q70,56 77,58" fill="none" stroke="#2d1a0e" strokeWidth="2.5" strokeLinecap="round"/>
              </>
            ) : eyeState === "sparkle" ? (
              <>
                {/* Sparkle eyes — big stars */}
                <circle cx="50" cy="60" r="10" fill="#fff"/>
                <circle cx="70" cy="60" r="10" fill="#fff"/>
                <circle cx="50" cy="60" r="7" fill="#6a0dad"/>
                <circle cx="70" cy="60" r="7" fill="#6a0dad"/>
                <polygon points="50,52 51.5,57 57,57 52.5,60 54,65 50,62 46,65 47.5,60 43,57 48.5,57" fill="#FFD700" opacity="0.9" transform="scale(0.6) translate(33,40)"/>
                <polygon points="70,52 71.5,57 77,57 72.5,60 74,65 70,62 66,65 67.5,60 63,57 68.5,57" fill="#FFD700" opacity="0.9" transform="scale(0.6) translate(57,40)"/>
                <circle cx="47" cy="57" r="2.5" fill="white" opacity="0.9"/>
                <circle cx="67" cy="57" r="2.5" fill="white" opacity="0.9"/>
              </>
            ) : (
              <>
                {/* Normal big anime eyes */}
                <ellipse cx="50" cy="61" rx="10" ry="11" fill="#fff"/>
                <ellipse cx="70" cy="61" rx="10" ry="11" fill="#fff"/>
                {/* Iris */}
                <ellipse cx="50" cy="63" rx="7" ry="8" fill="#6a3fa0"/>
                <ellipse cx="70" cy="63" rx="7" ry="8" fill="#6a3fa0"/>
                {/* Pupil */}
                <ellipse cx="51" cy="64" rx="4" ry="5" fill="#1a0a30"/>
                <ellipse cx="71" cy="64" rx="4" ry="5" fill="#1a0a30"/>
                {/* Shine */}
                <circle cx="47" cy="60" r="2.5" fill="white" opacity="0.95"/>
                <circle cx="67" cy="60" r="2.5" fill="white" opacity="0.95"/>
                {/* Eyelash top */}
                <path d="M40,55 Q50,51 60,55" fill="none" stroke="#2d1a0e" strokeWidth="2" strokeLinecap="round"/>
                <path d="M60,55 Q70,51 80,55" fill="none" stroke="#2d1a0e" strokeWidth="2" strokeLinecap="round"/>
              </>
            )}

            {/* Blush */}
            <ellipse cx="36" cy="70" rx="8" ry="5" fill="#FFB3A7" opacity="0.5"/>
            <ellipse cx="84" cy="70" rx="8" ry="5" fill="#FFB3A7" opacity="0.5"/>

            {/* Nose */}
            <path d="M57,74 Q60,77 63,74" fill="none" stroke="#e8a090" strokeWidth="1.5" strokeLinecap="round"/>

            {/* Smile */}
            <path d="M48,84 Q60,92 72,84" fill="none" stroke="#d4826a" strokeWidth="2" strokeLinecap="round"/>

            {/* Kimono body */}
            <path d="M20,130 Q28,108 60,110 Q92,108 100,130 L104,180 L16,180 Z" fill="#c0392b"/>
            {/* Kimono collar */}
            <path d="M45,110 L60,125 L75,110" fill="none" stroke="#f7f0e3" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
            {/* Kimono obi (belt) */}
            <rect x="30" y="140" width="60" height="16" rx="4" fill="#c9a84c"/>
            <rect x="52" y="136" width="16" height="24" rx="4" fill="#b8940a"/>
            {/* Kimono sakura pattern */}
            <circle cx="35" cy="155" r="3" fill="#F9A8C4" opacity="0.6"/>
            <circle cx="85" cy="152" r="3" fill="#F9A8C4" opacity="0.6"/>
            <circle cx="65" cy="165" r="2.5" fill="#F9A8C4" opacity="0.5"/>

            {/* Arms */}
            <path d="M20,115 Q6,130 12,155" fill="none" stroke="#c0392b" strokeWidth="14" strokeLinecap="round"/>
            <path d="M100,115 Q114,130 108,155" fill="none" stroke="#c0392b" strokeWidth="14" strokeLinecap="round"/>
            {/* Hands */}
            <ellipse cx="13" cy="157" rx="8" ry="7" fill="#FFD9C0"/>
            <ellipse cx="107" cy="157" rx="8" ry="7" fill="#FFD9C0"/>

            {/* Fan in right hand */}
            <path d="M108,150 Q128,130 120,115" fill="none" stroke="#c9a84c" strokeWidth="2"/>
            <path d="M105,148 Q132,128 124,110 Q120,108 116,113 Q128,126 105,148Z" fill="#F9A8C4" opacity="0.85"/>
            <line x1="108" y1="150" x2="124" y2="110" stroke="#8B4513" strokeWidth="1.5"/>
            <line x1="108" y1="150" x2="130" y2="120" stroke="#8B4513" strokeWidth="1.5" opacity="0.6"/>

            {/* Hair ornament / kanzashi */}
            <line x1="72" y1="28" x2="78" y2="14" stroke="#8B4513" strokeWidth="2"/>
            <circle cx="78" cy="12" r="5" fill="#c0392b"/>
            <circle cx="78" cy="12" r="3" fill="#F9A8C4"/>
          </svg>

          {/* Sparkle stars around char on sparkle state */}
          {eyeState === "sparkle" && (
            <div className="loader-sparkles">
              {["✦","✧","✦","✧","✦"].map((s, i) => (
                <span key={i} className={`loader-star loader-star--${i}`}>{s}</span>
              ))}
            </div>
          )}
        </div>

        {/* Speech bubble */}
        <div className={`loader-bubble ${phase >= 1 ? "loader-bubble--in" : ""}`}>
          <span className="loader-greeting">{typedText}<span className="loader-cursor">|</span></span>
          <span className="loader-subtext">{subtext}</span>
        </div>

        {/* Progress bar */}
        <div className="loader-progress-wrap">
          <div className="loader-progress-bar" style={{ width: `${progress}%` }} />
          <div className="loader-progress-kanji">
            {["起","動","中","…"][Math.floor(progress / 26)] ?? "✓"}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <svg className="loader-wave" viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0,40 Q180,0 360,40 Q540,80 720,40 Q900,0 1080,40 Q1260,80 1440,40 L1440,80 L0,80Z" fill="#c0392b" opacity="0.08"/>
      </svg>
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    if (!loading) {
      const sections = document.querySelectorAll("section[id]");
      const observer = new IntersectionObserver(
        (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
        { threshold: 0.35 }
      );
      sections.forEach((s) => observer.observe(s));
      return () => observer.disconnect();
    }
  }, [loading]);

  if (loading) return <TomJerryLoader onDone={() => setLoading(false)} />;

  return (
    <div className="app-root">
      <Navbar active={activeSection} />
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </div>
  );
}