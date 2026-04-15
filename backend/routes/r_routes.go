package routes

import (
	"backend-golang/controllers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	r.GET("/igd", controllers.GetTotalIgdHarian)
	r.GET("/pasien", controllers.GetTotalPasienHarian)
}
