export function Truss() {
  // Steel truss bridge silhouette (fallback if /images/bridge-bg.jpg is missing)
  const N = 16;
  const top = (i) => [i * 80, i * 36];
  const bot = (i) => [i * 80 + 20, i * 36 + 240];
  const lines = [];
  for (let i = 0; i < N; i++) {
    const [tx, ty] = top(i), [bx, by] = bot(i), [nx, ny] = top(i + 1);
    lines.push([tx, ty, bx, by], [bx, by, nx, ny]);
  }
  return (
    <svg className="truss" viewBox="0 0 1600 900" preserveAspectRatio="xMinYMin slice" aria-hidden="true">
      <g strokeWidth="7" strokeLinecap="square">
        <line x1="0" y1="0" x2={N * 80} y2={N * 36} />
        <line x1="20" y1="240" x2={N * 80 + 20} y2={N * 36 + 240} />
        {lines.map((l, i) => <line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} />)}
      </g>
    </svg>
  );
}

const DECK = 215; // deck top (viewBox 1600 x 300 -> short, wide bridge)

export default function Bridge() {
  const lamps = Array.from({ length: 16 }, (_, i) => 50 + i * 100);
  const cables = Array.from({ length: 32 }, (_, i) => ({
    x: 25 + i * 50,
    top: 18 + ((i * 37) % 60),
    lean: (i % 2 ? 1 : -1) * 22,
  }));
  const zig = "l14 30 l14 -30 ".repeat(58); // proper V shapes

  return (
    <svg className="bridge" viewBox="0 0 1600 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="cone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe28a" stopOpacity=".75" />
          <stop offset="1" stopColor="#ffe28a" stopOpacity=".05" />
        </linearGradient>
        <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff3b0" stopOpacity=".9" />
          <stop offset="1" stopColor="#fff3b0" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* tall thin cables with light dots, switching on one after another */}
      {cables.map((c, i) => (
        <g key={i} className="cable" style={{ "--d": `${i * 0.07}s` }}>
          <line x1={c.x} y1={DECK} x2={c.x + c.lean} y2={c.top} />
          <circle cx={c.x + c.lean} cy={c.top} r="3.5" />
        </g>
      ))}

      {/* arches, lit left -> right */}
      {[0, 1, 2, 3].map((i) => {
        const x = 20 + i * 395;
        return (
          <g key={i} style={{ "--d": `${i * 0.6}s` }}>
            <path className="arch" d={`M${x} ${DECK} Q${x + 190} -75 ${x + 380} ${DECK}`} />
            <path className="arch2" d={`M${x + 24} ${DECK} Q${x + 190} -25 ${x + 356} ${DECK}`} />
          </g>
        );
      })}

      {/* lamp posts, lit one after the other */}
      {lamps.map((x, i) => (
        <g key={x} className="lamp" style={{ "--d": `${i * 0.15}s` }}>
          <polygon className="cone" points={`${x},140 ${x - 40},${DECK} ${x + 40},${DECK}`} />
          <line className="pole" x1={x} y1="140" x2={x} y2={DECK} />
          <circle className="halo" cx={x} cy="136" r="9" />
          <circle className="bulb" cx={x} cy="136" r="3.5" />
        </g>
      ))}

      {/* deck + zig-zag truss */}
      <rect className="deck-top" x="0" y={DECK} width="1600" height="6" />
      <rect className="deck" x="0" y={DECK + 6} width="1600" height="34" />
      <path className="zig" d={`M0 ${DECK + 8} ${zig}`} />
      <rect className="rail" x="0" y={DECK + 38} width="1600" height="3" />

      {/* moving train (visible when lit) */}
      <g className="train">
        <g>
          {[0, 1, 2, 3, 4].map((k) => (
            <g key={k} transform={`translate(${k * 118} 0)`}>
              <rect x="0" y={DECK + 7} width="110" height="26" rx="5" className="coach" />
              {[0, 1, 2, 3, 4].map((w) => (
                <rect key={w} x={10 + w * 19} y={DECK + 15} width="11" height="8" rx="1.5" className="win" />
              ))}
            </g>
          ))}
          <polygon points={`590,${DECK + 20} 700,${DECK + 8} 700,${DECK + 32}`} fill="url(#beam)" />
        </g>
      </g>

      {/* piers */}
      {[60, 660, 1260, 1500].map((x, i) => (
        <rect key={i} className="pier" x={x - 22} y={DECK + 40} width="44" height="60" />
      ))}
    </svg>
  );
}

export function Water() {
  const xs = Array.from({ length: 11 }, (_, i) => i * 180);
  const rows = [
    { y: 22, rx: 62, ry: 6, dur: 9 },
    { y: 50, rx: 48, ry: 5, dur: 12 },
    { y: 78, rx: 34, ry: 4, dur: 15 },
    { y: 102, rx: 22, ry: 3, dur: 18 },
  ];
  return (
    <div className="water">
      <svg viewBox="0 0 1600 120" preserveAspectRatio="none" aria-hidden="true">
        {rows.map((r, k) => (
          <g key={k} className="flow" style={{ animationDuration: `${r.dur}s` }}>
            {xs.map((x) => (
              <ellipse key={x} className="ripple" cx={x + (k % 2) * 90} cy={r.y} rx={r.rx} ry={r.ry} />
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}
