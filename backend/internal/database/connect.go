package database

import (
	"backend/internal/models"
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
	"os"
)

var DB *gorm.DB

func ConnectDB() error {
	dsn := os.Getenv("DATABASE_URL")
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return fmt.Errorf("failed to connect to database: %w", err)
	}

	if err != nil {
		log.Fatal("Ошибка при подключении к базе данных:", err)
	}

	DB = db

	fmt.Println("Подключение к базе данных успешно!")
	DB.AutoMigrate(&models.User{}, &models.Task{})
	return nil
}
