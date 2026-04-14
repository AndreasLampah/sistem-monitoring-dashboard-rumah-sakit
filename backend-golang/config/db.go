package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {

	err := godotenv.Load()
	if err != nil {
		log.Println("Tidak ada file .env, pakai env system")
	}

	dsn := os.Getenv("DB_DSN")
	log.Println("DSN:", dsn)

	database, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Gagal koneksi DB:", err)
	}

	DB = database
	log.Println("Database connected")
}
