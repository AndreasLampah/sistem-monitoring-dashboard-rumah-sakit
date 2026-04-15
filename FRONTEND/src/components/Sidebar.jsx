import { Link, useLocation } from "react-router-dom";
import Icon from "./Icon";
import { NAV } from "../data/constants";

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside
      style={{
        width: 240,
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(14px)",
        borderRight: "1px solid rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        padding: "20px 14px",
        minHeight: "100vh",
      }}
    >
      {/* LOGO */}
      <div
        style={{
          padding: "0 10px 18px",
          marginBottom: 10,
          borderBottom: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: "linear-gradient(135deg,#3b82f6,#6366f1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 16px rgba(59,130,246,0.3)",
            }}
          >
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2v20M2 12h20"
                stroke="#fff"
                strokeWidth={2.5}
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a" }}>
              MedCore
            </div>
            <div
              style={{
                fontSize: 10,
                color: "#94a3b8",
                letterSpacing: "0.08em",
              }}
            >
              HOSPITAL
            </div>
          </div>
        </div>
      </div>

      {/* NAV */}
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        {NAV.map(({ label, path, icon }) => {
          const isActive = location.pathname === path;

          return (
            <Link
              key={path}
              to={path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 12px",
                borderRadius: 12,
                fontSize: 13,
                fontWeight: isActive ? 600 : 500,
                color: isActive ? "#0f172a" : "#64748b",
                textDecoration: "none",
                background: isActive
                  ? "linear-gradient(135deg,#e0f2fe,#f0f9ff)"
                  : "transparent",
                boxShadow: isActive
                  ? "0 4px 12px rgba(59,130,246,0.15)"
                  : "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "#f1f5f9";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              <Icon
                path={icon}
                size={16}
                color={isActive ? "#3b82f6" : "#94a3b8"}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* USER */}
      <div
        style={{
          marginTop: 10,
          padding: "14px",
          borderRadius: 14,
          background: "rgba(248,250,252,0.9)",
          border: "1px solid rgba(0,0,0,0.04)",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#bfdbfe,#93c5fd)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 600,
            color: "#1e3a8a",
          }}
        >
          DR
        </div>

        {/* Info */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>
            Dr. Reza A.
          </div>
          <div style={{ fontSize: 11, color: "#94a3b8" }}>
            Admin Medis
          </div>
        </div>
      </div>
    </aside>
  );
}