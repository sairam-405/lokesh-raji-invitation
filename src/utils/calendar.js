import { content } from "../content.js";

export function saveToCalendar() {
  const start = new Date(content.venue.calendar.start);
  const end = new Date(start.getTime() + content.venue.calendar.durationHours * 3600e3);
  const f = (d) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");
  const esc = (s) => s.replace(/,/g, "\\,");
  const { summary, location, description } = content.venue.calendar;
  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "BEGIN:VEVENT",
    `DTSTART:${f(start)}`, `DTEND:${f(end)}`,
    `SUMMARY:${esc(summary)}`, `LOCATION:${esc(location)}`, `DESCRIPTION:${esc(description)}`,
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  a.download = "wedding.ics";
  a.click();
}
