import { Link, useLocation } from "react-router-dom";
import Icon from "./Icon";
import { NAV } from "../data/constants";

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside style={{
      width: 200,
      background: "#fff",
      borderRight: "1px solid #ebebeb",
      display: "flex",
      flexDirection: "column",
      padding: "20px 0",
      minHeight: "100vh",
    }}>
      {/* Logo */}
      <div style={{ padding: "0 20px 20px", borderBottom: "1px solid #ebebeb", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8, background: "#111",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
              <path d="M12 2v20M2 12h20" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "#111" }}>MedCore</div>
            <div style={{ fontSize: 10, color: "#aaa", letterSpacing: "0.05em" }}>HOSPITAL</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "8px 0" }}>
        {NAV.map(({ label, path, icon }) => {
          const isActive = location.pathname === path;
          return (
            <Link key={path} to={path} style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 20px",
              borderLeft: isActive ? "2px solid #111" : "2px solid transparent",
              fontSize: 13,
              fontWeight: isActive ? 500 : 400,
              color: isActive ? "#111" : "#888",
              textDecoration: "none",
              transition: "all 0.1s",
            }}>
              <Icon path={icon} size={14} color={isActive ? "#111" : "#aaa"} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div style={{ padding: "16px 20px", borderTop: "1px solid #ebebeb", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: "#E6F1FB",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, fontWeight: 500, color: "#0C447C",
        }}>DR</div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 500, color: "#111" }}>Dr. Reza A.</div>
          <div style={{ fontSize: 11, color: "#aaa" }}>Admin Medis</div>
        </div>
      </div>
    </aside>
  );
}
