import Layout from "../components/Layout";
import PatientTable from "../components/PatientTable";
import ScheduleList from "../components/ScheduleList";
import { useEffect, useState } from "react";
import api from "../utils/axiosInstance";

// ================= CSS =================
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

  .dash-root {
    font-family: 'Inter', sans-serif;
    background: linear-gradient(to bottom, #f8fafc, #f1f5f9);
    min-height: 100vh;
  }

  .stat-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  @media (max-width: 1024px) {
    .stat-grid { grid-template-columns: repeat(2, 1fr); }
  }

  .stat-card {
    background: rgba(255,255,255,0.7);
    backdrop-filter: blur(12px);
    border-radius: 18px;
    padding: 24px;
    border: 1px solid rgba(0,0,0,0.04);
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    transition: all 0.25s ease;
  }

  .stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.08);
  }

  .stat-label {
    font-size: 12px;
    text-transform: uppercase;
    color: #94a3b8;
    margin-bottom: 12px;
    letter-spacing: 0.5px;
  }

  .stat-value {
    font-size: 34px;
    font-weight: 600;
    color: #0f172a;
  }

  .skeleton {
    width: 80px;
    height: 28px;
    border-radius: 6px;
    background: linear-gradient(
      90deg,
      #e2e8f0 25%,
      #f1f5f9 50%,
      #e2e8f0 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  .panel {
    background: rgba(255,255,255,0.8);
    backdrop-filter: blur(10px);
    border-radius: 18px;
    padding: 22px;
    border: 1px solid rgba(0,0,0,0.04);
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  }

  .panel h3 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 14px;
    color: #0f172a;
  }

  .bottom-row {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 16px;
  }

  @media (max-width: 1024px) {
    .bottom-row { grid-template-columns: 1fr; }
  }
`;

// ================= CARD =================
function StatCard({ label, value, color, loading }) {
  return (
    <div className="stat-card" style={{ borderTop: `3px solid ${color}` }}>
      <div className="stat-label">{label}</div>
      <div className="stat-value">
        {loading ? <div className="skeleton"></div> : value}
      </div>
    </div>
  );
}

// ================= PAGE =================
export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);

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

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        if (firstLoad) setLoading(true);

        const [pasienRes, igdRes] = await Promise.all([
          api.get("/pasien"),
          api.get("/igd"),
        ]);

        if (!isMounted) return;

        setStats({
          pasien: pasienRes.data?.totalPasien ?? 0,
          igd: igdRes.data?.totalPasienIgdHarian ?? 0,
        });
      } catch (err) {
        console.error("Error fetch dashboard:", err.message);
      } finally {
        if (firstLoad) {
          setLoading(false);
          setFirstLoad(false);
        }
      }
    };

    // first load
    fetchData();

    // auto refresh tiap 30 detik
    const interval = setInterval(fetchData, 30000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [firstLoad]);

  return (
    <>
      <style>{css}</style>

      <Layout
        title={
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>

            {/* MAIN TITLE */}
            <span
              style={{
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "#0f172a",
              }}
            >
              SISTEM MONITORING DASHBOARD
            </span>

            {/* SUB TITLE */}
            <span
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: "#64748b",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              RSU. Tumpaan Medical Center
            </span>

          </div>
        }

        subtitle={
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

            {/* LIVE STATUS */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "3px 10px",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 500,
                background: "#ecfdf5",
                color: "#065f46",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#10b981",
                  boxShadow: "0 0 6px #10b981",
                }}
              />
              Live
            </span>

            {/* DATE */}
            <span
              style={{
                fontSize: 14,
                color: "#64748b",
                fontWeight: 500,
              }}
            >
              {today}
            </span>
          </div>
        }
      >
        <div className="dash-root" style={{ padding: 24 }}>

          {/* STAT */}
          <div className="stat-grid">
            <StatCard label="Total Pasien" value={stats.pasien} color="#3B82F6" loading={loading} />
            <StatCard label="IGD Hari Ini" value={stats.igd} color="#EF4444" loading={loading} />
            <StatCard label="Rawat Inap" value="342" color="#10B981" loading={false} />
            <StatCard label="Operasi Hari Ini" value="9" color="#F59E0B" loading={false} />
          </div>

          {/* BOTTOM */}
          <div className="bottom-row" style={{ marginTop: 24 }}>
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