package controllers

import (
	"log"
	"net/http"
	"time"

	"backend-golang/config"
	"backend-golang/model"

	"github.com/gin-gonic/gin"
)

func GetIgdHarian(c *gin.Context) {
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
	start := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, loc)
	end := start.Add(24 * time.Hour)

	var totalPasienIgdHarian int64

	if err := config.DB.
		Model(&model.DataTriaseIGD{}).
		Where("tgl_kunjungan >= ? AND tgl_kunjungan < ?", start, end).
		Count(&totalPasienIgdHarian).Error; err != nil {
		log.Println("GetIgdHarian error:", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Gagal mengambil data IGD harian",
			"error":   "Gagal mengambil data",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success":              true,
		"message":              "Berhasil mengambil data IGD harian",
		"totalPasienIgdHarian": totalPasienIgdHarian,
	})
}
