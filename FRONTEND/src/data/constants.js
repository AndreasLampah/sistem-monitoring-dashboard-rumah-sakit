export const NAV = [
  { id: "dashboard", label: "Dashboard", path: "/dashboard", icon: "M3 3h4v4H3zm6 0h4v4H9zm6 0h4v4h-4zM3 9h4v4H3zm6 0h4v4H9zm6 0h4v4h-4z" },
  { id: "patients", label: "Pasien", path: "/patients", icon: "M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0 2c-2.7 0-8 1.3-8 4v1h16v-1c0-2.7-5.3-4-8-4z" },
  { id: "schedule", label: "Jadwal", path: "/schedule", icon: "M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" },
  { id: "reports", label: "Laporan", path: "/reports", icon: "M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" },
];

// export const STATS = [
//   { label: "Total Pasien", value: "1,284", delta: "+8%", up: true, color: "#378ADD" },
//   { label: "Rawat Inap", value: "342", delta: "+2%", up: true, color: "#1D9E75" },
//   { label: "IGD Aktif", value: "27", delta: "+5 kasus", up: false, color: "#E24B4A" },
//   { label: "Operasi Hari Ini", value: "9", delta: "3 selesai", up: true, color: "#BA7517" },
// ];

export const PATIENTS = [
  { name: "Andi Firmansyah", id: "#2041", doc: "Dr. Budi", ward: "Bedah A", status: "Rawat Inap", s: "inap" },
  { name: "Siti Rahma", id: "#2038", doc: "Dr. Sari", ward: "Anak B", status: "Rawat Jalan", s: "jalan" },
  { name: "Budi Santoso", id: "#2035", doc: "Dr. Hendra", ward: "ICU", status: "IGD", s: "igd" },
  { name: "Dewi Kartika", id: "#2029", doc: "Dr. Reza", ward: "Umum C", status: "Rawat Inap", s: "inap" },
  { name: "Fajar Nugroho", id: "#2024", doc: "Dr. Sari", ward: "Poli", status: "Selesai", s: "done" },
];

export const SCHEDULE = [
  { time: "07:30", name: "Operasi Laparoskopi", detail: "Dr. Hendra · OK 1", type: "op" },
  { time: "08:00", name: "Poli Penyakit Dalam", detail: "Dr. Reza · 18 antrean", type: "konsul" },
  { time: "09:30", name: "Pengambilan Sampel Lab", detail: "Lab Lt.1 · 12 pasien", type: "lab" },
  { time: "11:00", name: "Operasi Bedah Ortopedi", detail: "Dr. Budi · OK 3", type: "op" },
];

export const BARS = [
  { day: "Sen", a: 55, b: 40 },
  { day: "Sel", a: 72, b: 55 },
  { day: "Rab", a: 48, b: 62 },
  { day: "Kam", a: 88, b: 66 },
  { day: "Jum", a: 65, b: 50 },
  { day: "Sab", a: 38, b: 28 },
];

export const STATUS_STYLE = {
  inap: { bg: "#E1F5EE", fg: "#085041" },
  jalan: { bg: "#E6F1FB", fg: "#0C447C" },
  igd: { bg: "#FCEBEB", fg: "#791F1F" },
  done: { bg: "#F1EFE8", fg: "#444441" },
};

export const TYPE_COLOR = {
  op: "#E24B4A",
  konsul: "#378ADD",
  lab: "#1D9E75",
};
