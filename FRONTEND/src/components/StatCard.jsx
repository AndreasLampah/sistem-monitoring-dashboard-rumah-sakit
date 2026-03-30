export default function StatCard({ label, value, delta, up, color, loading }) {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #ebebeb",
      borderRadius: 12,
      padding: 20,
      display: "flex",
      flexDirection: "column",
      gap: 12,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, color: "#888", letterSpacing: "0.04em" }}>{label}</span>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
      </div>

      {/* ✅ Skeleton saat loading, "-" jika value undefined */}
      <div style={{
        fontSize: 28, fontWeight: 500,
        letterSpacing: "-0.02em",
        color: loading ? "transparent" : "#111",
        lineHeight: 1,
        background: loading ? "#f0f0f0" : "transparent",
        borderRadius: loading ? 6 : 0,
        minWidth: 60, minHeight: 28,
        transition: "all 0.2s",
      }}>
        {loading ? "" : (value ?? "-")}
      </div>

      <div style={{
        display: "inline-flex", alignItems: "center",
        fontSize: 12,
        color: up ? "#0F6E56" : "#A32D2D",
        background: up ? "#E1F5EE" : "#FCEBEB",
        padding: "2px 8px", borderRadius: 999,
        alignSelf: "flex-start",
        opacity: loading ? 0.4 : 1,
        transition: "opacity 0.2s",
      }}>
        {delta}
      </div>
    </div>
  );
}