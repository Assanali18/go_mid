package transport

import (
	"backend/internal/models"
	"backend/internal/services"
	"encoding/json"
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"strconv"
)

func TaskRoutes(r *mux.Router) {
	taskRouter := r.PathPrefix("/tasks").Subrouter()

	taskRouter.HandleFunc("", GetTasks).Methods("GET", "OPTIONS")
	taskRouter.HandleFunc("", CreateTask).Methods("POST", "OPTIONS")
	taskRouter.HandleFunc("/{id}", UpdateTask).Methods("PUT", "OPTIONS")
	taskRouter.HandleFunc("/{id}", DeleteTask).Methods("DELETE", "OPTIONS")
	r.HandleFunc("/projects/{projectID}/average-task-duration", GetAvgTaskCompletionTime).Methods("GET")
}

func GetTasks(w http.ResponseWriter, r *http.Request) {
	log.Println(r.Context())
	userID := r.Context().Value("userID").(uint)
	tasks, err := services.GetTasks(userID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tasks)
}

func CreateTask(w http.ResponseWriter, r *http.Request) {
	var task models.Task
	err := json.NewDecoder(r.Body).Decode(&task)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	userID := r.Context().Value("userID").(uint)
	task.UserID = userID

	err = services.CreateTask(&task)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(task)
}

func UpdateTask(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	taskID := vars["id"]

	var updatedTask models.Task
	err := json.NewDecoder(r.Body).Decode(&updatedTask)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	err = services.UpdateTask(taskID, &updatedTask)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(updatedTask)
}

func DeleteTask(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	taskID := vars["id"]

	err := services.DeleteTask(taskID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusNoContent)
}

func GetAvgTaskCompletionTime(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	projectID, err := strconv.ParseUint(vars["projectID"], 10, 32)
	if err != nil {
		http.Error(w, "Неверный формат ID проекта", http.StatusBadRequest)
		return
	}

	avgDuration, err := services.GetAverageTaskCompletionTime(uint(projectID))
	if err != nil {
		http.Error(w, "Ошибка получения средней продолжительности выполнения задач", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]float64{"average_duration": avgDuration})

}
