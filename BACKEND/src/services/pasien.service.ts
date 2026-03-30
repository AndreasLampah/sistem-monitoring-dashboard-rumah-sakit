import { db } from "../config/mysql";
import { RowDataPacket } from "mysql2";
import { logger } from "../app"



// DB PASIEN
interface TotalPasien extends RowDataPacket {
    total_pasien: number;
}

export const getTotalPasienHarian = async (): Promise<number> => {
    try {
        const [rows] = await db.execute<TotalPasien[]>(
            "SELECT COUNT(*) AS total_pasien FROM pasien WHERE tgl_daftar >= CURDATE() AND tgl_daftar < CURDATE() + INTERVAL 1 DAY;"
        );
        return rows[0].total_pasien
    } catch (error) {
        logger.error({
            message: "DB ERROR GET PASIEN HARIAN",
            error,
        });
        throw error
    }
};

interface PasienById extends RowDataPacket {
    no_rkm_medis: string;
    nm_pasien: string;
    jk: string;
    tgl_lahir: string;
    alamat: string;
}

export const getPasienById = async (no_rkm_medis: string): Promise<PasienById | null> => {
    if (!no_rkm_medis || typeof no_rkm_medis !== "string") {
        throw new Error("Invalid no_rkm_medis");
    }

    try {
        const [rows] = await db.execute<PasienById[]>(
            `SELECT no_rkm_medis, nm_pasien, jk, tgl_lahir, alamat 
         FROM pasien 
         WHERE no_rkm_medis = ?`,
            [no_rkm_medis]
        );

        if (!rows.length) {
            return null
        }

        return rows[0]
    } catch (error) {
        logger.error({
            message: "DB ERROR GET PASIEN BY ID",
            error,
            no_rkm_medis,
        });
        throw error
    }
};


// DB TRIASE IGD
interface TotalDataTriaseIgdHarian extends RowDataPacket {
    total_data_triase_igd_harian: number
}

export const getTotalDataTriaseIgdHarian = async (): Promise<number> => {
    try {
        const [rows] = await db.execute<TotalDataTriaseIgdHarian[]>(
            "SELECT COUNT(*) AS total_data_triase_igd_harian FROM data_triase_igd WHERE tgl_kunjungan >= CURDATE() AND tgl_kunjungan < CURDATE() + INTERVAL 1 DAY;"
        )

        return rows[0].total_data_triase_igd_harian
    } catch (error) {
        logger.error({
            message: "DB ERROR GET DATA TRIASE IGD HARIAN",
            error,
        })
        throw error
    }
}
