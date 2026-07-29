import type { CSSProperties } from "react";
import styles from "./WhySolarScene.module.css";

const frontPanels = [0.7, 2, 3.3, 4.6, 5.9] as const;
const wingPanels = [
  [1.35, 2.45],
  [2.65, 2.45],
  [3.95, 2.45],
  [5.25, 2.45],
] as const;

function range(value: number, start: number, end: number) {
  return Math.max(0, Math.min(1, (value - start) / (end - start)));
}

function smooth(value: number) {
  return value * value * (3 - 2 * value);
}

function Window({
  x,
  width,
  height = 2.05,
}: {
  x: number;
  width: number;
  height?: number;
}) {
  const mullionCount = Math.max(1, Math.floor(width / 1.1));

  return (
    <g>
      <rect
        x={x - 0.1}
        y=".55"
        width={width + 0.2}
        height={height + 0.2}
        fill="#35413e"
        opacity=".42"
      />
      <rect
        x={x}
        y=".68"
        width={width}
        height={height}
        fill="url(#why-glass)"
        stroke="#1d3439"
        strokeWidth=".1"
      />
      <path
        d={`M${x + 0.06} ${0.82 + height * 0.22}L${x + width - 0.06} ${0.7 + height * 0.1}V${0.96 + height * 0.28}L${x + 0.06} ${1.18 + height * 0.32}Z`}
        fill="#dff4ff"
        opacity=".18"
      />
      <path
        d={`M${x + 0.12} ${0.82 + height}L${x + width * 0.55} .72H${x + width * 0.75}L${x + width * 0.28} ${0.82 + height}Z`}
        fill="#fff"
        opacity=".17"
      />
      <path
        d={`M${x + width * 0.6} ${0.74 + height}L${x + width * 0.86} .74H${x + width - 0.08}L${x + width * 0.74} ${0.74 + height}Z`}
        fill="#f5d88d"
        opacity=".11"
      />
      {Array.from({ length: mullionCount - 1 }, (_, index) => (
        <rect
          key={index}
          x={x + (width / mullionCount) * (index + 1)}
          y=".68"
          width=".055"
          height={height}
          fill="#203a43"
        />
      ))}
      <rect
        x={x - 0.08}
        y=".5"
        width={width + 0.16}
        height=".1"
        fill="#f0ece1"
      />
      <rect
        x={x + 0.06}
        y=".74"
        width={width - 0.12}
        height={height - 0.12}
        fill="none"
        stroke="#fff"
        strokeOpacity=".26"
        strokeWidth=".035"
      />
      <path
        d={`M${x - 0.08} .5H${x + width + 0.08}`}
        stroke="#10251d"
        strokeOpacity=".28"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </g>
  );
}

