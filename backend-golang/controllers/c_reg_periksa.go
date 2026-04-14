package controllers

import (
	"log"
	"net/http"
	"time"

	"backend-golang/config"
	"backend-golang/model"

	"github.com/gin-gonic/gin"
)

func GetPasienHarian(c *gin.Context) {
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
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Gagal mengambil data TOTAL PASIEN harian",
			"error":   "Gagal Mengambil data",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success":           true,
		"message":           "Berhasil mengambil data TOTAL PASIEN harian",
		"totalPasienHarian": totalPasienHarian,
	})
}
