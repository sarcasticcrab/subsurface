import { CSSProperties } from "react";

const DARK = "#2C3328";
const LIGHT = "#DCFFC7";
const ACCENT = "#99C555";
const WARN = "#e8a04a";

export default function DeployPage() {
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

      {/* Hero */}
      <div style={styles.hero}>
        <p style={styles.eyebrow}>02 — Deploy</p>
        <h1 style={styles.heroTitle}>Deploy your camera</h1>
        <p style={styles.heroBody}>
          Deploying a camera in a river or canal for the first time is genuinely exciting — there is a whole world down there that almost nobody ever sees. These guidelines exist not to put you off, but to make sure you come home safe, stay on the right side of the law, and leave the water better than you found it.
        </p>
        <p style={{ ...styles.heroBody, marginTop: "1rem", opacity: 0.55 }}>
          Guidance on placement, safety, legal access, and environmental ethics.
        </p>
      </div>

      <div style={styles.divider} />

      {/* Safety — first and prominent */}
      <Section label="Safety">
        <Warning title="Read before you go near water">
          <p style={styles.warningBody}>
            UK waterways carry serious health risks that are not always visible. Treat every deployment site as a potential hazard and take appropriate precautions every time — regardless of how clean the water appears.
          </p>
        </Warning>

        <SubSection title="Raw sewage and water quality">
          <p>
            Raw sewage discharge into UK rivers, lakes, and coastal waters is a serious and growing public health issue. Water companies are legally permitted to discharge untreated sewage during heavy rainfall events, and many do so routinely. In 2023, there were over 300,000 sewage overflow events recorded across England alone.
          </p>
          <p style={{ marginTop: "1rem" }}>
            You cannot tell whether a waterway has been subject to a recent discharge by looking at it. Assume that any freshwater body in the UK may be contaminated and take precautions accordingly:
          </p>
          <ul style={styles.list}>
            <li style={styles.li}>Do not enter the water. Subsurface cameras are designed to be deployed from the bank or from a bridge — you should never need to wade in.</li>
            <li style={styles.li}>Do not place your hands in the water unnecessarily. If you do, wash them thoroughly before touching your face, and as soon as possible after returning home.</li>
            <li style={styles.li}><strong style={{ color: WARN }}>Do not deploy near water if you have any open cuts, wounds, or broken skin.</strong> Waterborne bacteria including E. coli, leptospirosis (Weil's disease), and others can enter the body through even minor breaks in the skin and cause serious illness.</li>
            <li style={styles.li}>After any contact with water or wet riverbank soil, wash exposed skin thoroughly with soap and water.</li>
            <li style={styles.li}>Check current water quality at your location before deploying. The Environment Agency's <strong>Swimfo</strong> tool and the <strong>Surfers Against Sewage</strong> pollution map both provide near-real-time discharge data for many sites.</li>
          </ul>
        </SubSection>

        <SubSection title="Weil's disease (leptospirosis)">
          <p>
            Leptospirosis is a bacterial infection spread through the urine of infected animals — particularly rats — which contaminates water and wet soil. It is present in waterways across the UK. Symptoms typically appear 2–30 days after exposure and can include fever, headache, muscle pain, and in severe cases, organ failure.
          </p>
          <p style={{ marginTop: "1rem" }}>
            If you develop flu-like symptoms within a month of a deployment, inform your GP that you have been near freshwater. Early treatment with antibiotics is effective. Always wash your hands after handling equipment that has been in or near water.
          </p>
        </SubSection>

        <SubSection title="Appropriate clothing and footwear">
          <p>Dressing appropriately protects you from both health risks and physical hazards around water.</p>
          <ul style={styles.list}>
            <li style={styles.li}><strong>Footwear.</strong> Wear wellingtons (rubber boots) that extend above the ankle. Riverbanks and canal towpaths are frequently muddy, slippery, and uneven. Never deploy in open-toed shoes, trainers, or footwear that can become waterlogged. Cleated soles (walking boot-style) provide better grip on wet grass and mud than smooth rubber.</li>
            <li style={styles.li}><strong>Gloves.</strong> Wear waterproof or nitrile gloves when handling equipment that will be placed near or in the water. Disposable nitrile gloves are inexpensive and effective.</li>
            <li style={styles.li}><strong>Clothing.</strong> Wear long trousers and long sleeves to minimise skin exposure, particularly in overgrown or reedy bankside environments where ticks may be present. Avoid loose clothing that could catch on equipment or overhanging branches.</li>
            <li style={styles.li}><strong>High visibility.</strong> If deploying near roads, bridges, or public paths, consider wearing a high-visibility vest. Tripod legs, tethers, and cables at ground level can be a trip hazard to other path users.</li>
            <li style={styles.li}><strong>Sun and cold.</strong> Working near water in summer increases UV exposure due to reflection. Wear sun protection. In winter, riverbanks can be significantly colder than surrounding land — dress in layers and carry waterproof outerwear.</li>
          </ul>
        </SubSection>

        <SubSection title="Physical hazards near water">
          <ul style={styles.list}>
            <li style={styles.li}><strong>Slippery banks.</strong> Wet grass, algae-covered stones, and soft mud can cause sudden falls into water. Never lean out over the water to place or retrieve equipment. Use a tether long enough to allow placement from a safe standing position on the bank.</li>
            <li style={styles.li}><strong>Never deploy alone.</strong> Always go with at least one other person. If you slip into water, particularly in cold conditions, hypothermia can set in rapidly. A companion can raise the alarm and assist safely.</li>
            <li style={styles.li}><strong>Cold water shock.</strong> Falling into cold water causes an involuntary gasp reflex that can cause drowning even in shallow water. If you do fall in, try to float on your back and call for help rather than attempting to swim.</li>
            <li style={styles.li}><strong>Children.</strong> Children must not be left unsupervised near water at any time during a deployment.</li>
          </ul>
        </SubSection>
      </Section>

      <div style={styles.divider} />

      {/* Legal access */}
      <Section label="Legal access">
        <SubSection title="Understanding your rights in England and Wales">
          <p>
            The legal situation regarding access to waterways in England and Wales is significantly more restrictive than most people realise — and very different from Scotland.
          </p>
          <p style={{ marginTop: "1rem" }}>
            <strong style={{ color: ACCENT }}>Only around 2–3% of rivers in England and Wales have a clear public right of access.</strong> These are primarily the larger navigable rivers and canals managed by the Environment Agency or the Canal & River Trust, plus certain stretches covered by specific access agreements.
          </p>
          <p style={{ marginTop: "1rem" }}>
            The Countryside and Rights of Way Act 2000 (CRoW) grants a right to roam over open land — but this does not extend to rivers, lakes, or their banks unless they fall within designated open access land. Even where a public footpath runs alongside a river, the right of way covers the path only — not the water or the bank beyond it.
          </p>
          <p style={{ marginTop: "1rem" }}>
            Riverbanks are privately owned in most cases. The riparian landowner (the person who owns land adjoining a waterway) typically owns the bank and half of the riverbed. Using the bank to deploy equipment without permission is technically trespass, even if the bank appears open and unfenced.
          </p>
        </SubSection>

        <SubSection title="Where you can deploy without permission">
          <ul style={styles.list}>
            <li style={styles.li}><strong>Canal & River Trust waterways.</strong> All canals and rivers managed by the Canal & River Trust are open to the public. Towpaths are public rights of way and you may deploy your camera from them. Check the Canal & River Trust website for a map of their network.</li>
            <li style={styles.li}><strong>Environment Agency navigable rivers.</strong> Major navigable rivers managed by the Environment Agency — including stretches of the Thames, Severn, and others — are open to recreational users.</li>
            <li style={styles.li}><strong>Public rights of way alongside water.</strong> If a public footpath or bridleway runs beside a waterway, you have the right to use that path and may deploy from it, provided you do not stray onto private land beyond the path boundary.</li>
            <li style={styles.li}><strong>Designated open access land (CRoW).</strong> Some lake shores and riverbanks fall within CRoW open access land. Check the Natural England Magic Map to confirm before visiting.</li>
            <li style={styles.li}><strong>Scotland.</strong> Scotland has a general right of responsible access to all land and inland waterways under the Land Reform (Scotland) Act 2003. Subsurface deployments are lawful across the vast majority of Scottish waterways, provided the Scottish Outdoor Access Code is followed.</li>
          </ul>
        </SubSection>

        <SubSection title="Private land — always ask first">
          <p>
            If you wish to deploy at a location not covered by a public right of way or designated open access land, you must obtain permission from the riparian landowner before visiting. This includes farmland, privately owned lakes, and most stretches of river outside the navigable network.
          </p>
          <p style={{ marginTop: "1rem" }}>
            In most cases, landowners are receptive to a polite, clearly explained request — particularly when the environmental and non-commercial nature of the project is made clear. Contact them in advance, explain the Subsurface project, describe exactly where and how you intend to deploy, and ask for written permission if possible.
          </p>
          <Warning title="Do not trespass">
            <p style={styles.warningBody}>
              Never deploy on private land without explicit permission. Trespass in England and Wales is a civil matter — meaning the landowner can require you to leave and may seek damages — but the equipment you leave behind could be considered abandoned property. More importantly, trespass undermines the reputation of citizen science projects and damages the relationships that make future access possible.
            </p>
          </Warning>
        </SubSection>
      </Section>

      <div style={styles.divider} />

      {/* Placement */}
      <Section label="Placement">
        <SubSection title="Choosing a location">
          <p>A good deployment site is one that is legally accessible, physically safe to reach, and likely to yield useful footage. Consider the following:</p>
          <ul style={styles.list}>
            <li style={styles.li}><strong>Depth.</strong> The Lite version is suitable for depths up to 0.5m. The XL version, with its fully silicone-sealed lid, can be deployed deeper but should still be treated as a shallow-water camera. Neither version is rated for diving depths.</li>
            <li style={styles.li}><strong>Flow.</strong> Fast-flowing water will push the camera out of position. In rivers with significant current, anchor the camera to a fixed point — a bridge strut, a submerged stake, or a weighted base — and point it downstream.</li>
            <li style={styles.li}><strong>Substrate.</strong> Sandy or soft sediment will cloud the image as soon as the camera is placed. Let any disturbed sediment settle for several minutes before starting your recording.</li>
            <li style={styles.li}><strong>Light.</strong> Natural light drops sharply below 0.3m in most UK waterways due to turbidity. Deploy in the shallowest position that keeps the camera submerged and points it toward an area of ambient light — typically angled upward slightly.</li>
          </ul>
        </SubSection>

        <SubSection title="Orientation and the rope system">
          <p>
            The two-colour rope system built into both camera versions is your primary tool for knowing which direction the camera is facing once it is in the water. Before every deployment:
          </p>
          <ul style={styles.list}>
            <li style={styles.li}>Photograph or note which rope colour corresponds to which compass direction or landmark (e.g. "blue rope faces upstream").</li>
            <li style={styles.li}>Record this in your Subsurface observation notes — it makes your footage significantly more useful for environmental analysis.</li>
            <li style={styles.li}>If you cannot confirm orientation from the surface, retrieve and reposition rather than submitting footage of unknown direction.</li>
          </ul>
        </SubSection>

        <SubSection title="Tethering and retrieval">
          <ul style={styles.list}>
            <li style={styles.li}>Always tether the camera to a fixed point on the bank before deployment. A loose camera will drift, potentially becoming lost or causing an obstruction.</li>
            <li style={styles.li}>Use the rope handles to lower and retrieve the camera. Do not pull the USB cable — it may break the seal.</li>
            <li style={styles.li}>Mark the tether point clearly so other path users are aware of it. A brightly coloured flag or ribbon tied to the anchor point reduces trip hazard and alerts others that equipment is in use.</li>
            <li style={styles.li}>Set a retrieval time before you leave. Do not leave equipment unattended for more than a few hours without checking it.</li>
          </ul>
        </SubSection>
      </Section>

      <div style={styles.divider} />

      {/* Environmental ethics */}
      <Section label="Environmental ethics">
        <SubSection title="Leave no trace">
          <p>
            Subsurface is an environmental observation project. The standard to which we hold ourselves must be higher than the minimum legal requirement. Every deployment should leave the site in exactly the same condition as you found it — or better.
          </p>
          <ul style={styles.list}>
            <li style={styles.li}>Remove all equipment, packaging, cable ties, and any other materials you brought to the site.</li>
            <li style={styles.li}>Do not cut vegetation, move rocks, or disturb the bank structure to create a better camera position.</li>
            <li style={styles.li}>If you find litter at the site, carry it out with you and record it as an observation.</li>
            <li style={styles.li}>Avoid repeated visits to the same fragile site. Bankside vegetation and soil structure can be damaged by repeated foot traffic.</li>
          </ul>
        </SubSection>

        <SubSection title="Wildlife disturbance">
          <ul style={styles.list}>
            <li style={styles.li}>Approach the water quietly and move slowly. Sudden noise and movement near the bank disturbs fish and invertebrates, reducing the quality of your footage.</li>
            <li style={styles.li}>Do not deploy during breeding seasons near known nesting sites — particularly kingfishers, herons, and otters, which are sensitive to disturbance.</li>
            <li style={styles.li}>If you encounter a protected species — otter, water vole, crayfish — during deployment, do not approach it. Record the sighting and submit it as an observation.</li>
            <li style={styles.li}>Never use artificial lighting underwater. It disorients fish and invertebrates and may cause discomfort or harm.</li>
          </ul>
        </SubSection>

        <SubSection title="Responsible observation">
          <p>
            The data you collect is only as useful as its integrity allows. Be honest in your observations — record what you see, not what you expect or hope to find. An absence of life is as valuable as a presence, and accurate records of pollution or poor water quality are exactly the kind of data this project exists to surface.
          </p>
          <p style={{ marginTop: "1rem" }}>
            If you observe evidence of illegal activity — fly-tipping, pollution discharge, or deliberate dumping — report it to the Environment Agency (0800 80 70 60, 24 hours) in addition to submitting your observation to Subsurface.
          </p>
        </SubSection>
      </Section>

      <div style={styles.divider} />

      {/* CTA */}
      <div style={styles.cta}>
        <p style={styles.ctaLabel}>Next step</p>
        <h2 style={styles.ctaTitle}>Upload your observation</h2>
        <p style={styles.ctaBody}>
          Once you have captured footage, add it to the map and contribute to a distributed record of UK aquatic environments.
        </p>
        <a href="/map" style={styles.ctaBtn}>Go to the map →</a>
      </div>

    </main>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={styles.section}>
      <div style={styles.sectionLeft}>
        <p style={styles.sectionLabel}>{label}</p>
      </div>
      <div style={styles.sectionRight}>{children}</div>
    </div>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={styles.subSection}>
      <h2 style={styles.subTitle}>{title}</h2>
      <div style={styles.subBody}>{children}</div>
    </div>
  );
}

