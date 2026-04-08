"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "../../lib/supabase";
import { supabaseAdmin } from "../../lib/supabaseAdmin";

const DARK = "#2C3328";
const LIGHT = "#DCFFC7";
const ACCENT = "#99C555";
const ADMIN_PASSWORD = "subsurface-admin";
const SESSION_KEY = "subsurface_admin_authed";

const TAGS = ["Fish present", "Litter", "Clear water", "Murky water", "Aquatic plants", "Invertebrates", "Other"];

interface Observation {
  id: string;
  lng: number;
  lat: number;
  tags: string[];
  notes: string;
  date: string;
  status: string;
}

function parseTags(tags: any): string[] {
  if (Array.isArray(tags)) return tags;
  try { return JSON.parse(tags || "[]"); } catch { return []; }
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [observations, setObservations] = useState<Observation[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("pending");
  const [editing, setEditing] = useState<Observation | null>(null);
  const [editNotes, setEditNotes] = useState("");
  const [editTags, setEditTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [newCount, setNewCount] = useState(0); // badge for new submissions since last load
  const [lastLoaded, setLastLoaded] = useState<Date | null>(null);
  const channelRef = useRef<any>(null);

  // Restore auth from sessionStorage on mount
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "true") {
      setAuthed(true);
    }
  }, []);

  // Load observations and set up real-time subscription when authed
  useEffect(() => {
    if (!authed) return;
    loadObservations();
    setupRealtime();
    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [authed, filter]);

  function setupRealtime() {
    // Remove any existing channel
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
    }

    const channel = supabase
      .channel("observations-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "observations" },
        (payload) => {
          // Increment badge and reload
          setNewCount(prev => prev + 1);
          loadObservations();
        }
      )
      .subscribe();

    channelRef.current = channel;
  }

  async function loadObservations() {
    setLoading(true);
    setNewCount(0);
    let query = supabaseAdmin
      .from("observations")
      .select("*")
      .order("date", { ascending: false });
    if (filter !== "all") query = query.eq("status", filter);
    const { data } = await query;
    if (data) setObservations(data);
    setLastLoaded(new Date());
    setLoading(false);
  }

  async function approve(id: string) {
    const { error } = await supabaseAdmin
      .from("observations")
      .update({ status: "approved" })
      .eq("id", id);
    if (error) alert(`Approve failed: ${error.message}`);
    else loadObservations();
  }

  async function reject(id: string) {
    const { error } = await supabaseAdmin
      .from("observations")
      .update({ status: "rejected" })
      .eq("id", id);
    if (error) alert(`Reject failed: ${error.message}`);
    else loadObservations();
  }

  async function remove(id: string) {
    if (!confirm("Delete this observation permanently?")) return;
    const { error } = await supabaseAdmin
      .from("observations")
      .delete()
      .eq("id", id);
    if (error) alert(`Delete failed: ${error.message}`);
    else loadObservations();
  }

  function startEdit(obs: Observation) {
    setEditing(obs);
    setEditNotes(obs.notes);
    setEditTags(parseTags(obs.tags));
  }

  async function saveEdit() {
    if (!editing) return;
    const { error } = await supabaseAdmin
      .from("observations")
      .update({ notes: editNotes, tags: editTags })
      .eq("id", editing.id);
    if (error) alert(`Save failed: ${error.message}`);
    else { setEditing(null); loadObservations(); }
  }

  function toggleEditTag(tag: string) {
    setEditTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  }

  function handleLogin() {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "true");
      setAuthed(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
    setPassword("");
  }

  // ── Login screen ──
  if (!authed) {
    return (
      <div style={styles.loginPage}>
        <div style={styles.loginBox}>
          <p style={styles.loginLabel}>Subsurface Admin</p>
          <input
            type="password"
            style={styles.input}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
          />
          {passwordError && <p style={styles.error}>Incorrect password</p>}
          <button style={styles.btn} onClick={handleLogin}>Enter</button>
        </div>
      </div>
    );
  }

  // ── Admin panel ──
  return (
    <div style={styles.page}>

      {/* Header */}
      <div style={styles.header}>
        <div>
          <p style={styles.headerLabel}>Subsurface Admin</p>
          <h1 style={styles.headerTitle}>
            Observations
            {newCount > 0 && (
              <span style={styles.badge}>{newCount} new</span>
            )}
          </h1>
          {lastLoaded && (
            <p style={styles.lastLoaded}>
              Last updated {lastLoaded.toLocaleTimeString()} —&nbsp;
              <button style={styles.refreshBtn} onClick={loadObservations}>
                Refresh now
              </button>
            </p>
          )}
        </div>
        <div style={styles.headerRight}>
          <div style={styles.filterRow}>
            {(["pending", "approved", "all"] as const).map(f => (
              <button
                key={f}
                style={filter === f ? styles.filterBtnActive : styles.filterBtn}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <button style={styles.logoutBtn} onClick={handleLogout}>Log out</button>
        </div>
      </div>

      {/* Table */}
      <div style={styles.tableWrap}>
        {loading ? (
          <p style={styles.empty}>Loading…</p>
        ) : observations.length === 0 ? (
          <p style={styles.empty}>No {filter} observations.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                {["Date", "Location", "Tags", "Notes", "Media", "Status", "Actions"].map(h => (
                  <th key={h} style={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {observations.map(obs => (
                <tr key={obs.id} style={styles.tr}>
                  <td style={styles.td}>{obs.date}</td>
                  <td style={styles.td}>
                    <span style={styles.coords}>
                      {obs.lat?.toFixed(3)}°N<br />{Math.abs(obs.lng)?.toFixed(3)}°W
                    </span>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.tagsList}>
                      {parseTags(obs.tags).map((t: string) => (
                        <span key={t} style={styles.tagChip}>{t}</span>
                      ))}
                    </div>
                  </td>
                  <td style={{ ...styles.td, maxWidth: "260px" }}>
                    <p style={styles.noteText}>{obs.notes}</p>
                  </td>
                  <td style={styles.td}>
                    {(obs as any).file_url ? (
                      (obs as any).file_url.match(/\.(mp4|mov|webm)$/i) ? (
                        <video src={(obs as any).file_url} controls style={styles.mediaThumb} />
                      ) : (
                        <a href={(obs as any).file_url} target="_blank" rel="noopener noreferrer">
                          <img src={(obs as any).file_url} alt="Observation" style={styles.mediaThumb} />
                        </a>
                      )
                    ) : (
                      <span style={{ opacity: 0.3, fontSize: "0.75rem" }}>—</span>
                    )}
                  </td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.statusBadge,
                      background: obs.status === "approved" ? ACCENT
                        : obs.status === "pending" ? "rgba(220,255,199,0.15)"
                        : "rgba(255,100,100,0.2)",
                      color: obs.status === "approved" ? DARK : LIGHT,
                    }}>
                      {obs.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actionRow}>
                      {obs.status === "pending" && (
                        <button style={styles.approveBtn} onClick={() => approve(obs.id)}>Approve</button>
                      )}
                      {obs.status === "approved" && (
                        <button style={styles.rejectBtn} onClick={() => reject(obs.id)}>Unpublish</button>
                      )}
                      {obs.status === "rejected" && (
                        <button style={styles.approveBtn} onClick={() => approve(obs.id)}>Re-approve</button>
                      )}
                      <button style={styles.editBtn} onClick={() => startEdit(obs)}>Edit</button>
                      <button style={styles.deleteBtn} onClick={() => remove(obs.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit modal */}
      {editing && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <p style={styles.loginLabel}>Edit observation</p>
            <p style={styles.coords}>{editing.lat?.toFixed(4)}°N &nbsp;{Math.abs(editing.lng)?.toFixed(4)}°W</p>

            <label style={styles.fieldLabel}>Tags</label>
            <div style={styles.tagGrid}>
              {TAGS.map(t => {
                const active = editTags.includes(t);
                return (
                  <button
                    key={t}
                    style={active ? styles.tagChipActive : styles.tagChipInactive}
                    onClick={() => toggleEditTag(t)}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            <label style={styles.fieldLabel}>Notes</label>
            <textarea
              style={styles.textarea}
              value={editNotes}
              onChange={e => setEditNotes(e.target.value)}
            />

            <div style={styles.modalActions}>
              <button style={styles.btn} onClick={saveEdit}>Save</button>
              <button style={styles.cancelBtn} onClick={() => setEditing(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  loginPage: {
    minHeight: "100vh", background: DARK, display: "flex",
    alignItems: "center", justifyContent: "center",
  },
  loginBox: {
    display: "flex", flexDirection: "column", gap: "1rem",
    width: "320px", padding: "2.5rem",
    border: `1px solid rgba(220,255,199,0.12)`, borderRadius: "2px",
  },
  loginLabel: {
    fontFamily: '"clother", sans-serif', fontWeight: 700, fontSize: "0.7rem",
    letterSpacing: "0.15em", textTransform: "uppercase", color: ACCENT,
  },
  error: {
    fontFamily: "adobe-jenson-pro-caption, serif", fontStyle: "italic",
    fontSize: "0.85rem", color: "#ff8080",
  },
  page: {
    minHeight: "100vh", background: DARK, color: LIGHT,
    fontFamily: "adobe-jenson-pro-caption, serif", paddingBottom: "4rem",
  },
  header: {
    display: "flex", alignItems: "flex-start", justifyContent: "space-between",
    padding: "2.5rem 3rem 1.5rem",
    borderBottom: `1px solid rgba(220,255,199,0.1)`,
  },
  headerRight: {
    display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1rem",
  },
  headerLabel: {
    fontFamily: '"clother", sans-serif', fontWeight: 700, fontSize: "0.7rem",
    letterSpacing: "0.15em", textTransform: "uppercase", color: ACCENT, marginBottom: "0.5rem",
  },
  headerTitle: {
    fontFamily: "adobe-jenson-pro-display, serif", fontWeight: 700,
    fontSize: "2.5rem", color: LIGHT, margin: 0, display: "flex",
    alignItems: "center", gap: "1rem",
  },
  badge: {
    fontFamily: '"clother", sans-serif', fontWeight: 700, fontSize: "0.65rem",
    letterSpacing: "0.1em", textTransform: "uppercase",
    background: "#ff8040", color: "#fff", padding: "0.25rem 0.6rem",
    borderRadius: "2px",
  },
  lastLoaded: {
    fontFamily: "adobe-jenson-pro-caption, serif", fontStyle: "italic",
    fontSize: "0.8rem", color: LIGHT, opacity: 0.4, marginTop: "0.5rem",
  },
  refreshBtn: {
    background: "none", border: "none", color: ACCENT, cursor: "pointer",
    fontFamily: '"clother", sans-serif', fontWeight: 700, fontSize: "0.7rem",
    letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "underline",
    padding: 0,
  },
  logoutBtn: {
    background: "none", border: `1px solid rgba(220,255,199,0.2)`,
    borderRadius: "2px", color: LIGHT, cursor: "pointer",
    fontFamily: '"clother", sans-serif', fontWeight: 700, fontSize: "0.65rem",
    letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.4rem 0.8rem",
    opacity: 0.5,
  },
  filterRow: { display: "flex", gap: "0.5rem" },
  filterBtn: {
    padding: "0.4rem 1rem", background: "rgba(220,255,199,0.06)",
    border: `1px solid rgba(220,255,199,0.15)`, borderRadius: "2px",
    color: LIGHT, fontFamily: '"clother", sans-serif', fontWeight: 700,
    fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase",
    cursor: "pointer", opacity: 0.6,
  },
  filterBtnActive: {
    padding: "0.4rem 1rem", background: ACCENT,
    border: `1px solid ${ACCENT}`, borderRadius: "2px",
    color: DARK, fontFamily: '"clother", sans-serif', fontWeight: 700,
    fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase",
    cursor: "pointer",
  },
  tableWrap: { padding: "2rem 3rem", overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    fontFamily: '"clother", sans-serif', fontWeight: 700, fontSize: "0.65rem",
    letterSpacing: "0.12em", textTransform: "uppercase", color: LIGHT,
    opacity: 0.4, textAlign: "left", padding: "0.75rem 1rem",
    borderBottom: `1px solid rgba(220,255,199,0.08)`,
  },
  tr: { borderBottom: `1px solid rgba(220,255,199,0.06)` },
  td: {
    padding: "1rem", verticalAlign: "top",
    fontFamily: "adobe-jenson-pro-caption, serif", fontStyle: "italic",
    fontSize: "0.9rem", color: LIGHT, opacity: 0.85,
  },
  coords: {
    fontFamily: '"clother", sans-serif', fontSize: "0.65rem",
    letterSpacing: "0.06em", color: LIGHT, opacity: 0.5, fontStyle: "normal",
  },
  noteText: { margin: 0, lineHeight: 1.5 },
  mediaThumb: {
    width: "80px",
    height: "60px",
    objectFit: "cover" as const,
    borderRadius: "2px",
    display: "block",
  },
  tagsList: { display: "flex", flexWrap: "wrap", gap: "0.35rem" },
  tagChip: {
    padding: "0.2rem 0.5rem", background: "rgba(153,197,85,0.15)",
    border: `1px solid rgba(153,197,85,0.3)`, borderRadius: "2px",
    color: ACCENT, fontFamily: '"clother", sans-serif', fontWeight: 700,
    fontSize: "0.6rem", letterSpacing: "0.06em", textTransform: "uppercase",
  },
  statusBadge: {
    padding: "0.25rem 0.6rem", borderRadius: "2px",
    fontFamily: '"clother", sans-serif', fontWeight: 700,
    fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase",
  },
  actionRow: { display: "flex", gap: "0.4rem", flexWrap: "wrap" },
  approveBtn: {
    padding: "0.3rem 0.7rem", background: ACCENT, border: "none",
    borderRadius: "2px", color: DARK, fontFamily: '"clother", sans-serif',
    fontWeight: 700, fontSize: "0.6rem", letterSpacing: "0.08em",
    textTransform: "uppercase", cursor: "pointer",
  },
  rejectBtn: {
    padding: "0.3rem 0.7rem", background: "rgba(220,255,199,0.08)",
    border: `1px solid rgba(220,255,199,0.2)`, borderRadius: "2px",
    color: LIGHT, fontFamily: '"clother", sans-serif', fontWeight: 700,
    fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase",
    cursor: "pointer",
  },
  editBtn: {
    padding: "0.3rem 0.7rem", background: "rgba(220,255,199,0.08)",
    border: `1px solid rgba(220,255,199,0.2)`, borderRadius: "2px",
    color: LIGHT, fontFamily: '"clother", sans-serif', fontWeight: 700,
    fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase",
    cursor: "pointer",
  },
  deleteBtn: {
    padding: "0.3rem 0.7rem", background: "rgba(255,80,80,0.1)",
    border: `1px solid rgba(255,80,80,0.25)`, borderRadius: "2px",
    color: "#ff8080", fontFamily: '"clother", sans-serif', fontWeight: 700,
    fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase",
    cursor: "pointer",
  },
  empty: {
    fontFamily: "adobe-jenson-pro-caption, serif", fontStyle: "italic",
    fontSize: "1rem", color: LIGHT, opacity: 0.4, padding: "2rem 0",
  },
  modalOverlay: {
    position: "fixed", inset: 0, background: "rgba(44,51,40,0.85)",
    backdropFilter: "blur(6px)", zIndex: 500,
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  modal: {
    width: "480px", background: DARK, border: `1px solid rgba(220,255,199,0.15)`,
    borderRadius: "2px", padding: "2.5rem", display: "flex",
    flexDirection: "column", gap: "1rem",
  },
  fieldLabel: {
    fontFamily: '"clother", sans-serif', fontWeight: 700, fontSize: "0.7rem",
    letterSpacing: "0.12em", textTransform: "uppercase", color: LIGHT, opacity: 0.5,
  },
  tagGrid: { display: "flex", flexWrap: "wrap", gap: "0.5rem" },
  tagChipActive: {
    padding: "0.35rem 0.75rem", background: ACCENT, border: `1px solid ${ACCENT}`,
    borderRadius: "2px", color: DARK, fontFamily: '"clother", sans-serif',
    fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.08em",
    textTransform: "uppercase", cursor: "pointer",
  },
  tagChipInactive: {
    padding: "0.35rem 0.75rem", background: "rgba(220,255,199,0.06)",
    border: `1px solid rgba(220,255,199,0.2)`, borderRadius: "2px",
    color: LIGHT, fontFamily: '"clother", sans-serif', fontWeight: 700,
    fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase",
    cursor: "pointer", opacity: 0.7,
  },
  textarea: {
    width: "100%", padding: "0.6rem 0.75rem",
    background: "rgba(220,255,199,0.05)", border: `1px solid rgba(220,255,199,0.15)`,
    borderRadius: "2px", color: LIGHT, fontFamily: "adobe-jenson-pro-caption, serif",
    fontStyle: "italic", fontSize: "0.95rem", outline: "none",
    resize: "vertical", minHeight: "120px",
  },
  input: {
    width: "100%", padding: "0.75rem 1rem",
    background: "rgba(220,255,199,0.05)", border: `1px solid rgba(220,255,199,0.15)`,
    borderRadius: "2px", color: LIGHT, fontFamily: "adobe-jenson-pro-caption, serif",
    fontStyle: "italic", fontSize: "0.95rem", outline: "none",
  },
  btn: {
    padding: "0.75rem 1.5rem", background: ACCENT, border: "none",
    borderRadius: "2px", color: DARK, fontFamily: '"clother", sans-serif',
    fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em",
    textTransform: "uppercase", cursor: "pointer",
  },
  cancelBtn: {
    padding: "0.75rem 1.5rem", background: "none",
    border: `1px solid rgba(220,255,199,0.2)`, borderRadius: "2px",
    color: LIGHT, fontFamily: '"clother", sans-serif', fontWeight: 700,
    fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase",
    cursor: "pointer", opacity: 0.6,
  },
  modalActions: { display: "flex", gap: "0.75rem", marginTop: "0.5rem" },
};
