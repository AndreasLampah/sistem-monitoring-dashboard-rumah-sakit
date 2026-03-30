import { Router } from "express";
const { getJumlahDataPasien } = require("../controllers/c_pasien");
const { getDataPasienById } = require("../controllers/c_pasien");
const { getJumlahTotalDataTriaseIgdHarian } = require("../controllers/c_pasien");


const router = Router();

router.get("/pasien", getJumlahDataPasien);
router.get("/igd", getJumlahTotalDataTriaseIgdHarian);
router.get("/pasien/:no_rkm_medis", getDataPasienById);

export default router