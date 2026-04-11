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
          <img src="/prototype-lite.png" alt="Lite prototype — ESP32-CAM in IKEA jar with two-colour rope system" style={styles.heroImg} />
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
      {/* Overview */}
      <div style={styles.section}>
        <div style={styles.sectionLeft}>
          <p style={styles.sectionLabel}>Lite — ESP32-CAM</p>
          <div style={styles.specGrid}>
            {[
              ["Cost", "~£15"],
              ["Quality", "720p"],
              ["Difficulty", "Beginner"],
              ["Best for", "Ponds, streams, canals"],
              ["Housing", "IKEA 365+ 180ml"],
              ["Housing cost", "£2 each (3 for £6)"],
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
            <img src="/180ml-container.png" alt="IKEA 365+ 180ml jar" style={styles.containerImg} />
            <p style={styles.containerCaption}>
              IKEA 365+ 180ml — available new (£6 for a pack of 3) or reused from eBay, Vinted, or charity shops.
            </p>
          </div>
          <p style={styles.introPara}>
            The Lite version uses an ESP32-CAM microcontroller — a single board with a built-in camera, Wi-Fi,
            and enough processing power to stream live video. Housed in an IKEA 365+ 180ml glass jar, it requires
            no soldering and can be built in an afternoon with no specialist tools. Both versions offer equivalent waterproofing.
          </p>
        </div>
      </div>

      <div style={styles.divider} />

      {/* Parts */}
      <div style={styles.section}>
        <div style={styles.sectionLeft}><p style={styles.sectionLabel}>Parts list</p></div>
        <div style={styles.sectionRight}>
          <PartsTable parts={[
            { item: "ESP32-CAM module (AI Thinker)", cost: "£6–8", note: <span>Includes OV2640 camera. Buy from <a href="https://www.amazon.co.uk/s?k=ESP32-CAM+AI+Thinker" target="_blank" rel="noopener noreferrer" style={styles.partsLink}>Amazon</a> or <a href="https://www.aliexpress.com/w/wholesale-esp32-cam-ai-thinker.html" target="_blank" rel="noopener noreferrer" style={styles.partsLink}>AliExpress</a>.</span> },
            { item: "FTDI USB-to-serial programmer", cost: "£3–5", note: <span>Required for initial firmware upload. Search <a href="https://www.amazon.co.uk/s?k=FTDI+FT232RL+module" target="_blank" rel="noopener noreferrer" style={styles.partsLink}>'FTDI FT232RL module'</a> on Amazon.</span> },
            { item: "IKEA 365+ 180ml glass jar with lid", cost: "£2", note: <span>New from <a href="https://www.ikea.com/gb/en/search/?q=365%2B+jar" target="_blank" rel="noopener noreferrer" style={styles.partsLink}>IKEA</a> or reused from <a href="https://www.ebay.co.uk/sch/i.html?_nkw=ikea+365+jar" target="_blank" rel="noopener noreferrer" style={styles.partsLink}>eBay</a> or <a href="https://www.vinted.co.uk/catalog?search_text=ikea+365+jar" target="_blank" rel="noopener noreferrer" style={styles.partsLink}>Vinted</a>.</span> },
            { item: "3.7V 1300mAh LiPo battery 883048 (JST-PH 2.0)", cost: "~£5", note: <span>8.8×30×48mm — fits inside the 180ml jar. Search <a href="https://www.aliexpress.com/w/wholesale-883048-lipo-battery-JST-PH2.html" target="_blank" rel="noopener noreferrer" style={styles.partsLink}>'883048 3.7V 1300mAh JST PH2.0'</a> on AliExpress. Confirm PH2.0 connector before ordering. Gives ~3–4hrs recording.</span> },
            { item: "XL6019 boost converter (3–35V to 5–40V, screw terminals)", cost: "£3–5", note: <span>Steps up LiPo voltage (3.7V) to 5V for the ESP32-CAM. Screw terminals — no soldering required. Search <a href="https://www.amazon.co.uk/s?k=XL6019+boost+converter+screw+terminal" target="_blank" rel="noopener noreferrer" style={styles.partsLink}>XL6019 on Amazon</a>. Set output to 5V before connecting.</span> },
            { item: "1S LiPo USB charger — 6 channel, JST-PH 2.0 (Tosiicop or similar)", cost: "~£5", note: <span>Charges up to 6 batteries simultaneously via USB. Supports JST 1.25 and JST-PH 2.0. Search <a href="https://www.aliexpress.com/w/wholesale-1S-lipo-charger-6-channel-JST-PH2.html" target="_blank" rel="noopener noreferrer" style={styles.partsLink}>'1S LiPo 6 channel charger JST PH2.0'</a> on AliExpress, or find on <a href="https://www.amazon.co.uk/s?k=1S+lipo+charger+6+channel+JST+PH2" target="_blank" rel="noopener noreferrer" style={styles.partsLink}>Amazon</a> for faster delivery.</span> },
            { item: "Two colours of thin rope or paracord (1m each)", cost: "£2–3", note: "One colour per side of lid — indicates camera direction." },
            { item: "Drill + 4mm drill bit", cost: "—", note: "For rope holes in the lid flaps. Borrow if possible." },
            { item: "Jumper wires (female-to-female)", cost: "£2", note: <span>For connecting FTDI to ESP32-CAM. Search <a href="https://www.amazon.co.uk/s?k=female+to+female+jumper+wires" target="_blank" rel="noopener noreferrer" style={styles.partsLink}>jumper wires on Amazon</a>.</span> },
            { item: "Small screwdriver (flathead)", cost: "—", note: "For tightening the XL6019 screw terminals. Most people have one." },
          ]} />
        </div>
      </div>

      <div style={styles.divider} />

      {/* Safety */}
      <div style={styles.section}>
        <div style={styles.sectionLeft}>
          <p style={styles.sectionLabel}>Safety first</p>
        </div>
        <div style={styles.sectionRight}>
          <div style={styles.warningBox}>
            <p style={styles.warningTitle}>⚠ Read before you begin</p>
            <div style={styles.warningGrid}>
              <div>
                <p style={styles.warningHead}>Personal protective equipment</p>
                <p style={styles.warningBody}>
                  Wear safety glasses when drilling. Flying plastic fragments can cause serious eye injury.
                  Wear gloves when handling drilled lids — edges can be sharp.
                  Work in a well-ventilated space.
                </p>
              </div>
              <div>
                <p style={styles.warningHead}>Microplastic disposal</p>
                <p style={styles.warningBody}>
                  Drilling through plastic lids produces fine particles. Do not drill near water or drains.
                  Collect all swarf and plastic debris on a sheet of paper or card, fold it up, and dispose of it in general waste — never rinse it down a sink or allow it into the environment.
                  This project exists to observe aquatic ecosystems — protect them from the very start.
                </p>
              </div>
              <div>
                <p style={styles.warningHead}>Electrical safety</p>
                <p style={styles.warningBody}>
                  Always disconnect the battery before wiring. Never submerge a camera that has not been fully sealed and leak-tested.
                  Do not use mains power for underwater deployment — battery only.
                </p>
              </div>
              <div>
                <p style={styles.warningHead}>Waterproofing</p>
                <p style={styles.warningBody}>
                  Always leak-test in a bowl of water for 30 minutes before any field deployment.
                  Watch for bubbles — any escaping air indicates a failed seal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.divider} />

      {/* Wiring */}
      <div style={styles.section}>
        <div style={styles.sectionLeft}><p style={styles.sectionLabel}>Wiring & setup</p></div>
        <div style={styles.sectionRight}>
          <p style={{ ...styles.introPara, marginBottom: "2rem" }}>
            The ESP32-CAM needs to be programmed once via an FTDI USB-to-serial adapter before use. After programming, it runs independently from the LiPo battery with no computer required.
          </p>

          <Step num="01" title="Connect FTDI to ESP32-CAM">
            <DiagramBox>
              <svg viewBox="0 0 460 180" style={{ width: "100%", opacity: 0.85 }}>
                {/* FTDI */}
                <rect x="20" y="40" width="120" height="100" rx="3" stroke={ACCENT} strokeWidth="1.5" fill="none" />
                <text x="80" y="30" textAnchor="middle" fill={ACCENT} fontSize="9" fontFamily="Georgia">FTDI Adapter</text>
                {[["GND","60"],["VCC (5V)","80"],["TX","100"],["RX","120"]].map(([label, y]) => (
                  <g key={label}>
                    <text x="140" y={parseInt(y)+4} textAnchor="end" fill={LIGHT} fontSize="9" fontFamily="Georgia" opacity="0.7">{label}</text>
                    <circle cx="145" cy={parseInt(y)} r="3" fill={ACCENT} />
                  </g>
                ))}
                {/* ESP32-CAM */}
                <rect x="300" y="40" width="140" height="100" rx="3" stroke={ACCENT} strokeWidth="1.5" fill="none" />
                <text x="370" y="30" textAnchor="middle" fill={ACCENT} fontSize="9" fontFamily="Georgia">ESP32-CAM</text>
                {[["GND","60"],["5V","80"],["U0R","100"],["U0T","120"]].map(([label, y]) => (
                  <g key={label}>
                    <circle cx="295" cy={parseInt(y)} r="3" fill={ACCENT} />
                    <text x="290" y={parseInt(y)+4} textAnchor="end" fill={LIGHT} fontSize="9" fontFamily="Georgia" opacity="0.7">{label}</text>
                  </g>
                ))}
                {/* Wires */}
                {[["60","60","#888"],["80","80",ACCENT],["100","120","#6af"],["120","100","#f96"]].map(([y1,y2,col],i) => (
                  <line key={i} x1="145" y1={y1} x2="295" y2={y2} stroke={col} strokeWidth="1.5" strokeDasharray="4,3" />
                ))}
                {/* IO0 bridge */}
                <text x="230" y="170" textAnchor="middle" fill={WARN} fontSize="9" fontFamily="Georgia">IO0 → GND (programming mode only)</text>
              </svg>
            </DiagramBox>
            <p style={styles.stepBody}>
              Wire the FTDI adapter to the ESP32-CAM using female-to-female jumper wires: GND→GND, VCC (5V)→5V, TX→U0R, RX→U0T.
              To enter programming mode, also connect the IO0 pin to GND. Remove this wire after programming.
            </p>
          </Step>

          <Step num="02" title="Upload the firmware">
            <p style={styles.stepBody}>
              Download and install the <a href="https://www.arduino.cc/en/software" target="_blank" rel="noopener noreferrer" style={styles.partsLink}><strong style={{ color: ACCENT }}>Arduino IDE</strong></a> (free).
              In Preferences, add this URL to Additional Boards Manager URLs:
            </p>
            <div style={styles.codeBlock}>
              https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
            </div>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              Go to Tools → Board → Boards Manager, search "esp32" and install the Espressif package.
              Then select <em>AI Thinker ESP32-CAM</em> as your board.
              Open File → Examples → ESP32 → Camera → CameraWebServer.
              Enter your Wi-Fi name and password in the sketch, select the right COM port, and click Upload.
              Once uploaded, remove the IO0–GND wire and press Reset.
            </p>
          </Step>

          <Step num="03" title="Find the camera's IP address">
            <p style={styles.stepBody}>
              Open the Serial Monitor (Tools → Serial Monitor, 115200 baud). After reset, the ESP32-CAM will print its IP address.
              Open that address in a browser on the same Wi-Fi network. You should see a live video stream.
              Note the IP — you will use this to view footage in the field via a mobile hotspot.
            </p>
          </Step>
        </div>
      </div>

      <div style={styles.divider} />

      {/* Assembly */}
      <div style={styles.section}>
        <div style={styles.sectionLeft}><p style={styles.sectionLabel}>Assembly</p></div>
        <div style={styles.sectionRight}>

          <Step num="04" title="Prepare the rope system">
            <DiagramBox>
              <svg viewBox="0 0 460 200" style={{ width: "100%", opacity: 0.85 }}>
                {/* Lid top view */}
                <rect x="130" y="20" width="200" height="160" rx="6" stroke={ACCENT} strokeWidth="1.5" fill="none" />
                {/* Flaps */}
                <rect x="80" y="70" width="50" height="60" rx="3" stroke={ACCENT} strokeWidth="1" fill="none" strokeDasharray="4,3" />
                <rect x="330" y="70" width="50" height="60" rx="3" stroke={ACCENT} strokeWidth="1" fill="none" strokeDasharray="4,3" />
                {/* Holes */}
                <circle cx="105" cy="100" r="5" stroke="#6af" strokeWidth="2" fill="none" />
                <circle cx="355" cy="100" r="5" stroke="#f96" strokeWidth="2" fill="none" />
                {/* Ropes */}
                <line x1="105" y1="100" x2="60" y2="100" stroke="#6af" strokeWidth="3" strokeLinecap="round" />
                <line x1="355" y1="100" x2="400" y2="100" stroke="#f96" strokeWidth="3" strokeLinecap="round" />
                <text x="105" y="145" textAnchor="middle" fill="#6af" fontSize="9" fontFamily="Georgia">Blue rope</text>
                <text x="355" y="145" textAnchor="middle" fill="#f96" fontSize="9" fontFamily="Georgia">Orange rope</text>
                {/* Camera arrow */}
                <circle cx="230" cy="100" r="20" stroke={ACCENT} strokeWidth="1.5" fill="none" />
                <polygon points="230,70 222,90 238,90" fill={ACCENT} />
                <text x="230" y="140" textAnchor="middle" fill={ACCENT} fontSize="9" fontFamily="Georgia">Camera faces down</text>
              </svg>
            </DiagramBox>
            <p style={styles.stepBody}>
              The rope system tells you which direction the camera is pointing without opening the jar.
              Drill one 4mm hole in each of the two opposing lid flaps. Thread a short length of rope through each —
              use two clearly different colours (e.g. blue and orange). Tie a knot on the inside to secure.
              <strong style={{ color: ACCENT }}> Always note which colour corresponds to which side before deploying.</strong> This is how you know where the camera is looking.
            </p>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              De-burr both holes carefully using a scalpel or pocket knife — run the blade lightly around the rim to remove any raised plastic edges before threading the rope.
              Collect all plastic swarf on a sheet of paper immediately after drilling and dispose of in general waste.
            </p>
          </Step>

          <Step num="05" title="Mount the ESP32-CAM">
            <p style={styles.stepBody}>
              Place a small piece of foam or adhesive velcro on the inside base of the jar.
              Press the ESP32-CAM onto it with the camera lens facing the base glass.
              The lens should be centred and as close to the glass as possible without touching.
              Route the USB cable through the jar opening — the cable exits under the lid, not through it.
            </p>
          </Step>

          <Step num="06" title="Seal the jar">
            <p style={styles.stepBody}>
              The Lite version requires no drilled cable hole and no cable gland.
              The USB cable simply runs under the edge of the lid when closed — the jar's rubber seal
              provides enough compression to make it watertight.
              Press the lid down firmly. The rope handles sit outside the jar and can be used to position and retrieve it.
            </p>
          </Step>

          <Step num="07" title="Connect the power circuit">
            <DiagramBox>
              <svg viewBox="0 0 460 180" style={{ width: "100%", opacity: 0.85 }}>
                <rect x="10" y="60" width="100" height="50" rx="3" stroke={ACCENT} strokeWidth="1.5" fill="none" />
                <text x="60" y="50" textAnchor="middle" fill={ACCENT} fontSize="9" fontFamily="Georgia">LiPo 3.7V</text>
                <text x="60" y="80" textAnchor="middle" fill={LIGHT} fontSize="8" fontFamily="Georgia" opacity="0.6">JST-PH 2.0</text>
                <text x="60" y="92" textAnchor="middle" fill={LIGHT} fontSize="8" fontFamily="Georgia" opacity="0.6">JST plug</text>
                <rect x="150" y="60" width="110" height="50" rx="3" stroke={ACCENT} strokeWidth="1.5" fill="none" />
                <text x="205" y="50" textAnchor="middle" fill={ACCENT} fontSize="9" fontFamily="Georgia">XL6019</text>
                <text x="205" y="80" textAnchor="middle" fill={LIGHT} fontSize="8" fontFamily="Georgia" opacity="0.6">3.7V → 5V</text>
                <text x="205" y="92" textAnchor="middle" fill={LIGHT} fontSize="8" fontFamily="Georgia" opacity="0.6">screw terminals</text>
                <rect x="310" y="60" width="130" height="50" rx="3" stroke={ACCENT} strokeWidth="1.5" fill="none" />
                <text x="375" y="50" textAnchor="middle" fill={ACCENT} fontSize="9" fontFamily="Georgia">ESP32-CAM</text>
                <text x="375" y="83" textAnchor="middle" fill={LIGHT} fontSize="8" fontFamily="Georgia" opacity="0.6">5V + GND pins</text>
                <line x1="110" y1="85" x2="150" y2="85" stroke={ACCENT} strokeWidth="1.5" />
                <line x1="260" y1="85" x2="310" y2="85" stroke={ACCENT} strokeWidth="1.5" />
                <line x1="60" y1="110" x2="60" y2="150" stroke={WARN} strokeWidth="1.5" strokeDasharray="4,3" />
                <text x="60" y="165" textAnchor="middle" fill={WARN} fontSize="8" fontFamily="Georgia">USB charger cable (to charge)</text>
              </svg>
            </DiagramBox>
            <p style={styles.stepBody}>
              Before connecting anything, set the XL6019 output to 5V using a small flathead screwdriver on the potentiometer.
              Turn the pot and measure the output with a multimeter until it reads 5.0V — do this before connecting the ESP32-CAM.
            </p>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              Strip the bare wire ends from the LiPo's SM-2Pin JST pigtail (red = positive, black = negative).
              Insert them into the XL6019 input screw terminals (IN+ and IN−) and tighten with a screwdriver.
              Connect short wires from the XL6019 output terminals (OUT+ and OUT−) to the ESP32-CAM's 5V and GND pins.
              No soldering required — screw terminals grip the bare wire ends directly.
            </p>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              <strong style={{ color: ACCENT }}>Charging the LiPo:</strong> When the battery is low, open the jar and unplug the LiPo's JST-PH 2.0 connector from the XL6019.
              Plug it into any port on the 6-channel USB charger, and connect the charger's USB-A plug to any USB charger or laptop.
              The per-port LED will indicate charging status — typically red while charging, off when full.
              Set the charger to 0.6A for a 1300mAh battery (1C rate). A full charge takes approximately 2 hours.
              Never charge while the jar is sealed or submerged.
            </p>
            <div style={{ ...styles.warningBox, marginTop: "1rem" }}>
              <p style={styles.warningTitle}>⚠ LiPo safety</p>
              <p style={styles.warningBody}>
                Never charge a LiPo unattended or near flammable materials.
                Do not puncture, crush, or short-circuit LiPo cells.
                Always use the dedicated USB charger cable — never connect the LiPo directly to a USB port.
                Dispose of swollen or damaged batteries at a household hazardous waste facility.
              </p>
            </div>
          </Step>

          <Step num="08" title="Test before deploying">
            <p style={styles.stepBody}>
              Power on by connecting the LiPo. Connect your phone to the same Wi-Fi hotspot the ESP32 was configured with.
              Open the camera's IP address in your phone's browser to confirm the live stream.
              Seal the jar and submerge in a bowl of water for 30 minutes to check for leaks before field use.
              A 1000mAh LiPo provides approximately 1.5–2 hours of streaming. A 2000mAh battery extends this to 3–4 hours.
            </p>
          </Step>

        </div>
      </div>

      <div style={styles.divider} />
      <Principles items={[
        { title: "Rope orientation", body: "The two-colour rope system is essential. Always photograph or note which colour faces which direction before you place the camera. Without this you cannot be certain what your footage shows." },
        { title: "No specialist tools needed", body: "The Lite version is designed to be buildable by anyone — no soldering iron, no 3D printer, no specialist equipment. Everything is off-the-shelf and assembled by hand. The waterproofing is equivalent to the XL." },
        { title: "LiPo care", body: "Always recharge using the dedicated 6-channel USB charger — never connect the LiPo directly to a USB port. Disconnect the JST-PH 2.0 connector from the XL6019 before charging. Store at partial charge (around 50%) if not using for extended periods. A swollen or damaged battery should be disposed of safely, never used." },
        { title: "Microplastic awareness", body: "Even drilling two small holes creates plastic particles. Use a piece of paper beneath the work area and dispose of all debris carefully. Never work near water." },
      ]} />
    </>
  );
}

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
              ["Best for", "Higher quality footage, longer sessions"],
              ["Housing", "IKEA 365+ 600ml"],
              ["Housing cost", "£4 each"],
              ["Power", "USB power bank (easy to recharge)"],
              ["Tethering", "USB-C to laptop"],
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
              IKEA 365+ 600ml — available new (£4 each) or reused from eBay, Vinted, or charity shops.
            </p>
          </div>
          <p style={styles.introPara}>
            The XL version uses a Raspberry Pi Zero 2W with the Camera Module 3, housed in the larger 600ml IKEA jar.
            It produces 1080p+ footage, supports time-lapse and motion detection, and features live view via a USB-C tether to a laptop — no Wi-Fi required.
            Powered internally by a USB power bank. Requires a soldering iron and access to a 3D printer.
          </p>
        </div>
      </div>

      <div style={styles.divider} />

      {/* Parts */}
      <div style={styles.section}>
        <div style={styles.sectionLeft}><p style={styles.sectionLabel}>Parts list</p></div>
        <div style={styles.sectionRight}>
          <PartsTable parts={[
            { item: "Raspberry Pi Zero 2W", cost: "£15", note: <span>From <a href="https://thepihut.com/products/raspberry-pi-zero-2" target="_blank" rel="noopener noreferrer" style={styles.partsLink}>The Pi Hut</a> or <a href="https://shop.pimoroni.com/products/raspberry-pi-zero-2-w" target="_blank" rel="noopener noreferrer" style={styles.partsLink}>Pimoroni</a>. Includes Wi-Fi.</span> },
            { item: "Raspberry Pi Camera Module 3", cost: "£25", note: <span>12MP, autofocus. From <a href="https://thepihut.com/products/raspberry-pi-camera-module-3" target="_blank" rel="noopener noreferrer" style={styles.partsLink}>The Pi Hut</a> or <a href="https://shop.pimoroni.com/products/raspberry-pi-camera-module-3" target="_blank" rel="noopener noreferrer" style={styles.partsLink}>Pimoroni</a>. Excellent low-light performance.</span> },
            { item: "IKEA 365+ 600ml glass jar with lid", cost: "£4", note: <span>New from <a href="https://www.ikea.com/gb/en/search/?q=365%2B+jar" target="_blank" rel="noopener noreferrer" style={styles.partsLink}>IKEA</a> or reused from <a href="https://www.ebay.co.uk/sch/i.html?_nkw=ikea+365+600ml+jar" target="_blank" rel="noopener noreferrer" style={styles.partsLink}>eBay</a> or <a href="https://www.vinted.co.uk/catalog?search_text=ikea+365+jar" target="_blank" rel="noopener noreferrer" style={styles.partsLink}>Vinted</a>.</span> },
            { item: "INIU Pocket Rocket P50 Power Bank (10,000mAh)", cost: "£12–18", note: <span>45W, compact form factor, fits inside the 600ml jar. From <a href="https://www.amazon.co.uk/s?k=INIU+Pocket+Rocket+P50" target="_blank" rel="noopener noreferrer" style={styles.partsLink}>Amazon</a>. Provides 4–6 hours of runtime.</span> },
            { item: "Power Bank KeepAlive (Adjustable)", cost: "£7.50", note: <span>Prevents the power bank from auto-shutting off at low current draw. From <a href="https://thepihut.com/products/power-bank-keepalive-adjustable" target="_blank" rel="noopener noreferrer" style={styles.partsLink}>The Pi Hut</a>. Connect between power bank output and Pi power input.</span> },
            { item: "USB-A to micro-USB cable (5m)", cost: "£6–8", note: <span>Data tether to laptop for live view. One end will be cut — buy a cheap cable from <a href="https://www.amazon.co.uk/s?k=usb+a+to+micro+usb+5m" target="_blank" rel="noopener noreferrer" style={styles.partsLink}>Amazon</a>, not a premium one.</span> },
            { item: "Short USB-C pigtail cable (20–30cm)", cost: "£2–3", note: <span>Connects inside the jar from the Wago terminals to the Pi's data port. Search <a href="https://www.amazon.co.uk/s?k=short+usb-c+cable+20cm" target="_blank" rel="noopener noreferrer" style={styles.partsLink}>'short USB-C cable' on Amazon</a>.</span> },
            { item: "Wago 221 MINI connectors (4-wire, x4)", cost: "£3–5", note: <span>Joins tether cable to pigtail inside the jar. One connector per wire: VCC, GND, D+, D−. Search <a href="https://www.amazon.co.uk/s?k=wago+221+mini" target="_blank" rel="noopener noreferrer" style={styles.partsLink}>Wago 221 MINI on Amazon</a>.</span> },
            { item: "Two colours of rope or paracord (1m each)", cost: "£2–3", note: "Orientation indicator — one colour per side of lid." },
            { item: "PG7 waterproof cable gland", cost: "£1–2", note: <span>Fits cables 3–6.5mm diameter. Search <a href="https://www.amazon.co.uk/s?k=PG7+cable+gland+waterproof" target="_blank" rel="noopener noreferrer" style={styles.partsLink}>PG7 cable gland on Amazon</a>.</span> },
            { item: "MicroSD card (32GB+, Class 10)", cost: "£6", note: <span>For OS and footage. UHS-1 recommended. Search <a href="https://www.amazon.co.uk/s?k=32gb+microsd+class+10+UHS-1" target="_blank" rel="noopener noreferrer" style={styles.partsLink}>microSD UHS-1 on Amazon</a>.</span> },
            { item: "Drill + 4mm and 12mm bits", cost: "—", note: "4mm for rope holes, 12mm for PG7 gland entry in lid." },
          ]} />
        </div>
      </div>

      <div style={styles.divider} />

      {/* Safety */}
      <div style={styles.section}>
        <div style={styles.sectionLeft}>
          <p style={styles.sectionLabel}>Safety first</p>
        </div>
        <div style={styles.sectionRight}>
          <div style={styles.warningBox}>
            <p style={styles.warningTitle}>⚠ Read before you begin</p>
            <div style={styles.warningGrid}>
              <div>
                <p style={styles.warningHead}>Personal protective equipment</p>
                <p style={styles.warningBody}>
                  Wear safety glasses when drilling. Flying plastic fragments can cause serious eye injury.
                  Wear gloves when handling drilled lids — edges can be sharp.
                  Work in a well-ventilated space.
                </p>
              </div>
              <div>
                <p style={styles.warningHead}>Microplastic disposal</p>
                <p style={styles.warningBody}>
                  Drilling through plastic lids produces fine particles. Do not drill near water or drains.
                  Collect all swarf and plastic debris on a sheet of paper or card, fold it up, and dispose of it in general waste — never rinse it down a sink or allow it into the environment.
                  This project exists to observe aquatic ecosystems — protect them from the very start.
                </p>
              </div>
              <div>
                <p style={styles.warningHead}>Electrical safety</p>
                <p style={styles.warningBody}>
                  Always disconnect power before wiring. Never submerge a camera that has not been fully sealed and leak-tested.
                  Do not use mains power for underwater deployment — battery only.
                </p>
              </div>
              <div>
                <p style={styles.warningHead}>Waterproofing</p>
                <p style={styles.warningBody}>
                  The PG7 cable gland must be hand-tight only — over-tightening can crack the lid.
                  Always leak-test in a bowl of water for 30 minutes before any field deployment.
                  Watch for bubbles — any escaping air indicates a failed seal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.divider} />

      {/* Raspberry Pi setup */}
      <div style={styles.section}>
        <div style={styles.sectionLeft}><p style={styles.sectionLabel}>Raspberry Pi setup</p></div>
        <div style={styles.sectionRight}>

          <Step num="01" title="Flash the operating system">
            <p style={styles.stepBody}>
              Download <a href="https://www.raspberrypi.com/software/" target="_blank" rel="noopener noreferrer" style={styles.partsLink}><strong style={{ color: ACCENT }}>Raspberry Pi Imager</strong></a> (free) on your laptop.
              Insert your microSD card. In Imager, choose:
            </p>
            <div style={styles.codeBlock}>
              Device: Raspberry Pi Zero 2W{"\n"}
              OS: Raspberry Pi OS Lite (64-bit){"\n"}
              Storage: your microSD card
            </div>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              Before writing, click <strong style={{ color: ACCENT }}>Edit Settings</strong> (the gear icon). Work through each tab:
            </p>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              <strong style={{ color: ACCENT }}>General tab</strong>
            </p>
            <p style={{ ...styles.stepBody, marginTop: "0.5rem" }}>
              Set a hostname (e.g. <code>subsurface</code>) — this is how you'll identify the Pi on your network.
              Set a username and a strong password — you'll use these to SSH in.
              Leave Wi-Fi credentials blank — the XL connects via USB cable, not Wi-Fi.
              Set your locale: timezone to <code>Europe/London</code>, keyboard layout to <code>gb</code>.
            </p>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              <strong style={{ color: ACCENT }}>Services tab</strong>
            </p>
            <p style={{ ...styles.stepBody, marginTop: "0.5rem" }}>
              Enable SSH. Select <em>Use password authentication</em> — this uses the username and password you just set.
              Do not enable Raspberry Pi Connect here; it requires a desktop environment not present in the Lite image.
            </p>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              <strong style={{ color: ACCENT }}>Options tab</strong>
            </p>
            <p style={{ ...styles.stepBody, marginTop: "0.5rem" }}>
              Enable <em>Eject media when finished</em>. You can leave telemetry off.
            </p>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              Click <strong style={{ color: ACCENT }}>Save</strong>, then <strong style={{ color: ACCENT }}>Write</strong> and confirm.
              Once complete, eject the card and insert it into the Pi Zero 2W.
            </p>
          </Step>

          <Step num="02" title="Enable USB gadget mode">
            <p style={styles.stepBody}>
              Before inserting the SD card into the Pi, re-mount it on your laptop and edit two files on the boot partition.
            </p>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              Open <strong style={{ color: ACCENT }}>config.txt</strong> and add this line at the very bottom:
            </p>
            <div style={styles.codeBlock}>dtoverlay=dwc2</div>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              Open <strong style={{ color: ACCENT }}>cmdline.txt</strong>. This is a single line of text — do not add a new line.
              Find the word <code>rootwait</code> and add the following immediately after it, with a single space before and after:
            </p>
            <div style={styles.codeBlock}>modules-load=dwc2,g_ether</div>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              Eject the SD card safely, insert it into the Pi, then connect the Pi's data micro-USB port to your laptop using a data-capable USB cable.
              (On the Pi Zero 2W, the data port is the one closest to the mini-HDMI port — not the power-only port at the edge.)
              The Pi will boot and appear on your laptop as a USB ethernet device called <em>RNDIS/Ethernet Gadget</em>.
              This may take up to 90 seconds on first boot.
            </p>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              <strong style={{ color: ACCENT }}>On macOS:</strong> Open System Settings → Network. You should see a new RNDIS/Ethernet Gadget entry.
              Click it, set Configure IPv4 to <em>Manually</em>, and enter:
            </p>
            <div style={styles.codeBlock}>
              {"IP Address:  192.168.7.1\n"}
              {"Subnet Mask: 255.255.255.0\n"}
              {"Router:      192.168.7.1"}
            </div>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              Click Apply. The interface should turn green within a few seconds.
            </p>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              <strong style={{ color: ACCENT }}>On Windows:</strong> Windows may not recognise the device immediately. If it appears as an unknown device in Device Manager, you need to install the RNDIS driver.
              Open Device Manager, find the unknown device, right-click → Update Driver → Browse my computer → Let me pick → Network Adapters → Microsoft → Remote NDIS Compatible Device.
              Once recognised, open Settings → Network & Internet → Change adapter options.
              Right-click the RNDIS adapter → Properties → Internet Protocol Version 4 (TCP/IPv4) → Properties → Use the following IP address:
            </p>
            <div style={styles.codeBlock}>
              {"IP Address:  192.168.7.1\n"}
              {"Subnet Mask: 255.255.255.0\n"}
              {"Default Gateway: 192.168.7.1"}
            </div>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              Click OK. Open Windows Terminal or PowerShell and SSH in:
            </p>
            <div style={styles.codeBlock}>ssh username@raspberrypi.local</div>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              If <code>raspberrypi.local</code> doesn't resolve, try the fixed IP instead:
            </p>
            <div style={styles.codeBlock}>ssh username@192.168.7.2</div>
          </Step>

          <Step num="03" title="Connect and test the camera module">
            <p style={styles.stepBody}>
              Connect the Camera Module 3 to the Pi Zero's CSI ribbon cable port.
              The connector is fragile — lift the latch gently, insert the ribbon cable with contacts facing away from the latch, and press the latch back down.
              Once SSH'd in, test the camera:
            </p>
            <div style={styles.codeBlock}>libcamera-still -o test.jpg</div>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              If a photo is saved, the camera is working correctly.
            </p>
          </Step>

          <Step num="04" title="Configure live view streaming">
            <p style={styles.stepBody}>
              Install the streaming software over your SSH connection:
            </p>
            <div style={styles.codeBlock}>
              sudo apt update{"\n"}
              sudo apt install -y ffmpeg
            </div>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              Create a startup streaming script:
            </p>
            <div style={styles.codeBlock}>nano ~/stream.sh</div>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              Paste the following:
            </p>
            <div style={styles.codeBlock}>
              {"#!/bin/bash\n"}
              {"libcamera-vid -t 0 --inline --listen -o tcp://0.0.0.0:8888"}
            </div>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              Make it executable and set it to run on boot:
            </p>
            <div style={styles.codeBlock}>
              {"chmod +x ~/stream.sh\n"}
              {"crontab -e\n"}
              {"# Add this line:\n"}
              {"@reboot /home/username/stream.sh"}
            </div>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              On your laptop, install <a href="https://www.videolan.org/vlc/" target="_blank" rel="noopener noreferrer" style={styles.partsLink}><strong style={{ color: ACCENT }}>VLC</strong></a> (free).
              With the Pi connected via USB and booted, open VLC → Media → Open Network Stream and enter:
            </p>
            <div style={styles.codeBlock}>tcp/h264://192.168.7.2:8888</div>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              You should see a live 1080p stream from the Pi camera over the USB cable — no Wi-Fi required.
              The stream runs entirely over the USB gadget ethernet connection.
            </p>
          </Step>

          <Step num="05" title="Configure recording">
            <p style={styles.stepBody}>
              For standalone recording to the SD card (no laptop needed once deployed), create a recording script:
            </p>
            <div style={styles.codeBlock}>
              {"libcamera-vid -t 3600000 -o /home/username/footage.h264\n"}
              {"# Records for 1 hour. Adjust -t value (milliseconds) as needed."}
            </div>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              For time-lapse (one frame every 10 seconds for 1 hour):
            </p>
            <div style={styles.codeBlock}>
              {"libcamera-still -t 3600000 --timelapse 10000 -o /home/username/frame%04d.jpg"}
            </div>
          </Step>

        </div>
      </div>

      <div style={styles.divider} />

      {/* Physical assembly */}
      <div style={styles.section}>
        <div style={styles.sectionLeft}><p style={styles.sectionLabel}>Assembly</p></div>
        <div style={styles.sectionRight}>

          <Step num="06" title="Prepare the rope and cable holes">
            <DiagramBox>
              <svg viewBox="0 0 460 200" style={{ width: "100%", opacity: 0.85 }}>
                <rect x="110" y="20" width="240" height="160" rx="6" stroke={ACCENT} strokeWidth="1.5" fill="none" />
                <rect x="60" y="70" width="50" height="60" rx="3" stroke={ACCENT} strokeWidth="1" fill="none" strokeDasharray="4,3" />
                <rect x="350" y="70" width="50" height="60" rx="3" stroke={ACCENT} strokeWidth="1" fill="none" strokeDasharray="4,3" />
                <circle cx="85" cy="100" r="5" stroke="#6af" strokeWidth="2" fill="none" />
                <circle cx="375" cy="100" r="5" stroke="#f96" strokeWidth="2" fill="none" />
                <line x1="85" y1="100" x2="40" y2="100" stroke="#6af" strokeWidth="3" strokeLinecap="round" />
                <line x1="375" y1="100" x2="420" y2="100" stroke="#f96" strokeWidth="3" strokeLinecap="round" />
                {/* Cable hole in lid centre */}
                <circle cx="230" cy="100" r="10" stroke={WARN} strokeWidth="2" fill="none" />
                <text x="230" y="75" textAnchor="middle" fill={WARN} fontSize="9" fontFamily="Georgia">12mm hole</text>
                <text x="230" y="65" textAnchor="middle" fill={WARN} fontSize="8" fontFamily="Georgia" opacity="0.7">(PG7 gland)</text>
                <text x="85" y="145" textAnchor="middle" fill="#6af" fontSize="9" fontFamily="Georgia">Blue rope</text>
                <text x="375" y="145" textAnchor="middle" fill="#f96" fontSize="9" fontFamily="Georgia">Orange rope</text>
              </svg>
            </DiagramBox>
            <p style={styles.stepBody}>
              Drill two 4mm holes — one in each opposing lid flap — for the orientation ropes.
              Thread one colour of rope through each flap and tie a knot on the inside to secure.
              Then drill one 12mm hole in the centre of the main lid area for the PG7 waterproof cable gland.
              Press the gland body through the hole from above and secure the lock nut underneath.
            </p>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              De-burr all drilled holes carefully using a scalpel or pocket knife — run the blade lightly around the rim of each hole to remove any raised plastic edges. This prevents the rope and gland from cutting into the lid over time.
              <strong style={{ color: WARN }}> Collect all swarf and plastic debris on paper and dispose of in general waste immediately. Never let plastic particles near water.</strong>
            </p>
          </Step>

          <Step num="07" title="Mount the Pi and camera">
            <p style={styles.stepBody}>
              Place foam padding in the base of the jar to cushion and stabilise the Pi.
              Fix the Pi with the camera ribbon facing upward. Position the Camera Module 3 face-down against the glass base,
              secured with a small foam pad. The lens should be centred and as close to the glass as possible without touching.
              Route the ribbon cable neatly — avoid any sharp bends or kinks.
            </p>
          </Step>

          <Step num="08" title="Splice the tether cable and route through the gland">
            <p style={styles.stepBody}>
              Cut the micro-USB plug off one end of the 5m tether cable. Feed the cut end through the PG7 gland
              from outside the jar, leaving enough slack inside to reach the centre of the jar comfortably.
              Tighten the gland cap to grip the cable body — hand-tight only.
            </p>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              Strip the outer sheath and then each individual wire inside — you should find four: VCC (red), GND (black), D+ (green), D− (white).
              Do the same for the short USB-C pigtail cable that will connect to the Pi.
              Join matching wires using Wago 221 MINI connectors — one connector per wire.
              Push each pair of stripped wires into opposite sides of the connector until they click.
            </p>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              Connect the pigtail's intact USB-C plug to the Pi's data port.
              The outside end of the tether cable runs up to your laptop at the surface for live view.
            </p>
          </Step>

          <Step num="09" title="Power and live view test">
            <DiagramBox>
              <svg viewBox="0 0 460 160" style={{ width: "100%", opacity: 0.85 }}>
                <rect x="10" y="50" width="100" height="60" rx="3" stroke={ACCENT} strokeWidth="1.5" fill="none" />
                <text x="60" y="40" textAnchor="middle" fill={ACCENT} fontSize="9" fontFamily="Georgia">Power bank</text>
                <text x="60" y="75" textAnchor="middle" fill={LIGHT} fontSize="8" fontFamily="Georgia" opacity="0.6">inside jar</text>
                <text x="60" y="87" textAnchor="middle" fill={LIGHT} fontSize="8" fontFamily="Georgia" opacity="0.6">10,000mAh</text>
                <line x1="110" y1="80" x2="190" y2="80" stroke={ACCENT} strokeWidth="2" />
                <rect x="190" y="50" width="80" height="60" rx="3" stroke={ACCENT} strokeWidth="1.5" fill="none" />
                <text x="230" y="40" textAnchor="middle" fill={ACCENT} fontSize="9" fontFamily="Georgia">Pi in jar</text>
                <text x="230" y="78" textAnchor="middle" fill={LIGHT} fontSize="8" fontFamily="Georgia" opacity="0.6">sealed</text>
                <line x1="270" y1="80" x2="350" y2="80" stroke={WARN} strokeWidth="2" strokeDasharray="6,3" />
                <rect x="350" y="50" width="100" height="60" rx="3" stroke={ACCENT} strokeWidth="1.5" fill="none" />
                <text x="400" y="40" textAnchor="middle" fill={ACCENT} fontSize="9" fontFamily="Georgia">Laptop</text>
                <text x="400" y="75" textAnchor="middle" fill={LIGHT} fontSize="8" fontFamily="Georgia" opacity="0.6">VLC · live view</text>
                <text x="310" y="110" textAnchor="middle" fill={WARN} fontSize="8" fontFamily="Georgia" opacity="0.7">USB tether (data)</text>
                <text x="150" y="110" textAnchor="middle" fill={ACCENT} fontSize="8" fontFamily="Georgia" opacity="0.7">USB (power)</text>
                <text x="230" y="148" textAnchor="middle" fill={LIGHT} fontSize="8" fontFamily="Georgia" opacity="0.4">Power bank → Pi · Pi → Laptop via USB-C tether</text>
              </svg>
            </DiagramBox>
            <p style={styles.stepBody}>
              Connect the power bank to the Pi inside the jar, and plug the tether cable into your laptop.
              Wait for the Pi to boot (30–60 seconds) — it will appear as a USB ethernet device on your laptop.
              Open VLC, enter the stream URL, and verify live view is working before sealing the jar.
              Once confirmed, seal the jar and submerge in a bowl of water for 30 minutes — watch for bubbles which indicate a leak.
              Do not deploy in the field until this test passes.
            </p>
          </Step>

        </div>
      </div>

      <div style={styles.divider} />

      <Principles items={[
        { title: "Rope orientation", body: "As with the Lite version, the two-colour rope system tells you which way the camera is pointing. Always note or photograph which colour is on which side before deployment." },
        { title: "Heat management", body: "The Pi Zero 2W generates heat. In warm water or direct sun, limit deployments to under 2 hours. The sealed glass jar provides no active cooling." },
        { title: "PG7 gland and Wago splice", body: "The tether cable enters the jar through a PG7 gland — hand-tighten only. Inside, the four wires (VCC, GND, D+, D−) are joined to a short pigtail using Wago 221 MINI connectors. If live view is unstable, the Wago connections on D+ and D− are the first thing to check." },
        { title: "USB gadget mode", body: "Live view runs over USB gadget ethernet — no Wi-Fi needed in the field. The Pi presents itself as a network adapter to your laptop over the tether cable. Make sure your laptop has VPN software disabled when connecting, as VPNs can interfere with the USB network interface." },
        { title: "Microplastics", body: "The XL requires more drilling than the Lite — two rope holes and one cable gland hole. Collect all swarf on paper and bag it for general waste. Never allow particles near water." },
      ]} />
    </>
  );
}

