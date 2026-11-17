import { useEffect, useState } from "react";
import { content } from "../content.js";

export default function useCountdown(target) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const s = Math.max(0, Math.floor((target.getTime() - now) / 1000));
  const p = (n) => String(n).padStart(2, "0");
  return [
    [content.countdownLabels[0], p(Math.floor(s / 86400))],
    [content.countdownLabels[1], p(Math.floor((s % 86400) / 3600))],
    [content.countdownLabels[2], p(Math.floor((s % 3600) / 60))],
    [content.countdownLabels[3], p(s % 60)],
  ];
}
