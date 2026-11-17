import { useEffect, useRef, useState } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { content } from "./content.js";
import Welcome from "./pages/Welcome.jsx";
import Invite from "./pages/Invite.jsx";

// Layout keeps ONE <audio> alive across pages and shows the mute button.
function Layout() {
  const audio = useRef(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const a = audio.current;
    a.volume = 0.6;
    a.muted = muted;
  }, [muted]);

  // Browsers block autoplay until the first touch/click, so we try now
  // and again on the first user gesture (the "tap to switch on lights").
  useEffect(() => {
    const a = audio.current;
    const events = ["pointerdown", "touchstart", "keydown"];
    const stop = () => events.forEach((e) => window.removeEventListener(e, start));
    function start() {
      a.play().then(stop).catch(() => {});
    }
    a.play().then(stop).catch(() => {});
    events.forEach((e) => window.addEventListener(e, start));
    return stop;
  }, []);

  const toggle = (e) => {
    e.stopPropagation();
    setMuted((m) => !m);
    audio.current.play().catch(() => {});
  };

  return (
    <>
      <audio ref={audio} src={content.assets.music} loop preload="auto" />
      <button className="sound" onClick={toggle} aria-label={muted ? "Unmute music" : "Mute music"}>
        {muted ? "🔇" : "🔊"}
      </button>
      <Outlet />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Welcome />} />
        <Route path="/invite" element={<Invite />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