// ── Shared components ──

function PartsTable({ parts }: { parts: { item: string; cost: string; note: string | React.ReactNode; link?: string }[] }) {
  return (
    <table style={styles.partsTable}>
      <thead>
        <tr>
          {["Component", "Est. cost", "Notes"].map(h => (
            <th key={h} style={styles.partsTh}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {parts.map((p, i) => (
          <tr key={i} style={styles.partsTr}>
            <td style={styles.partsTd}>{p.link ? <a href={p.link} target="_blank" rel="noopener noreferrer" style={styles.partsLink}>{p.item}</a> : p.item}</td>
            <td style={{ ...styles.partsTd, whiteSpace: "nowrap" as const, color: ACCENT }}>{p.cost}</td>
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
  return (
    <div style={styles.diagram}>{children}</div>
  );
}

function Principles({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div style={styles.section}>
      <div style={styles.sectionLeft}><p style={styles.sectionLabel}>Key principles</p></div>
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
    display: "flex", alignItems: "flex-end",
    padding: "6rem 4rem 4rem", gap: "4rem",
  },
  heroLeft: { flex: "0 0 600px" },
  heroRight: {
    marginLeft: "auto",
    display: "flex", flexDirection: "column" as const,
    alignItems: "flex-start", gap: "1.25rem", width: "320px",
    paddingTop: "5rem",
  },
  heroImg: { height: "360px", width: "auto", display: "block" },
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
  toggle: {
    display: "flex", gap: "1px", border: `1px solid rgba(220,255,199,0.15)`,
    borderRadius: "2px", overflow: "hidden", alignSelf: "stretch" as const,
  },
  toggleBtn: {
    padding: "0.85rem 1.5rem", background: "rgba(220,255,199,0.04)", border: "none", cursor: "pointer",
    display: "flex", flexDirection: "column" as const, alignItems: "flex-start", gap: "0.25rem", flex: 1,
  },
  toggleBtnActive: {
    padding: "0.85rem 1.5rem", background: ACCENT, border: "none", cursor: "pointer",
    display: "flex", flexDirection: "column" as const, alignItems: "flex-start", gap: "0.25rem", flex: 1,
  },
  toggleName: {
    fontFamily: "adobe-jenson-pro-display, serif", fontWeight: 700,
    fontSize: "1.5rem", color: LIGHT, lineHeight: 1,
  },
  toggleNameActive: {
    fontFamily: "adobe-jenson-pro-display, serif", fontWeight: 700,
    fontSize: "1.5rem", color: DARK, lineHeight: 1,
  },
  toggleSub: {
    fontFamily: '"clother", sans-serif', fontWeight: 700, fontSize: "0.6rem",
    letterSpacing: "0.08em", textTransform: "uppercase" as const, color: LIGHT, opacity: 0.5,
    whiteSpace: "nowrap" as const,
  },
  toggleSubActive: {
    fontFamily: '"clother", sans-serif', fontWeight: 700, fontSize: "0.6rem",
    letterSpacing: "0.08em", textTransform: "uppercase" as const, color: DARK, opacity: 0.7,
    whiteSpace: "nowrap" as const,
  },
  divider: { height: "1px", background: "rgba(220,255,199,0.1)", margin: "0 4rem" },
  section: { display: "flex", gap: "4rem", padding: "4rem", alignItems: "flex-start" },
  sectionLeft: { width: "200px", minWidth: "200px" },
  sectionRight: { flex: 1 },
  sectionLabel: {
    fontFamily: '"clother", sans-serif', fontWeight: 700, fontSize: "0.7rem",
    letterSpacing: "0.15em", textTransform: "uppercase" as const, color: ACCENT, marginBottom: "1.5rem",
  },
  warningBox: {
    border: `1px solid rgba(232,160,74,0.3)`, borderRadius: "2px",
    padding: "2rem", background: "rgba(232,160,74,0.05)",
  },
  warningTitle: {
    fontFamily: '"clother", sans-serif', fontWeight: 700, fontSize: "0.8rem",
    letterSpacing: "0.12em", textTransform: "uppercase" as const, color: WARN,
    marginBottom: "1.5rem",
  },
  warningGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem 3rem" },
  warningHead: {
    fontFamily: '"clother", sans-serif', fontWeight: 700, fontSize: "0.65rem",
    letterSpacing: "0.1em", textTransform: "uppercase" as const, color: WARN,
    marginBottom: "0.5rem", opacity: 0.9,
  },
  warningBody: {
    fontFamily: "adobe-jenson-pro-caption, serif", fontStyle: "italic",
    fontSize: "0.9rem", lineHeight: 1.7, color: LIGHT, opacity: 0.8, margin: 0,
  },
  specGrid: { display: "flex", flexDirection: "column" as const, gap: "1rem" },
  specItem: { display: "flex", flexDirection: "column" as const, gap: "0.2rem" },
  specKey: {
    fontFamily: '"clother", sans-serif', fontWeight: 700, fontSize: "0.6rem",
    letterSpacing: "0.1em", textTransform: "uppercase" as const, color: LIGHT, opacity: 0.4,
  },
  specVal: { fontFamily: "adobe-jenson-pro-caption, serif", fontStyle: "italic", fontSize: "0.95rem", color: LIGHT },
  containerImgWrap: { marginBottom: "2rem" },
  containerImg: { width: "100%", maxWidth: "360px", display: "block", borderRadius: "2px", marginBottom: "0.75rem" },
  containerCaption: {
    fontFamily: "adobe-jenson-pro-caption, serif", fontStyle: "italic",
    fontSize: "0.8rem", color: LIGHT, opacity: 0.5, maxWidth: "360px",
  },
  introPara: {
    fontFamily: "adobe-jenson-pro-caption, serif", fontStyle: "italic",
    fontSize: "1.05rem", lineHeight: 1.75, color: LIGHT, opacity: 0.85,
  },
  partsTable: { width: "100%", borderCollapse: "collapse" as const },
  partsTh: {
    fontFamily: '"clother", sans-serif', fontWeight: 700, fontSize: "0.65rem",
    letterSpacing: "0.12em", textTransform: "uppercase" as const, color: LIGHT,
    opacity: 0.4, textAlign: "left" as const, padding: "0.75rem 1rem",
    borderBottom: `1px solid rgba(220,255,199,0.08)`,
  },
  partsTr: { borderBottom: `1px solid rgba(220,255,199,0.06)` },
  partsTd: {
    padding: "1rem", fontFamily: "adobe-jenson-pro-caption, serif",
    fontStyle: "italic", fontSize: "0.9rem", color: LIGHT, verticalAlign: "top",
  },
  partsLink: { color: LIGHT, textDecoration: "underline", textDecorationColor: "rgba(220,255,199,0.3)" },
  step: { display: "flex", flexDirection: "column" as const, gap: "1rem", marginBottom: "3rem" },
  stepHeader: { display: "flex", alignItems: "baseline", gap: "1.25rem" },
  stepNum: {
    fontFamily: "adobe-jenson-pro-display, serif", fontWeight: 700,
    fontSize: "3rem", color: ACCENT, lineHeight: 1, letterSpacing: "-0.02em",
  },
  stepTitle: { fontFamily: "adobe-jenson-pro-display, serif", fontWeight: 700, fontSize: "1.4rem", color: LIGHT, margin: 0 },
  diagram: {
    width: "100%", maxWidth: "480px", background: "rgba(220,255,199,0.03)",
    border: `1px solid rgba(220,255,199,0.08)`, borderRadius: "2px", padding: "1.5rem",
  },
  stepBody: {
    fontFamily: "adobe-jenson-pro-caption, serif", fontStyle: "italic",
    fontSize: "1rem", lineHeight: 1.75, color: LIGHT, opacity: 0.8, maxWidth: "580px", margin: 0,
  },
  codeBlock: {
    fontFamily: "'Courier New', monospace", fontSize: "0.8rem", lineHeight: 1.7,
    background: "rgba(220,255,199,0.06)", border: `1px solid rgba(220,255,199,0.12)`,
    borderRadius: "2px", padding: "1rem 1.25rem", color: ACCENT,
    whiteSpace: "pre" as const, overflowX: "auto" as const, maxWidth: "480px",
  },
  principles: { display: "flex", flexDirection: "column" as const, gap: "2.5rem" },
  principle: {},
  principleTitle: { fontFamily: "adobe-jenson-pro-display, serif", fontWeight: 700, fontSize: "1.2rem", color: LIGHT, margin: "0 0 0.75rem" },
  principleBody: { fontFamily: "adobe-jenson-pro-caption, serif", fontStyle: "italic", fontSize: "1rem", lineHeight: 1.75, color: LIGHT, opacity: 0.8, margin: 0 },
  cta: {
    padding: "4rem", borderTop: `1px solid rgba(220,255,199,0.1)`,
    display: "flex", flexDirection: "column" as const, gap: "1rem", alignItems: "flex-start",
  },
  ctaLabel: { fontFamily: '"clother", sans-serif', fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: ACCENT },
  ctaTitle: { fontFamily: "adobe-jenson-pro-display, serif", fontWeight: 700, fontSize: "2rem", color: LIGHT, margin: 0 },
  ctaBody: { fontFamily: "adobe-jenson-pro-caption, serif", fontStyle: "italic", fontSize: "1rem", lineHeight: 1.7, color: LIGHT, opacity: 0.7, maxWidth: "480px", margin: 0 },
  ctaBtn: {
    fontFamily: '"clother", sans-serif', fontWeight: 700, fontSize: "0.8rem",
    letterSpacing: "0.12em", textTransform: "uppercase" as const,
    color: DARK, background: ACCENT, padding: "0.85rem 1.75rem",
    borderRadius: "2px", textDecoration: "none", marginTop: "0.5rem", display: "inline-block",
  },
};
