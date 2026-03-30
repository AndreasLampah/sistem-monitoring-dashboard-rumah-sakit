import express from "express";
import r_pasien from "../src/routes/r_pasien";
import cors from "cors";
import dotenv from "dotenv";
import pino from "pino";

dotenv.config();

export const logger = pino({ level: "info" });

const app = express();

app.use(express.json());

// ✅ Ganti dengan domain Hostinger Anda yang sebenarnya
const allowedOrigins = [
    'http://localhost:5173',
    'https://dashboard.rsutmc.com',
    'https://www.rsutmc.com',
];

app.use(cors({
    origin: (origin, callback) => {
        // izinkan request tanpa origin (Postman, curl, dll)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS blocked: ${origin}`));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
}));

// Routes
app.use(r_pasien);

app.get("/", (req, res) => {
    res.json({ message: "Hospital API running" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;