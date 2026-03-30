import { BARS } from "../data/constants";

const MAX = 100;

export default function BarChart() {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 90, marginBottom: 8 }}>
        {BARS.map(({ day, a, b }) => (
          <div key={day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ display: "flex", gap: 2, alignItems: "flex-end", height: 80 }}>
              <div style={{ width: 10, background: "#378ADD", borderRadius: "2px 2px 0 0", height: (a * 80) / MAX }} />
              <div style={{ width: 10, background: "#B5D4F4", borderRadius: "2px 2px 0 0", height: (b * 80) / MAX }} />
            </div>
            <span style={{ fontSize: 11, color: "#888" }}>{day}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 16 }}>
        {[["#378ADD", "Minggu ini"], ["#B5D4F4", "Minggu lalu"]].map(([c, l]) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#888" }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: c }} />
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}
