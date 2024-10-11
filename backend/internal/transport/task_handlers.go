package transport

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"gormADV/internal/models"
	"gormADV/internal/services"
	"net/http"
)

func TaskRoutes(r *mux.Router) {
	taskRouter := r.PathPrefix("/tasks").Subrouter()

	taskRouter.HandleFunc("/", GetTasks).Methods("GET")
	taskRouter.HandleFunc("/", CreateTask).Methods("POST")
	taskRouter.HandleFunc("/{id}", UpdateTask).Methods("PUT")
	taskRouter.HandleFunc("/{id}", DeleteTask).Methods("DELETE")
}

func GetTasks(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value("userID").(uint)
	tasks, err := services.GetTasks(userID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(tasks)
}

func CreateTask(w http.ResponseWriter, r *http.Request) {
	var task models.Task
	err := json.NewDecoder(r.Body).Decode(&task)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	err = services.CreateTask(&task)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

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

	w.WriteHeader(http.StatusNoContent)
}
