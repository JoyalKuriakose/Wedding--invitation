export function downloadWeddingIcs() {
  const event = `
BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
DTSTART:20260824T053000Z
DTEND:20260824T083000Z
SUMMARY:Jikku & Lena Wedding Ceremony
LOCATION:St George Jacobite Syrian Church Ponpally, Kottayam, Kerala
DESCRIPTION:Wedding Ceremony
URL:https://maps.app.goo.gl/x3ZrmJSKoFHFHLQ28?g_st=aw
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT2H
DESCRIPTION:Reminder
ACTION:DISPLAY
END:VALARM
END:VEVENT
END:VCALENDAR
  `;

  const blob = new Blob([event], {
    type: "text/calendar;charset=utf-8",
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Jikku-Lena-Wedding.ics";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}