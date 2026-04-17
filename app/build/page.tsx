"use client";

import { useState, CSSProperties } from "react";

const DARK = "#2C3328";
const LIGHT = "#DCFFC7";
const ACCENT = "#99C555";
const WARN = "#e8a04a";

type Version = "lite" | "xl";

export default function BuildPage() {
  const [version, setVersion] = useState<Version>("lite");

  return (
    <main style={styles.main}>
      {/* Nav */}
      <nav style={styles.nav}>
        <a href="/" className="nav-logo" style={{ display: "block", lineHeight: 0 }}>
          <img src="/logo.svg" alt="Subsurface" style={{ height: "64px", width: "auto", display: "block" }} />
        </a>
        <div style={styles.navLinks}>
          <a href="/build" style={styles.navLink} className="nav-link">Build</a>
          <a href="/deploy" style={styles.navLink} className="nav-link">Deploy</a>
          <a href="/map" style={styles.navLink} className="nav-link">Map</a>
        </div>
      </nav>

      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroLeft}>
          <p style={styles.eyebrow}>01 — Build</p>
          <h1 style={styles.heroTitle}>Build the camera</h1>
          <p style={styles.heroBody}>
            A low-cost underwater camera using off-the-shelf components and a repurposed glass jar.
            Two versions — choose based on your budget, experience, and how much kit you have access to.
          </p>
        </div>
        <div style={styles.heroRight}>
          <img src="/prototype-lite.png" alt="Lite prototype" style={styles.heroImg} />
          <div style={styles.toggle}>
            <button
              style={version === "lite" ? styles.toggleBtnActive : styles.toggleBtn}
              onClick={() => setVersion("lite")}
            >
              <span style={version === "lite" ? styles.toggleNameActive : styles.toggleName}>Lite</span>
              <span style={version === "lite" ? styles.toggleSubActive : styles.toggleSub}>ESP32-CAM · ~£15</span>
            </button>
            <button
              style={version === "xl" ? styles.toggleBtnActive : styles.toggleBtn}
              onClick={() => setVersion("xl")}
            >
              <span style={version === "xl" ? styles.toggleNameActive : styles.toggleName}>XL</span>
              <span style={version === "xl" ? styles.toggleSubActive : styles.toggleSub}>Raspberry Pi · ~£45</span>
            </button>
          </div>
        </div>
      </div>

      <div style={styles.divider} />

      {version === "lite" ? <LiteVersion /> : <XLVersion />}

      <div style={styles.divider} />

      {/* CTA */}
      <div style={styles.cta}>
        <p style={styles.ctaLabel}>Next step</p>
        <h2 style={styles.ctaTitle}>Deploy your camera</h2>
        <p style={styles.ctaBody}>
          Once built and tested, learn how to place your camera responsibly and capture useful footage.
        </p>
        <a href="/deploy" style={styles.ctaBtn}>Deploy →</a>
      </div>
    </main>
  );
}

