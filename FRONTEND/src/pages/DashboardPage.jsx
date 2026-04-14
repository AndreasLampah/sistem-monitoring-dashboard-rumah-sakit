import Layout from "../components/Layout";
import PatientTable from "../components/PatientTable";
import ScheduleList from "../components/ScheduleList";
import { useEffect, useState } from "react";
import api from "../utils/axiosInstance";

// ================= CSS =================
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');

  .dash-root {
    font-family: 'DM Sans', sans-serif;
    background: #F5F4F0;
    min-height: 100vh;
  }

  .stat-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }

  @media (max-width: 1024px) {
    .stat-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 480px) {
    .stat-grid { grid-template-columns: repeat(2, 1fr); }
  }

  .stat-card {
    background: #fff;
    border-radius: 14px;
    padding: 22px;
    border: 1px solid #E8E7E3;
    position: relative;
  }

  .stat-label {
    font-size: 11px;
    text-transform: uppercase;
    color: #999;
    margin-bottom: 10px;
  }

  .stat-value {
    font-family: monospace;
    font-size: 28px;
    font-weight: 600;
    color: #111;
  }

  .panel {
    background: #fff;
    border: 1px solid #E8E7E3;
    border-radius: 14px;
    padding: 20px;
  }

  .bottom-row {
    display: grid;
    grid-template-columns: 1fr 280px;
    gap: 10px;
  }

  @media (max-width: 1024px) {
    .bottom-row { grid-template-columns: 1fr; }
  }
`;

// ================= CARD =================
function StatCard({ label, value, color }) {
  return (
    <div className="stat-card" style={{ borderTop: `3px solid ${color}` }}>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}

// ================= PAGE =================
export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    pasien: 0,
    igd: 0,
  });

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const [pasienRes, igdRes] = await Promise.all([
          api.get("/pasien"),
          api.get("/igd"),
        ]);

        setStats({
          pasien: pasienRes.data?.totalPasien ?? 0,
          igd: igdRes.data?.totalPasienIgdHarian ?? 0,
        });
      } catch (err) {
        console.error("Error fetch dashboard:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  // ================= RENDER =================
  return (
    <>
      <style>{css}</style>

      <Layout title="Dashboard RS" subtitle={today}>
        <div className="dash-root" style={{ padding: 20 }}>

          {/* ================= STAT CARDS ================= */}
          <div className="stat-grid">

            <StatCard
              label="Total Pasien"
              value={loading ? "Loading..." : stats.pasien}
              color="#3B82F6"
            />

            <StatCard
              label="IGD Hari Ini"
              value={loading ? "Loading..." : stats.igd}
              color="#EF4444"
            />

            <StatCard
              label="Rawat Inap"
              value="342"
              color="#10B981"
            />

            <StatCard
              label="Operasi Hari Ini"
              value="9"
              color="#F59E0B"
            />

          </div>

          {/* ================= BOTTOM SECTION ================= */}
          <div className="bottom-row" style={{ marginTop: 20 }}>

            <div className="panel">
              <h3>Pasien Aktif</h3>
              <PatientTable />
            </div>

            <div className="panel">
              <h3>Jadwal Hari Ini</h3>
              <ScheduleList />
            </div>

          </div>

        </div>
      </Layout>
    </>
  );
}