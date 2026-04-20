package controllers

import (
	"log"
	"net/http"

	"backend-golang/config"
	"backend-golang/dto"
	"backend-golang/model"
	"backend-golang/utils"

	"github.com/gin-gonic/gin"
)

func GetTotalPasienHarian(c *gin.Context) {
	start, end, timeErr := utils.GetTodayRangeWITA()
	if timeErr != nil {
		log.Println("Zona waktu error:", timeErr)
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Zona waktu error",
		})
		return
	}

	var totalPasienHarian int64

	if err := config.DB.
		Model(&model.RegPeriksa{}).
		Where("tgl_registrasi >= ? AND tgl_registrasi < ?", start, end).
		Count(&totalPasienHarian).Error; err != nil {
		log.Println("GetPasienHarian error:", err)
		c.JSON(http.StatusInternalServerError, dto.TotalPasienHarianResponse{
			Success: false,
			Message: "Gagal mengambil data TOTAL PASIEN harian",
			Total:   0,
		})
		return
	}

	c.JSON(http.StatusOK, dto.TotalPasienHarianResponse{
		Success: true,
		Message: "Berhasil mengambil data TOTAL PASIEN harian",
		Total:   totalPasienHarian,
	})
}

func GetPasienTabelHarian(c *gin.Context) {
	start, end, timeErr := utils.GetTodayRangeWITA()
	if timeErr != nil {
		log.Println("Zona waktu error:", timeErr)
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Zona waktu error",
		})
		return
	}

	result := []dto.PatientTableResponse{}

	err := config.DB.Raw(`
	SELECT 
		p.nm_pasien AS name,
		p.no_rkm_medis AS id,
		d.nm_dokter AS doc,
		COALESCE(b.nm_bangsal, '-') AS ward,
		rp.status_lanjut AS status,
		rp.stts_daftar AS jenis,
		DATE(rp.tgl_registrasi) AS masuk
	FROM reg_periksa rp
	JOIN pasien p ON rp.no_rkm_medis = p.no_rkm_medis
	LEFT JOIN dokter d ON rp.kd_dokter = d.kd_dokter
	LEFT JOIN kamar_inap ki ON rp.no_rawat = ki.no_rawat
	LEFT JOIN kamar k ON ki.kd_kamar = k.kd_kamar
	LEFT JOIN bangsal b ON k.kd_bangsal = b.kd_bangsal
	WHERE rp.tgl_registrasi >= ? AND rp.tgl_registrasi < ?
	ORDER BY rp.jam_reg DESC
`, start, end).Scan(&result).Error

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Gagal ambil data",
		})
		return
	}

	c.JSON(http.StatusOK, dto.PatientTableListResponse{
		Success: true,
		Message: "Berhasil ambil data untuk table pasien",
		Data:    result,
	})
}

func GetTotalRanapHarian(c *gin.Context) {
	start, end, timeErr := utils.GetTodayRangeWITA()
	if timeErr != nil {
		log.Println("Zona waktu error:", timeErr)
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Zona waktu error",
		})
		return
	}

	var totalRanapHarian int64

	dbErr := config.DB.
		Model(&model.RegPeriksa{}).
		Where("tgl_registrasi >= ? AND tgl_registrasi < ? AND status_lanjut = ?", start, end, "Ranap").
		Count(&totalRanapHarian).Error

	if dbErr != nil {
		log.Println("GetRanapHarian error:", dbErr)
		c.JSON(http.StatusInternalServerError, dto.TotalRanapHarian{
			Success: false,
			Message: "Gagal mengambil data RANAP harian",
			Total:   0,
		})
		return
	}

	c.JSON(http.StatusOK, dto.TotalRanapHarian{
		Success: true,
		Message: "Berhasil mengambil data RANAP harian",
		Total:   totalRanapHarian,
	})
}

func GetTotalRalanHarian(c *gin.Context) {
	start, end, timeErr := utils.GetTodayRangeWITA()
	if timeErr != nil {
		log.Println("Zona waktu error:", timeErr)
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Zona waktu error",
		})
		return
	}

	var totalRalanHarian int64

	dbErr := config.DB.
		Model(&model.RegPeriksa{}).
		Where("tgl_registrasi >= ? AND tgl_registrasi < ? AND status_lanjut = ?", start, end, "Ralan").
		Count(&totalRalanHarian).Error

	if dbErr != nil {
		log.Println("GetRalanHarian error:", dbErr)
		c.JSON(http.StatusInternalServerError, dto.TotalRalanHarian{
			Success: false,
			Message: "Gagal mengambil data RALAN harian",
			Total:   0,
		})
		return
	}

	c.JSON(http.StatusOK, dto.TotalRalanHarian{
		Success: true,
		Message: "Berhasil mengambil data RALAN harian",
		Total:   totalRalanHarian,
	})
}
