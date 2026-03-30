export default function Topbar({ title, subtitle }) {
  return (
    <header style={{
      background: "#fff",
      borderBottom: "1px solid #ebebeb",
      padding: "0 24px",
      height: 52,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}>
      <div>
        <h1 style={{ fontSize: 15, fontWeight: 500, color: "#111", margin: 0 }}>{title}</h1>
        {subtitle && (
          <p style={{ fontSize: 11, color: "#aaa", marginTop: 1 }}>{subtitle}</p>
        )}
      </div>

      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "#f8f8f8",
        border: "1px solid #ebebeb",
        borderRadius: 8,
        padding: "6px 12px",
      }}>
        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth={2}>
          <circle cx={11} cy={11} r={8} />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          placeholder="Cari pasien..."
          style={{
            border: "none", background: "none", fontSize: 12,
            outline: "none", color: "#111", width: 140, fontFamily: "inherit",
          }}
        />
      </div>
    </header>
  );
}
