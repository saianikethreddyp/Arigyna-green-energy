import styles from "./SolarRoofEngine.module.css";

/*
 * Projection: oblique architectural projection.
 *   1 m east  -> ( 22,  9.5) px
 *   1 m north -> ( 26, -9.5) px
 *   1 m up    -> (  0, -19 ) px
 * Origin: main block south-west ground corner at screen (150, 420).
 *
 * House: two-storey main block (8 x 7 m, parapet roof) with a
 * single-storey wing (4.5 x 5.5 m) stepped back on the east side.
 * Each visible plane is drawn in its own metre-based coordinate
 * system via a matrix group, so geometry stays clean and readable.
 */

const panels = [
  [0, 0], [1.3, 0], [2.6, 0], [3.9, 0], [5.2, 0],
  [0, 2.55], [1.3, 2.55], [2.6, 2.55], [3.9, 2.55], [5.2, 2.55],
] as const;

/* Recessed window: frame, glass, reflections, mullions, sill, shadows.
 * Drawn in the local (metre) coordinates of whatever wall plane hosts it. */
function WindowUnit({
  x,
  z,
  w,
  h,
  idPrefix,
  mullions = [],
  hMullions = [],
}: {
  x: number;
  z: number;
  w: number;
  h: number;
  idPrefix: string;
  mullions?: number[];
  hMullions?: number[];
}) {
  return (
    <g>
      {/* frame */}
      <rect x={x} y={z} width={w} height={h} fill="#20445a" />
      {/* glass */}
      <rect x={x + 0.06} y={z + 0.06} width={w - 0.12} height={h - 0.12} fill={`url(#${idPrefix}-glass)`} />
      {/* reflections */}
      <path
        d={`M${x + 0.14} ${z + h - 0.16}L${x + w * 0.52} ${z + 0.07}L${x + w * 0.7} ${z + 0.07}L${x + 0.3} ${z + h - 0.16}Z`}
        fill="#fff"
        opacity=".1"
      />
       <path
         d={`M${x + w - 0.5} ${z + h - 0.12}L${x + w - 0.2} ${z + 0.07}L${x + w - 0.08} ${z + 0.07}L${x + w - 0.38} ${z + h - 0.12}Z`}
         fill="#e6b94e"
         opacity=".12"
       />
      <path
        d={`M${x + 0.08} ${z + 0.22}L${x + w - 0.08} ${z + 0.1}L${x + w - 0.08} ${z + 0.25}L${x + 0.08} ${z + 0.48}Z`}
        fill="#e7f6ff"
        opacity=".12"
      />
      {/* mullions */}
      {mullions.map((mx) => (
        <rect key={mx} x={mx} y={z + 0.06} width={0.05} height={h - 0.12} fill="#20445a" />
      ))}
      {hMullions.map((mz) => (
        <rect key={mz} x={x + 0.06} y={mz} width={w - 0.12} height={0.05} fill="#20445a" />
      ))}
      {/* recess shadow at the top of the opening */}
      <rect x={x + 0.06} y={z + h - 0.2} width={w - 0.12} height={0.14} fill={`url(#${idPrefix}-fade-down)`} />
      {/* sill + shadow beneath it */}
      <rect x={x - 0.05} y={z - 0.08} width={w + 0.1} height={0.07} fill="#d8d4c8" />
      <rect x={x - 0.05} y={z - 0.17} width={w + 0.1} height={0.09} fill={`url(#${idPrefix}-fade-down)`} opacity=".5" />
      {/* glass bevel highlight */}
      <path
        d={`M${x + 0.07} ${z + 0.07}H${x + w - 0.07}`}
        stroke="#fff"
        strokeOpacity=".3"
        strokeWidth=".5"
        vectorEffect="non-scaling-stroke"
      />
    </g>
  );
}

