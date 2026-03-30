import { PATIENTS, STATUS_STYLE } from "../data/constants";

const COLS = ["Pasien", "Dokter", "Bangsal", "Status", "Masuk"];

export default function PatientTable() {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {COLS.map((h) => (
            <th key={h} style={{
              fontSize: 11, color: "#aaa", fontWeight: 400,
              textAlign: "left", padding: "0 8px 10px",
              borderBottom: "1px solid #ebebeb",
              letterSpacing: "0.04em",
            }}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {PATIENTS.map(({ name, id, doc, ward, status, s }) => {
          const { bg, fg } = STATUS_STYLE[s];
          return (
            <tr key={id} style={{ cursor: "pointer" }}>
              <td style={{ padding: "10px 8px", borderBottom: "1px solid #ebebeb" }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#111" }}>{name}</div>
                <div style={{ fontSize: 11, color: "#aaa" }}>{id}</div>
              </td>
              <td style={{ padding: "10px 8px", fontSize: 13, color: "#888", borderBottom: "1px solid #ebebeb" }}>{doc}</td>
              <td style={{ padding: "10px 8px", fontSize: 13, color: "#888", borderBottom: "1px solid #ebebeb" }}>{ward}</td>
              <td style={{ padding: "10px 8px", borderBottom: "1px solid #ebebeb" }}>
                <span style={{
                  fontSize: 11, fontWeight: 500,
                  padding: "3px 8px", borderRadius: 999,
                  background: bg, color: fg,
                  display: "inline-block",
                }}>
                  {status}
                </span>
              </td>
              <td style={{ padding: "10px 8px", fontSize: 12, color: "#aaa", borderBottom: "1px solid #ebebeb" }}>17 Mar</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
