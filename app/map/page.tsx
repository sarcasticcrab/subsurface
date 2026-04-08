"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabase";

const DARK = "#2C3328";
const LIGHT = "#DCFFC7";
const ACCENT = "#99C555";
const WARN = "#e8a04a";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;
const MAPBOX_STYLE = "mapbox://styles/nathanojyoung/cjy1uj71o0psy1crvqt0hllfu";

const UK_BOUNDS: [[number, number], [number, number]] = [
  [-10.5, 49.5],
  [2.1, 61.0],
];

interface Observation {
  id: string;
  lng: number;
  lat: number;
  tags: string[];
  notes: string;
  date: string;
  status: string;
  file_url?: string;
}

const TAGS = [
  "Fish present",
  "Aquatic plants",
  "Invertebrates",
  "Clear water",
  "Murky water",
  "Litter",
  "Human waste",
  "Sanitary products",
  "Wet wipes / toilet paper",
  "Other",
];

export default function MapPage() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const pendingMarkerRef = useRef<any>(null);

  const [observations, setObservations] = useState<Observation[]>([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedObs, setSelectedObs] = useState<Observation | null>(null);
  const [pendingLng, setPendingLng] = useState<number | null>(null);
  const [pendingLat, setPendingLat] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("");
  const [weather, setWeather] = useState<string[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [terms, setTerms] = useState({ content: false, data: false });

  // Load approved observations from Supabase
  useEffect(() => {
    async function loadObservations() {
      const { data, error } = await supabase
        .from("observations")
        .select("*")
        .eq("status", "approved");
      if (!error && data) setObservations(data);
    }
    loadObservations();
  }, []);

  // Init map
  useEffect(() => {
    if (mapRef.current) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.js";
    script.onload = () => initMap();
    document.head.appendChild(script);
  }, []);

  // Add markers whenever observations update and map is ready
  useEffect(() => {
    if (mapRef.current && observations.length > 0) {
      addObservationMarkers(mapRef.current, observations);
    }
  }, [observations]);

  function initMap() {
    const mapboxgl = (window as any).mapboxgl;
    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: MAPBOX_STYLE,
      center: [-2.5, 54.5],
      zoom: 5.5,
      maxBounds: UK_BOUNDS,
    });

    map.on("load", () => {
      // Reload observations once map is ready
      supabase
        .from("observations")
        .select("*")
        .eq("status", "approved")
        .then(({ data }) => {
          if (data) {
            setObservations(data);
            addObservationMarkers(map, data);
          }
        });

      map.on("click", (e: any) => {
        const lng = e.lngLat.lng;
        const lat = e.lngLat.lat;
        dropPendingPin(map, lng, lat);
        setPendingLng(lng);
        setPendingLat(lat);
        setSelectedObs(null);
        setSelectedTags([]);
        setNotes("");
        setTimeOfDay("");
        setWeather([]);
        setTerms({ content: false, data: false });
        setSubmitted(false);
        setPanelOpen(true);
      });
    });

    mapRef.current = map;
  }

  function makeMarkerEl(color: string, borderColor: string, size = 16) {
    const wrapper = document.createElement("div");
    wrapper.style.width = "0";
    wrapper.style.height = "0";
    wrapper.style.position = "relative";

    const dot = document.createElement("div");
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.background = color;
    dot.style.borderRadius = "50%";
    dot.style.border = `2.5px solid ${borderColor}`;
    dot.style.cursor = "pointer";
    dot.style.transition = "transform 0.2s ease";
    dot.style.position = "absolute";
    dot.style.top = `${-size / 2}px`;
    dot.style.left = `${-size / 2}px`;
    dot.style.border = `2.5px solid ${DARK}`;
    dot.style.boxShadow = `0 0 0 1.5px #4DFF6E`;
    dot.onmouseenter = () => { dot.style.transform = "scale(1.7)"; };
    dot.onmouseleave = () => { dot.style.transform = "scale(1)"; };

    wrapper.appendChild(dot);
    return { wrapper, dot };
  }

  function dropPendingPin(map: any, lng: number, lat: number) {
    const mapboxgl = (window as any).mapboxgl;
    if (pendingMarkerRef.current) {
      pendingMarkerRef.current.remove();
      pendingMarkerRef.current = null;
    }
    const wrapper = document.createElement("div");
    wrapper.style.width = "0";
    wrapper.style.height = "0";
    wrapper.style.position = "relative";
    wrapper.style.pointerEvents = "none";

    const dot = document.createElement("div");
    dot.style.width = "14px";
    dot.style.height = "14px";
    dot.style.background = LIGHT;
    dot.style.borderRadius = "50%";
    dot.style.border = `3px solid ${DARK}`;
    dot.style.boxShadow = `0 0 0 2px ${LIGHT}`;
    dot.style.position = "absolute";
    dot.style.top = "-7px";
    dot.style.left = "-7px";
    dot.style.pointerEvents = "none";

    wrapper.appendChild(dot);

    const marker = new mapboxgl.Marker({ element: wrapper, anchor: "center" })
      .setLngLat([lng, lat])
      .addTo(map);

    pendingMarkerRef.current = marker;
  }

  function addObservationMarkers(map: any, obs: Observation[]) {
    const mapboxgl = (window as any).mapboxgl;
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    obs.forEach(o => {
      const { wrapper, dot } = makeMarkerEl("#4DFF6E", DARK);

      const marker = new mapboxgl.Marker({ element: wrapper, anchor: "center" })
        .setLngLat([o.lng, o.lat])
        .addTo(map);

      dot.addEventListener("click", (e: MouseEvent) => {
        e.stopPropagation();
        if (pendingMarkerRef.current) {
          pendingMarkerRef.current.remove();
          pendingMarkerRef.current = null;
        }
        setPendingLng(null);
        setPendingLat(null);
        setSelectedObs(o);
        setPanelOpen(true);
      });

      markersRef.current.push(marker);
    });
  }

  function toggleTag(tag: string) {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  }

  async function handleSearch(q: string) {
    setSearchQuery(q);
    if (q.length < 3) { setSearchResults([]); return; }
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&countrycodes=gb&limit=5`
    );
    const data = await res.json();
    setSearchResults(data);
  }

  function flyTo(lng: number, lat: number) {
    mapRef.current?.flyTo({ center: [lng, lat], zoom: 12, duration: 1500 });
    setSearchResults([]);
    setSearchQuery("");
  }

  async function handleSubmit() {
    if (pendingLng === null || pendingLat === null) return;
    setSubmitting(true);

    // Upload file first if one was selected
    let file_url: string | null = null;
    if (uploadedFile) {
      const fileExt = uploadedFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("observations")
        .upload(fileName, uploadedFile, { cacheControl: "3600", upsert: false });

      if (uploadError) {
        alert(`File upload failed: ${uploadError.message}`);
        setSubmitting(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("observations")
        .getPublicUrl(fileName);

      file_url = urlData.publicUrl;
    }

    // Insert observation with file URL
    const { error } = await supabase.from("observations").insert({
      lng: pendingLng,
      lat: pendingLat,
      tags: selectedTags,
      notes,
      time_of_day: timeOfDay,
      weather,
      date: new Date().toISOString().split("T")[0],
      status: "pending",
      file_url,
    });

    setSubmitting(false);

    if (error) {
      console.error("Supabase insert error:", error.message);
      alert(`Submission failed: ${error.message}`);
      return;
    }

    setSubmitted(true);
    if (pendingMarkerRef.current) {
      pendingMarkerRef.current.remove();
      pendingMarkerRef.current = null;
    }
    setPendingLng(null);
    setPendingLat(null);
  }

  function handleClosePanel() {
    if (pendingMarkerRef.current) {
      pendingMarkerRef.current.remove();
      pendingMarkerRef.current = null;
    }
    setPanelOpen(false);
    setPendingLng(null);
    setPendingLat(null);
    setSelectedObs(null);
    setSubmitted(false);
    setTimeOfDay("");
    setWeather([]);
    setTerms({ content: false, data: false });
  }

  return (
    <div style={styles.page}>

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

      {/* Search */}
      <div style={styles.searchWrap}>
        <input
          style={styles.searchInput}
          placeholder="Search a location in the UK…"
          value={searchQuery}
          onChange={e => handleSearch(e.target.value)}
        />
        {searchResults.length > 0 && (
          <ul style={styles.searchDropdown}>
            {searchResults.map((r, i) => (
              <li
                key={i}
                style={styles.searchResult}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "0.7")}
                onClick={() => flyTo(parseFloat(r.lon), parseFloat(r.lat))}
              >
                {r.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={styles.hint}>Click anywhere on the map to add an observation</div>

      <div ref={mapContainer} style={styles.map} />

      {/* Side panel */}
      <div style={{ ...styles.panel, transform: panelOpen ? "translateX(0)" : "translateX(110%)" }}>
        <button style={styles.closeBtn} onClick={handleClosePanel}>✕</button>

        {selectedObs ? (
          // Viewing approved observation
          <>
            <p style={styles.panelLabel}>Observation</p>
            <div style={styles.tagsList}>
              {(Array.isArray(selectedObs.tags) ? selectedObs.tags : JSON.parse(selectedObs.tags || "[]")).map((t: string) => (
                <span key={t} style={styles.tagChipActive}>{t}</span>
              ))}
            </div>
            <p style={styles.panelDate}>{selectedObs.date}</p>
            <p style={styles.panelNotes}>{selectedObs.notes}</p>
            {selectedObs.file_url && (
              selectedObs.file_url.match(/\.(mp4|mov|webm)$/i) ? (
                <video
                  src={selectedObs.file_url}
                  controls
                  style={styles.mediaPreview}
                />
              ) : (
                <a href={selectedObs.file_url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={selectedObs.file_url}
                    alt="Observation"
                    style={styles.mediaPreview}
                  />
                </a>
              )
            )}
            <p style={styles.panelCoords}>
              {selectedObs.lat.toFixed(4)}°N &nbsp;{Math.abs(selectedObs.lng).toFixed(4)}°W
            </p>
          </>
        ) : submitted ? (
          // Confirmation screen
          <>
            <p style={styles.panelLabel}>Submitted</p>
            <h2 style={styles.panelTag}>Thank you</h2>
            <p style={styles.panelNotes}>
              Your observation has been submitted and will appear on the map once reviewed.
            </p>
            <button style={styles.submitBtn} onClick={handleClosePanel}>Close</button>
          </>
        ) : (
          // New observation form
          <>
            <p style={styles.panelLabel}>New observation</p>
            {pendingLat !== null && pendingLng !== null && (
              <p style={styles.panelCoords}>
                {pendingLat.toFixed(4)}°N &nbsp;{Math.abs(pendingLng).toFixed(4)}°W
              </p>
            )}

            <label style={styles.fieldLabel}>Tags — select all that apply</label>
            <div style={styles.tagGrid}>
              {TAGS.map(t => {
                const active = selectedTags.includes(t);
                return (
                  <button
                    key={t}
                    style={active ? styles.tagChipActive : styles.tagChip}
                    onClick={() => toggleTag(t)}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            <label style={styles.fieldLabel}>Time of day</label>
            <div style={styles.tagGrid}>
              {["Dawn", "Morning", "Midday", "Afternoon", "Dusk", "Night"].map(t => (
                <button
                  key={t}
                  style={timeOfDay === t ? styles.tagChipActive : styles.tagChip}
                  onClick={() => setTimeOfDay(prev => prev === t ? "" : t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <label style={styles.fieldLabel}>Weather</label>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" as const }}>
              {[
                { label: "Sunny", icon: <SunIcon /> },
                { label: "Partly cloudy", icon: <PartlyCloudyIcon /> },
                { label: "Overcast", icon: <OvercastIcon /> },
                { label: "Rain", icon: <RainIcon /> },
                { label: "Heavy rain", icon: <HeavyRainIcon /> },
                { label: "Snow", icon: <SnowIcon /> },
                { label: "Fog", icon: <FogIcon /> },
                { label: "Wind", icon: <WindIcon /> },
              ].map(({ label, icon }) => {
                const active = weather.includes(label);
                return (
                  <button
                    key={label}
                    title={label}
                    onClick={() => setWeather(prev => prev.includes(label) ? prev.filter(w => w !== label) : [...prev, label])}
                    style={{
                      ...styles.weatherBtn,
                      background: active ? ACCENT : "rgba(220,255,199,0.06)",
                      border: active ? `1px solid ${ACCENT}` : `1px solid rgba(220,255,199,0.2)`,
                      position: "relative" as const,
                    }}
                  >
                    {/* Icon pinned at fixed distance from top */}
                    <span style={{
                      position: "absolute" as const,
                      top: "18px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      color: active ? DARK : LIGHT,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>{icon}</span>
                    {/* Label pinned at bottom */}
                    <span style={{
                      position: "absolute" as const,
                      bottom: "7px",
                      left: 0,
                      right: 0,
                      fontSize: "0.52rem",
                      fontFamily: '"clother", sans-serif',
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase" as const,
                      color: active ? DARK : LIGHT,
                      opacity: active ? 1 : 0.6,
                      textAlign: "center" as const,
                      lineHeight: 1.2,
                      padding: "0 2px",
                    }}>{label}</span>
                  </button>
                );
              })}
            </div>

            <label style={styles.fieldLabel}>Notes</label>
            <textarea
              style={styles.textarea}
              placeholder="What did you see? e.g. species observed, water conditions, visibility depth, any unusual activity…"
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />

            <label style={styles.fieldLabel}>Upload footage</label>
            <div style={styles.uploadBox}>
              {uploadedFile ? (
                <span style={{ fontSize: "0.85rem", fontFamily: "adobe-jenson-pro-caption, serif", fontStyle: "italic", color: LIGHT }}>
                  ✓ {uploadedFile.name}
                </span>
              ) : (
                <span style={{ opacity: 0.5, fontSize: "0.85rem", fontFamily: "adobe-jenson-pro-caption, serif", fontStyle: "italic" }}>
                  Drag & drop or click to upload
                </span>
              )}
              <input
                type="file"
                accept="image/*,video/*"
                style={styles.fileInput}
                onChange={e => setUploadedFile(e.target.files?.[0] ?? null)}
              />
            </div>

            <label style={styles.fieldLabel}>Terms of submission</label>
            <div style={styles.termsList}>
              {[
                { key: "content", text: "I confirm this footage is my own, was recorded from a publicly accessible location, and does not contain identifiable individuals" },
                { key: "data", text: "I agree my submission may be published on the Subsurface map for environmental research purposes, and I followed the deploy guidelines and left no trace" },
              ].map(({ key, text }) => (
                <label key={key} style={styles.termRow}>
                  <input
                    type="checkbox"
                    checked={terms[key as keyof typeof terms]}
                    onChange={e => setTerms(prev => ({ ...prev, [key]: e.target.checked }))}
                    style={styles.checkbox}
                  />
                  <span style={styles.termText}>
                    {text}. {key === "data" && <a href="/terms" target="_blank" style={styles.termsLink}>Read our full terms.</a>}
                  </span>
                </label>
              ))}
            </div>

            {Object.values(terms).some(v => !v) && (
              <p style={styles.termsNote}>Please agree to all terms before submitting.</p>
            )}

            <button
              style={{ ...styles.submitBtn, opacity: (submitting || Object.values(terms).some(v => !v)) ? 0.4 : 1 }}
              onClick={handleSubmit}
              disabled={submitting || Object.values(terms).some(v => !v)}
            >
              {submitting ? "Submitting…" : "Submit observation"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ── Weather icons ──
const iconProps = { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function SunIcon() {
  return <svg {...iconProps}><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
}
function PartlyCloudyIcon() {
  return <svg {...iconProps}><path d="M12 5a4 4 0 0 1 3.464 6H16a3 3 0 0 1 0 6H8a4 4 0 0 1 0-8 4 4 0 0 1 4-4z"/><circle cx="7" cy="5" r="2"/><line x1="7" y1="2" x2="7" y2="3"/><line x1="4.22" y1="3.22" x2="4.93" y2="3.93"/><line x1="3" y1="6" x2="4" y2="6"/></svg>;
}
function OvercastIcon() {
  return <svg {...iconProps}><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/></svg>;
}
function RainIcon() {
  return <svg {...iconProps}><path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9"/><line x1="8" y1="19" x2="8" y2="21"/><line x1="12" y1="17" x2="12" y2="19"/><line x1="16" y1="19" x2="16" y2="21"/></svg>;
}
function HeavyRainIcon() {
  return <svg {...iconProps}><path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9"/><line x1="8" y1="19" x2="6" y2="23"/><line x1="12" y1="17" x2="10" y2="21"/><line x1="16" y1="19" x2="14" y2="23"/></svg>;
}
function SnowIcon() {
  return <svg {...iconProps}><path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9"/><circle cx="8" cy="19" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="21" r="1" fill="currentColor" stroke="none"/><circle cx="16" cy="19" r="1" fill="currentColor" stroke="none"/><circle cx="6" cy="22" r="1" fill="currentColor" stroke="none"/><circle cx="14" cy="23" r="1" fill="currentColor" stroke="none"/></svg>;
}
function FogIcon() {
  return <svg {...iconProps}><path d="M4 8a8 8 0 0 1 16 0"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="16" x2="21" y2="16"/><line x1="5" y1="20" x2="19" y2="20"/></svg>;
}
function WindIcon() {
  return <svg {...iconProps}><path d="M9.59 4.59A2 2 0 1 1 11 8H2"/><path d="M12.59 19.41A2 2 0 1 0 14 16H2"/><path d="M6.59 11.41A2 2 0 1 1 8 14H2"/></svg>;
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    width: "100vw", height: "100vh", background: DARK, color: LIGHT,
    fontFamily: "adobe-jenson-pro-caption, serif", position: "relative", overflow: "hidden",
  },
  nav: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "1.25rem 2.5rem", position: "absolute", top: 0, left: 0, right: 0,
    zIndex: 200, background: "transparent",
  },
  navLinks: { display: "flex", gap: "2.5rem" },
  navLink: {
    fontFamily: '"clother", sans-serif', fontWeight: 700, fontSize: "0.85rem",
    letterSpacing: "0.08em", textTransform: "uppercase" as const,
    textDecoration: "none", color: LIGHT, opacity: 0.7,
  },
  searchWrap: {
    position: "absolute", top: "5.5rem", left: "50%", transform: "translateX(-50%)",
    zIndex: 200, width: "420px", maxWidth: "90vw",
  },
  searchInput: {
    width: "100%", padding: "0.75rem 1.25rem",
    background: "rgba(44,51,40,0.92)", border: `1px solid rgba(220,255,199,0.2)`,
    borderRadius: "2px", color: LIGHT, fontFamily: "adobe-jenson-pro-caption, serif",
    fontStyle: "italic", fontSize: "0.95rem", outline: "none", backdropFilter: "blur(8px)",
  },
  searchDropdown: {
    listStyle: "none", background: "rgba(44,51,40,0.97)",
    border: `1px solid rgba(220,255,199,0.15)`, borderTop: "none",
    borderRadius: "0 0 2px 2px", backdropFilter: "blur(8px)",
    maxHeight: "260px", overflowY: "auto" as const,
  },
  searchResult: {
    padding: "0.65rem 1.25rem", fontSize: "0.8rem", color: LIGHT, opacity: 0.7,
    cursor: "pointer", borderBottom: `1px solid rgba(220,255,199,0.06)`,
    fontFamily: "adobe-jenson-pro-caption, serif", fontStyle: "italic",
  },
  hint: {
    position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
    zIndex: 200, fontSize: "0.75rem", fontFamily: '"clother", sans-serif',
    fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const,
    color: LIGHT, opacity: 0.35, pointerEvents: "none", whiteSpace: "nowrap" as const,
  },
  map: { position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 },
  panel: {
    position: "absolute", top: 0, right: 0, bottom: 0, width: "360px",
    background: "rgba(44,51,40,0.97)", borderLeft: `1px solid rgba(220,255,199,0.12)`,
    zIndex: 300, padding: "5rem 2rem 2rem",
    display: "flex", flexDirection: "column" as const, gap: "1rem",
    transition: "transform 0.4s ease", backdropFilter: "blur(12px)",
    overflowY: "auto" as const,
  },
  closeBtn: {
    position: "absolute", top: "1.5rem", right: "1.5rem", background: "none",
    border: "none", color: LIGHT, fontSize: "1rem", cursor: "pointer",
    opacity: 0.5, fontFamily: "inherit",
  },
  panelLabel: {
    fontFamily: '"clother", sans-serif', fontWeight: 700, fontSize: "0.7rem",
    letterSpacing: "0.15em", textTransform: "uppercase" as const, color: ACCENT,
  },
  panelTag: {
    fontFamily: "adobe-jenson-pro-display, serif", fontWeight: 700,
    fontSize: "2rem", color: LIGHT, lineHeight: 1.1, marginTop: 0,
  },
  panelDate: {
    fontFamily: "adobe-jenson-pro-caption, serif", fontStyle: "italic",
    fontSize: "0.85rem", color: LIGHT, opacity: 0.5,
  },
  panelNotes: {
    fontFamily: "adobe-jenson-pro-caption, serif", fontStyle: "italic",
    fontSize: "1rem", lineHeight: 1.6, color: LIGHT, opacity: 0.85,
  },
  panelCoords: {
    fontFamily: '"clother", sans-serif', fontSize: "0.65rem",
    letterSpacing: "0.08em", color: LIGHT, opacity: 0.35,
  },
  mediaPreview: {
    width: "100%",
    borderRadius: "2px",
    marginTop: "0.5rem",
    display: "block",
  },
  fieldLabel: {
    fontFamily: '"clother", sans-serif', fontWeight: 700, fontSize: "0.7rem",
    letterSpacing: "0.12em", textTransform: "uppercase" as const, color: LIGHT, opacity: 0.5,
  },
  tagGrid: { display: "flex", flexWrap: "wrap" as const, gap: "0.5rem" },
  tagsList: { display: "flex", flexWrap: "wrap" as const, gap: "0.5rem" },
  weatherBtn: {
    width: "60px", height: "68px", borderRadius: "2px", cursor: "pointer",
    display: "flex", flexDirection: "column" as const, alignItems: "center",
    justifyContent: "center", gap: "0.25rem", transition: "all 0.15s ease",
    padding: 0,
  },
  tagChip: {
    padding: "0.35rem 0.75rem",
    background: "rgba(220,255,199,0.06)", border: `1px solid rgba(220,255,199,0.2)`,
    borderRadius: "2px", color: LIGHT, fontFamily: '"clother", sans-serif',
    fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.08em",
    textTransform: "uppercase" as const, cursor: "pointer", opacity: 0.7,
    transition: "all 0.15s ease",
  },
  tagChipActive: {
    padding: "0.35rem 0.75rem", background: ACCENT, border: `1px solid ${ACCENT}`,
    borderRadius: "2px", color: DARK, fontFamily: '"clother", sans-serif',
    fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.08em",
    textTransform: "uppercase" as const, cursor: "pointer", opacity: 1,
    transition: "all 0.15s ease",
  },
  textarea: {
    width: "100%", padding: "0.6rem 0.75rem",
    background: "rgba(220,255,199,0.05)", border: `1px solid rgba(220,255,199,0.15)`,
    borderRadius: "2px", color: LIGHT, fontFamily: "adobe-jenson-pro-caption, serif",
    fontStyle: "italic", fontSize: "0.95rem", outline: "none",
    resize: "vertical" as const, minHeight: "100px",
  },
  uploadBox: {
    width: "100%", padding: "1.5rem",
    border: `1px dashed rgba(220,255,199,0.2)`, borderRadius: "2px",
    display: "flex", alignItems: "center", justifyContent: "center",
    position: "relative" as const, cursor: "pointer", color: LIGHT,
  },
  fileInput: {
    position: "absolute" as const, inset: 0, opacity: 0,
    cursor: "pointer", width: "100%", height: "100%",
  },
  submitBtn: {
    marginTop: "auto", padding: "0.85rem 1.5rem", background: ACCENT,
    border: "none", borderRadius: "2px", color: DARK,
    fontFamily: '"clother", sans-serif', fontWeight: 700, fontSize: "0.8rem",
    letterSpacing: "0.12em", textTransform: "uppercase" as const, cursor: "pointer",
  },
  termsList: {
    display: "flex", flexDirection: "column" as const, gap: "0.6rem",
  },
  termRow: {
    display: "flex", alignItems: "flex-start", gap: "0.6rem", cursor: "pointer",
  },
  checkbox: {
    marginTop: "2px", accentColor: ACCENT, flexShrink: 0, cursor: "pointer",
    width: "13px", height: "13px",
  },
  termText: {
    fontFamily: "adobe-jenson-pro-caption, serif", fontStyle: "italic",
    fontSize: "0.78rem", lineHeight: 1.5, color: LIGHT, opacity: 0.7,
  },
  termsLink: {
    color: ACCENT, textDecoration: "underline",
  },
  termsNote: {
    fontFamily: '"clother", sans-serif', fontWeight: 700, fontSize: "0.6rem",
    letterSpacing: "0.08em", textTransform: "uppercase" as const,
    color: WARN, opacity: 0.8, marginTop: "0.25rem",
  },
};