export default function SolarRoofEngine({
  idPrefix = "hero-roof",
  showCaption = true,
}: {
  idPrefix?: string;
  showCaption?: boolean;
}) {
  const ref = (id: string) => `url(#${idPrefix}-${id})`;

  return (
    <div className={styles.engine}>
      <svg
        className={styles.canvas}
        viewBox="0 0 760 610"
        role="img"
        aria-labelledby={`${idPrefix}-title ${idPrefix}-description`}
      >
        <title id={`${idPrefix}-title`}>A modern home rooftop solar system being designed and activated</title>
        <desc id={`${idPrefix}-description`}>
          A contemporary two-storey home with a parapet roof is scanned, fitted
          with solar panels on mounting rails and connected to an inverter and
          the home.
        </desc>

        <defs>
          <pattern id={`${idPrefix}-engine-grid`} width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0H0V24" fill="none" stroke="#10251d" strokeOpacity=".065" />
          </pattern>

          {/* solar glass — unchanged palette */}
          <linearGradient id={`${idPrefix}-panel-face`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#12345f" />
            <stop offset=".52" stopColor="#1769ff" />
            <stop offset="1" stopColor="#092448" />
          </linearGradient>
          <linearGradient id={`${idPrefix}-frame-metal`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#d6dbde" />
            <stop offset="1" stopColor="#b4bcc0" />
          </linearGradient>

          <linearGradient id={`${idPrefix}-sun-beam`} x1="1" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e6b94e" stopOpacity=".45" />
            <stop offset="1" stopColor="#e6b94e" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={`${idPrefix}-sun-glow`}>
            <stop offset="0" stopColor="#f9e7a6" />
            <stop offset=".55" stopColor="#e6b94e" />
            <stop offset="1" stopColor="#e6b94e" stopOpacity="0" />
          </radialGradient>

          {/* walls — same warm off-whites as before, gently shaded */}
          <linearGradient id={`${idPrefix}-wall-front`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#d8d2c5" />
            <stop offset=".55" stopColor="#e2ddd0" />
            <stop offset="1" stopColor="#e9e4d8" />
          </linearGradient>
          <linearGradient id={`${idPrefix}-wall-east`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#bcc4bd" />
            <stop offset="1" stopColor="#cbd1ca" />
          </linearGradient>
          <linearGradient id={`${idPrefix}-sun-wash`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff4ce" stopOpacity=".52" />
            <stop offset=".45" stopColor="#e6b94e" stopOpacity=".15" />
            <stop offset="1" stopColor="#e6b94e" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${idPrefix}-cool-shade`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#6b8796" stopOpacity=".17" />
            <stop offset=".72" stopColor="#6b8796" stopOpacity=".04" />
            <stop offset="1" stopColor="#6b8796" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${idPrefix}-wall-recess`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#c7c0b0" />
            <stop offset="1" stopColor="#d0c9ba" />
          </linearGradient>
          <linearGradient id={`${idPrefix}-roof-membrane`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#e6e3d8" />
            <stop offset="1" stopColor="#efe8d5" />
          </linearGradient>

          {/* window glass — muted blue-grey family from the original windows */}
          <linearGradient id={`${idPrefix}-glass`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#647c8d" />
            <stop offset=".5" stopColor="#8bb4c6" />
            <stop offset="1" stopColor="#c3d9e4" />
          </linearGradient>

          {/* walnut door — original brown family */}
          <linearGradient id={`${idPrefix}-door-wood`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#65452a" />
            <stop offset="1" stopColor="#8a6140" />
          </linearGradient>

          {/* shadow gradients (objectBoundingBox; local +y is screen-up on walls) */}
          <linearGradient id={`${idPrefix}-fade-down`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#10251d" stopOpacity="0" />
            <stop offset="1" stopColor="#10251d" stopOpacity=".13" />
          </linearGradient>
          <linearGradient id={`${idPrefix}-fade-up`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#10251d" stopOpacity=".08" />
            <stop offset="1" stopColor="#10251d" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${idPrefix}-shade-n`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#10251d" stopOpacity="0" />
            <stop offset="1" stopColor="#10251d" stopOpacity=".11" />
          </linearGradient>
          <linearGradient id={`${idPrefix}-shade-w`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#10251d" stopOpacity=".11" />
            <stop offset="1" stopColor="#10251d" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${idPrefix}-recess-shade`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#10251d" stopOpacity=".28" />
            <stop offset="1" stopColor="#10251d" stopOpacity=".45" />
          </linearGradient>
          <radialGradient id={`${idPrefix}-sconce-glow`}>
            <stop offset="0" stopColor="#e6b94e" stopOpacity=".5" />
            <stop offset="1" stopColor="#e6b94e" stopOpacity="0" />
          </radialGradient>

          <filter id={`${idPrefix}-engine-shadow`} x="-30%" y="-30%" width="170%" height="190%">
            <feDropShadow dx="0" dy="18" stdDeviation="14" floodColor="#10251d" floodOpacity=".18" />
          </filter>
          <filter id={`${idPrefix}-energy-glow`} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* main roof membrane, used to clip the scan pass */}
          <clipPath id={`${idPrefix}-roof-clip`}>
            <polygon points="150,301 326,377 508,311 332,235" />
          </clipPath>

          {/* one solar module: aluminium frame, glass, cells, busbars,
              reflection, frame shadow and mounting clamps (1.05 x 1.75 m) */}
          <symbol id={`${idPrefix}-solar-module`} viewBox="0 0 1.05 1.75">
            <rect width="1.05" height="1.75" rx="0.03" fill={ref("frame-metal")} stroke="#718084" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <rect x="0.05" y="0.05" width="0.95" height="1.65" fill={ref("panel-face")} />
            <path d="M0.208 0.05V1.7M0.366 0.05V1.7M0.524 0.05V1.7M0.682 0.05V1.7M0.84 0.05V1.7" fill="none" stroke="#a8cdf4" strokeOpacity=".58" strokeWidth=".5" vectorEffect="non-scaling-stroke" />
            <path d="M0.05 0.215H1M0.05 0.38H1M0.05 0.545H1M0.05 0.71H1M0.05 0.875H1M0.05 1.04H1M0.05 1.205H1M0.05 1.37H1M0.05 1.535H1" fill="none" stroke="#88b9ed" strokeOpacity=".5" strokeWidth=".5" vectorEffect="non-scaling-stroke" />
            <path d="M0.287 0.05V1.7M0.603 0.05V1.7" stroke="#e8f2ff" strokeOpacity=".5" strokeWidth=".7" vectorEffect="non-scaling-stroke" />
            <path d="M0.12 1.65L0.62 0.06L0.86 0.06L0.36 1.65Z" fill="#fff" opacity=".08" />
            <rect x="0.05" y="1.6" width="0.95" height="0.1" fill="#092448" opacity=".3" />
            <path d="M0.06 0.06H0.99" stroke="#fff" strokeOpacity=".6" strokeWidth=".7" vectorEffect="non-scaling-stroke" />
            <rect x="-0.035" y="0.78" width="0.035" height="0.14" fill="#5a6468" />
            <rect x="1.05" y="0.78" width="0.035" height="0.14" fill="#5a6468" />
          </symbol>
        </defs>

        <rect width="760" height="610" fill={ref("engine-grid")} />

        <g className={styles.headerLabels} aria-hidden="true">
          <text x="28" y="34">RESIDENTIAL ROOFTOP SOLAR</text>
          <text x="732" y="34" textAnchor="end">18.5204° N · 73.8567° E</text>
        </g>

        {/* sun — unchanged */}
        <g className={styles.sunField} aria-hidden="true">
          <circle cx="612" cy="121" r="79" fill={ref("sun-glow")} />
          <circle cx="612" cy="121" r="34" fill="#e6b94e" />
          <path d="M580 150L472 316L278 286L565 120Z" fill={ref("sun-beam")} />
          <circle cx="612" cy="121" r="53" fill="none" stroke="#10251d" strokeOpacity=".24" strokeDasharray="2 9" />
          <text x="612" y="190" textAnchor="middle" className={styles.sunLabel}>SOLAR ORIENTATION</text>
          <text x="612" y="204" textAnchor="middle" className={styles.sunLabelDetail}>DAYLIGHT PATH</text>
        </g>

        {/* ground, shadows, pathway and entrance paving */}
        <g className={styles.landscape} aria-hidden="true">
          <ellipse cx="390" cy="492" rx="245" ry="26" fill="#10251d" fillOpacity=".09" />
          <ellipse cx="375" cy="484" rx="195" ry="16" fill="#10251d" fillOpacity=".07" />
          <path
            d="M157 452C136 478 112 516 98 556C90 578 84 596 82 610L148 610C152 584 160 556 174 530C190 500 208 480 228 468Z"
            fill="#d5d1c4"
            stroke="#10251d"
            strokeOpacity=".15"
          />
          <path d="M138 490Q160 500 178 494M116 534Q142 546 162 538" fill="none" stroke="#10251d" strokeOpacity=".12" />
          {/* entrance paving pad */}
          <g transform="matrix(22 9.5 26 -9.5 150 419.62)">
            <rect x="1.1" y="-1.7" width="2.6" height="0.85" fill="#d5d1c4" stroke="#10251d" strokeOpacity=".15" vectorEffect="non-scaling-stroke" />
            <path d="M1.75 -1.7V-0.85M2.4 -1.7V-0.85M3.05 -1.7V-0.85" stroke="#10251d" strokeOpacity=".12" vectorEffect="non-scaling-stroke" />
          </g>
        </g>

        <g filter={ref("engine-shadow")}>
          {/* ---------- main roof (z 6.25) ---------- */}
          <g transform="matrix(22 9.5 26 -9.5 150 301.25)">
            <rect x="0.2" y="0.2" width="7.6" height="6.6" fill={ref("roof-membrane")} stroke="#10251d" strokeOpacity=".14" vectorEffect="non-scaling-stroke" />
            {/* expansion joints */}
            <path d="M4 0.3V6.7M0.3 3.5H7.7" stroke="#10251d" strokeOpacity=".07" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            {/* maintenance walkway between panel rows */}
            <rect x="0.9" y="2.95" width="6.5" height="0.7" fill="#ddd8cb" stroke="#10251d" strokeOpacity=".1" vectorEffect="non-scaling-stroke" />
            {/* panel shadows cast toward the south-west */}
            {panels.map(([px, py], index) => (
              <rect
                key={`shadow-${index}`}
                x={1 + px}
                y={py === 0 ? 0.85 : 3.34}
                width="1.05"
                height="1.71"
                fill="#10251d"
                opacity=".08"
              />
            ))}
            {/* parapet shadow on the membrane (sun from the north-east) */}
            <rect x="0.2" y="6.5" width="7.6" height="0.3" fill={ref("shade-n")} />
            <rect x="0.2" y="0.2" width="0.3" height="6.6" fill={ref("shade-w")} />
            {/* roof drain beside the downpipe */}
            <circle cx="7.45" cy="0.55" r="0.09" fill="#a8a294" />
            <circle cx="7.45" cy="0.55" r="0.14" fill="none" stroke="#10251d" strokeOpacity=".25" vectorEffect="non-scaling-stroke" />
          </g>

          {/* parapet inner faces (visible far sides: north and west) */}
          <g transform="matrix(22 9.5 0 -19 326.8 355.4)">
            <rect x="0.2" y="6.25" width="7.6" height="0.65" fill="#d2ccbe" />
          </g>
          <g transform="matrix(26 -9.5 0 -19 154.4 421.9)">
            <rect x="0.2" y="6.25" width="6.6" height="0.65" fill="#e7e2d5" />
          </g>
          {/* parapet top + metal coping */}
          <g transform="matrix(22 9.5 26 -9.5 150 288.9)">
            <path d="M-0.05 -0.05H8.05V7.05H-0.05ZM0.2 0.2V6.8H7.8V0.2Z" fill="#e8e8df" fillRule="evenodd" />
          </g>
           <g transform="matrix(22 9.5 26 -9.5 150 287.38)">
             <path d="M-0.08 -0.08H8.08V7.08H-0.08ZM0.17 0.17V6.83H7.83V0.17Z" fill="#aaa498" fillRule="evenodd" />
           </g>
           <path d="M332 219L512 297L326 365" fill="none" stroke="#f7edd8" strokeOpacity=".45" />
          <path d="M287 268L296 272M435 262L444 266M242 334L251 338" stroke="#8d8a80" strokeOpacity=".55" strokeWidth="1.2" />

          {/* ---------- main east wall (x = 8) ---------- */}
          <g transform="matrix(26 -9.5 0 -19 326 496)">
            <rect x="1.5" y="3.88" width="5.5" height="2.12" fill={ref("wall-east")} />
            <rect x="0" y="0.3" width="1.5" height="5.7" fill={ref("wall-east")} />
            <rect x="0" y="0.3" width="1.5" height="5.7" fill={ref("cool-shade")} />
            <rect x="-0.06" y="0" width="1.62" height="0.3" fill="#b3ada0" />
            <rect x="-0.06" y="6" width="7.18" height="0.25" fill="#c6c2b6" />
            <rect x="-0.06" y="6.25" width="7.12" height="0.65" fill="#cdd3cc" />
            <rect x="-0.06" y="6.82" width="7.12" height="0.08" fill="#10251d" opacity=".08" />
            <rect x="-0.06" y="6.9" width="7.12" height="0.08" fill="#aaa498" />
            {/* tall stairwell slot window */}
            <WindowUnit idPrefix={idPrefix} x={0.45} z={0.9} w={0.7} h={4.5} hMullions={[2.4, 3.9]} />
            <rect x="0" y="0.3" width="1.5" height="0.3" fill={ref("fade-up")} />
          </g>

          {/* ---------- wing roof (z 3.2) ---------- */}
          <g transform="matrix(22 9.5 26 -9.5 150 359.2)">
            <rect x="8.2" y="1.7" width="4.1" height="5.1" fill={ref("roof-membrane")} stroke="#10251d" strokeOpacity=".14" vectorEffect="non-scaling-stroke" />
            <rect x="8.2" y="6.5" width="4.1" height="0.3" fill={ref("shade-n")} />
            <rect x="8.2" y="1.7" width="0.3" height="5.1" fill={ref("shade-w")} />
          </g>
          <g transform="matrix(22 9.5 0 -19 326.8 355.4)">
            <rect x="8.2" y="3.2" width="4.1" height="0.6" fill="#d2ccbe" />
          </g>
          <g transform="matrix(26 -9.5 0 -19 330.4 497.9)">
            <rect x="1.7" y="3.2" width="5.1" height="0.6" fill="#e7e2d5" />
          </g>
          <g transform="matrix(22 9.5 26 -9.5 150 347.8)">
            <path d="M7.95 1.45H12.55V7.05H7.95ZM8.2 1.7V6.8H12.3V1.7Z" fill="#e8e8df" fillRule="evenodd" />
          </g>
           <g transform="matrix(22 9.5 26 -9.5 150 346.85)">
             <path d="M7.92 1.42H12.58V7.08H7.92ZM8.17 1.67V6.83H12.33V1.67Z" fill="#aaa498" fillRule="evenodd" />
           </g>
           <path d="M508 354L611 399L464 452" fill="none" stroke="#f7edd8" strokeOpacity=".45" />
          <path d="M550 373L559 377M584 387L593 391" stroke="#8d8a80" strokeOpacity=".55" strokeWidth="1.2" />
           {/* plumbing vent on the wing roof */}
           <g aria-hidden="true">
             <rect x="566.8" y="402" width="7" height="10" fill="#c6cec7" stroke="#10251d" strokeWidth="1" />
             <ellipse cx="570.3" cy="402" rx="3.5" ry="1.6" fill="#aaa498" stroke="#10251d" strokeWidth=".75" />
           </g>
          {/* roof overflow and short downpipe on the shaded wing corner */}
          <g aria-hidden="true">
            <path d="M605 399L611 401L611 426" fill="none" stroke="#6f7975" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M605 399L611 401L611 426" fill="none" stroke="#d7dcd5" strokeOpacity=".65" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M607 411H614M607 420H614" stroke="#10251d" strokeOpacity=".35" strokeWidth="1.2" />
          </g>

          {/* ---------- wing front wall (y = 1.5) ---------- */}
          <g transform="matrix(22 9.5 0 -19 189 405.75)">
            <rect x="8" y="0" width="4.56" height="0.3" fill="#b3ada0" />
            <rect x="8" y="0.3" width="4.5" height="2.75" fill={ref("wall-front")} />
            <rect x="8" y="0.3" width="4.5" height="2.75" fill={ref("sun-wash")} />
            <rect x="8" y="0.3" width="4.5" height="0.3" fill={ref("fade-up")} />
            <rect x="8" y="2.77" width="4.5" height="0.28" fill={ref("fade-down")} />
            <rect x="8" y="3.05" width="4.56" height="0.15" fill="#c6c2b6" />
            <rect x="8" y="3.2" width="4.5" height="0.6" fill="#e5e1d4" />
            <rect x="8" y="3.72" width="4.5" height="0.08" fill="#10251d" opacity=".08" />
            <rect x="8" y="3.8" width="4.54" height="0.08" fill="#aaa498" />
            <WindowUnit idPrefix={idPrefix} x={8.6} z={0.9} w={3.5} h={1.7} mullions={[9.77, 10.93]} />
            {/* ventilation grille */}
            <rect x="9" y="2.72" width="0.35" height="0.25" fill="#d8d4c8" stroke="#10251d" strokeOpacity=".5" strokeWidth=".75" vectorEffect="non-scaling-stroke" />
            <path d="M9.03 2.78H9.32M9.03 2.83H9.32M9.03 2.88H9.32M9.03 2.93H9.32" stroke="#10251d" strokeOpacity=".55" strokeWidth=".75" vectorEffect="non-scaling-stroke" />
            {/* outdoor light */}
            <circle cx="12.3" cy="2.59" r="0.3" fill={ref("sconce-glow")} />
            <rect x="12.24" y="2.52" width="0.12" height="0.14" rx="0.02" fill="#10251d" />
          </g>

          {/* ---------- wing east wall (x = 12.5) ---------- */}
          <g transform="matrix(26 -9.5 0 -19 425 538.75)">
            <rect x="1.44" y="0" width="5.62" height="0.3" fill="#b3ada0" />
            <rect x="1.5" y="0.3" width="5.5" height="2.75" fill={ref("wall-east")} />
            <rect x="1.5" y="0.3" width="5.5" height="2.75" fill={ref("cool-shade")} />
            <rect x="1.5" y="0.3" width="5.5" height="0.3" fill={ref("fade-up")} />
            <rect x="1.5" y="2.77" width="5.5" height="0.28" fill={ref("fade-down")} />
            <rect x="1.44" y="3.05" width="5.62" height="0.15" fill="#c6c2b6" />
            <rect x="1.5" y="3.2" width="5.5" height="0.6" fill="#cdd3cc" />
            <rect x="1.5" y="3.72" width="5.5" height="0.08" fill="#10251d" opacity=".08" />
            <rect x="1.46" y="3.8" width="5.58" height="0.08" fill="#aaa498" />
            <WindowUnit idPrefix={idPrefix} x={1.9} z={1} w={1.2} h={1.5} mullions={[2.5]} />
            <WindowUnit idPrefix={idPrefix} x={3.7} z={1} w={1.2} h={1.5} mullions={[4.3]} />
          </g>

          {/* AC outdoor unit on its pad */}
          <g transform="matrix(22 9.5 26 -9.5 150 419.62)">
            <rect x="12.6" y="3.8" width="1" height="1" fill="#c9c5b9" stroke="#10251d" strokeOpacity=".15" vectorEffect="non-scaling-stroke" />
          </g>
          <g transform="matrix(22 9.5 26 -9.5 150 405.75)">
            <rect x="12.7" y="3.9" width="0.8" height="0.8" fill="#e8e8df" stroke="#10251d" strokeOpacity=".3" vectorEffect="non-scaling-stroke" />
          </g>
          <g transform="matrix(26 -9.5 0 -19 447 548.25)">
            <rect x="3.9" y="0.08" width="0.8" height="0.67" rx="0.03" fill="#d8d4c8" stroke="#10251d" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <circle cx="4.3" cy="0.42" r="0.19" fill="none" stroke="#10251d" strokeOpacity=".5" vectorEffect="non-scaling-stroke" />
            <circle cx="4.3" cy="0.42" r="0.05" fill="#10251d" opacity=".4" />
            <path d="M4.3 0.42L4.3 0.26M4.3 0.42L4.44 0.5M4.3 0.42L4.16 0.5" stroke="#10251d" strokeOpacity=".5" vectorEffect="non-scaling-stroke" />
            <path d="M4.56 0.15V0.68M4.61 0.15V0.68M4.66 0.15V0.68" stroke="#10251d" strokeOpacity=".25" vectorEffect="non-scaling-stroke" />
            <rect x="3.95" y="0" width="0.08" height="0.08" fill="#8f897d" />
            <rect x="4.55" y="0" width="0.08" height="0.08" fill="#8f897d" />
          </g>

          {/* ---------- main front wall (y = 0) ---------- */}
          <g transform="matrix(22 9.5 0 -19 150 420)">
            <rect x="-0.06" y="0" width="8.12" height="0.3" fill="#b3ada0" />
            <rect x="0" y="0.3" width="8" height="5.7" fill={ref("wall-front")} />
            <rect x="0" y="0.3" width="8" height="5.7" fill={ref("sun-wash")} />
            <rect x="0" y="0.3" width="8" height="0.3" fill={ref("fade-up")} />
            <rect x="0" y="0.3" width="0.15" height="5.7" fill={ref("shade-w")} />
            <rect x="0" y="3" width="8" height="0.04" fill="#10251d" opacity=".05" />
            <rect x="0" y="5.68" width="8" height="0.32" fill={ref("fade-down")} />
            <rect x="-0.12" y="6" width="8.24" height="0.25" fill="#c6c2b6" />
            <rect x="0" y="6.25" width="8" height="0.65" fill="#e5e1d4" />
            <rect x="0" y="6.82" width="8" height="0.08" fill="#10251d" opacity=".08" />
            <rect x="-0.06" y="6.9" width="8.12" height="0.08" fill="#aaa498" />
            {/* first-floor ribbon window */}
            <WindowUnit idPrefix={idPrefix} x={0.7} z={3.9} w={6.8} h={1.6} mullions={[2.4, 4.1, 5.8]} />
            {/* ground-floor picture window */}
            <WindowUnit idPrefix={idPrefix} x={4.5} z={0.9} w={3} h={1.9} mullions={[6]} />
            {/* recessed entrance opening */}
            <rect x="1.5" y="0" width="1.8" height="2.9" fill={ref("recess-shade")} />
            {/* canopy shadow on the wall */}
            <rect x="1.4" y="2.45" width="2.2" height="0.45" fill={ref("fade-down")} />
            {/* rainwater downpipe with scupper, brackets and shoe */}
            <rect x="7.64" y="6.12" width="0.26" height="0.24" fill="#a8a294" stroke="#10251d" strokeOpacity=".5" strokeWidth=".75" vectorEffect="non-scaling-stroke" />
            <rect x="7.72" y="0.15" width="0.1" height="5.97" fill="#c6cec7" stroke="#10251d" strokeOpacity=".6" strokeWidth=".75" vectorEffect="non-scaling-stroke" />
            <rect x="7.7" y="1.2" width="0.14" height="0.05" fill="#10251d" opacity=".5" />
            <rect x="7.7" y="3" width="0.14" height="0.05" fill="#10251d" opacity=".5" />
            <rect x="7.7" y="4.8" width="0.14" height="0.05" fill="#10251d" opacity=".5" />
            <path d="M7.77 0.15C7.77 0.06 7.84 0.04 7.9 0.06" fill="none" stroke="#c6cec7" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </g>

          {/* entrance recess: back wall, door, sconce, west reveal */}
          <g transform="matrix(22 9.5 0 -19 165.6 414.3)">
            <rect x="1.5" y="0.15" width="1.8" height="2.75" fill={ref("wall-recess")} />
            {/* walnut door */}
            <rect x="1.82" y="0.12" width="1.06" height="2.36" fill="#20445a" opacity=".85" />
            <rect x="1.85" y="0.15" width="1" height="2.3" fill={ref("door-wood")} />
            <path d="M2.18 0.18V2.42M2.52 0.18V2.42" stroke="#5a3d27" strokeOpacity=".3" strokeWidth=".5" vectorEffect="non-scaling-stroke" />
            <rect x="2.68" y="0.95" width="0.05" height="0.42" rx="0.02" fill="#d8d4c8" />
            {/* sconce */}
            <circle cx="3.11" cy="1.91" r="0.34" fill={ref("sconce-glow")} />
            <rect x="3.05" y="1.84" width="0.12" height="0.14" rx="0.02" fill="#10251d" />
          </g>
          <g transform="matrix(26 -9.5 0 -19 183 434.25)">
            <rect x="0" y="0" width="0.6" height="2.9" fill="#c0b9aa" />
            <rect x="0" y="0" width="0.6" height="2.9" fill={ref("fade-up")} opacity=".6" />
          </g>

          {/* cantilevered entrance canopy */}
          <g transform="matrix(22 9.5 26 -9.5 150 360.15)">
            <rect x="1.3" y="-1" width="2.2" height="1.5" fill="#e8e8df" stroke="#10251d" strokeOpacity=".2" vectorEffect="non-scaling-stroke" />
            <rect x="1.3" y="-1" width="2.2" height="1.5" fill={ref("roof-membrane")} opacity=".6" />
          </g>
          <g transform="matrix(22 9.5 0 -19 124 429.5)">
            <rect x="1.3" y="2.95" width="2.2" height="0.2" fill="#d8d4c8" />
            <path d="M1.3 2.95H3.5" stroke="#f7edd8" strokeOpacity=".5" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </g>
          <g transform="matrix(26 -9.5 0 -19 227 453.25)">
            <rect x="-1" y="2.95" width="1.5" height="0.2" fill="#c6cec7" />
          </g>

          {/* entrance steps */}
          <g transform="matrix(22 9.5 0 -19 127.9 428.075)">
            <rect x="1.35" y="0" width="2.1" height="0.075" fill="#c9c5b9" />
          </g>
          <g transform="matrix(22 9.5 26 -9.5 150 418.575)">
            <rect x="1.35" y="-0.85" width="2.1" height="0.45" fill="#dcd8cc" stroke="#10251d" strokeOpacity=".15" vectorEffect="non-scaling-stroke" />
          </g>
          <g transform="matrix(22 9.5 0 -19 139.6 423.8)">
            <rect x="1.35" y="0.075" width="2.1" height="0.075" fill="#cfcabb" />
          </g>
          <g transform="matrix(22 9.5 26 -9.5 150 417.15)">
            <rect x="1.35" y="-0.4" width="2.1" height="1" fill="#e2ded2" stroke="#10251d" strokeOpacity=".15" vectorEffect="non-scaling-stroke" />
          </g>
        </g>

        {/* roof outlines draw on first */}
        <path
          className={styles.structureDraw}
          d="M146 287L326 365L512 297L332 219ZM361 408L464 452L611 399L508 354Z"
          fill="none"
          stroke="#10251d"
          strokeWidth="2"
        />

        {/* roof scan pass, clipped to the main roof */}
        <g clipPath={ref("roof-clip")} aria-hidden="true">
          <path d="M150 301L332 235L508 311" fill="none" stroke="#10251d" strokeOpacity=".12" strokeWidth="22" />
          <g className={styles.scanField}>
            <rect x="116" y="125" width="90" height="330" fill="#1769ff" fillOpacity=".08" transform="rotate(-19 116 125)" />
            <line x1="191" y1="125" x2="191" y2="475" stroke="#1769ff" strokeWidth="3" transform="rotate(-19 191 125)" />
          </g>
        </g>

        {/* panel array on tilted mounting rails */}
        <g transform="matrix(22 9.5 25.4 -13.25 204.3 297.5)" aria-hidden="true">
          <rect x="-0.1" y="0.14" width="6.5" height="0.07" fill="#6e7a7e" />
          <rect x="-0.1" y="1.52" width="6.5" height="0.07" fill="#6e7a7e" />
          <rect x="-0.1" y="2.69" width="6.5" height="0.07" fill="#6e7a7e" />
          <rect x="-0.1" y="4.07" width="6.5" height="0.07" fill="#6e7a7e" />
          {panels.map(([x, y], index) => (
            <g key={`mount-${index}`} fill="#64706f">
              <rect x={x + 0.08} y={y + 0.13} width="0.16" height="0.12" rx="0.02" />
              <rect x={x + 0.81} y={y + 1.5} width="0.16" height="0.12" rx="0.02" />
            </g>
          ))}
          {panels.map(([x, y], index) => (
            <g
              key={`${x}-${y}`}
              className={styles.panel}
              style={{ "--panel-delay": `${1.65 + index * 0.075}s` } as React.CSSProperties}
            >
              <use href={`#${idPrefix}-solar-module`} x={x} y={y} width="1.05" height="1.75" />
            </g>
          ))}
        </g>
        <path className={styles.panelGlint} d="M248 274L332 311" stroke="#fff" strokeOpacity=".65" strokeWidth="4" strokeLinecap="round" aria-hidden="true" />

        {/* cable run: array -> parapet junction -> wing roof -> inverter */}
        <g className={styles.energySystem} aria-hidden="true">
          <path d="M441 316L451 313L455 318L445 321Z" fill="#10251d" opacity=".85" />
          <path className={styles.cableBase} d="M419 317L444 317C463 321 486 352 498 403L567 411L571 453" />
          <path className={styles.energyPath} d="M419 317L444 317C463 321 486 352 498 403L567 411L571 453" />
          <circle r="5" fill="#1769ff" filter={ref("energy-glow")}>
            <animateMotion
              dur="4.8s"
              begin="4.6s"
              repeatCount="indefinite"
              path="M419 317L444 317C463 321 486 352 498 403L567 411L571 453"
            />
          </circle>
        </g>

        {/* inverter, meter and conduits on the wing east wall */}
        <g className={styles.inverter} aria-hidden="true">
          <path d="M560.7 459.7L581.8 452.1M560.7 471.1L581.8 463.5" stroke="#10251d" strokeOpacity=".5" strokeWidth="2" />
          <path d="M562.8 471.3L579.7 465.1L579.7 451.8L562.8 458Z" fill="#f7f6ef" stroke="#10251d" strokeWidth="1.5" />
          <path d="M565.5 460.5L577 457.4L577 454.8L565.5 457.9Z" fill="#10251d" />
          <circle className={styles.led} cx="576.5" cy="462" r="2" fill="#1769ff" />
          <path d="M570.6 455.2V413.3" stroke="#10251d" strokeOpacity=".45" strokeWidth="2.5" />
          <path d="M569.4 430H571.8M569.4 444H571.8" stroke="#10251d" strokeOpacity=".45" strokeWidth="1.5" />
          <path d="M588.8 457L601.8 452.3L601.8 441.9L588.8 446.6Z" fill="#d8d4c8" stroke="#10251d" strokeWidth="1.5" />
          <path d="M590.5 449.5L600 446.6L600 443.8L590.5 446.7Z" fill="#24313a" />
          <path d="M595.3 444.3V415.8" stroke="#10251d" strokeOpacity=".45" strokeWidth="2" />
        </g>

        {/* foundation planting */}
        <g className={styles.landscape} aria-hidden="true">
          <path d="M137 446C145 418 166 419 171 449C178 423 198 426 202 458Z" fill="#456759" />
          <g transform="translate(55 75)">
            <path d="M552 416C560 389 579 390 584 419C591 396 610 399 614 430Z" fill="#567666" />
            <path d="M568 420V455M588 423V445" stroke="#765840" strokeWidth="4" />
          </g>
        </g>

        {/* compass — unchanged */}
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

      {showCaption && (
        <div className={styles.caption}>
          <div>
            <span>Site-specific solar design</span>
            <strong>Built around your roof.</strong>
          </div>
          <p>Final placement and capacity follow your roof and site assessment.</p>
          <small>Andhra Pradesh · Telangana</small>
        </div>
      )}
    </div>
  );
}