export default function WhySolarScene({ progress }: { progress: number }) {
  const reveal = smooth(range(progress, 0.05, 0.36));
  const roofFocus = smooth(range(progress, 0.34, 0.64));
  const power = smooth(range(progress, 0.6, 0.86));
  const finish = smooth(range(progress, 0.8, 1));

  const sunScale = 2.8 - reveal * 1.8;
  const sunX = 320 + reveal * 470;
  const sunY = 420 - reveal * 290;
  const mobilePan = -30 - reveal * 60;

  return (
    <svg
      className={styles.canvas}
      viewBox="0 0 1100 760"
      style={{ "--mobile-pan": `${mobilePan}px` } as CSSProperties}
      role="img"
      aria-labelledby="why-solar-scene-title why-solar-scene-description"
    >
      <title id="why-solar-scene-title">
        A courtyard home begins generating rooftop solar power
      </title>
      <desc id="why-solar-scene-description">
        The sun rises to reveal a contemporary courtyard home. Solar modules
        settle onto engineered mounting rails and a restrained energy line
        travels from the roof array to the home.
      </desc>

      <defs>
        <linearGradient id="why-sky-dawn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff8e4" />
          <stop offset=".56" stopColor="#f3ead5" />
          <stop offset="1" stopColor="#dbe6e8" />
        </linearGradient>
        <linearGradient id="why-sky-day" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9eaf0" />
          <stop offset=".62" stopColor="#edf0ea" />
          <stop offset="1" stopColor="#e5ddc9" />
        </linearGradient>
        <radialGradient id="why-sun-glow">
          <stop offset="0" stopColor="#fff9d7" stopOpacity=".96" />
          <stop offset=".35" stopColor="#f1d376" stopOpacity=".72" />
          <stop offset=".72" stopColor="#e4b447" stopOpacity=".22" />
          <stop offset="1" stopColor="#e4b447" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="why-sun-disc" cx=".42" cy=".38">
          <stop offset="0" stopColor="#fff8cb" />
          <stop offset=".38" stopColor="#f0cf6b" />
          <stop offset="1" stopColor="#dda53c" />
        </radialGradient>
        <linearGradient id="why-sun-beam" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4d373" stopOpacity=".44" />
          <stop offset=".52" stopColor="#ebc35f" stopOpacity=".18" />
          <stop offset="1" stopColor="#e6b94e" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="why-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ddd9c8" />
          <stop offset="1" stopColor="#b8c2ae" />
        </linearGradient>
        <linearGradient id="why-wall-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d8d1c2" />
          <stop offset=".46" stopColor="#e8e1d2" />
          <stop offset=".72" stopColor="#eee4cf" />
          <stop offset="1" stopColor="#b7ad9d" />
        </linearGradient>
        <linearGradient id="why-wall-east" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#aab7af" />
          <stop offset=".56" stopColor="#c3cbc2" />
          <stop offset="1" stopColor="#8e9c94" />
        </linearGradient>
        <linearGradient id="why-roof" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f0ebde" />
          <stop offset=".52" stopColor="#d8d5ca" />
          <stop offset="1" stopColor="#b9beb8" />
        </linearGradient>
        <linearGradient id="why-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#244354" />
          <stop offset=".35" stopColor="#4f7890" />
          <stop offset=".66" stopColor="#86afc2" />
          <stop offset=".86" stopColor="#b8d3de" />
          <stop offset="1" stopColor="#e2e7df" />
        </linearGradient>
        <linearGradient id="why-canopy" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fffdf3" />
          <stop offset=".65" stopColor="#dedbd1" />
          <stop offset="1" stopColor="#bfc5bf" />
        </linearGradient>
        <linearGradient id="why-panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0d2850" />
          <stop offset=".48" stopColor="#1769ff" />
          <stop offset="1" stopColor="#07192f" />
        </linearGradient>
        <linearGradient id="why-panel-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#eef2f3" />
          <stop offset="1" stopColor="#727f83" />
        </linearGradient>
        <filter id="why-house-shadow" x="-25%" y="-25%" width="165%" height="190%">
          <feDropShadow
            dx="-10"
            dy="25"
            stdDeviation="16"
            floodColor="#10251d"
            floodOpacity=".27"
          />
        </filter>
        <filter id="why-energy-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="why-beam-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <filter id="why-panel-shadow" x="-35%" y="-35%" width="180%" height="210%">
          <feDropShadow
            dx="-3"
            dy="7"
            stdDeviation="3.5"
            floodColor="#07151b"
            floodOpacity=".38"
          />
        </filter>
        <symbol id="why-module" viewBox="0 0 1.08 1.72">
          <rect
            width="1.08"
            height="1.72"
            rx=".025"
            fill="url(#why-panel-frame)"
            stroke="#607076"
            strokeWidth=".025"
          />
          <rect x=".05" y=".05" width=".98" height="1.62" fill="url(#why-panel)" />
          <path
            d="M.213 .05V1.67M.376 .05V1.67M.54 .05V1.67M.703 .05V1.67M.866 .05V1.67M.05 .32H1.03M.05 .59H1.03M.05 .86H1.03M.05 1.13H1.03M.05 1.4H1.03"
            fill="none"
            stroke="#a9cff5"
            strokeOpacity=".55"
            strokeWidth=".018"
          />
          <path d="M.13 1.61L.65 .06H.86L.34 1.61Z" fill="#fff" opacity=".11" />
          <path d="M.06 .06H1.02" stroke="#fff" strokeOpacity=".64" strokeWidth=".024" />
          <rect x="-.04" y=".76" width=".04" height=".16" fill="#515e63" />
          <rect x="1.08" y=".76" width=".04" height=".16" fill="#515e63" />
        </symbol>
      </defs>

      <rect width="1100" height="760" fill="url(#why-sky-dawn)" />
      <rect width="1100" height="760" fill="url(#why-sky-day)" opacity={reveal} />

      <g opacity={reveal} aria-hidden="true">
        <path
          d="M0 342C136 315 249 339 357 307C482 270 601 311 713 273C830 234 958 268 1100 222V463H0Z"
          fill="#91a5a1"
          opacity=".2"
        />
        <path
          d="M0 397C132 365 236 391 359 353C489 313 611 359 748 321C880 285 978 309 1100 279V492H0Z"
          fill="#617f76"
          opacity=".18"
        />
        <path
          d="M0 458C142 423 288 450 425 414C573 375 711 424 848 388C952 360 1027 367 1100 350V515H0Z"
          fill="#536f63"
          opacity=".13"
        />
      </g>

      <g transform={`translate(${sunX} ${sunY}) scale(${sunScale})`}>
        <circle r="98" fill="url(#why-sun-glow)" />
        <circle r="48" fill="url(#why-sun-disc)" />
        <circle
          r="66"
          fill="none"
          stroke="#10251d"
          strokeOpacity=".14"
          strokeDasharray="2 9"
        />
      </g>

      <path
        d={`M${sunX - 30} ${sunY + 28}L584 503L246 456L${sunX - 82} ${sunY + 1}Z`}
        fill="url(#why-sun-beam)"
        opacity={reveal * (0.16 + roofFocus * 0.5)}
        filter="url(#why-beam-soft)"
        aria-hidden="true"
      />

      <g
        opacity={reveal}
        transform={`translate(0 ${42 - reveal * 42})`}
        className={styles.scene}
      >
        <path
          d="M0 501C155 468 302 490 445 462C608 430 760 462 905 438C988 424 1050 418 1100 424V760H0Z"
          fill="url(#why-ground)"
        />
        <ellipse cx="505" cy="635" rx="310" ry="40" fill="#10251d" opacity=".12" />
        <ellipse cx="500" cy="628" rx="255" ry="25" fill="#10251d" opacity=".09" />

        <g filter="url(#why-house-shadow)">
          {/* South facade. All local units share one architectural projection. */}
          <g transform="matrix(32 13 0 -27 220 560)">
            <rect width="8" height="3.4" fill="url(#why-wall-front)" />
            <rect y="3.15" width="8" height=".25" fill="#eee9de" />
            <rect y="3.37" width="8" height=".1" fill="#8f918a" />
            <rect width="8" height=".22" fill="#aaa194" />
            <Window x={0.42} width={2.1} height={1.9} />
            <rect x="2.84" y=".38" width="1.58" height="2.72" fill="#2a3532" opacity=".4" />
            <rect x="2.78" y="2.92" width="1.7" height=".24" fill="#172b28" opacity=".28" />
            <rect x="2.99" y=".52" width="1.28" height="2.45" fill="#68482e" />
            <circle cx="4.08" cy="1.65" r=".07" fill="#e7c57b" />
            <circle cx="4.52" cy="2.6" r=".08" fill="#e8c76f" />
            <circle cx="4.52" cy="2.6" r=".24" fill="#e8c76f" opacity=".12" />
            <Window x={4.72} width={2.82} height={1.9} />
            <rect x=".3" y="2.7" width="2.34" height=".15" fill="#10251d" opacity=".18" />
            <rect x="4.6" y="2.7" width="3.06" height=".15" fill="#10251d" opacity=".18" />
          </g>

          {/* Projected entrance canopy: top slab, fascia and shaded soffit. */}
          <g>
            <g transform="matrix(32 13 38 -13 220 485.75)">
              <rect
                x="2.65"
                y="-.85"
                width="2.05"
                height="1.05"
                fill="url(#why-canopy)"
                stroke="#10251d"
                strokeOpacity=".2"
                strokeWidth=".045"
              />
              <path
                d="M2.72 -.77H4.62"
                stroke="#fff"
                strokeOpacity=".75"
                strokeWidth=".055"
              />
            </g>
            <path
              d="M272.5 531.3L338.1 557.9V565L272.5 538.4Z"
              fill="#b8b5aa"
              stroke="#10251d"
              strokeOpacity=".18"
              strokeWidth="1.2"
            />
            <path
              d="M272.5 538.4L338.1 565"
              stroke="#10251d"
              strokeOpacity=".22"
              strokeWidth="2"
            />
          </g>

          {/* Compact shaded side facade. */}
          <g transform="matrix(38 -13 0 -27 476 664)">
            <rect width="5.5" height="3.4" fill="url(#why-wall-east)" />
            <rect y="3.15" width="5.5" height=".25" fill="#dbe0da" />
            <rect y="3.37" width="5.5" height=".1" fill="#858e88" />
            <rect width="5.5" height=".22" fill="#7f8b84" />
            <Window x={0.4} width={2.15} height={1.9} />
            <Window x={2.88} width={2.12} height={1.9} />
            <path
              d="M.28 2.98H5.18"
              stroke="#f5f1e7"
              strokeWidth=".13"
            />
            <path
              d="M.44 .2V3.1M.7 .2V3.1M.96 .2V3.1M1.22 .2V3.1"
              stroke="#79583a"
              strokeWidth=".09"
              opacity=".82"
            />
          </g>

          {/* One clean roof plane keeps the home compact and legible. */}
          <g transform="matrix(32 13 38 -13 220 468.2)">
            <path
              d="M0 0H8V5.5H0Z"
              fill="url(#why-roof)"
              stroke="#10251d"
              strokeOpacity=".18"
              strokeWidth=".04"
            />
            <path
              d="M.2 .2H7.8V5.3H.2Z"
              fill="none"
              stroke="#fffdf5"
              strokeOpacity=".76"
              strokeWidth=".12"
            />
            <path
              d="M0 0H8V5.5H0Z"
              fill="none"
              stroke="#737a75"
              strokeOpacity=".5"
              strokeWidth=".07"
            />
            <path
              d="M.32 .28V5.2M7.68 .28V5.2M.32 .28H7.68"
              stroke="#10251d"
              strokeOpacity=".08"
              strokeWidth=".08"
            />
            <circle cx=".55" cy="5.05" r=".12" fill="#8b918b" />
            <circle cx=".55" cy="5.05" r=".2" fill="none" stroke="#10251d" strokeOpacity=".24" strokeWidth=".04" />
          </g>

          {/* Parapet inner faces and coping give the slab believable thickness. */}
          <g transform="matrix(32 13 0 -27 220 560)">
            <rect y="3.4" width="8" height=".42" fill="#d3ccbd" />
            <rect y="3.79" width="8" height=".1" fill="#f4f0e7" />
          </g>
          <g transform="matrix(38 -13 0 -27 476 664)">
            <rect y="3.4" width="5.5" height=".42" fill="#bdc6bf" />
            <rect y="3.79" width="5.5" height=".1" fill="#e7ebe5" />
          </g>

          {/* Solar structure: rails first, then individually staged modules. */}
          <g
            opacity={roofFocus}
            transform={`translate(0 ${16 - roofFocus * 16})`}
            filter="url(#why-panel-shadow)"
          >
            <g transform="matrix(32 13 38 -13 220 463)">
              <path
                d="M.55 .42H7.2M.55 2.05H7.2M1.2 2.42H6.55M1.2 4.12H6.55"
                stroke="#3e4e53"
                strokeWidth=".12"
                strokeLinecap="round"
              />
              {frontPanels.map((x, index) => (
                <g
                  key={x}
                  opacity={smooth(range(roofFocus, index * 0.045, 0.34 + index * 0.045))}
                >
                  <use href="#why-module" x={x} y=".34" width="1.08" height="1.72" />
                </g>
              ))}
              {wingPanels.map(([x, y], index) => (
                <g
                  key={`${x}-${y}`}
                  opacity={smooth(range(roofFocus, 0.14 + index * 0.05, 0.46 + index * 0.05))}
                >
                  <use href="#why-module" x={x} y={y} width="1.08" height="1.72" />
                </g>
              ))}
            </g>
            <path
              d="M305 464L451 523M350 448L496 507"
              fill="none"
              stroke="#fff4bd"
              strokeWidth="5"
              strokeLinecap="round"
              opacity={roofFocus * 0.34}
            />
          </g>

          {/* Inverter, conduit and measured electricity path. */}
          <g opacity={power}>
            {/* DC junction sits beneath the last module, then follows the rail. */}
            <path
              d="M570 484L582 489L590 486L578 481Z"
              fill="#182b2f"
              stroke="#d9e1df"
              strokeWidth="1.4"
            />
            <circle cx="583" cy="486" r="2.8" fill="#1769ff" />
            <path
              d="M583 486L606 481L625 475L639 470C652 481 660 497 660 517V605"
              fill="none"
              stroke="#1b3131"
              strokeOpacity=".48"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M583 486L606 481L625 475L639 470C652 481 660 497 660 517V605"
              fill="none"
              stroke="#1769ff"
              strokeWidth="3"
              strokeDasharray="11 15"
              strokeDashoffset={92 - power * 170}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#why-energy-glow)"
            />
            <path
              d="M643 600L675 613L675 650L643 637Z"
              fill="#eef1ed"
              stroke="#354742"
              strokeWidth="2"
            />
            <path d="M649 609L669 617" stroke="#8a9993" strokeWidth="2" />
            <circle cx="668" cy="635" r="3.5" fill="#1769ff" filter="url(#why-energy-glow)" />
            <path
              d="M656 529H664M656 548H664M656 568H664"
              stroke="#dce4e1"
              strokeWidth="1.6"
            />
          </g>
        </g>

        <g opacity={finish} aria-hidden="true">
          <path
            d="M122 650C139 631 158 632 173 651M155 655C172 638 192 639 207 658"
            fill="none"
            stroke="#557461"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path
            d="M826 632C844 613 864 614 879 635M860 641C878 621 899 623 914 644"
            fill="none"
            stroke="#617d69"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path d="M116 665C153 656 190 660 221 670M816 654C854 647 890 651 923 662" fill="none" stroke="#8da187" strokeWidth="6" strokeLinecap="round" />
        </g>
      </g>

      <g className={styles.frame} aria-hidden="true">
        <path d="M28 28H96M28 28V96M1004 28H1072M1072 28V96" />
        <path d="M28 664V732H96M1004 732H1072V664" />
        <text x="28" y="742">SUNLIGHT / ROOF / HOME</text>
      </g>
    </svg>
  );
}
