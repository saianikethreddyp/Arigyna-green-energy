import styles from "./InstallationWorkbench.module.css";

const stageLabels = [
  "Roof mapped",
  "Array designed",
  "Equipment confirmed",
  "System installed",
  "System ready",
] as const;

const panelPositions = [
  [0, 0], [49, 0], [98, 0], [147, 0],
  [0, 70], [49, 70], [98, 70], [147, 70],
] as const;

type InstallationWorkbenchProps = {
  step: number;
};

export default function InstallationWorkbench({ step }: InstallationWorkbenchProps) {
  return (
    <div className={styles.workbench} data-step={step}>
      <svg
        className={styles.canvas}
        viewBox="0 0 620 560"
        role="img"
        aria-labelledby="installation-visual-title installation-visual-description"
      >
        <title id="installation-visual-title">{stageLabels[step]}</title>
        <desc id="installation-visual-description">
          A rooftop solar system changes as the installation process advances.
        </desc>

        <defs>
          <pattern id="workbench-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="#0d2540" strokeOpacity=".075" />
          </pattern>
          <pattern id="shade-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#ff704d" strokeOpacity=".6" strokeWidth="3" />
          </pattern>
          <linearGradient id="wb-panel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#092b58" />
            <stop offset=".5" stopColor="#1769ff" />
            <stop offset="1" stopColor="#071b39" />
          </linearGradient>
          <linearGradient id="scan-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#2b7fff" stopOpacity="0" />
            <stop offset=".65" stopColor="#2b7fff" stopOpacity=".18" />
            <stop offset="1" stopColor="#2b7fff" stopOpacity=".55" />
          </linearGradient>
          <radialGradient id="commission-glow">
            <stop offset="0" stopColor="#ffd86a" stopOpacity=".95" />
            <stop offset=".45" stopColor="#ffbd3f" stopOpacity=".5" />
            <stop offset="1" stopColor="#ffbd3f" stopOpacity="0" />
          </radialGradient>
          <filter id="wb-shadow" x="-30%" y="-30%" width="170%" height="190%">
            <feDropShadow dx="0" dy="16" stdDeviation="13" floodColor="#08233d" floodOpacity=".18" />
          </filter>
          <filter id="wb-glow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id="wb-roof-clip">
            <polygon points="82,252 310,172 523,276 288,361" />
          </clipPath>
          <symbol id="wb-module" viewBox="0 0 46 66">
            <rect width="46" height="66" rx="1.5" fill="#d8dfe1" stroke="#60727b" strokeWidth="1.5" />
            <rect x="2.4" y="2.4" width="41.2" height="61.2" fill="url(#wb-panel)" />
            <path d="M9.2 3V63M16.1 3V63M23 3V63M29.9 3V63M36.8 3V63M3 13H43M3 23H43M3 33H43M3 43H43M3 53H43" fill="none" stroke="#a7d1ff" strokeOpacity=".58" strokeWidth=".6" />
            <path d="M15.4 3V63M30.6 3V63" stroke="#eef6ff" strokeOpacity=".45" strokeWidth=".7" />
          </symbol>
        </defs>

        <rect width="620" height="560" fill="#eef1ed" />
        <rect width="620" height="560" fill="url(#workbench-grid)" />
        <path className={styles.colorField} d="M0 0H620V104C458 139 272 122 0 209Z" fill="#1769ff" />
        <circle className={styles.stepOrb} cx="540" cy="82" r="92" fill="#ffcb52" />
        <text className={styles.stepNumber} x="26" y="70">0{step + 1}</text>

        <g className={styles.roofScene} filter="url(#wb-shadow)">
          <polygon points="82,252 310,172 523,276 288,361" fill="#f5f1e6" stroke="#0d2a22" strokeWidth="2.4" />
          <path d="M82 252L288 361V421L82 311Z" fill="#d9ded8" stroke="#0d2a22" strokeWidth="2.2" />
          <path d="M288 361L523 276V337L288 421Z" fill="#becac4" stroke="#0d2a22" strokeWidth="2.2" />
          <path d="M109 286L180 324V359L109 321Z" fill="#153b50" stroke="#0d2a22" strokeWidth="2" />
          <path d="M116 295L173 326V350L116 320Z" fill="#82b5c9" />
          <path d="M144 310V335" stroke="#edf6f4" strokeOpacity=".85" />
          <path d="M109 286L180 324" stroke="#f4f5ed" strokeWidth="3" />
          <path d="M351 349L410 328V374L351 395Z" fill="#f3efe5" stroke="#0d2a22" strokeWidth="2" />
          <path d="M357 355L404 338V369L357 386Z" fill="#876047" />
          <circle cx="395" cy="357" r="2.7" fill="#ffd164" />
          <path d="M428 320L495 296V335L428 359Z" fill="#153b50" stroke="#0d2a22" strokeWidth="2" />
          <path d="M436 326L487 308V330L436 348Z" fill="#80afc2" />
          <path d="M461 317V339" stroke="#edf6f4" strokeOpacity=".85" />
          <path d="M428 320L495 296" stroke="#f4f5ed" strokeWidth="3" />
        </g>

        <g className={styles.assessment} clipPath="url(#wb-roof-clip)" aria-hidden="true">
          <polygon points="82,252 154,227 361,336 288,361" fill="url(#shade-hatch)" opacity=".62" />
          <path d="M113 262L319 190L483 270L272 346Z" fill="none" stroke="#1769ff" strokeWidth="3" strokeDasharray="9 7" />
          <g className={styles.scanBeam}>
            <rect x="32" y="125" width="110" height="330" fill="url(#scan-gradient)" transform="rotate(-19 32 125)" />
            <line x1="136" y1="125" x2="136" y2="455" stroke="#1769ff" strokeWidth="4" transform="rotate(-19 136 125)" />
          </g>
        </g>

        <g className={styles.assessmentMarkers} aria-hidden="true">
          <circle cx="151" cy="246" r="10" fill="#ff704d" />
          <path d="M151 233V259M138 246H164" stroke="#fff" strokeWidth="2" />
          <path d="M470 259L495 247" stroke="#1769ff" strokeWidth="2" />
          <rect x="493" y="229" width="92" height="34" rx="5" fill="#fff" stroke="#1769ff" />
          <text x="504" y="243">USABLE AREA</text>
          <text x="504" y="255" className={styles.blueLabel}>MAPPED</text>
        </g>

        <g className={styles.design} aria-hidden="true">
          <g transform="matrix(1 -0.24 .66 .35 176 243)" opacity=".32">
            {panelPositions.map(([x, y]) => (
              <rect key={`ghost-${x}-${y}`} x={x} y={y} width="46" height="66" fill="none" stroke="#1769ff" strokeWidth="2" strokeDasharray="5 4" />
            ))}
          </g>
          <g className={styles.selectedLayout} transform="matrix(1 -0.24 .66 .35 176 243)">
            {panelPositions.map(([x, y], index) => (
              <g key={`selected-${x}-${y}`} className={styles.designPanel} style={{ "--delay": `${index * 55}ms` } as React.CSSProperties}>
                <use href="#wb-module" x={x} y={y} width="46" height="66" />
              </g>
            ))}
          </g>
          <path className={styles.orientationArc} d="M154 213C225 158 346 146 438 184" fill="none" stroke="#7259ff" strokeWidth="3" strokeDasharray="7 7" />
          <path d="M435 175L452 187L432 192Z" fill="#7259ff" />
        </g>

        <g className={styles.confirmation} aria-hidden="true">
          <rect x="46" y="137" width="214" height="266" rx="12" fill="#fff" stroke="#0d2a22" strokeWidth="2" />
          <rect x="46" y="137" width="214" height="49" rx="12" fill="#7259ff" />
          <path d="M46 174H260" stroke="#0d2a22" strokeOpacity=".2" />
          <text x="66" y="166" className={styles.whiteLabel}>SYSTEM CONFIGURATION</text>
          <path d="M68 220H176M68 246H225M68 272H202M68 330H225M68 352H190" stroke="#aeb8b3" strokeWidth="7" strokeLinecap="round" />
          <circle cx="218" cy="216" r="13" fill="#c8f36a" />
          <path d="M211 216L216 221L225 211" fill="none" stroke="#0d2a22" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="72" y="292" width="72" height="27" rx="4" fill="#e7edff" />
          <text x="83" y="309" className={styles.violetLabel}>CONFIRMED</text>

          <g className={styles.componentStack}>
            <rect x="341" y="175" width="198" height="68" rx="10" fill="#ffcf55" stroke="#0d2a22" strokeWidth="2" />
            <rect x="341" y="254" width="198" height="68" rx="10" fill="#bde7d3" stroke="#0d2a22" strokeWidth="2" />
            <rect x="341" y="333" width="198" height="68" rx="10" fill="#ff9c78" stroke="#0d2a22" strokeWidth="2" />
            <path d="M369 195H420V223H369Z" fill="#0b315e" />
            <path d="M376 195V223M383 195V223M390 195V223M397 195V223M404 195V223M411 195V223" stroke="#8ec4ff" />
            <rect x="370" y="270" width="48" height="38" rx="5" fill="#f8f7f0" stroke="#0d2a22" />
            <circle cx="407" cy="299" r="3" fill="#1769ff" />
            <path d="M370 365H418M370 374H406M370 383H428" stroke="#0d2a22" strokeWidth="4" strokeLinecap="round" />
            <text x="445" y="205">MODULES</text><text x="445" y="221" className={styles.cardValue}>SELECTED</text>
            <text x="445" y="284">INVERTER</text><text x="445" y="300" className={styles.cardValue}>MATCHED</text>
            <text x="445" y="363">SCOPE</text><text x="445" y="379" className={styles.cardValue}>APPROVED</text>
          </g>
        </g>

        <g className={styles.installation} aria-hidden="true">
          <g className={styles.mounts}>
            <path d="M151 248L392 190M188 282L429 224M225 316L466 258" stroke="#ff704d" strokeWidth="6" strokeLinecap="round" />
          </g>
          <g transform="matrix(1 -0.24 .66 .35 176 243)">
            {panelPositions.map(([x, y], index) => (
              <g key={`installed-${x}-${y}`} className={styles.installPanel} style={{ "--delay": `${index * 65}ms` } as React.CSSProperties}>
                <use href="#wb-module" x={x} y={y} width="46" height="66" />
              </g>
            ))}
          </g>
          <g className={styles.installedInverter}>
            <path d="M470 347L521 328V394L470 413Z" fill="#fff" stroke="#0d2a22" strokeWidth="2" />
            <path d="M481 357L511 346V373L481 384Z" fill="#0d2a22" />
            <circle cx="508" cy="387" r="3.5" fill="#1769ff" />
          </g>
          <path className={styles.installCable} d="M406 274C457 280 474 304 491 347" fill="none" stroke="#ff704d" strokeWidth="4" strokeDasharray="8 8" />
        </g>

        <g className={styles.commission} aria-hidden="true">
          <circle cx="492" cy="164" r="106" fill="url(#commission-glow)" />
          <circle cx="492" cy="164" r="38" fill="#ffc64d" />
          <path d="M460 192L407 283L238 272L456 137Z" fill="#ffc64d" fillOpacity=".2" />
          <g transform="matrix(1 -0.24 .66 .35 176 243)">
            {panelPositions.map(([x, y]) => <use key={`live-${x}-${y}`} href="#wb-module" x={x} y={y} width="46" height="66" />)}
          </g>
          <g className={styles.commissionInverter}>
            <path d="M470 347L521 328V394L470 413Z" fill="#fff" stroke="#0d2a22" strokeWidth="2" />
            <path d="M481 357L511 346V373L481 384Z" fill="#0d2a22" />
            <circle cx="508" cy="387" r="3.5" fill="#c8f36a" />
          </g>
          <path className={styles.powerPath} d="M406 274C451 280 471 301 491 347" fill="none" stroke="#1769ff" strokeWidth="5" strokeLinecap="round" strokeDasharray="9 12" />
          <circle r="6" fill="#1769ff" filter="url(#wb-glow)">
            <animateMotion dur="2.2s" repeatCount="indefinite" path="M406 274C451 280 471 301 491 347" />
          </circle>
          <rect x="58" y="425" width="238" height="72" rx="10" fill="#0d2540" />
          <path className={styles.waveform} d="M77 465H104L116 446L131 481L145 455L158 465H184L196 450L211 477L225 458L239 465H277" fill="none" stroke="#c8f36a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <text x="76" y="446" className={styles.whiteLabel}>COMMISSIONING TEST</text>
        </g>

        <g className={styles.axis} aria-hidden="true">
          <text x="28" y="529">MAPPED</text>
          <path d="M91 525H466" stroke="#0d2a22" strokeOpacity=".2" />
          <text x="592" y="529" textAnchor="end">GENERATING</text>
        </g>

        <g className={styles.stageLabel} aria-hidden="true">
          <text x="540" y="67" textAnchor="middle">BUILD STATE</text>
          <text className={styles.stageValue} x="540" y="94" textAnchor="middle">{stageLabels[step]}</text>
        </g>
      </svg>
    </div>
  );
}
