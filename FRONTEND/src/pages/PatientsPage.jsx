import Layout from "../components/Layout";
import PatientTable from "../components/PatientTable";

export default function PatientsPage() {
  return (
    <Layout title="Pasien" subtitle="Daftar seluruh pasien">
      <div style={{ background: "#fff", border: "1px solid #ebebeb", borderRadius: 12, padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: "#111" }}>Semua pasien</span>
          <button style={{
            fontSize: 12, fontWeight: 500, color: "#fff",
            background: "#111", border: "none", borderRadius: 8,
            padding: "6px 14px", cursor: "pointer",
          }}>
            + Tambah pasien
          </button>
        </div>
        <PatientTable />
      </div>
    </Layout>
  );
}