function LiteVersion() {
  return (
    <>
      <div style={styles.section}>
        <div style={styles.sectionLeft}>
          <p style={styles.sectionLabel}>Lite — ESP32-CAM</p>
          <div style={styles.specGrid}>
            {[
              ["Cost", "~£15"],
              ["Quality", "720p"],
              ["Difficulty", "Beginner"],
              ["Housing", "IKEA 365+ 180ml"],
              ["Power", "LiPo battery (internal)"],
            ].map(([k, v]) => (
              <div key={k} style={styles.specItem}>
                <span style={styles.specKey}>{k}</span>
                <span style={styles.specVal}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={styles.sectionRight}>
          <div style={styles.containerImgWrap}>
            <img src="/180ml-container.png" alt="IKEA 180ml" style={styles.containerImg} />
          </div>
          <p style={styles.introPara}>
            The Lite version uses an ESP32-CAM — no soldering required. It's beginner-friendly 
            and fits inside a small IKEA 365+ jar.
          </p>
        </div>
      </div>
      <div style={styles.divider} />
      {/* ... (Lite steps omitted for brevity but remain in your original code) ... */}
    </>
  );
}

function XLVersion() {
  return (
    <>
      <div style={styles.section}>
        <div style={styles.sectionLeft}>
          <p style={styles.sectionLabel}>XL — Raspberry Pi</p>
          <div style={styles.specGrid}>
            {[
              ["Cost", "~£45+"],
              ["Quality", "1080p+"],
              ["Difficulty", "Intermediate"],
              ["Housing", "IKEA 365+ 600ml"],
              ["Power", "USB Power Bank"],
            ].map(([k, v]) => (
              <div key={k} style={styles.specItem}>
                <span style={styles.specKey}>{k}</span>
                <span style={styles.specVal}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={styles.sectionRight}>
          <div style={styles.containerImgWrap}>
            <img src="/600ml-container.png" alt="IKEA 600ml" style={styles.containerImg} />
          </div>
          <p style={styles.introPara}>
            The XL version uses a Pi 3A+ and a 3D-printed PETG insert. It features twin LED 
            illumination and high-speed USB tethering for live view.
          </p>
        </div>
      </div>

      <div style={styles.divider} />

      <div style={styles.section}>
        <div style={styles.sectionLeft}><p style={styles.sectionLabel}>Parts list</p></div>
        <div style={styles.sectionRight}>
          <PartsTable parts={[
            { item: "Raspberry Pi 3A+", cost: "£25", note: "Powered by internal battery." },
            { item: "Pi Camera Module 3 Wide NoIR", cost: "£35", note: "Superior low-light sensitivity." },
            { item: "Wago 221-413 (3-port) x2", cost: "£2", note: <span style={{color: ACCENT}}>Essential for the 'Power Island' Hubs.</span> },
            { item: "Wago 221-412 (2-port) x3", cost: "£2", note: "For data tether splicing." },
            { item: "10mm LEDs & 100Ω Resistors", cost: "£2", note: "Twin scene illumination." },
            { item: "INIU Pocket Rocket P50", cost: "£15", note: "10,000mAh compact bank." },
          ]} />
        </div>
      </div>

      <div style={styles.divider} />

      <div style={styles.section}>
        <div style={styles.sectionLeft}><p style={styles.sectionLabel}>Wiring & Assembly</p></div>
        <div style={styles.sectionRight}>
          <Step num="07" title="The 'Power Island' LED Hubs">
            <DiagramBox>
              <svg viewBox="0 0 460 180" style={{ width: "100%", opacity: 0.85 }}>
                {/* Wago Positive */}
                <rect x="50" y="40" width="80" height="60" rx="3" stroke={ACCENT} strokeWidth="1.5" fill="none" />
                <text x="90" y="30" textAnchor="middle" fill={ACCENT} fontSize="10">WAGO A (5V+)</text>
                <circle cx="65" cy="70" r="4" fill={ACCENT} /> <circle cx="90" cy="70" r="4" fill={ACCENT} /> <circle cx="115" cy="70" r="4" fill={ACCENT} />
                {/* Wago Negative */}
                <rect x="330" y="40" width="80" height="60" rx="3" stroke="#888" strokeWidth="1.5" fill="none" />
                <text x="370" y="30" textAnchor="middle" fill="#888" fontSize="10">WAGO B (GND-)</text>
                <circle cx="345" cy="70" r="4" fill="#888" /> <circle cx="370" cy="70" r="4" fill="#888" /> <circle cx="395" cy="70" r="4" fill="#888" />
                {/* Visualizing the "islands" - no connection between them */}
                <path d="M 90 74 L 90 130 L 200 130" stroke={ACCENT} fill="none" strokeDasharray="4,2" />
                <path d="M 370 74 L 370 130 L 260 130" stroke="#888" fill="none" strokeDasharray="4,2" />
                <rect x="200" y="120" width="60" height="20" rx="2" fill="rgba(255,255,255,0.1)" />
                <text x="230" y="133" textAnchor="middle" fill={LIGHT} fontSize="8">LED UNIT</text>
              </svg>
            </DiagramBox>
            <p style={styles.stepBody}>
              Use two 3-port Wagos as separate islands. **Wago A** is strictly for 5V (Red wires). **Wago B** is strictly for GND (Black wires). 
            </p>
            <p style={{ ...styles.stepBody, marginTop: "0.5rem" }}>
              Run a Red/Black wire pair from the Wagos through the 3D-printed channels to each LED location. 
              <strong style={{ color: WARN }}> Never connect Wago A directly to Wago B.</strong>
            </p>
          </Step>

          <Step num="08" title="Splice the USB Tether">
             <p style={styles.stepBody}>
              The 5m tether cable enters through a PG7 gland. Inside, you must join the data wires to a short pigtail using the 2-port Wagos. 
              <strong> You must snip the Red (5V) wire on the tether</strong> to prevent power conflicts between your laptop and the internal battery.
            </p>
          </Step>
        </div>
      </div>
      
      <div style={styles.divider} />
      <Principles items={[
        { title: "Power Islands", body: "Keep Positive and Negative on separate Wago blocks to prevent shorts." },
        { title: "PETG Haze", body: "Paint the inside of the LED bays black to prevent light from bleeding through the clear plastic into the lens." },
        { title: "NoIR White Balance", body: "Correct the pink colour cast in post by shifting white balance toward Cyan." },
      ]} />
    </>
  );
}

// ── Helper Components ──

function PartsTable({ parts }: { parts: { item: string; cost: string; note: string | React.ReactNode }[] }) {
  return (
    <table style={styles.partsTable}>
      <thead>
        <tr><th style={styles.partsTh}>Component</th><th style={styles.partsTh}>Cost</th><th style={styles.partsTh}>Notes</th></tr>
      </thead>
      <tbody>
        {parts.map((p, i) => (
          <tr key={i} style={styles.partsTr}>
            <td style={styles.partsTd}>{p.item}</td>
            <td style={{ ...styles.partsTd, color: ACCENT }}>{p.cost}</td>
            <td style={{ ...styles.partsTd, opacity: 0.7 }}>{p.note}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Step({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div style={styles.step}>
      <div style={styles.stepHeader}>
        <span style={styles.stepNum}>{num}</span>
        <h3 style={styles.stepTitle}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

function DiagramBox({ children }: { children: React.ReactNode }) {
  return <div style={styles.diagram}>{children}</div>;
}

function Principles({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div style={styles.section}>
      <div style={styles.sectionLeft}><p style={styles.sectionLabel}>Principles</p></div>
      <div style={styles.sectionRight}>
        <div style={styles.principles}>
          {items.map((p, i) => (
            <div key={i} style={styles.principle}>
              <h3 style={styles.principleTitle}>{p.title}</h3>
              <p style={styles.principleBody}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  main: { minHeight: "100vh", background: DARK, color: LIGHT, fontFamily: "adobe-jenson-pro-caption, serif" },
  nav: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 2.5rem", position: "fixed", top: 0, left: 0, right: 0, zIndex: 100 },
  navLinks: { display: "flex", gap: "2.5rem" },
  navLink: { fontFamily: '"clother", sans-serif', fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", color: LIGHT, opacity: 0.7 },
  hero: { display: "flex", alignItems: "flex-end", padding: "8rem 4rem 4rem", gap: "4rem" },
  heroLeft: { flex: "0 0 600px" },
  heroRight: { marginLeft: "auto", display: "flex", flexDirection: "column", gap: "1.25rem", width: "320px" },
  heroImg: { height: "360px", width: "auto" },
  eyebrow: { fontFamily: '"clother", sans-serif', fontSize: "0.7rem", color: ACCENT, textTransform: "uppercase", marginBottom: "1rem" },
  heroTitle: { fontFamily: "adobe-jenson-pro-display, serif", fontSize: "3.5rem", lineHeight: 1, margin: "0 0 1.5rem" },
  heroBody: { fontStyle: "italic", fontSize: "1.1rem", lineHeight: 1.7, opacity: 0.75 },
  toggle: { display: "flex", gap: "1px", border: `1px solid rgba(220,255,199,0.15)` },
  toggleBtn: { padding: "1rem", background: "rgba(220,255,199,0.04)", border: "none", cursor: "pointer", flex: 1, textAlign: "left" },
  toggleBtnActive: { padding: "1rem", background: ACCENT, border: "none", cursor: "pointer", flex: 1, textAlign: "left" },
  toggleName: { display: "block", fontSize: "1.5rem", fontWeight: 700, color: LIGHT },
  toggleNameActive: { display: "block", fontSize: "1.5rem", fontWeight: 700, color: DARK },
  toggleSub: { fontSize: "0.6rem", textTransform: "uppercase", color: LIGHT, opacity: 0.5 },
  toggleSubActive: { fontSize: "0.6rem", textTransform: "uppercase", color: DARK, opacity: 0.7 },
  divider: { height: "1px", background: "rgba(220,255,199,0.1)", margin: "0 4rem" },
  section: { display: "flex", gap: "4rem", padding: "4rem" },
  sectionLeft: { width: "200px" },
  sectionRight: { flex: 1 },
  sectionLabel: { fontFamily: '"clother", sans-serif', fontSize: "0.7rem", color: ACCENT, textTransform: "uppercase" },
  containerImg: { width: "100%", maxWidth: "360px", borderRadius: "2px" },
  introPara: { fontStyle: "italic", fontSize: "1.05rem", lineHeight: 1.75, opacity: 0.85 },
  partsTable: { width: "100%", borderCollapse: "collapse" },
  partsTh: { textAlign: "left", padding: "0.75rem", opacity: 0.4, borderBottom: "1px solid rgba(220,255,199,0.1)", fontSize: "0.65rem", textTransform: "uppercase" },
  partsTd: { padding: "1rem 0.75rem", fontSize: "0.9rem", borderBottom: "1px solid rgba(220,255,199,0.05)", fontStyle: "italic" },
  step: { marginBottom: "3rem" },
  stepHeader: { display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "1rem" },
  stepNum: { fontSize: "3rem", color: ACCENT, fontWeight: 700 },
  stepTitle: { fontSize: "1.5rem", fontWeight: 700 },
  diagram: { background: "rgba(220,255,199,0.03)", padding: "1.5rem", borderRadius: "2px", border: "1px solid rgba(220,255,199,0.1)", maxWidth: "480px" },
  stepBody: { fontStyle: "italic", lineHeight: 1.7, opacity: 0.8 },
  principles: { display: "flex", flexDirection: "column", gap: "2rem" },
  principleTitle: { fontSize: "1.2rem", color: LIGHT, marginBottom: "0.5rem" },
  principleBody: { fontStyle: "italic", opacity: 0.8, lineHeight: 1.6 },
  cta: { padding: "4rem", borderTop: "1px solid rgba(220,255,199,0.1)" },
  ctaLabel: { color: ACCENT, fontSize: "0.7rem", textTransform: "uppercase" },
  ctaTitle: { fontSize: "2rem", margin: "0.5rem 0" },
  ctaBody: { opacity: 0.7, fontStyle: "italic", marginBottom: "1.5rem" },
  ctaBtn: { background: ACCENT, color: DARK, padding: "0.75rem 1.5rem", textDecoration: "none", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase" }
};