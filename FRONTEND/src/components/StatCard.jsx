export default function StatCard({ label, value, delta, up, color, loading }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(0,0,0,0.04)",
        borderRadius: 18,
        padding: 22,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        transition: "all 0.25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.05)";
      }}
    >
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span
          style={{
            fontSize: 12,
            color: "#94a3b8",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>

        {/* Dot indicator */}
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: color,
            boxShadow: `0 0 10px ${color}`,
          }}
        />
      </div>

      {/* VALUE */}
      <div
        style={{
          fontSize: 34,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: loading ? "transparent" : "#0f172a",
          lineHeight: 1,
          borderRadius: 6,
          minWidth: 80,
          minHeight: 34,
          background: loading
            ? "linear-gradient(90deg,#e2e8f0 25%,#f1f5f9 50%,#e2e8f0 75%)"
            : "transparent",
          backgroundSize: loading ? "200% 100%" : "auto",
          animation: loading ? "shimmer 1.5s infinite" : "none",
        }}
      >
        {loading ? "" : value ?? "-"}
      </div>

      {/* DELTA */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 12,
          fontWeight: 500,
          color: up ? "#065f46" : "#7f1d1d",
          background: up
            ? "linear-gradient(135deg,#d1fae5,#ecfdf5)"
            : "linear-gradient(135deg,#fee2e2,#fef2f2)",
          padding: "4px 10px",
          borderRadius: 999,
          alignSelf: "flex-start",
          opacity: loading ? 0.4 : 1,
          transition: "all 0.2s ease",
        }}
      >
        <span>{up ? "▲" : "▼"}</span>
        {delta}
      </div>

      {/* SHIMMER KEYFRAME */}
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}
      </style>
    </div>
  );
}