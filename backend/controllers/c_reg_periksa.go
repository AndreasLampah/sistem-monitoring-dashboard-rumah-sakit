package controllers

import (
	"log"
	"net/http"
	"time"

	"backend-golang/config"
	"backend-golang/dto"
	"backend-golang/model"

	"github.com/gin-gonic/gin"
)

func GetTotalPasienHarian(c *gin.Context) {
	loc, err := time.LoadLocation("Asia/Makassar")
	if err != nil {
		log.Println("Zona waktu error:", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Zona waktu error",
		})
		return
	}

	now := time.Now().In(loc)
	tanggal := now.Format("2006-01-02")

	var totalPasienHarian int64

	if err := config.DB.
		Model(&model.RegPeriksa{}).
		Where("tgl_registrasi = ?", tanggal).
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
