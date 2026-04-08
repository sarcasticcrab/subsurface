"use client";

import React, { CSSProperties } from "react";

const DARK = "#2C3328";
const LIGHT = "#DCFFC7";
const ACCENT = "#99C555";

export default function Home() {
  return (
    <main style={styles.main}>

      {/* Navigation — transparent */}
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

      {/* Grid */}
      <div style={styles.grid}>

        {/* Left rotated description */}
        <div style={styles.leftCol}>
          <p style={styles.rotatedText}>
            Subsurface <em>is</em> a participatory framework that enables people to build,
            deploy, and use low-cost underwater cameras to observe and document local aquatic environments.
          </p>
        </div>

        <div style={styles.dividerWrap}><div style={styles.dividerLine} /></div>

        {/* Column 01 */}
        <a href="/build" style={{ ...styles.storyCol, paddingTop: "3rem" }}>
          <div style={styles.numberRow}>
            <span style={styles.storyNumber}>01</span>
            <span style={styles.storyLabel}>Build</span>
          </div>
          <div style={styles.imageWrapper} className="image-wrapper">
            <img src="/build.jpg" alt="Build" className="story-image" />
          </div>
          <p style={styles.storyCaption}>
            Build a low-cost underwater camera from open-source hardware. Choose between the Lite (ESP32) or XL (Raspberry Pi) version.
          </p>
        </a>

        <div style={styles.dividerWrap}><div style={styles.dividerLine} /></div>

        {/* Column 02 */}
        <a href="/deploy" style={{ ...styles.storyCol, paddingTop: "10rem" }}>
          <div style={styles.numberRow}>
            <span style={styles.storyNumber}>02</span>
            <span style={styles.storyLabel}>Deploy</span>
          </div>
          <div style={styles.imageWrapper} className="image-wrapper">
            <img src="/deploy.jpg" alt="Deploy" className="story-image" />
          </div>
          <p style={styles.storyCaption}>
            Deploy your camera responsibly. Guidance on placement, tethering, orientation, and environmental ethics.
          </p>
        </a>

        <div style={styles.dividerWrap}><div style={styles.dividerLine} /></div>

        {/* Column 03 */}
        <a href="/map" style={{ ...styles.storyCol, paddingTop: "3rem" }}>
          <div style={styles.numberRow}>
            <span style={styles.storyNumber}>03</span>
            <span style={styles.storyLabel}>Map</span>
          </div>
          <div style={styles.imageWrapper} className="image-wrapper">
            <img src="/map.jpg" alt="Map" className="story-image" />
          </div>
          <p style={styles.storyCaption}>
            Upload footage and record observations linked to a map. Contribute to a distributed archive of aquatic environments.
          </p>
        </a>

      </div>
    </main>
  );
}

type PlaceholderType = "build" | "deploy" | "map";

interface PlaceholderConfig {
  lines: string[];
  circles: { cx: number; cy: number; r: number }[];
}

function PlaceholderSvg({ type }: { type: PlaceholderType }) {
  const configs: Record<PlaceholderType, PlaceholderConfig> = {
    build: {
      lines: [
        "M 60 160 L 60 80 L 240 80 L 240 160",
        "M 80 80 L 80 50 L 100 50 L 100 80",
        "M 150 160 L 150 200",
        "M 120 140 L 180 140",
        "M 120 100 L 180 100",
        "M 120 120 L 160 120",
      ],
      circles: [{ cx: 150, cy: 170, r: 5 }],
    },
    deploy: {
      lines: [
        "M 50 180 Q 100 120 150 140 Q 200 160 250 100",
        "M 50 200 Q 100 150 150 160 Q 200 180 250 130",
      ],
      circles: [
        { cx: 150, cy: 148, r: 8 },
        { cx: 150, cy: 148, r: 20 },
      ],
    },
    map: {
      lines: [
        "M 60 100 L 240 100 L 240 200 L 60 200 Z",
        "M 80 120 L 140 120",
        "M 80 140 L 180 140",
        "M 80 160 L 160 160",
        "M 80 180 L 200 180",
      ],
      circles: [
        { cx: 180, cy: 130, r: 12 },
        { cx: 180, cy: 130, r: 4 },
      ],
    },
  };

  const c = configs[type];
  return (
    <svg viewBox="0 0 300 280" style={{ width: "100%", height: "100%", opacity: 0.4 }} xmlns="http://www.w3.org/2000/svg">
      {c.lines.map((d, i) => (
        <path key={i} d={d} stroke={LIGHT} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      ))}
      {c.circles.map((props, i) => (
        <circle key={i} {...props} stroke={LIGHT} strokeWidth="1.5" fill="none" />
      ))}
    </svg>
  );
}

const styles: Record<string, CSSProperties> = {
  main: {
    minHeight: "100vh",
    background: DARK,
    color: LIGHT,
    fontFamily: "adobe-jenson-pro-caption, serif",
    display: "flex",
    flexDirection: "column",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1.25rem 2.5rem",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    background: "transparent",
  },
  navLinks: {
    display: "flex",
    gap: "2.5rem",
  },
  tagline: {
    display: "block",
    fontFamily: "adobe-jenson-pro-caption, serif",
    fontStyle: "italic",
    fontSize: "0.7rem",
    color: LIGHT,
    opacity: 0.45,
    letterSpacing: "0.02em",
    marginTop: "0.3rem",
    lineHeight: 1,
  },
  navLink: {
    fontFamily: '"clother", sans-serif',
    fontWeight: 700,
    fontSize: "0.85rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    textDecoration: "none",
    color: LIGHT,
    opacity: 0.7,
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    flex: 1,
    marginTop: "4.5rem",
    minHeight: "calc(100vh - 4.5rem)",
  },
  leftCol: {
    width: "220px",
    minWidth: "220px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "3rem 0",
  },
  rotatedText: {
    writingMode: "vertical-rl",
    transform: "rotate(180deg)",
    fontSize: "1.45rem",
    lineHeight: 1.35,
    fontFamily: "adobe-jenson-pro-caption, serif",
    fontWeight: 400,
    fontStyle: "italic",
    maxHeight: "85vh",
    color: LIGHT,
    margin: 0,
    padding: "0 1.5rem",
  },
  dividerWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    width: "1px",
  },
  dividerLine: {
    width: "1px",
    height: "55vh",
    background: "rgba(220,255,199,0.2)",
  },
  storyCol: {
    flex: 1,
    padding: "3rem 2.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer",
  },
  numberRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: "0.6rem",
    marginBottom: "-1.8rem",
    position: "relative",
    zIndex: 2,
    width: "85%",
  },
  storyNumber: {
    fontFamily: "adobe-jenson-pro-display, serif",
    fontWeight: 700,
    fontSize: "5.5rem",
    lineHeight: 1,
    color: LIGHT,
    letterSpacing: "-0.02em",
  },
  storyLabel: {
    fontFamily: '"clother", sans-serif',
    fontWeight: 700,
    fontSize: "0.85rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: ACCENT,
    paddingTop: "0.6rem",
    lineHeight: 1,
  },
  imageWrapper: {
    width: "85%",
    aspectRatio: "3/4",
    marginBottom: "1.5rem",
    overflow: "hidden",
    position: "relative",
    zIndex: 1,
  },
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  storyCaption: {
    fontSize: "1rem",
    lineHeight: 1.6,
    fontFamily: "adobe-jenson-pro-caption, serif",
    fontWeight: 400,
    fontStyle: "italic",
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    color: LIGHT,
    opacity: 0.85,
    width: "85%",
  },
};
