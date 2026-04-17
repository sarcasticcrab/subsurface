// Find the XLVersion function in your code and replace it with this updated version:

function XLVersion() {
  return (
    <>
      {/* Overview */}
      <div style={styles.section}>
        <div style={styles.sectionLeft}>
          <p style={styles.sectionLabel}>XL — Raspberry Pi</p>
          <div style={styles.specGrid}>
            {[
              ["Cost", "~£45"],
              ["Quality", "1080p+"],
              ["Difficulty", "Intermediate"],
              ["Best for", "Higher quality footage, 3D printed precision"],
              ["Housing", "IKEA 365+ 600ml"],
              ["Power", "USB power bank"],
              ["Tethering", "USB-A to laptop (Live View)"],
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
            <img src="/600ml-container.png" alt="IKEA 365+ 600ml jar" style={styles.containerImg} />
            <p style={styles.containerCaption}>
              IKEA 365+ 600ml — Flat wide jar allows the camera to face the side wall for optimal clarity.
            </p>
          </div>
          <p style={styles.introPara}>
            The XL version uses a Raspberry Pi 3A+ and a 3D-printed PETG insert to hold all components in precise alignment. 
            It features twin 10mm LED illumination and a high-speed USB data tether for live viewing on a laptop.
            Powered by a 10,000mAh bank, it is designed for longer, high-fidelity observation sessions.
          </p>
        </div>
      </div>

      <div style={styles.divider} />

      {/* Parts */}
      <div style={styles.section}>
        <div style={styles.sectionLeft}><p style={styles.sectionLabel}>Parts list</p></div>
        <div style={styles.sectionRight}>
          <PartsTable parts={[
            { item: "Raspberry Pi 3A+", cost: "£25", note: "Powerful enough for 1080p H.264 streaming via USB gadget mode." },
            { item: "Pi Camera Module 3 Wide NoIR", cost: "£35", note: "12MP wide-angle. NoIR version provides superior low-light sensitivity." },
            { item: "Wago 221-413 (3-port) x2", cost: "£2", note: <span style={{ color: ACCENT }}>Critical for the LED 'Power Island' hubs.</span> },
            { item: "Wago 221-412 (2-port) x3", cost: "£2", note: "For splicing the USB data tether to the internal pigtail." },
            { item: "10mm white LEDs (x2) & 100Ω resistors (x2)", cost: "£2", note: "Twin illumination. Resistors limit current to prevent LED burnout." },
            { item: "INIU Pocket Rocket P50 (10,000mAh)", cost: "£15", note: "High-density power bank that fits the 600ml jar dimensions." },
            { item: "USB-A to USB-A cable (5m)", cost: "£8", note: "Tether cable. Requires the 5V wire to be snipped before use." },
            { item: "PG7 waterproof cable gland", cost: "£2", note: "Seals the tether entry point in the IKEA lid." },
            { item: "3D Printed Insert (Clear PETG)", cost: "—", note: "Files available on GitHub. Clear PETG allows for integrated LED diffusion." },
          ]} />
        </div>
      </div>

      <div style={styles.divider} />

      {/* Steps 01-06 remain same as your previous logic (OS Flash, Gadget Mode, etc) */}
      {/* ... [Insert your Steps 01 to 06 here] ... */}

      {/* Updated Step 07: LED Wiring */}
      <div style={styles.section}>
        <div style={styles.sectionLeft}><p style={styles.sectionLabel}>Physical Assembly</p></div>
        <div style={styles.sectionRight}>
          
          <Step num="07" title="The 'Power Island' LED Hubs">
             <DiagramBox>
              <svg viewBox="0 0 460 180" style={{ width: "100%", opacity: 0.85 }}>
                {/* Wago 5V Hub */}
                <rect x="50" y="40" width="80" height="60" rx="3" stroke={ACCENT} strokeWidth="1.5" fill="none" />
                <text x="90" y="30" textAnchor="middle" fill={ACCENT} fontSize="10">WAGO A (5V+)</text>
                <circle cx="65" cy="70" r="4" fill={ACCENT} /> <circle cx="90" cy="70" r="4" fill={ACCENT} /> <circle cx="115" cy="70" r="4" fill={ACCENT} />
                
                {/* Wago GND Hub */}
                <rect x="330" y="40" width="80" height="60" rx="3" stroke="#888" strokeWidth="1.5" fill="none" />
                <text x="370" y="30" textAnchor="middle" fill="#888" fontSize="10">WAGO B (GND-)</text>
                <circle cx="345" cy="70" r="4" fill="#888" /> <circle cx="370" cy="70" r="4" fill="#888" /> <circle cx="395" cy="70" r="4" fill="#888" />

                {/* Path 1 */}
                <path d="M 90 74 L 90 130 L 200 130" stroke={ACCENT} fill="none" strokeDasharray="4,2" />
                <path d="M 370 74 L 370 130 L 260 130" stroke="#888" fill="none" strokeDasharray="4,2" />
                
                {/* LED UNIT */}
                <rect x="200" y="120" width="60" height="20" rx="2" fill="rgba(255,255,255,0.1)" />
                <text x="230" y="133" textAnchor="middle" fill={LIGHT} fontSize="8">LED + Resistor</text>
              </svg>
            </DiagramBox>
            <p style={styles.stepBody}>
              To power two LEDs in parallel, we use two 3-port Wago connectors as "islands."
            </p>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              <strong>Wago A (Positive Island):</strong> Connect the 5V Red wire from your power source to Port 1. Connect a Red jumper wire to Port 2 (LED 1) and Port 3 (LED 2).
            </p>
            <p style={{ ...styles.stepBody, marginTop: "0.5rem" }}>
              <strong>Wago B (Negative Island):</strong> Connect the GND Black wire from your source to Port 1. Connect a Black jumper wire to Port 2 (LED 1) and Port 3 (LED 2).
            </p>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              <strong style={{ color: WARN }}>Warning:</strong> These two Wagos must never be connected to each other. Every wire should go from a Wago to a component.
            </p>
          </Step>

          <Step num="08" title="Splice the USB Tether">
            <p style={styles.stepBody}>
              The 5m tether cable must be joined to an internal USB pigtail inside the jar using the 2-port Wagos.
            </p>
            <ol style={{ ...styles.stepBody, paddingLeft: "1.5rem" }}>
              <li><strong>Snip the 5V:</strong> Cut the Red (VCC) wire in the tether and tape it off. <strong>Crucial:</strong> Power only comes from the internal bank.</li>
              <li><strong>Connect Data:</strong> Use one 2-port Wago for Green (D+), one for White (D-), and one for Black (GND).</li>
              <li><strong>Secure:</strong> Tuck the Wagos into the dedicated bay in your 3D-printed insert.</li>
            </ol>
          </Step>

          <Step num="09" title="Sealing & Light Bleed">
            <p style={styles.stepBody}>
              Clear PETG acts like a fiber optic. To prevent the LEDs from "fogging" your image, you must isolate them.
            </p>
            <p style={{ ...styles.stepBody, marginTop: "0.5rem" }}>
              Apply black electrical tape or black acrylic paint to the <strong>internal</strong> sides of the LED recesses in the 3D insert. This ensures light only travels forward through the diffusion wall and not sideways into the camera lens.
            </p>
          </Step>

        </div>
      </div>

      <div style={styles.divider} />

      <Principles items={[
        { title: "The Power Island Principle", body: "Wagos are connection 'islands'. By keeping Positive and Negative entirely on separate Wago blocks, you create a safe, modular parallel circuit that is easy to troubleshoot." },
        { title: "Clear PETG Diffusion", body: "The XL insert uses the material property of PETG to diffuse the 10mm LEDs. Ensure the LED is pressed flush against the diffusion wall for the best throw." },
        { title: "NoIR White Balance", body: "NoIR cameras see infrared light as pink/magenta. In your live view or post-production, adjust the white balance toward Cyan/Blue to achieve natural underwater tones." },
      ]} />
    </>
  );
}