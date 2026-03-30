import Layout from "../components/Layout";
import PatientTable from "../components/PatientTable";
import ScheduleList from "../components/ScheduleList";
import { useEffect, useState } from "react";
import axios from "axios";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');

  .dash-root * { box-sizing: border-box; }

  .dash-root {
    font-family: 'DM Sans', sans-serif;
    background: #F5F4F0;
    min-height: 100vh;
  }

  /* ── Stat Grid ── */
  .stat-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }

  @media (max-width: 1024px) {
    .stat-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 480px) {
    .stat-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }
  }

  /* ── Stat Card ── */
  .stat-card {
    background: #fff;
    border-radius: 14px;
    padding: 22px 20px 18px;
    border: 1px solid #E8E7E3;
    position: relative;
    overflow: hidden;
    transition: box-shadow 0.2s, transform 0.2s;
    cursor: default;
  }

  .stat-card:hover {
    box-shadow: 0 6px 24px rgba(0,0,0,0.07);
    transform: translateY(-1px);
  }

  .stat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: var(--accent);
    opacity: 0.7;
  }

  .stat-label {
    font-size: 11px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #999;
    font-weight: 500;
    margin-bottom: 14px;
  }

  .stat-value {
    font-family: 'DM Mono', monospace;
    font-size: 32px;
    font-weight: 500;
    color: #111;
    line-height: 1;
    margin-bottom: 14px;
    letter-spacing: -0.02em;
    min-height: 32px;
  }

  @media (max-width: 480px) {
    .stat-value { font-size: 26px; }
    .stat-card  { padding: 16px 14px 14px; }
  }

  .stat-value.loading {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
    border-radius: 6px;
    color: transparent;
    width: 70px;
  }

  @keyframes shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  .stat-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 11.5px;
    font-weight: 500;
    padding: 3px 9px;
    border-radius: 999px;
  }

  .stat-badge.up      { background: #EDFAF4; color: #1A7A52; }
  .stat-badge.down    { background: #FEF0F0; color: #B03030; }
  .stat-badge.neutral { background: #F0F0EE; color: #666; }

  /* ── Panel ── */
  .panel {
    background: #fff;
    border: 1px solid #E8E7E3;
    border-radius: 14px;
    padding: 22px;
  }

  @media (max-width: 480px) {
    .panel { padding: 16px; }
  }

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18px;
  }

  .panel-title {
    font-size: 13px;
    font-weight: 500;
    color: #111;
    letter-spacing: 0.01em;
  }

  .panel-subtitle { font-size: 11.5px; color: #bbb; }

  .panel-link {
    font-size: 11.5px;
    color: #999;
    cursor: pointer;
    transition: color 0.15s;
  }

  .panel-link:hover { color: #333; }

  /* ── Bottom Row ── */
  .bottom-row {
    display: grid;
    grid-template-columns: 1fr 268px;
    gap: 10px;
  }

  @media (max-width: 1024px) {
    .bottom-row {
      grid-template-columns: 1fr;
    }
  }

  .dash-sections {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
  }

  /* ── Fade in ── */
  .fade-in {
    opacity: 0;
    transform: translateY(8px);
    animation: fadeUp 0.4s ease forwards;
  }
  .fade-in:nth-child(1) { animation-delay: 0.05s; }
  .fade-in:nth-child(2) { animation-delay: 0.10s; }
  .fade-in:nth-child(3) { animation-delay: 0.15s; }
  .fade-in:nth-child(4) { animation-delay: 0.20s; }

  @keyframes fadeUp {
    to { opacity: 1; transform: translateY(0); }
  }

  /* ── Dot pulse ── */
  .dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    position: absolute;
    top: 20px; right: 20px;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.5; transform: scale(0.85); }
  }

  /* ── Tabel scroll di HP ── */
  .table-scroll {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
`;

function StatCard({ label, value, delta, up, color, loading }) {
  const badgeClass = up === true ? "up" : up === false ? "down" : "neutral";
  return (
    <div className="stat-card fade-in" style={{ "--accent": color }}>
      <div className="dot" style={{ background: color }} />
      <div className="stat-label">{label}</div>
      <div className={`stat-value${loading ? " loading" : ""}`}>
        {loading ? "\u00A0\u00A0\u00A0\u00A0" : (value ?? "—")}
      </div>
      <span className={`stat-badge ${badgeClass}`}>{delta}</span>
    </div>
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [pasienRes, igdRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/pasien`),
          axios.get(`${import.meta.env.VITE_API_URL}/igd`),
        ]);
        setStats([
          { label: "Total Pasien", value: pasienRes.data?.data ?? "—", delta: "+0% vs kemarin", up: null, color: "#3B82F6" },
          { label: "Rawat Inap", value: "342", delta: "+2% vs kemarin", up: true, color: "#10B981" },
          { label: "IGD Aktif", value: igdRes.data?.data ?? "—", delta: "+5 kasus baru", up: false, color: "#EF4444" },
          { label: "Operasi Hari Ini", value: "9", delta: "3 selesai", up: true, color: "#F59E0B" },
        ]);
      } catch {
        setStats([
          { label: "Total Pasien", value: "—", delta: "Gagal memuat", up: null, color: "#3B82F6" },
          { label: "Rawat Inap", value: "342", delta: "+2%", up: true, color: "#10B981" },
          { label: "IGD Aktif", value: "—", delta: "Gagal memuat", up: null, color: "#EF4444" },
          { label: "Operasi Hari Ini", value: "9", delta: "3 selesai", up: true, color: "#F59E0B" },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <style>{css}</style>
      <Layout title="Dashboard" subtitle={today}>
        <div className="dash-root" style={{ padding: 0 }}>

          {/* Stat Cards */}
          <div className="stat-grid">
            {loading
              ? [0, 1, 2, 3].map(i => (
                <StatCard key={i} label="Memuat..." value="" delta="..." up={null} color="#ddd" loading />
              ))
              : stats.map(s => (
                <StatCard key={s.label} {...s} loading={false} />
              ))
            }
          </div>

          <div className="dash-sections">
            <div className="bottom-row">

              {/* Tabel Pasien */}
              <div className="panel">
                <div className="panel-header">
                  <span className="panel-title">Pasien Aktif</span>
                  <span className="panel-link">Lihat semua →</span>
                </div>
                <div className="table-scroll">
                  <PatientTable />
                </div>
              </div>

              {/* Jadwal */}
              <div className="panel">
                <div className="panel-header">
                  <span className="panel-title">Jadwal Hari Ini</span>
                  <span className="panel-subtitle">4 acara</span>
                </div>
                <ScheduleList />
              </div>

            </div>
          </div>

        </div>
      </Layout>
    </>
  );
}