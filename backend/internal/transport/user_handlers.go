package transport

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"gormADV/internal/models"
	"gormADV/internal/services"
	"net/http"
)

func UserRoutes(r *mux.Router) {
	userRouter := r.PathPrefix("/users").Subrouter()

	userRouter.HandleFunc("/register", RegisterUser).Methods("POST")
	userRouter.HandleFunc("/login", LoginUser).Methods("POST")
}

func RegisterUser(w http.ResponseWriter, r *http.Request) {
	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	err = services.RegisterUser(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(user)
}

func LoginUser(w http.ResponseWriter, r *http.Request) {
	var loginRequest models.LoginRequest
	err := json.NewDecoder(r.Body).Decode(&loginRequest)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	token, err := services.LoginUser(loginRequest.Email, loginRequest.Password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"token": token})
}
