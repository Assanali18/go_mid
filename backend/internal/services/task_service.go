package services

import (
	"backend/internal/database"
	"backend/internal/models"
	"errors"
	"gorm.io/gorm"
)

type AverageDuration struct {
	AvgDuration float64
}

func GetTasks(userID uint) ([]models.Task, error) {
	var tasks []models.Task
	result := database.DB.Where("user_id = ?", userID).Find(&tasks)
	if result.Error != nil {
		return nil, result.Error
	}

	return tasks, nil
}

func CreateTask(task *models.Task) error {
	result := database.DB.Create(task)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func UpdateTask(taskID string, updatedTask *models.Task) error {
	var task models.Task
	result := database.DB.First(&task, taskID)
	if result.Error != nil {
		return errors.New("задача не найдена")
	}

	task.Title = updatedTask.Title
	task.Description = updatedTask.Description
	task.Status = updatedTask.Status
	task.Category = updatedTask.Category

	database.DB.Save(&task)
	return nil
}

func DeleteTask(taskID string) error {
	var task models.Task
	result := database.DB.First(&task, taskID)
	if result.Error != nil {
		return errors.New("задача не найдена")
	}

	database.DB.Delete(&task)
	return nil
}

func GetAverageTaskCompletionTime(projectID uint) (float64, error) {
	var result AverageDuration

	err := database.DB.Model(&models.Task{}).
		Select("AVG(EXTRACT(EPOCH FROM (updated_at - created_at))) as avg_duration").
		Where("project_id = ? AND status = ?", projectID, "Done").
		Scan(&result).Error

	if err != nil {
		return 0, err
	}

	return result.AvgDuration, nil
}

func GetTaskByID(taskID string, userID uint) (*models.Task, error) {
	var task models.Task
	result := database.DB.Where("id = ? AND user_id = ?", taskID, userID).First(&task)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, errors.New("Задача не найдена")
		}
		return nil, result.Error
	}
	return &task, nil
}
