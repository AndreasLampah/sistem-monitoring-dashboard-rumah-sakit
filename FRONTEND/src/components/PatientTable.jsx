import { PATIENTS, STATUS_STYLE } from "../data/constants";

const COLS = ["Pasien", "Dokter", "Bangsal", "Status", "Masuk"];

export default function PatientTable() {
  return (
    <div
      style={{
        borderRadius: 18,
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.05)",
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
        <thead>
          <tr>
            {COLS.map((h) => (
              <th
                key={h}
                style={{
                  fontSize: 11,
                  color: "#94a3b8",
                  fontWeight: 500,
                  textAlign: "left",
                  padding: "12px 14px",
                  background: "rgba(248,250,252,0.8)",
                  borderBottom: "1px solid rgba(0,0,0,0.04)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {PATIENTS.map(({ name, id, doc, ward, status, s }) => {
            const { bg, fg } = STATUS_STYLE[s];

            return (
              <tr
                key={id}
                style={{
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f8fafc";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {/* PASIEN */}
                <td style={{ padding: "14px" }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#0f172a" }}>
                    {name}
                  </div>
                  <div style={{ fontSize: 11, color: "#94a3b8" }}>{id}</div>
                </td>

                {/* DOKTER */}
                <td style={{ padding: "14px", fontSize: 13, color: "#64748b" }}>
                  {doc}
                </td>

                {/* BANGSAL */}
                <td style={{ padding: "14px", fontSize: 13, color: "#64748b" }}>
                  {ward}
                </td>

                {/* STATUS */}
                <td style={{ padding: "14px" }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      padding: "4px 10px",
                      borderRadius: 999,
                      background: bg,
                      color: fg,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      boxShadow: `0 0 8px ${bg}`,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: fg,
                      }}
                    />
                    {status}
                  </span>
                </td>

                {/* MASUK */}
                <td style={{ padding: "14px", fontSize: 12, color: "#94a3b8" }}>
                  17 Mar
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}