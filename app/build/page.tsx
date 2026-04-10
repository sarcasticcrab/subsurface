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
            No specialist tools required. Two versions — choose based on your budget and experience.
          </p>
        </div>
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
                <p style={styles.warningHead}>Silicone and adhesives</p>
                <p style={styles.warningBody}>
                  Use only aquarium-safe silicone sealant near water. Standard bathroom or construction sealants can leach chemicals harmful to aquatic life.
                  Allow full 24-hour cure time before any water contact.
                </p>
              </div>
            </div>
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
            no soldering and can be built in an afternoon. It is ideal for shallow freshwater environments.
          </p>
        </div>
      </div>

      <div style={styles.divider} />

      {/* Parts */}
      <div style={styles.section}>
        <div style={styles.sectionLeft}><p style={styles.sectionLabel}>Parts list</p></div>
        <div style={styles.sectionRight}>
          <PartsTable parts={[
            { item: "ESP32-CAM module (AI Thinker)", cost: "£6–8", note: "Includes OV2640 camera. Buy from Amazon or AliExpress." },
            { item: "FTDI USB-to-serial programmer", cost: "£3–5", note: "Required for initial firmware upload. Search 'FTDI FT232RL module'." },
            { item: "IKEA 365+ 180ml glass jar with lid", cost: "£2", note: "New or reused. Check eBay, Vinted, or charity shops." },
            { item: "3.7V LiPo battery (1000–2000mAh)", cost: "£5–8", note: "Slim profile fits inside the 180ml jar. Search '3.7V LiPo flat battery'. 1000mAh gives ~2hrs recording." },
            { item: "TP4056 LiPo charging module", cost: "£1–2", note: "For safely recharging the LiPo via USB. Includes overcharge protection." },
            { item: "3.3V–5V boost converter (MT3608)", cost: "£1–2", note: "Steps up LiPo voltage (3.7V) to 5V for the ESP32-CAM." },
            { item: "Two colours of thin rope or paracord (1m each)", cost: "£2–3", note: "One colour per side of lid — indicates camera direction." },
            { item: "Drill + 4mm drill bit", cost: "—", note: "For rope holes in the lid flaps. Borrow if possible." },
            { item: "Jumper wires (female-to-female)", cost: "£2", note: "For connecting FTDI to ESP32-CAM for programming." },
          ]} />
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
              Download and install the <strong style={{ color: ACCENT }}>Arduino IDE</strong> (free, arduino.cc).
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
              The Lite version requires no drilled cable hole and no silicone sealant.
              The USB cable simply runs under the edge of the lid when closed — the jar's rubber seal
              provides enough compression to make it water-resistant at shallow depths (up to 0.5m).
              Press the lid down firmly. The rope handles sit outside the jar and can be used to position and retrieve it.
            </p>
          </Step>

          <Step num="07" title="Wire and install the LiPo battery">
            <DiagramBox>
              <svg viewBox="0 0 460 180" style={{ width: "100%", opacity: 0.85 }}>
                <rect x="10" y="60" width="90" height="50" rx="3" stroke={ACCENT} strokeWidth="1.5" fill="none" />
                <text x="55" y="50" textAnchor="middle" fill={ACCENT} fontSize="9" fontFamily="Georgia">LiPo 3.7V</text>
                <text x="55" y="88" textAnchor="middle" fill={LIGHT} fontSize="8" fontFamily="Georgia" opacity="0.6">1000–2000mAh</text>
                <rect x="130" y="60" width="90" height="50" rx="3" stroke={ACCENT} strokeWidth="1.5" fill="none" />
                <text x="175" y="50" textAnchor="middle" fill={ACCENT} fontSize="9" fontFamily="Georgia">TP4056</text>
                <text x="175" y="80" textAnchor="middle" fill={LIGHT} fontSize="8" fontFamily="Georgia" opacity="0.6">Charger /</text>
                <text x="175" y="92" textAnchor="middle" fill={LIGHT} fontSize="8" fontFamily="Georgia" opacity="0.6">Protection</text>
                <rect x="250" y="60" width="90" height="50" rx="3" stroke={ACCENT} strokeWidth="1.5" fill="none" />
                <text x="295" y="50" textAnchor="middle" fill={ACCENT} fontSize="9" fontFamily="Georgia">MT3608</text>
                <text x="295" y="80" textAnchor="middle" fill={LIGHT} fontSize="8" fontFamily="Georgia" opacity="0.6">3.7V → 5V</text>
                <rect x="370" y="60" width="80" height="50" rx="3" stroke={ACCENT} strokeWidth="1.5" fill="none" />
                <text x="410" y="50" textAnchor="middle" fill={ACCENT} fontSize="9" fontFamily="Georgia">ESP32-CAM</text>
                <text x="410" y="88" textAnchor="middle" fill={LIGHT} fontSize="8" fontFamily="Georgia" opacity="0.6">5V in</text>
                <line x1="100" y1="85" x2="130" y2="85" stroke={ACCENT} strokeWidth="1.5" />
                <line x1="220" y1="85" x2="250" y2="85" stroke={ACCENT} strokeWidth="1.5" />
                <line x1="340" y1="85" x2="370" y2="85" stroke={ACCENT} strokeWidth="1.5" />
                <line x1="175" y1="110" x2="175" y2="150" stroke={ACCENT} strokeWidth="1.5" strokeDasharray="4,3" />
                <text x="175" y="165" textAnchor="middle" fill={ACCENT} fontSize="8" fontFamily="Georgia">USB charging port</text>
              </svg>
            </DiagramBox>
            <p style={styles.stepBody}>
              Wire the LiPo battery to the TP4056 charging module (B+ and B− terminals). The TP4056 output
              connects to the MT3608 boost converter input. The boost converter output (set to 5V) connects
              to the ESP32-CAM's 5V and GND pins. The TP4056's USB port is used to recharge between deployments.
              A 1000mAh flat LiPo fits comfortably inside the 180ml jar alongside the ESP32-CAM.
            </p>
            <div style={{ ...styles.warningBox, marginTop: "1rem" }}>
              <p style={styles.warningTitle}>⚠ LiPo safety</p>
              <p style={styles.warningBody}>
                Never charge a LiPo unattended or near flammable materials. Always use the TP4056 protection circuit —
                never connect a LiPo directly without it. Do not puncture, crush, or short-circuit LiPo cells.
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
        { title: "Shallow deployment only", body: "The Lite version relies on the jar's rubber seal, not silicone. It is suitable for depths up to 0.5m. For deeper water, use the XL version with a fully sealed lid." },
        { title: "LiPo care", body: "Always recharge via the TP4056 module — never directly. Store LiPo batteries at partial charge (around 50%) if not using for extended periods. A swollen or damaged battery should be disposed of safely, never used." },
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
              ["Best for", "Deeper water, longer sessions"],
              ["Housing", "IKEA 365+ 600ml"],
              ["Housing cost", "£4 each"],
              ["Power", "LiPo battery (internal)"],
              ["Tethering", "USB-C to iPhone"],
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
            It produces 1080p footage, supports time-lapse and motion detection, and features a live view tether via USB-C to iPhone.
          </p>
        </div>
      </div>

      <div style={styles.divider} />

      {/* Parts */}
      <div style={styles.section}>
        <div style={styles.sectionLeft}><p style={styles.sectionLabel}>Parts list</p></div>
        <div style={styles.sectionRight}>
          <PartsTable parts={[
            { item: "Raspberry Pi Zero 2W", cost: "£15", note: "From The Pi Hut or Pimoroni. Includes Wi-Fi." },
            { item: "Raspberry Pi Camera Module 3", cost: "£25", note: "12MP, autofocus. Excellent low-light performance." },
            { item: "IKEA 365+ 600ml glass jar with lid", cost: "£4", note: "New or reused. eBay, Vinted, or charity shops." },
            { item: "USB power bank (10,000mAh+)", cost: "£12–18", note: "Provides 4–6 hours at surface. Store in dry bag." },
            { item: "USB-C cable (5m+)", cost: "£6–8", note: "For tethered live view to iPhone. Also carries power." },
            { item: "Two colours of rope or paracord (1m each)", cost: "£2–3", note: "Orientation indicator — one colour per side of lid." },
            { item: "Aquarium-safe silicone sealant", cost: "£5", note: "For sealing the USB-C cable entry. Aquarium-safe only." },
            { item: "Rubber grommet (matches cable diameter)", cost: "£1", note: "Seals cable entry through drilled hole." },
            { item: "MicroSD card (32GB+, Class 10)", cost: "£6", note: "For OS and footage. UHS-1 recommended." },
            { item: "Drill + 4mm and 8mm bits", cost: "—", note: "4mm for rope holes, 8mm for USB-C cable entry." },
          ]} />
        </div>
      </div>

      <div style={styles.divider} />

      {/* Raspberry Pi setup */}
      <div style={styles.section}>
        <div style={styles.sectionLeft}><p style={styles.sectionLabel}>Raspberry Pi setup</p></div>
        <div style={styles.sectionRight}>

          <Step num="01" title="Flash the operating system">
            <p style={styles.stepBody}>
              Download <strong style={{ color: ACCENT }}>Raspberry Pi Imager</strong> (free, raspberrypi.com/software) on your computer.
              Insert your microSD card. In Imager, choose:
            </p>
            <div style={styles.codeBlock}>
              Device: Raspberry Pi Zero 2W{"\n"}
              OS: Raspberry Pi OS Lite (64-bit){"\n"}
              Storage: your microSD card
            </div>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              Click the settings gear icon before writing. Enable SSH, set a username and password,
              and enter your phone's mobile hotspot name and password as the Wi-Fi credentials.
              This allows the Pi to connect to your phone automatically in the field.
              Write the card, then insert it into the Pi Zero 2W.
            </p>
          </Step>

          <Step num="02" title="Connect the camera module">
            <p style={styles.stepBody}>
              Connect the Camera Module 3 to the Pi Zero's CSI ribbon cable port.
              The cable connector is fragile — lift the latch gently, insert the ribbon cable (contacts facing away from the latch), and press the latch back down.
              Power the Pi via USB and SSH in from your computer:
            </p>
            <div style={styles.codeBlock}>ssh username@raspberrypi.local</div>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              Test the camera with:
            </p>
            <div style={styles.codeBlock}>libcamera-still -o test.jpg</div>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              If a photo is saved, the camera is working correctly.
            </p>
          </Step>

          <Step num="03" title="Configure live view streaming">
            <p style={styles.stepBody}>
              Install the streaming software:
            </p>
            <div style={styles.codeBlock}>
              sudo apt update{"\n"}
              sudo apt install -y ffmpeg{"\n"}
            </div>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              Create a startup streaming script:
            </p>
            <div style={styles.codeBlock}>
              nano ~/stream.sh
            </div>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              Paste the following:
            </p>
            <div style={styles.codeBlock}>
              {"#!/bin/bash\n"}
              {"libcamera-vid -t 0 --inline --listen -o tcp://0.0.0.0:8888"}
            </div>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              Make it executable and add to startup:
            </p>
            <div style={styles.codeBlock}>
              {"chmod +x ~/stream.sh\n"}
              {"crontab -e\n"}
              {"# Add this line:\n"}
              {"@reboot /home/username/stream.sh"}
            </div>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              On your iPhone, install <strong style={{ color: ACCENT }}>VLC for Mobile</strong> (free).
              Open VLC → Network → enter the stream URL:
            </p>
            <div style={styles.codeBlock}>tcp/h264://[Pi IP address]:8888</div>
            <p style={{ ...styles.stepBody, marginTop: "1rem" }}>
              You should see a live 1080p stream from the Pi camera. Find the Pi's IP address via SSH with <code>hostname -I</code>.
            </p>
          </Step>

          <Step num="04" title="Configure recording">
            <p style={styles.stepBody}>
              For standalone recording to the SD card (no phone needed), create a recording script:
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

          <Step num="05" title="Prepare the rope and cable holes">
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
                <text x="230" y="75" textAnchor="middle" fill={WARN} fontSize="9" fontFamily="Georgia">8mm hole</text>
                <text x="230" y="65" textAnchor="middle" fill={WARN} fontSize="8" fontFamily="Georgia" opacity="0.7">(USB-C cable)</text>
                <text x="85" y="145" textAnchor="middle" fill="#6af" fontSize="9" fontFamily="Georgia">Blue rope</text>
                <text x="375" y="145" textAnchor="middle" fill="#f96" fontSize="9" fontFamily="Georgia">Orange rope</text>
              </svg>
            </DiagramBox>
            <p style={styles.stepBody}>
              Drill two 4mm holes — one in each opposing lid flap — for the orientation ropes.
              Thread one colour of rope through each flap and tie a knot on the inside to secure.
              Then drill one 8mm hole in the centre of the main lid area for the USB-C cable.
              Fit a rubber grommet into this hole.
              <strong style={{ color: WARN }}> Collect all swarf on paper and dispose of in general waste immediately. Never let plastic particles near water.</strong>
            </p>
          </Step>

          <Step num="06" title="Mount the Pi and camera">
            <p style={styles.stepBody}>
              Place foam padding in the base of the jar to cushion and stabilise the Pi.
              Fix the Pi with the camera ribbon facing upward. Position the Camera Module 3 face-down against the glass base,
              secured with a small foam pad. The lens should be centred and as close to the glass as possible without touching.
              Route the ribbon cable neatly — avoid any sharp bends or kinks.
            </p>
          </Step>

          <Step num="07" title="Route the USB-C cable and seal">
            <p style={styles.stepBody}>
              Thread the USB-C cable through the rubber grommet in the lid.
              Apply a generous bead of aquarium-safe silicone around the grommet on both sides of the lid.
              Apply a continuous bead of silicone around the inner lid rim.
              Seal the jar and allow <strong style={{ color: ACCENT }}>minimum 24 hours cure time</strong> before any water contact.
              Do not rush this step — a failed seal means a lost Pi.
            </p>
          </Step>

          <Step num="08" title="Power and live view test">
            <DiagramBox>
              <svg viewBox="0 0 460 160" style={{ width: "100%", opacity: 0.85 }}>
                <rect x="10" y="50" width="100" height="60" rx="3" stroke={ACCENT} strokeWidth="1.5" fill="none" />
                <text x="60" y="40" textAnchor="middle" fill={ACCENT} fontSize="9" fontFamily="Georgia">Power bank</text>
                <text x="60" y="83" textAnchor="middle" fill={LIGHT} fontSize="8" fontFamily="Georgia" opacity="0.6">10,000mAh</text>
                <line x1="110" y1="80" x2="190" y2="80" stroke={ACCENT} strokeWidth="2" />
                <rect x="190" y="50" width="100" height="60" rx="3" stroke={ACCENT} strokeWidth="1.5" fill="none" />
                <text x="240" y="40" textAnchor="middle" fill={ACCENT} fontSize="9" fontFamily="Georgia">Pi in jar</text>
                <text x="240" y="75" textAnchor="middle" fill={LIGHT} fontSize="8" fontFamily="Georgia" opacity="0.6">Sealed</text>
                <line x1="290" y1="80" x2="350" y2="80" stroke={ACCENT} strokeWidth="2" />
                <rect x="350" y="50" width="100" height="60" rx="3" stroke={ACCENT} strokeWidth="1.5" fill="none" />
                <text x="400" y="40" textAnchor="middle" fill={ACCENT} fontSize="9" fontFamily="Georgia">iPhone</text>
                <text x="400" y="75" textAnchor="middle" fill={LIGHT} fontSize="8" fontFamily="Georgia" opacity="0.6">VLC · live view</text>
                <text x="230" y="145" textAnchor="middle" fill={LIGHT} fontSize="9" fontFamily="Georgia" opacity="0.5">Power bank → Pi (power) · Pi → iPhone (USB-C live view)</text>
              </svg>
            </DiagramBox>
            <p style={styles.stepBody}>
              Connect the power bank, wait for the Pi to boot (30–60 seconds), then enable your phone's mobile hotspot.
              The Pi will connect automatically. Open VLC on your iPhone, enter the stream URL, and verify live view is working.
              Then submerge the sealed jar in a bowl of water for 30 minutes — watch for bubbles which indicate a leak.
              Do not deploy in the field until this test passes.
            </p>
          </Step>

        </div>
      </div>

      <div style={styles.divider} />

      <Principles items={[
        { title: "Rope orientation", body: "As with the Lite version, the two-colour rope system tells you which way the camera is pointing. Always note or photograph which colour is on which side before deployment." },
        { title: "Heat management", body: "The Pi Zero 2W generates heat. In warm water or direct sun, limit deployments to under 2 hours. The sealed glass jar provides no active cooling." },
        { title: "Silicone cure time", body: "24 hours is a minimum. 48 hours is safer, especially in cold weather when cure times extend. A failed seal underwater can destroy the Pi instantly." },
        { title: "Microplastics", body: "The XL requires more drilling than the Lite — two rope holes and one cable hole. Collect all swarf on paper and bag it for general waste. Never allow particles near water." },
      ]} />
    </>
  );
}

