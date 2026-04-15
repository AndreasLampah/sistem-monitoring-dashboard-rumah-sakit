import Icon from "./Icon";

export default function Topbar({ title, subtitle }) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(14px)",
        background: "rgba(255,255,255,0.75)",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
        padding: "10px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* LEFT */}
      <div>
        <h1
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: "#0f172a",
            margin: 0,
          }}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            style={{
              fontSize: 11,
              color: "#94a3b8",
              marginTop: 2,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* RIGHT */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>

        {/* SEARCH */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(248,250,252,0.9)",
            border: "1px solid rgba(0,0,0,0.05)",
            borderRadius: 12,
            padding: "8px 12px",
            transition: "all 0.2s ease",
          }}
        >
          <Icon
            path="M11 19a8 8 0 1 1 5.293-14.293A8 8 0 0 1 11 19Zm10 2-4.35-4.35"
            size={14}
            color="#94a3b8"
            stroke
          />

          <input
            placeholder="Cari pasien..."
            style={{
              border: "none",
              background: "none",
              fontSize: 12,
              outline: "none",
              color: "#0f172a",
              width: 160,
              fontFamily: "inherit",
            }}
            onFocus={(e) => {
              e.target.parentElement.style.boxShadow =
                "0 0 0 3px rgba(59,130,246,0.15)";
              e.target.parentElement.style.borderColor = "#3b82f6";
            }}
            onBlur={(e) => {
              e.target.parentElement.style.boxShadow = "none";
              e.target.parentElement.style.borderColor =
                "rgba(0,0,0,0.05)";
            }}
          />
        </div>

        {/* NOTIFICATION */}
        <div
          style={{
            position: "relative",
            width: 36,
            height: 36,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f1f5f9",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#e2e8f0";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#f1f5f9";
          }}
        >
          <Icon
            path="M15 17h5l-1.405-1.405C18.231 15.231 18 14.62 18 14V11a6 6 0 1 0-12 0v3c0 .62-.231 1.231-.595 1.595L4 17h5"
            size={16}
            color="#64748b"
            stroke
          />

          {/* Badge */}
          <span
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#ef4444",
            }}
          />
        </div>

        {/* USER */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "6px 10px",
            borderRadius: 12,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f1f5f9";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#93c5fd,#3b82f6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 600,
              color: "#fff",
            }}
          >
            DR
          </div>

          {/* Name */}
          <div style={{ lineHeight: 1 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#0f172a",
              }}
            >
              Dr. Reza
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#94a3b8",
              }}
            >
              Admin
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}