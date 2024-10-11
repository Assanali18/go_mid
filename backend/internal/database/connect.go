package database

import (
	"backend/internal/config"
	"backend/internal/models"
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
)

var DB *gorm.DB

func ConnectDB() error {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		config.AppConfig.DBHost,
		config.AppConfig.DBUser,
		config.AppConfig.DBPassword,
		config.AppConfig.DBName,
		config.AppConfig.DBPort,
	)
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
