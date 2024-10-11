package models

import "time"

type Task struct {
	ID          uint   `gorm:"primaryKey"`
	Title       string `gorm:"not null"`
	Description string
	Category    string `gorm:"default:'To Do'"`
	Status      string `gorm:"default:'To Do'"`
	UserID      uint   `gorm:"not null"`
	CreatedAt   time.Time
}
