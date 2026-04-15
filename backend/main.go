package main

import (
	"backend-golang/config"
	"backend-golang/middleware"
	"backend-golang/routes"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {

	// connect DB
	config.ConnectDB()

	r := gin.Default()

	// middleware
	r.Use(middleware.SetupCors())

	// routes
	routes.SetupRoutes(r)

	// Inisialisasi DB dan migrasi tabel

	// run server
	r.Run(":" + os.Getenv("PORT"))
}