// ── Shared components ──

function PartsTable({ parts }: { parts: { item: string; cost: string; note: string; link?: string }[] }) {
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
    display: "flex", alignItems: "flex-end", justifyContent: "space-between",
    padding: "10rem 4rem 4rem", gap: "4rem", flexWrap: "wrap" as const,
  },
  heroLeft: { flex: 1, minWidth: "280px" },
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
    fontSize: "1.1rem", lineHeight: 1.7, color: LIGHT, opacity: 0.75, maxWidth: "480px", margin: 0,
  },
  toggle: {
    display: "flex", gap: "1px", border: `1px solid rgba(220,255,199,0.15)`,
    borderRadius: "2px", overflow: "hidden",
  },
  toggleBtn: {
    padding: "1.25rem 2rem", background: "rgba(220,255,199,0.04)", border: "none", cursor: "pointer",
    display: "flex", flexDirection: "column" as const, alignItems: "flex-start", gap: "0.35rem",
  },
  toggleBtnActive: {
    padding: "1.25rem 2rem", background: ACCENT, border: "none", cursor: "pointer",
    display: "flex", flexDirection: "column" as const, alignItems: "flex-start", gap: "0.35rem",
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
    fontFamily: '"clother", sans-serif', fontWeight: 700, fontSize: "0.65rem",
    letterSpacing: "0.08em", textTransform: "uppercase" as const, color: LIGHT, opacity: 0.5,
  },
  toggleSubActive: {
    fontFamily: '"clother", sans-serif', fontWeight: 700, fontSize: "0.65rem",
    letterSpacing: "0.08em", textTransform: "uppercase" as const, color: DARK, opacity: 0.7,
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
