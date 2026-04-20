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

func GetTotalIgdHarian(c *gin.Context) {
	start, end, timeErr := utils.GetTodayRangeWITA()
	if timeErr != nil {
		log.Println("Zona waktu error:", timeErr)
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Zona waktu error",
		})
		return
	}

	var totalPasienIgdHarian int64

	dbErr := config.DB.
		Model(&model.DataTriaseIGD{}).
		Distinct("no_rawat"). // 🔥 penting: pasien unik
		Where("tgl_kunjungan >= ? AND tgl_kunjungan < ?", start, end).
		Count(&totalPasienIgdHarian).Error

	if dbErr != nil {
		log.Println("GetIgdHarian error:", dbErr)
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
