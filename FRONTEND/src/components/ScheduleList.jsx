import { SCHEDULE, TYPE_COLOR } from "../data/constants";

export default function ScheduleList() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {SCHEDULE.map(({ time, name, detail, type }) => (
        <div key={time} style={{
          display: "flex",
          gap: 12,
          padding: "10px 12px",
          background: "#f8f8f8",
          borderRadius: 8,
          borderLeft: `2px solid ${TYPE_COLOR[type]}`,
        }}>
          <span style={{ fontSize: 11, color: "#aaa", minWidth: 36, paddingTop: 1 }}>{time}</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 500, color: "#111" }}>{name}</div>
            <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>{detail}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
