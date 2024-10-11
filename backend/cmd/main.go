package main

import (
	"backend/internal/app"
	"backend/internal/database"
	"fmt"
)

func main() {
	fmt.Println("Сервер запущен на порту 8080")
	database.ConnectDB()
	app.Run()
}
