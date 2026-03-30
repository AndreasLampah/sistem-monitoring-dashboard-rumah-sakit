import { Request, Response } from "express";
// import { prisma } from "../config/prisma";
import { logger } from "../app"
import { getTotalPasienHarian } from "../services/pasien.service";
import { getPasienById } from "../services/pasien.service";
import { getTotalDataTriaseIgdHarian } from "../services/pasien.service";



export const getJumlahDataPasien = async (req: Request, res: Response) => {
    try {
        const dataPasien = await getTotalPasienHarian()
        return res.json({
            success: true,
            data: dataPasien
        })
    } catch (error) {
        logger.error({
            message: "ERROR GET TOTAL JUMLAH PASIEN HARIAN",
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined,
        });

        return res.status(500).json({
            success: false,
            message: "Gagal mengambil data pasien"
        })
    }
}



interface GetPasienParams {
    no_rkm_medis: string;
}

export const getDataPasienById = async (req: Request<GetPasienParams>, res: Response) => {
    const { no_rkm_medis } = req.params;

    if (!no_rkm_medis?.trim()) {
        return res.status(400).json({
            success: false,
            message: "Nomor rekam medis harus diisi"
        });
    }

    try {
        const dataPasien = await getPasienById(no_rkm_medis);

        if (!dataPasien) {
            return res.status(404).json({
                success: false,

                message: "Pasien tidak ditemukan",
                data: { no_rkm_medis }
            });
        }

        return res.json({
            success: true,
            data: dataPasien
        });
    } catch (error) {
        logger.error({
            message: "ERROR GET JUMLAH DATA PASIEN BY ID",
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined,
        });

        res.status(500).json({
            success: false,
            message: "Gagal mengambil data pasien"
        });
    }
};

export const getJumlahTotalDataTriaseIgdHarian = async (req: Request, res: Response) => {
    try {
        const dataTriaseIgd = await getTotalDataTriaseIgdHarian()

        return res.json({
            success: true,
            data: dataTriaseIgd
        })

    } catch (error) {
        logger.error({
            message: "ERROR GET JUMLAH DATA TRIASE PASIEN",
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined,
        });


        return res.status(500).json({
            success: false,
            message: "Gagal ambil data triase igd harian"
        })
    }
}