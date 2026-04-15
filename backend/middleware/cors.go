package middleware

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupCors() gin.HandlerFunc {
	return cors.New(cors.Config{

		// 🌐 Frontend yang diizinkan
		AllowOrigins: []string{
			"http://localhost:5173",
			"http://localhost:3000",
		},

		// ⚡ READ ONLY API
		AllowMethods: []string{
			"GET",
			"OPTIONS",
		},

		// 📦 Headers yang diizinkan
		AllowHeaders: []string{
			"Origin",
			"Content-Type",
			"Authorization",
		},

		// 🔐 penting kalau pakai token (boleh false juga untuk read-only)
		AllowCredentials: false,

		// ⏱ biar preflight tidak terlalu sering
		MaxAge: 12 * time.Hour,
	})
}
