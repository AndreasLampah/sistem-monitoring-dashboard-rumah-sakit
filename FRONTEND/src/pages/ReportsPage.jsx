import Layout from "../components/Layout";
import BarChart from "../components/BarChart";

export default function ReportsPage() {
  return (
    <Layout title="Laporan" subtitle="Statistik & analitik rumah sakit">
      <div style={{ background: "#fff", border: "1px solid #ebebeb", borderRadius: 12, padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: "#111" }}>Kunjungan pasien</span>
          <span style={{ fontSize: 12, color: "#aaa" }}>7 hari terakhir</span>
        </div>
        <BarChart />
      </div>
    </Layout>
  );
}
