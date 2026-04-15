import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ title, subtitle, children }) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
        background: "linear-gradient(180deg,#f8fafc 0%, #f1f5f9 100%)",
      }}
    >
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {/* TOPBAR */}
        <Topbar title={title} subtitle={subtitle} />

        {/* CONTENT WRAPPER */}
        <main
          style={{
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 20,
            flex: 1,
            position: "relative",
          }}
        >
          {/* GLASS BACKGROUND LAYER */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at top right, rgba(59,130,246,0.06), transparent 40%), radial-gradient(circle at bottom left, rgba(16,185,129,0.06), transparent 40%)",
              pointerEvents: "none",
            }}
          />

          {/* CONTENT */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}