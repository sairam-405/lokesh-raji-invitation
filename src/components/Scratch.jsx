import { useEffect, useRef, useState } from "react";
import { content } from "../content.js";

export default function Scratch() {
  const ref = useRef(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    const { width: w, height: h } = c.getBoundingClientRect();
    c.width = w; c.height = h;
    const g = ctx.createLinearGradient(0, 0, w, h);
    ["#c9a85c", "#f6e7a3", "#d4af37", "#fff6c4", "#b8892a"].forEach((s, i) => g.addColorStop(i / 4, s));
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#2a2622"; ctx.textAlign = "center";
    ctx.font = "600 17px Montserrat, sans-serif";
    ctx.fillText(content.reveal.cover, w / 2, h / 2 - 2);
    ctx.font = "13px Montserrat, sans-serif";
    ctx.fillText(content.reveal.hint, w / 2, h / 2 + 22);

    let down = false;
    const erase = (e) => {
      if (!down) return;
      const r = c.getBoundingClientRect();
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(e.clientX - r.left, e.clientY - r.top, 20, 0, Math.PI * 2);
      ctx.fill();
    };
    const check = () => {
      const d = ctx.getImageData(0, 0, c.width, c.height).data;
      let clear = 0;
      for (let i = 3; i < d.length; i += 16) if (d[i] === 0) clear++;
      if (clear / (d.length / 16) > 0.45) setDone(true);
    };
    const pd = (e) => { down = true; erase(e); };
    const pu = () => { if (down) { down = false; check(); } };
    c.addEventListener("pointerdown", pd);
    c.addEventListener("pointermove", erase);
    window.addEventListener("pointerup", pu);
    return () => {
      c.removeEventListener("pointerdown", pd);
      c.removeEventListener("pointermove", erase);
      window.removeEventListener("pointerup", pu);
    };
  }, []);

  return (
    <div className="scratch">
      <div className="lbl">{content.reveal.label}</div>
      <div className="time">{content.reveal.time}</div>
      <div className="note">{content.reveal.note}</div>
      <canvas ref={ref} style={{ width: "100%", height: "100%", display: done ? "none" : "block" }} />
    </div>
  );
}
