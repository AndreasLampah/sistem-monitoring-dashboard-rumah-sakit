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

func GetTotalIgdHarian(c *gin.Context) {
	loc, err := time.LoadLocation("Asia/Makassar")
	if err != nil {
		log.Println("Zona waktu error:", err)
		c.JSON(http.StatusInternalServerError, dto.TotalIgdHarianResponse{
			Success: false,
			Message: "Zona waktu error",
			Total:   0,
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
		c.JSON(http.StatusInternalServerError, dto.TotalIgdHarianResponse{
			Success: false,
			Message: "Gagal mengambil data IGD harian",
			Total:   0,
		})
		return
	}

	c.JSON(http.StatusOK, dto.TotalIgdHarianResponse{
		Success: true,
		Message: "Berhasil mengambil data IGD harian",
		Total:   totalPasienIgdHarian,
	})
}