function Warning({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={styles.warningBox}>
      <p style={styles.warningTitle}>⚠ {title}</p>
      {children}
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
    zIndex: 100, background: "transparent",
  },
  navLinks: { display: "flex", gap: "2.5rem" },
  navLink: {
    fontFamily: '"clother", sans-serif', fontWeight: 700, fontSize: "0.85rem",
    letterSpacing: "0.08em", textTransform: "uppercase" as const,
    textDecoration: "none", color: LIGHT, opacity: 0.7,
  },
  hero: {
    padding: "10rem 4rem 4rem",
    maxWidth: "720px",
  },
  eyebrow: {
    fontFamily: '"clother", sans-serif', fontWeight: 700, fontSize: "0.7rem",
    letterSpacing: "0.15em", textTransform: "uppercase" as const, color: ACCENT, marginBottom: "1rem",
  },
  heroTitle: {
    fontFamily: "adobe-jenson-pro-display, serif", fontWeight: 700,
    fontSize: "3.5rem", color: LIGHT, margin: "0 0 1.5rem", lineHeight: 1,
  },
  heroBody: {
    fontFamily: "adobe-jenson-pro-caption, serif", fontStyle: "italic",
    fontSize: "1.1rem", lineHeight: 1.7, color: LIGHT, opacity: 0.75, margin: 0,
  },
  divider: { height: "1px", background: "rgba(220,255,199,0.1)", margin: "0 4rem" },
  section: {
    display: "flex", gap: "4rem", padding: "4rem",
    alignItems: "flex-start",
  },
  sectionLeft: { width: "200px", minWidth: "200px" },
  sectionRight: { flex: 1, display: "flex", flexDirection: "column" as const, gap: "3rem" },
  sectionLabel: {
    fontFamily: '"clother", sans-serif', fontWeight: 700, fontSize: "0.7rem",
    letterSpacing: "0.15em", textTransform: "uppercase" as const, color: ACCENT,
    position: "sticky" as const, top: "5rem",
  },
  subSection: {},
  subTitle: {
    fontFamily: "adobe-jenson-pro-display, serif", fontWeight: 700,
    fontSize: "1.4rem", color: LIGHT, margin: "0 0 1rem",
  },
  subBody: {
    fontFamily: "adobe-jenson-pro-caption, serif", fontStyle: "italic",
    fontSize: "1rem", lineHeight: 1.8, color: LIGHT, opacity: 0.82,
  },
  list: {
    paddingLeft: "1.25rem", margin: 0,
    display: "flex", flexDirection: "column" as const, gap: "0.6rem",
  },
  li: { lineHeight: 1.75 },
  warningBox: {
    border: `1px solid rgba(232,160,74,0.3)`, borderRadius: "2px",
    padding: "1.5rem 2rem", background: "rgba(232,160,74,0.05)",
  },
  warningTitle: {
    fontFamily: '"clother", sans-serif', fontWeight: 700, fontSize: "0.75rem",
    letterSpacing: "0.12em", textTransform: "uppercase" as const, color: WARN,
    marginBottom: "0.75rem",
  },
  warningBody: {
    fontFamily: "adobe-jenson-pro-caption, serif", fontStyle: "italic",
    fontSize: "0.95rem", lineHeight: 1.75, color: LIGHT, opacity: 0.8, margin: 0,
  },
  cta: {
    padding: "4rem", borderTop: `1px solid rgba(220,255,199,0.1)`,
    display: "flex", flexDirection: "column" as const, gap: "1rem", alignItems: "flex-start",
  },
  ctaLabel: {
    fontFamily: '"clother", sans-serif', fontWeight: 700, fontSize: "0.7rem",
    letterSpacing: "0.15em", textTransform: "uppercase" as const, color: ACCENT,
  },
  ctaTitle: {
    fontFamily: "adobe-jenson-pro-display, serif", fontWeight: 700,
    fontSize: "2rem", color: LIGHT, margin: 0,
  },
  ctaBody: {
    fontFamily: "adobe-jenson-pro-caption, serif", fontStyle: "italic",
    fontSize: "1rem", lineHeight: 1.7, color: LIGHT, opacity: 0.7,
    maxWidth: "480px", margin: 0,
  },
  ctaBtn: {
    fontFamily: '"clother", sans-serif', fontWeight: 700, fontSize: "0.8rem",
    letterSpacing: "0.12em", textTransform: "uppercase" as const,
    color: DARK, background: ACCENT, padding: "0.85rem 1.75rem",
    borderRadius: "2px", textDecoration: "none", marginTop: "0.5rem", display: "inline-block",
  },
};
