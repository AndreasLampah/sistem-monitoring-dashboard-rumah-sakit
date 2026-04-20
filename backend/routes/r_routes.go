package routes

import (
	"backend-golang/controllers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	r.GET("/igd", controllers.GetTotalIgdHarian)
	r.GET("/pasien", controllers.GetTotalPasienHarian)
	r.GET("/ralan", controllers.GetTotalRalanHarian)
	r.GET("/ranap", controllers.GetTotalRanapHarian)
	r.GET("/pasien-tabel", controllers.GetPasienTabelHarian)
}
