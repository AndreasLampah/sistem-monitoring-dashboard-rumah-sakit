import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ title, subtitle, children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', sans-serif", background: "#f8f8f8" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Topbar title={title} subtitle={subtitle} />
        <main style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
