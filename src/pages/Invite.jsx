import { useEffect, useMemo, useState } from "react";
import Scratch from "../components/Scratch.jsx";
import Dock from "../components/Dock.jsx";
import useCountdown from "../hooks/useCountdown.js";
import { saveToCalendar } from "../utils/calendar.js";
import { content } from "../content.js";

function Person({ p }) {
  return (
    <div className="person">
      <div className="avatar" style={{ backgroundImage: `url(${p.photo})` }}>{p.initial}</div>
      <div className="role">{p.role}</div>
      <div className="pname">{p.name}</div>
      <div className="role">{p.rel}</div>
      <div className="parents">{p.parents[0]}<br />{p.parents[1]}</div>
    </div>
  );
}

export default function Invite() {
  const c = content;
  const i = c.invite;
  const count = useCountdown(new Date(c.countdown.target));
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // "Shower blessings": a burst of petals/confetti that falls for a few seconds
  const [shower, setShower] = useState(0);
  const [copied, setCopied] = useState(false);
  const pieces = useMemo(
    () =>
      shower
        ? Array.from({ length: 70 }, () => ({
            l: Math.random() * 100,
            x: `${(Math.random() - 0.5) * 120}px`,
            d: 2.8 + Math.random() * 2.2,
            s: Math.random() * 0.9,
            w: 8 + Math.random() * 9,
            c: ["#e8c868", "#d4af37", "#f3d9a4", "#e9b8a6", "#c98f5a"][Math.floor(Math.random() * 5)],
          }))
        : [],
    [shower]
  );
  useEffect(() => {
    if (!shower) return;
    const t = setTimeout(() => setShower(0), 6000);
    return () => clearTimeout(t);
  }, [shower]);

  const share = async () => {
    const data = { title: c.thanks.share.title, text: c.thanks.share.text, url: window.location.origin + "/" };
    try {
      if (navigator.share) { await navigator.share(data); return; }
      await navigator.clipboard.writeText(data.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch { /* user cancelled */ }
  };

  const petals = useMemo(
    () => Array.from({ length: 14 }, () => ({ l: Math.random() * 100, d: 9 + Math.random() * 10, s: -Math.random() * 15 })),
    []
  );

  return (
    <div className="page">
      {petals.map((p, k) => (
        <span key={k} className="petal" style={{ left: `${p.l}%`, animationDuration: `${p.d}s`, animationDelay: `${p.s}s` }} />
      ))}

      <div className="card"><div className="card-in">
        <div className="c-eyebrow">{i.blessing}</div>
        <div className="c-it">{i.families}</div>
        <div className="invited">{i.invited}</div>
        <div className="big">{c.welcome.groom}</div>
        <div className="and">{i.and}</div>
        <div className="big">{c.welcome.bride}</div>
        <div className="knot">{i.knot}</div>

        <div className="pair"><Person p={i.groom} /><Person p={i.bride} /></div>

        <div className="rule" />
        <div className="event">{i.marriageLabel}</div>
        <div className="date">{i.date}</div>
        <div className="ev">
          {i.events.map((e) => (<div key={e.title}><h4>{e.title}</h4><p>{e.time}</p></div>))}
        </div>

        <div className="venue">{i.venueLabel}</div>
        <div className="vname">{i.venueName[0]}<br />{i.venueName[1]}</div>

        <div className="event">{i.receptionLabel}</div>
        <div className="date">{i.receptionDate}</div>
        <div className="ev">
          {i.receptionEvents.map((e) => (<div key={e.title}><h4>{e.title}</h4><p>{e.time}</p></div>))}
        </div>

        <div className="venue">{i.venueLabel}</div>
        <div className="vname">{i.ReceptionVenueName[0]}<br />{i.ReceptionVenueName[1]}</div>
      </div></div>

      <div className="sec">
        <div className="c-eyebrow">{c.reveal.eyebrow}</div>
        <h2>{c.reveal.title}</h2>
        <Scratch />
        <div className="count">
          {count.map(([l, v]) => (<div className="cell" key={l}><b>{v}</b><span>{l}</span></div>))}
        </div>
      </div>

      <div className="venue-card">
        <div className="c-eyebrow">{c.venue.eyebrow}</div>
        <div className="vc-title">{c.venue.title}</div>
        <div className="vc-addr">{c.venue.address}</div>
        <div className="vc-times">{c.venue.times}</div>
        <div className="btns">
          <a className="btn solid" href={c.mapsUrl} target="_blank" rel="noreferrer">{c.venue.mapsLabel}</a>
          <button className="btn" onClick={saveToCalendar}>{c.venue.calendarLabel}</button>
        </div>
      </div>

      <div className="venue-card">
        <div className="c-eyebrow">{c.receptionVenue.eyebrow}</div>
        <div className="vc-title">{c.receptionVenue.title}</div>
        <div className="vc-addr">{c.receptionVenue.address}</div>
        <div className="vc-times">{c.receptionVenue.times}</div>
        <div className="btns">
          <a className="btn solid" href={c.receptionMapsUrl} target="_blank" rel="noreferrer">{c.receptionVenue.mapsLabel}</a>
          <button className="btn" onClick={saveToCalendar}>{c.receptionVenue.calendarLabel}</button>
        </div>
      </div>

      <div className="sec" style={{ marginTop: 0 }}>
        <div className="thanks">{c.thanks.title}</div>
        <div className="thanks-sub">{c.thanks.text}</div>
        <div className="btns">
          <button className="btn grad" onClick={() => setShower((n) => n + 1)}>{c.thanks.blessingsLabel}</button>
          <button className="btn white" onClick={share}>{copied ? c.thanks.copiedLabel : c.thanks.shareLabel}</button>
        </div>
        <div className="footer-names">{c.thanks.footer}</div>
      </div>

      {pieces.length > 0 && (
        <div className="shower" aria-hidden="true">
          {pieces.map((p, k) => (
            <i key={`${shower}-${k}`} style={{ left: `${p.l}%`, width: p.w, height: p.w * 0.8, background: p.c,
              "--x": p.x, animationDuration: `${p.d}s`, animationDelay: `${p.s}s` }} />
          ))}
        </div>
      )}

      <Dock />
    </div>
  );
}
