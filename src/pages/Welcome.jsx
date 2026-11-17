import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Bridge, { Truss, Water } from "../components/Bridge.jsx";
import { content } from "../content.js";

export default function Welcome() {
  const w = content.welcome;
  const navigate = useNavigate();
  const [lit, setLit] = useState(false);

  const stars = useMemo(
    () => Array.from({ length: 40 }, () => ({ x: Math.random() * 100, y: Math.random() * 40 })),
    []
  );

  return (
    <div className={`scene ${lit ? "lit" : ""}`} onClick={() => !lit && setLit(true)}>
      <Truss />
      <div className="photo" style={{ backgroundImage: `url(${content.assets.bridgePhoto})` }} />
      <div className="glow" />
      {stars.map((s, i) => (
        <span key={i} className="star" style={{ left: `${s.x}%`, top: `${s.y}%` }} />
      ))}
      <div className="moon" />

      <div className="top">
        <div className={`fade ${lit ? "gone" : ""}`}>
          <span className="pill">{w.pill}</span>
          <h1 className="welcome">{w.title[0]}<br />{w.title[1]}</h1>
          <div className="sub">{w.subtitle}</div>
        </div>

        <div className={`fade ${lit ? "" : "gone"}`}>
          <div className="eyebrow">{w.eyebrow}</div>
          <div className="names">{w.groom} <i>{w.and}</i> {w.bride}</div>
          <button className="open" onClick={(e) => { e.stopPropagation(); navigate("/invite"); }}>
            {w.button}
          </button>
        </div>
      </div>

      {[12, 28, 46, 66, 84].map((l, i) => (
        <span key={i} className="lantern" style={{ left: `${l}%`, animationDelay: `${i * -2.4}s`, bottom: `${34 + (i % 3) * 6}%` }} />
      ))}
      <Bridge />
      <Water />
    </div>
  );
}
