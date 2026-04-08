import { CSSProperties } from "react";

const DARK = "#2C3328";
const LIGHT = "#DCFFC7";
const ACCENT = "#99C555";

export default function TermsPage() {
  return (
    <main style={styles.main}>

      <nav style={styles.nav}>
        <a href="/" style={{ display: "block", lineHeight: 0 }}>
          <img src="/logo.svg" alt="Subsurface" style={{ height: "64px", width: "auto", display: "block" }} />
        </a>
        <div style={styles.navLinks}>
          <a href="/build" style={styles.navLink}>Build</a>
          <a href="/deploy" style={styles.navLink}>Deploy</a>
          <a href="/map" style={styles.navLink}>Map</a>
        </div>
      </nav>

      <div style={styles.content}>

        <div style={styles.header}>
          <p style={styles.eyebrow}>Legal</p>
          <h1 style={styles.title}>Terms of Submission & Privacy Policy</h1>
          <p style={styles.updated}>Last updated: April 2026</p>
        </div>

        <Section title="1. About Subsurface">
          <p>Subsurface is a participatory environmental observation framework that enables members of the public to build low-cost underwater cameras, deploy them responsibly, and contribute observations to a shared map. It is a citizen science project intended for non-commercial environmental research and education.</p>
        </Section>

        <Section title="2. Who can submit observations">
          <p>Anyone may submit an observation via the Subsurface map. By submitting, you confirm that you are over 13 years of age. If you are under 18, you should have the permission of a parent or guardian before submitting footage or location data.</p>
        </Section>

        <Section title="3. Terms of submission">
          <p>By submitting an observation to Subsurface, you agree to the following:</p>
          <ul style={styles.list}>
            <li style={styles.li}><strong>Ownership of content.</strong> You confirm that all footage, images, and notes you submit were created by you, or that you have the explicit right to submit them. You must not submit footage that belongs to another person without their permission.</li>
            <li style={styles.li}><strong>Lawful access.</strong> You confirm that you recorded the footage from a publicly accessible location, or from private land with the landowner's permission. You must not trespass to obtain footage.</li>
            <li style={styles.li}><strong>No identifiable individuals.</strong> You confirm that your footage does not contain images of identifiable people without their consent. If a person appears incidentally in background footage, you should not submit that footage unless their face and other identifying features are not visible.</li>
            <li style={styles.li}><strong>Environmental responsibility.</strong> You confirm that you followed the Subsurface deploy guidelines, minimised disturbance to the aquatic environment, and removed all equipment after deployment. You must not submit observations from deployments that caused damage to habitats or wildlife.</li>
            <li style={styles.li}><strong>Accuracy.</strong> You confirm that the location data and observations you submit are accurate to the best of your knowledge. Deliberately false or misleading submissions are not permitted.</li>
          </ul>
        </Section>

        <Section title="4. How your submission is used">
          <p>Approved submissions are published on the Subsurface public map and may be used for:</p>
          <ul style={styles.list}>
            <li style={styles.li}>Display on the Subsurface map as a public observation</li>
            <li style={styles.li}>Environmental research, education, and awareness purposes</li>
            <li style={styles.li}>Aggregated analysis of aquatic conditions across the UK</li>
          </ul>
          <p style={{ marginTop: "1rem" }}>Your submission will not be used for commercial advertising or sold to third parties. All submissions are reviewed by the Subsurface team before publication. We reserve the right to reject or remove any submission that does not meet these terms.</p>
        </Section>

        <Section title="5. Location data">
          <p>When you submit an observation, you provide an approximate location by clicking on a map. This location is stored in our database and published publicly on the Subsurface map. You should not submit observations at your home address or any other private location you do not wish to be publicly visible.</p>
          <p style={{ marginTop: "1rem" }}>We recommend using only approximate locations — for example, the nearest publicly named body of water — rather than precise GPS coordinates.</p>
        </Section>

        <Section title="6. Privacy policy">
          <p>Subsurface collects the following data when you submit an observation:</p>
          <ul style={styles.list}>
            <li style={styles.li}>Approximate location (latitude and longitude as selected on the map)</li>
            <li style={styles.li}>Observation tags, time of day, and weather conditions</li>
            <li style={styles.li}>Written notes describing the observation</li>
            <li style={styles.li}>Any uploaded images or video footage</li>
            <li style={styles.li}>Submission date</li>
          </ul>
          <p style={{ marginTop: "1rem" }}>We do not collect your name, email address, or any account information. Submissions are anonymous unless you choose to include identifying information in your notes (which we advise against).</p>
          <p style={{ marginTop: "1rem" }}>Your data is stored securely using Supabase (a GDPR-compliant data infrastructure provider based in the EU). Uploaded files are stored in Supabase object storage. We do not share your data with third parties except where required by law.</p>
          <p style={{ marginTop: "1rem" }}>Under UK GDPR, you have the right to request deletion of your submission at any time. To request removal, contact us at <a href="mailto:hello@subsurface.org.uk" style={styles.link}>hello@subsurface.org.uk</a>.</p>
        </Section>

        <Section title="7. Cookies and tracking">
          <p>Subsurface does not use advertising cookies or third-party tracking. The map is powered by Mapbox, which may set functional cookies necessary for map rendering. No personal data is passed to Mapbox beyond what is necessary to display the map.</p>
        </Section>

        <Section title="8. Content moderation">
          <p>All submissions are reviewed by the Subsurface team before being published on the public map. We reserve the right to reject submissions that:</p>
          <ul style={styles.list}>
            <li style={styles.li}>Do not meet the terms of submission above</li>
            <li style={styles.li}>Contain offensive, harmful, or inappropriate content</li>
            <li style={styles.li}>Are clearly fabricated or misleading</li>
            <li style={styles.li}>Could identify private individuals without their consent</li>
          </ul>
          <p style={{ marginTop: "1rem" }}>Rejected submissions are not published and are deleted from our database.</p>
        </Section>

        <Section title="9. Changes to these terms">
          <p>We may update these terms from time to time. The date at the top of this page reflects when they were last revised. Continued use of the submission form after changes constitutes acceptance of the updated terms.</p>
        </Section>

        <Section title="10. Contact">
          <p>If you have any questions about these terms or wish to request deletion of your data, please contact us at <a href="mailto:hello@subsurface.org.uk" style={styles.link}>hello@subsurface.org.uk</a>.</p>
        </Section>

        <div style={styles.backWrap}>
          <a href="/map" style={styles.back}>← Back to the map</a>
        </div>

      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      <div style={styles.sectionBody}>{children}</div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  main: {
    minHeight: "100vh", background: DARK, color: LIGHT,
    fontFamily: "adobe-jenson-pro-caption, serif",
  },
  nav: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "1.25rem 2.5rem", position: "fixed", top: 0, left: 0, right: 0,
    zIndex: 100, background: DARK,
    borderBottom: "1px solid rgba(220,255,199,0.08)",
  },
  navLinks: { display: "flex", gap: "2.5rem" },
  navLink: {
    fontFamily: '"clother", sans-serif', fontWeight: 700, fontSize: "0.85rem",
    letterSpacing: "0.08em", textTransform: "uppercase" as const,
    textDecoration: "none", color: LIGHT, opacity: 0.7,
  },
  content: {
    maxWidth: "740px", margin: "0 auto", padding: "8rem 2.5rem 6rem",
  },
  header: {
    marginBottom: "4rem",
    paddingBottom: "3rem",
    borderBottom: "1px solid rgba(220,255,199,0.1)",
  },
  eyebrow: {
    fontFamily: '"clother", sans-serif', fontWeight: 700, fontSize: "0.7rem",
    letterSpacing: "0.15em", textTransform: "uppercase" as const,
    color: ACCENT, marginBottom: "1rem",
  },
  title: {
    fontFamily: "adobe-jenson-pro-display, serif", fontWeight: 700,
    fontSize: "2.5rem", color: LIGHT, margin: "0 0 1rem", lineHeight: 1.15,
  },
  updated: {
    fontFamily: "adobe-jenson-pro-caption, serif", fontStyle: "italic",
    fontSize: "0.85rem", color: LIGHT, opacity: 0.4, margin: 0,
  },
  section: {
    display: "flex", gap: "3rem", padding: "2.5rem 0",
    borderBottom: "1px solid rgba(220,255,199,0.06)",
    alignItems: "flex-start",
  },
  sectionTitle: {
    fontFamily: '"clother", sans-serif', fontWeight: 700, fontSize: "0.7rem",
    letterSpacing: "0.12em", textTransform: "uppercase" as const,
    color: ACCENT, minWidth: "160px", paddingTop: "0.2rem", margin: 0,
  },
  sectionBody: {
    fontFamily: "adobe-jenson-pro-caption, serif", fontStyle: "italic",
    fontSize: "0.95rem", lineHeight: 1.8, color: LIGHT, opacity: 0.8, flex: 1,
  },
  list: {
    paddingLeft: "1.25rem", margin: 0, display: "flex",
    flexDirection: "column" as const, gap: "0.5rem",
  },
  li: { lineHeight: 1.7 },
  link: {
    color: ACCENT, textDecoration: "underline",
    textDecorationColor: "rgba(153,197,85,0.4)",
  },
  backWrap: { paddingTop: "3rem" },
  back: {
    fontFamily: '"clother", sans-serif', fontWeight: 700, fontSize: "0.75rem",
    letterSpacing: "0.1em", textTransform: "uppercase" as const,
    color: LIGHT, opacity: 0.4, textDecoration: "none",
  },
};
