import { SCHEDULE, TYPE_COLOR } from "../data/constants";

export default function ScheduleList() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {SCHEDULE.map(({ time, name, detail, type }) => {
        const color = TYPE_COLOR[type];

        return (
          <div
            key={time}
            style={{
              display: "flex",
              gap: 14,
              padding: "14px",
              borderRadius: 16,
              background: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(0,0,0,0.04)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
              transition: "all 0.2s ease",
              cursor: "pointer",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.04)";
            }}
          >
            {/* LEFT TIME + DOT */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span
                style={{
                  fontSize: 11,
                  color: "#94a3b8",
                  fontWeight: 500,
                  marginBottom: 6,
                }}
              >
                {time}
              </span>

              {/* Timeline dot */}
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: color,
                  boxShadow: `0 0 10px ${color}`,
                }}
              />

              {/* vertical line */}
              <div
                style={{
                  flex: 1,
                  width: 2,
                  background: "rgba(0,0,0,0.05)",
                  marginTop: 4,
                }}
              />
            </div>

            {/* CONTENT */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#0f172a",
                  marginBottom: 4,
                }}
              >
                {name}
              </div>

              <div
                style={{
                  fontSize: 12,
                  color: "#64748b",
                }}
              >
                {detail}
              </div>

              {/* TYPE TAG */}
              <div
                style={{
                  marginTop: 8,
                  fontSize: 11,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "3px 10px",
                  borderRadius: 999,
                  background: `${color}15`,
                  color: color,
                  fontWeight: 500,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: color,
                  }}
                />
                {type}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}