import styles from "./SolarRoofEngine.module.css";

const panels = [
  [0, 0], [46, 0], [92, 0], [138, 0], [184, 0],
  [0, 64], [46, 64], [92, 64], [138, 64], [184, 64],
] as const;

export default function SolarRoofEngine() {
  return (
    <div className={styles.engine}>
      <svg
        className={styles.canvas}
        viewBox="0 0 760 610"
        role="img"
        aria-labelledby="roof-engine-title roof-engine-description"
      >
        <title id="roof-engine-title">A rooftop solar system being designed and activated</title>
        <desc id="roof-engine-description">
          An architectural roof is scanned, fitted with solar panels and connected
          to an inverter and the home.
        </desc>

        <defs>
          <pattern id="engine-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0H0V24" fill="none" stroke="#10251d" strokeOpacity=".065" />
          </pattern>
          <linearGradient id="panel-face" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#12345f" />
            <stop offset=".52" stopColor="#1769ff" />
            <stop offset="1" stopColor="#092448" />
          </linearGradient>
          <linearGradient id="sun-beam" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e6b94e" stopOpacity=".45" />
            <stop offset="1" stopColor="#e6b94e" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="sun-glow">
            <stop offset="0" stopColor="#f9e7a6" />
            <stop offset=".55" stopColor="#e6b94e" />
            <stop offset="1" stopColor="#e6b94e" stopOpacity="0" />
          </radialGradient>
          <filter id="engine-shadow" x="-30%" y="-30%" width="170%" height="190%">
            <feDropShadow dx="0" dy="18" stdDeviation="14" floodColor="#10251d" floodOpacity=".18" />
          </filter>
          <filter id="energy-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id="roof-clip">
            <polygon points="151,266 421,172 610,270 335,369" />
          </clipPath>
          <symbol id="solar-module" viewBox="0 0 44 62">
            <rect width="44" height="62" rx="1" fill="#c7d0d2" stroke="#718084" strokeWidth="1.4" />
            <rect x="2.2" y="2.2" width="39.6" height="57.6" fill="url(#panel-face)" />
            <path d="M8.8 2.5V59.5M15.4 2.5V59.5M22 2.5V59.5M28.6 2.5V59.5M35.2 2.5V59.5" fill="none" stroke="#a8cdf4" strokeOpacity=".58" strokeWidth=".55" />
            <path d="M2.5 12H41.5M2.5 21.5H41.5M2.5 31H41.5M2.5 40.5H41.5M2.5 50H41.5" fill="none" stroke="#88b9ed" strokeOpacity=".5" strokeWidth=".5" />
            <path d="M14.8 2.5V59.5M29.2 2.5V59.5" stroke="#e8f2ff" strokeOpacity=".5" strokeWidth=".65" />
            <path d="M3 3H41" stroke="#fff" strokeOpacity=".6" strokeWidth=".7" />
          </symbol>
        </defs>

        <rect width="760" height="610" fill="url(#engine-grid)" />

        <g className={styles.headerLabels} aria-hidden="true">
          <text x="28" y="34">RESIDENTIAL ROOFTOP SOLAR</text>
          <text x="732" y="34" textAnchor="end">18.5204° N · 73.8567° E</text>
        </g>

        <g className={styles.sunField} aria-hidden="true">
          <circle cx="612" cy="121" r="79" fill="url(#sun-glow)" />
          <circle cx="612" cy="121" r="34" fill="#e6b94e" />
          <path d="M580 150L472 316L278 286L565 120Z" fill="url(#sun-beam)" />
          <circle cx="612" cy="121" r="53" fill="none" stroke="#10251d" strokeOpacity=".24" strokeDasharray="2 9" />
          <text x="612" y="190" textAnchor="middle" className={styles.sunLabel}>SOLAR ORIENTATION</text>
          <text x="612" y="204" textAnchor="middle" className={styles.sunLabelDetail}>DAYLIGHT PATH</text>
        </g>

        <g filter="url(#engine-shadow)">
          <path
            className={styles.structureDraw}
            d="M151 266L421 172L610 270L335 369L151 266Z"
            fill="#e8e8df"
            stroke="#10251d"
            strokeWidth="2"
          />
          <path d="M151 266L335 369V486L151 382Z" fill="#deded4" stroke="#10251d" strokeWidth="2" />
          <path d="M335 369L610 270V388L335 486Z" fill="#c6cec7" stroke="#10251d" strokeWidth="2" />

          <path d="M151 266L335 369L335 383L151 280Z" fill="#f7f4e9" stroke="#10251d" strokeWidth="1.5" />
          <path d="M335 369L610 270V284L335 383Z" fill="#e7e5da" stroke="#10251d" strokeWidth="1.5" />

          <path d="M176 313L245 352V409L176 370Z" fill="#20445a" stroke="#10251d" strokeWidth="1.5" />
          <path d="M182 319L239 351V396L182 364Z" fill="#7da9be" />
          <path d="M210 334V380" stroke="#eef2eb" strokeOpacity=".75" />
          <path d="M174 311L247 352" stroke="#fff" strokeOpacity=".65" strokeWidth="3" />

          <path d="M270 365L318 393V472L270 444Z" fill="#77513a" stroke="#10251d" strokeWidth="1.7" />
          <circle cx="306" cy="415" r="2.5" fill="#e6b94e" />
          <path d="M261 359L326 396L326 408L261 371Z" fill="#eee8d9" stroke="#10251d" strokeWidth="1.5" />

          <path d="M369 376L457 344V407L369 439Z" fill="#15354b" stroke="#10251d" strokeWidth="1.5" />
          <path d="M377 379L449 353V396L377 422Z" fill="#8bb4c6" />
          <path d="M413 366V409" stroke="#edf4f0" strokeOpacity=".8" />
          <path d="M364 370L461 335V348L364 383Z" fill="#f5f0e4" stroke="#10251d" strokeWidth="1.5" />
          <path d="M372 439L456 409V422L372 452Z" fill="#a87855" stroke="#10251d" strokeWidth="1.2" />
          <path d="M381 436V425M446 413V402" stroke="#10251d" strokeWidth="2" />

          <path d="M486 337L560 310V365L486 392Z" fill="#19394e" stroke="#10251d" strokeWidth="1.5" />
          <path d="M494 340L552 319V354L494 375Z" fill="#94b8c7" />
          <path d="M523 330V365" stroke="#f2f5ef" strokeOpacity=".85" />

          <path d="M346 475L604 383V399L346 493Z" fill="#aa7650" stroke="#10251d" strokeWidth="1.4" />
        </g>

        <g clipPath="url(#roof-clip)" aria-hidden="true">
          <path d="M154 259L429 165L616 263" fill="none" stroke="#10251d" strokeOpacity=".12" strokeWidth="22" />
          <g className={styles.scanField}>
            <rect x="116" y="125" width="90" height="330" fill="#1769ff" fillOpacity=".08" transform="rotate(-19 116 125)" />
            <line x1="191" y1="125" x2="191" y2="475" stroke="#1769ff" strokeWidth="3" transform="rotate(-19 191 125)" />
          </g>
        </g>

        <g className={styles.panelArray} transform="matrix(1 -0.24 0.67 0.35 212 242)" aria-hidden="true">
          {panels.map(([x, y], index) => (
            <g
              key={`${x}-${y}`}
              className={styles.panel}
              style={{ "--panel-delay": `${1.65 + index * 0.075}s` } as React.CSSProperties}
            >
              <use href="#solar-module" x={x} y={y} width="44" height="62" />
            </g>
          ))}
          <path className={styles.panelGlint} d="M18 8L206 8" stroke="#fff" strokeOpacity=".65" strokeWidth="4" />
        </g>

        <g className={styles.inverter} aria-hidden="true">
          <path d="M530 356L580 338V404L530 422Z" fill="#f7f6ef" stroke="#10251d" strokeWidth="2" />
          <path d="M540 367L569 357V382L540 392Z" fill="#10251d" />
          <circle cx="560" cy="397" r="3.8" fill="#1769ff" />
        </g>

        <g className={styles.energySystem} aria-hidden="true">
          <path d="M490 245L502 241L509 248L497 252Z" fill="#10251d" />
          <path className={styles.cableBase} d="M501 247C522 256 526 280 532 308C536 328 543 345 550 356" />
          <path className={styles.energyPath} d="M501 247C522 256 526 280 532 308C536 328 543 345 550 356" />
          <circle r="5" fill="#1769ff" filter="url(#energy-glow)">
            <animateMotion
              dur="4.8s"
              begin="4.6s"
              repeatCount="indefinite"
              path="M501 247C522 256 526 280 532 308C536 328 543 345 550 356"
            />
          </circle>
        </g>

        <g className={styles.landscape} aria-hidden="true">
          <ellipse cx="472" cy="479" rx="210" ry="26" fill="#10251d" fillOpacity=".09" />
          <path d="M137 446C145 418 166 419 171 449C178 423 198 426 202 458Z" fill="#456759" />
          <path d="M552 416C560 389 579 390 584 419C591 396 610 399 614 430Z" fill="#567666" />
          <path d="M568 420V455M588 423V445" stroke="#765840" strokeWidth="4" />
        </g>

        <g className={styles.compass} aria-hidden="true">
          <circle cx="85" cy="490" r="30" fill="#f6f4ec" fillOpacity=".76" stroke="#10251d" strokeOpacity=".28" />
          <circle cx="85" cy="490" r="21" fill="none" stroke="#10251d" strokeOpacity=".13" strokeDasharray="2 5" />
          <path d="M85 456V524M51 490H119" stroke="#10251d" strokeOpacity=".2" />
          <path d="M85 463L92 491L85 485L78 491Z" fill="#1769ff" />
          <path d="M85 517L80 492L85 497L90 492Z" fill="#10251d" fillOpacity=".45" />
          <text x="85" y="449" textAnchor="middle">N</text>
          <text x="85" y="542" textAnchor="middle">ROOF ORIENTATION</text>
        </g>

      </svg>

      <div className={styles.caption}>
        <div>
          <span>Site-specific solar design</span>
          <strong>Built around your roof.</strong>
        </div>
        <p>Final placement and capacity follow your roof and site assessment.</p>
        <small>Andhra Pradesh · Telangana</small>
      </div>
    </div>
  );
}
