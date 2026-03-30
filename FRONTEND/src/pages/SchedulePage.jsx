import Layout from "../components/Layout";
import ScheduleList from "../components/ScheduleList";

export default function SchedulePage() {
  return (
    <Layout title="Jadwal" subtitle="Jadwal operasi & poli">
      <div style={{ background: "#fff", border: "1px solid #ebebeb", borderRadius: 12, padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: "#111" }}>Jadwal hari ini</span>
          <span style={{ fontSize: 12, color: "#aaa" }}>Selasa, 17 Maret 2026</span>
        </div>
        <ScheduleList />
      </div>
    </Layout>
  );
}
